import { useState, useEffect } from 'react';
import Login from '../pages/Login.jsx'
import Signup from '../pages/Signup.jsx'

function AuthModal({ isOpen, onClose, mode, setIsAuthenticated }) {
  const [isSignup, setIsSignup] = useState(mode === 'signup');

  useEffect(() => {
    setIsSignup(mode === 'signup');
  }, [mode]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 px-4 backdrop-blur-md bg-blue-800/80'>
      <div className='relative w-full max-w-4xl h-[70vh] md:h-150 bg-blue-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:block'>
        {/* CONTENT */}
        <div
          className={`
    flex flex-col md:flex-row h-full relative z-10
    ${isSignup ? 'md:justify-end' : 'md:justify-start'}
  `}
        >
          {isSignup ? (
            <Signup setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <Login setIsAuthenticated={setIsAuthenticated} />
          )}
        </div>

        {/* DESKTOP SLIDER PANEL */}
        <div
          className={`
            hidden md:flex absolute top-0 w-1/2 h-full flex-col items-center justify-center
            bg-linear-to-br from-blue-800 to-blue-600 text-white z-20
            transition-all duration-700 ease-in-out text-center px-6
            ${isSignup ? 'left-0' : 'left-1/2'}
          `}
        >
          {isSignup ? (
            <>
              <h2 className='text-3xl font-bold mb-2'>Hello, New Here?</h2>
              <p className='text-sm text-gray-200 mb-6'>
                Start organizing your chaos.
              </p>

              <button
                onClick={() => setIsSignup(false)}
                className='border px-6 py-2 rounded-full hover:bg-white hover:text-blue-900 transition'
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              <h2 className='text-3xl font-bold mb-2'>Welcome Back</h2>
              <p className='text-sm text-gray-200 mb-6'>
                Jump back in and stay on track.
              </p>

              <button
                onClick={() => setIsSignup(true)}
                className='border px-6 py-2 rounded-full hover:bg-white hover:text-blue-900 transition'
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* MOBILE SWITCH */}
        <div className='md:hidden w-full bg-blue-800 text-white p-6 flex flex-col items-center text-center gap-3'>
          {isSignup ? (
            <>
              <p className='text-sm text-gray-300'>Already have an account?</p>
              <button
                onClick={() => setIsSignup(false)}
                className='border px-6 py-2 rounded-full'
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              <p className='text-sm text-gray-300'>New here?</p>
              <button
                onClick={() => setIsSignup(true)}
                className='border px-6 py-2 rounded-full'
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* CLOSE */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-white text-xl z-30 bg-black/30 hover:bg-black/50 rounded-full px-3 py-1'
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default AuthModal;
