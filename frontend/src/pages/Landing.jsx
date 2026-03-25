import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../components/AuthModal.jsx';

function Landing({ setIsAuthenticated }) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const navigate = useNavigate();

  const openLogin = () => {
    setAuthMode('login');
    setIsAuthOpen(true);
  };

  const openSignup = () => {
    setAuthMode('signup');
    setIsAuthOpen(true);
  };

  return (
    <main className='bg-[#0b1120] text-white min-h-screen overflow-x-hidden'>
      {/* NAVBAR */}
      <nav className='flex justify-between items-center px-6 md:px-12 py-5'>
        <h1 className='text-2xl md:text-3xl font-bold tracking-wide text-cyan-400'>
          Task & Furious
        </h1>

        <div className='flex gap-4'>
          <button
            onClick={openLogin}
            className='px-4 py-2 border border-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black transition'
          >
            Login
          </button>
          <button
            onClick={openSignup}
            className='px-4 py-2 bg-cyan-400 text-black rounded-full hover:bg-cyan-300 transition'
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className='flex flex-col items-center text-center px-6 mt-12 md:mt-20'>
        <h2 className='text-4xl md:text-6xl font-bold leading-tight max-w-4xl'>
          Manage Tasks Like a <span className='text-cyan-400'>Machine</span>
        </h2>

        <p className='mt-6 text-gray-400 max-w-2xl text-lg'>
          Organize, track, and dominate your workflow with a fast, minimal and
          powerful task management system.
        </p>

        <div className='flex gap-4 mt-8'>
          <button
            onClick={openSignup}
            className='px-6 py-3 bg-cyan-400 text-black rounded-full text-lg hover:bg-cyan-300 transition'
          >
            Get Started
          </button>

          <button
            onClick={openLogin}
            className='px-6 py-3 border border-cyan-400 rounded-full text-lg hover:bg-cyan-400 hover:text-black transition'
          >
            Login
          </button>
        </div>

        {/* HERO IMAGE */}
        <div className='mt-12 w-full max-w-5xl'>
          <img
            src='https://via.placeholder.com/1200x600'
            alt='dashboard preview'
            className='rounded-xl border border-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.3)]'
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className='mt-20 px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center'>
        <Feature
          title='Dashboard Overview'
          desc='Get a quick snapshot of all your tasks and progress in one place.'
          route='/dashboard'
          img='https://via.placeholder.com/600x400'
          navigate={navigate}
        />

        <Feature
          title='Organize by Categories'
          desc='Group your tasks smartly and keep everything structured.'
          route='/dashboard/categories'
          img='https://via.placeholder.com/600x400'
          navigate={navigate}
          reverse
        />

        <Feature
          title='Track Active Tasks'
          desc='Focus on what matters right now with active task tracking.'
          route='/dashboard/active'
          img='https://via.placeholder.com/600x400'
          navigate={navigate}
        />

        <Feature
          title='Plan Ahead'
          desc='Stay ahead with upcoming tasks and deadlines.'
          route='/dashboard/upcoming'
          img='https://via.placeholder.com/600x400'
          navigate={navigate}
          reverse
        />

        <Feature
          title='Review Completed Work'
          desc='Track your productivity and completed milestones.'
          route='/dashboard/completed'
          img='https://via.placeholder.com/600x400'
          navigate={navigate}
        />

        <Feature
          title='Analyze Failures'
          desc='Learn from missed tasks and improve your workflow.'
          route='/dashboard/failed-task'
          img='https://via.placeholder.com/600x400'
          navigate={navigate}
          reverse
        />
      </section>

      {/* CTA */}
      <section className='mt-24 text-center px-6'>
        <h2 className='text-3xl md:text-5xl font-bold'>
          Ready to Take Control?
        </h2>

        <p className='text-gray-400 mt-4'>Start organizing your tasks today.</p>

        <button
          onClick={openSignup}
          className='mt-8 px-8 py-3 bg-cyan-400 text-black rounded-full text-lg hover:bg-cyan-300 transition'
        >
          Create Account
        </button>
      </section>

      {/* FOOTER */}
      <footer className='mt-20 py-6 text-center text-gray-500 text-sm'>
        © {new Date().getFullYear()} Task & Furious. All rights reserved.
      </footer>

      {/* AUTH MODAL */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        mode={authMode}
        setIsAuthenticated={setIsAuthenticated}
      />
    </main>
  );
}

export default Landing;

/* FEATURE COMPONENT */
function Feature({ title, desc, route, img, navigate, reverse }) {
  return (
    <div
      className={`flex flex-col md:flex-row ${
        reverse ? 'md:flex-row-reverse' : ''
      } items-center gap-6`}
    >
      <img
        src={img}
        alt={title}
        className='w-full md:w-1/2 rounded-xl border border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.25)]'
      />

      <div className='md:w-1/2'>
        <h3 className='text-2xl md:text-3xl font-bold mb-3 text-cyan-400'>
          {title}
        </h3>

        <p className='text-gray-400 mb-4'>{desc}</p>

        <button
          onClick={() => navigate(route)}
          className='px-5 py-2 border border-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black transition'
        >
          View Feature
        </button>
      </div>
    </div>
  );
}
