// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext.jsx';
// import SocialAuth from '../components/SocialAuth.jsx';

// function Signup() {
//   const {signup} = useAuth()
//   const navigate = useNavigate();

//   const handleSignup = async () => {
//     // later: API call
//     const res = await signup({
//       email: 'test',
//       password: '123',
//     });

//     if (res.success) {
//       navigate('/dashboard');
//     }
//   };

//   return (
//     <div className='w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center text-white'>
//       <h2 className='text-3xl font-bold mb-4'>Create Account</h2>

//       <input className='input' placeholder='Full Name' />
//       <input className='input' placeholder='Username' />
//       <input className='input' placeholder='Email' />
//       <input className='input' type='password' placeholder='Password' />
//       <input className='input' type='password' placeholder='Re-type Password' />

//       <button onClick={handleSignup} className='btn-primary mt-4'>
//         Sign Up
//       </button>

//       <SocialAuth />
//     </div>
//   );
// }

// export default Signup;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import SocialAuth from '../components/SocialAuth.jsx';

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    reEnterPassword: ''
  });

  const handleSignup = async () => {
    const res = await signup(formData);

    if (res.success) {
      navigate('/dashboard');
    } else {
      alert(res.error);
    }
  };

  return (
    <div className='w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center text-white'>
      <h2 className='text-3xl font-bold mb-4'>Create Account</h2>

      <input
        className='input'
        placeholder='Full Name'
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      <input
        className='input'
        placeholder='Username'
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />

      <input
        className='input'
        placeholder='Email'
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />

      <input
        className='input'
        type='password'
        placeholder='Password'
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />

      <input
        className='input'
        type='password'
        placeholder='re type Password'
        value={formData.reEnterPassword}
        onChange={(e) => setFormData({ ...formData, reEnterPassword: e.target.value })}
      />

      <button onClick={handleSignup} className='btn-primary mt-4'>
        Sign Up
      </button>

      <SocialAuth />
    </div>
  );
}

export default Signup;