import { createContext, useContext, useReducer, useEffect } from 'react';
import API_BASE_URL from '../config/api.js';
import axios from 'axios';

const BASE_URL = API_BASE_URL;

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      if (action.payload?._id) {
        localStorage.setItem('userId', action.payload._id);
      }
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case 'LOGOUT':
      localStorage.removeItem('userId');
      return {
        user: null,
        isAuthenticated: false,
        loading: false,
      };

    case 'STOP_LOADING':
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check auth on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/users/current-user`, {
          withCredentials: true,
        });

        const userData = res.data?.data;

        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: userData,
        });
      } catch (err) {
        if (err.response?.status === 401) {
          dispatch({ type: 'STOP_LOADING' });
        } else {
          console.error('Auth check failed', err);
          dispatch({ type: 'STOP_LOADING' });
        }
      }
    };

    checkAuth();
  }, []);

  // LOGIN
  const login = async (formData) => {
    try {
      const res = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // cookies
        body: JSON.stringify(formData),
      });

      const contentType = res.headers.get('content-type');

      if (!contentType || !contentType.includes('application/json')) {
        const text = await res.text();
        console.error('Non-JSON response:', text);
        throw new Error('Server did not return JSON');
      }

      const data = await res.json();
      console.log('Login Response', data);

      if (!res.ok) throw new Error(data.message || 'Login failed');

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: data.data.user,
      });

      return { success: true };
    } catch (err) {
      console.error(err);

      return { success: false, error: err.message };
    }
  };

  // SIGNUP
  const signup = async (formData) => {
    try {
      const res = await fetch(`${BASE_URL}/users/sign-up`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Signup failed');

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: data.data.user,
      });

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      await fetch(`${BASE_URL}/users/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error(err);
    }

    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// custom hook
export const useAuth = () => useContext(AuthContext);
