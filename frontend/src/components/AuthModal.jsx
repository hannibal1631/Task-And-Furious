import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGoogle,
  faGithub,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

function AuthModal({ isOpen, onClose, mode }) {
  const [isSignup, setIsSignup] = useState(mode === 'signup');

  useEffect(() => {
    setIsSignup(mode === 'signup');
  }, [mode]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 px-4 backdrop-blur-md bg-blue-800/80'>
      <div className='relative w-full max-w-4xl h-[70vh] md:h-150 bg-blue-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:block'>
        {/* SLIDER CONTAINER */}
        <div className='flex flex-col md:flex-row h-full relative z-10'>
          {/* SIGN UP */}
          <div
            className={`
              w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center text-white
              ${isSignup ? 'flex' : 'hidden'} md:flex
            `}
          >
            <h2 className='text-3xl font-bold mb-4'>Create Account</h2>

            <input className='input' placeholder='Full Name' />
            <input className='input' placeholder='Username' />
            <input className='input' placeholder='Email' />
            <input className='input' type='password' placeholder='Password' />
            <input
              className='input'
              type='password'
              placeholder='Re-type Password'
            />

            <button className='btn-primary mt-4'>Sign Up</button>
            <SocialAuth />
          </div>

          {/* SIGN IN */}
          <div
            className={`
              w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center text-white
              ${!isSignup ? 'flex' : 'hidden'} md:flex
            `}
          >
            <h2 className='text-3xl font-bold mb-4'>Welcome Back</h2>

            <input className='input' placeholder='Email or Username' />
            <input className='input' type='password' placeholder='Password' />
            <input
              className='input'
              type='password'
              placeholder='Re-type Password'
            />

            <button className='btn-primary mt-4'>Login</button>
            <SocialAuth />
          </div>
        </div>

        {/* DESKTOP SIDE PANEL */}
        <div
          className={`
            hidden md:flex absolute top-0 w-1/2 h-full flex-col items-center justify-center
            bg-linear-to-br from-blue-800 to-blue-600 text-white z-20
            transition-all duration-700 ease-in-out text-center px-6
            ${isSignup ? 'left-0' : 'left-1/2'}
          `}
        >
          <div
            key={isSignup ? 'signup' : 'login'}
            className='flex flex-col items-center transition-all duration-500 ease-in-out animate-fade'
          >
            {isSignup ? (
              <>
                <h2 className='text-3xl font-bold mb-2'>Hello, New Here?</h2>
                <p className='text-sm text-gray-200 mb-6'>
                  Start organizing your chaos. Create tasks, track progress, and
                  stay unstoppable.
                </p>

                <button
                  onClick={() => setIsSignup(false)}
                  className='border px-6 py-2 rounded-full hover:bg-white hover:text-blue-900 transition cursor-pointer'
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <h2 className='text-3xl font-bold mb-2'>Welcome Back</h2>
                <p className='text-sm text-gray-200 mb-6'>
                  Already managing your tasks like a pro? Jump back in and stay
                  on track.
                </p>

                <button
                  onClick={() => setIsSignup(true)}
                  className='border px-6 py-2 rounded-full hover:bg-white hover:text-blue-900 transition cursor-pointer'
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>

        {/* MOBILE BOTTOM PANEL */}
        <div className='md:hidden w-full bg-blue-800 text-white p-6 flex flex-col items-center text-center gap-3 rounded-t-2xl shadow-lg'>
          {isSignup ? (
            <>
              <p className='text-sm text-gray-300'>Already have an account?</p>
              <button
                onClick={() => setIsSignup(false)}
                className='border px-6 py-2 rounded-full hover:bg-white hover:text-blue-900 transition'
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              <p className='text-sm text-gray-300'>New here?</p>
              <button
                onClick={() => setIsSignup(true)}
                className='border px-6 py-2 rounded-full hover:bg-white hover:text-blue-900 transition'
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-white text-xl z-30 bg-black/30 hover:bg-black/50 rounded-full px-3 py-1 transition cursor-pointer'
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default AuthModal;

function SocialAuth() {
  return (
    <div className='mt-6'>
      <p className='text-sm mb-2 text-gray-300'>Or continue with</p>

      <div className='flex gap-6'>
        <button className='social-btn'>
          <FontAwesomeIcon icon={faGoogle} className='text-2xl' />
        </button>

        <button className='social-btn'>
          <FontAwesomeIcon icon={faGithub} className='text-2xl' />
        </button>

        <button className='social-btn'>
          <FontAwesomeIcon icon={faLinkedin} className='text-2xl' />
        </button>
      </div>
    </div>
  );
}
