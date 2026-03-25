import { useNavigate } from 'react-router-dom';
import SocialAuth from '../components/SocialAuth.jsx';

function Signup({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleSignup = () => {
    // later: API call
    localStorage.setItem('auth', 'true');
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  return (
    <div className='w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center text-white'>
      <h2 className='text-3xl font-bold mb-4'>Create Account</h2>

      <input className='input' placeholder='Full Name' />
      <input className='input' placeholder='Username' />
      <input className='input' placeholder='Email' />
      <input className='input' type='password' placeholder='Password' />
      <input className='input' type='password' placeholder='Re-type Password' />

      <button onClick={handleSignup} className='btn-primary mt-4'>
        Sign Up
      </button>

      <SocialAuth />
    </div>
  );
}

export default Signup;
