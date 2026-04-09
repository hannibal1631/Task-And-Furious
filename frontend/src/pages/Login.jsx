import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import SocialAuth from '../components/SocialAuth.jsx';

function Login() {
  const [btnLoading, setBtnLoading] = useState(false);

  const { login, user, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '', // username or email
    password: '',
  });
  const isFormValid = formData.username && formData.password;

  useEffect(() => {
    if (!loading && user?._id) {
      navigate('/dashboard');
    }
  }, [user, loading]);

  const handleLogin = async () => {
    if (!isFormValid) return;
    setBtnLoading(true);
    const res = await login(formData);

    if (!res.success) {
      alert(res.error);
      setBtnLoading(false);
    }
  };

  return (
    <div className='w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center text-white'>
      <h2 className='text-3xl font-bold mb-4'>Welcome Back</h2>

      <input
        className='input'
        placeholder='Email or Username'
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        disabled={btnLoading}
      />

      <input
        className='input'
        type='password'
        placeholder='Password'
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        disabled={btnLoading}
      />

      <button
        onClick={handleLogin}
        disabled={!isFormValid || btnLoading}
        className={`btn-primary mt-4 flex items-center justify-center gap-2
        ${!isFormValid || btnLoading ? 'cursor-not-allowed' : ''}`}
      >
        {btnLoading ? (
          <>
            <span className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></span>
            Logging In...
          </>
        ) : (
          'Login'
        )}
      </button>

      <SocialAuth />
    </div>
  );
}

export default Login;
