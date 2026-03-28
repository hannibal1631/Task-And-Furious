// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext.jsx';
// import SocialAuth from '../components/SocialAuth.jsx';

// function Login() {
//   const {login} = useAuth()
//   const navigate = useNavigate();

//   const handleLogin = async() => {
//     // later: API call
//     const res = await login({
//       email: 'test',
//       password: '123'
//     })

//     if(res.success) {
//       navigate('/dashboard')
//     }

//   };

//   return (
//     <div className='w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center text-white'>
//       <h2 className='text-3xl font-bold mb-4'>Welcome Back</h2>

//       <input className='input' placeholder='Email or Username' />
//       <input className='input' type='password' placeholder='Password' />

//       <button onClick={handleLogin} className='btn-primary mt-4'>
//         Login
//       </button>

//       <SocialAuth />
//     </div>
//   );
// }

// export default Login;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import SocialAuth from '../components/SocialAuth.jsx';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '', // username or email
    password: '',
  });

  const handleLogin = async () => {
    const res = await login(formData);

    if (res.success) {
      navigate('/dashboard');
    } else {
      alert(res.error);
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
      />

      <input
        className='input'
        type='password'
        placeholder='Password'
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />

      <button onClick={handleLogin} className='btn-primary mt-4'>
        Login
      </button>

      <SocialAuth />
    </div>
  );
}

export default Login;