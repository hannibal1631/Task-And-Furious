import { useNavigate } from 'react-router-dom';
import SocialAuth from '../components/SocialAuth.jsx';

function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    // later: API call
    localStorage.setItem('auth', 'true');
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  return (
    <div className='w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center text-white'>
      <h2 className='text-3xl font-bold mb-4'>Welcome Back</h2>

      <input className='input' placeholder='Email or Username' />
      <input className='input' type='password' placeholder='Password' />

      <button onClick={handleLogin} className='btn-primary mt-4'>
        Login
      </button>

      <SocialAuth />
    </div>
  );
}

export default Login;
