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

  const features = [
    {
      title: 'Mission Control Dashboard',
      desc: 'Your command center for active tasks, upcoming deadlines, completed missions and spectacular failures.',
      img: 'https://via.placeholder.com/1200x700',
    },
    {
      title: 'Sort The Chaos',
      desc: "Group tasks into categories before your backlog starts looking like Dom's garage.",
      img: 'https://via.placeholder.com/1200x700',
    },
    {
      title: 'Quarter Mile At A Time',
      desc: 'Focus only on what matters right now. Active tasks stay front and center.',
      img: 'https://via.placeholder.com/1200x700',
    },
    {
      title: 'See The Next Corner',
      desc: 'Upcoming tasks help you spot deadlines before they drift around the corner.',
      img: 'https://via.placeholder.com/1200x700',
    },
    {
      title: 'Assemble Your Crew',
      desc: 'Switch between personal mode and team workspaces. Family... but with task assignments.',
      img: 'https://via.placeholder.com/1200x700',
    },
    {
      title: 'Tune The Ride',
      desc: 'Choose from Chalkboard, Fallout Green, Comicbook, and more themes.',
      img: 'https://via.placeholder.com/1200x700',
    },
    {
      title: 'Victory Lap',
      desc: 'Review completed tasks and watch your productivity stats pile up.',
      img: 'https://via.placeholder.com/1200x700',
    },
    {
      title: 'Learn From The Crash',
      desc: 'Failed tasks show what slipped through the cracks so you can improve.',
      img: 'https://via.placeholder.com/1200x700',
    },
  ];

  return (
    <main className='bg-[#0b1120] text-white min-h-screen overflow-x-hidden'>
      {/* NAVBAR */}
      <nav className='flex justify-between items-center px-6 md:px-16 py-6'>
        <h1 className='text-2xl md:text-3xl font-bold tracking-wide text-cyan-400'>
          Task & Furious
        </h1>

        <div className='flex gap-4'>
          <button
            onClick={openLogin}
            className='cursor-pointer px-5 py-2 border border-orange-100 rounded-full hover:bg-orange-100
             hover:text-stone-700 transition'
          >
            Login
          </button>
          <button
            onClick={openSignup}
            className='cursor-pointer px-5 py-2 bg-orange-100 text-stone-700
              rounded-full hover:bg-neutral-500 transition"'
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className='px-6 lg:px-16 py-16 flex flex-col items-center text-center'>
        <h2 className='text-5xl lg:text-7xl font-bold max-w-5xl leading-tight'>
          Manage Tasks Like You're Planning The Next Big Heist
        </h2>

        <p className='mt-6 text-lg lg:text-xl max-w-3xl text-neutral-300'>
          Build projects. Organize life. Coordinate teams. Stay ahead of
          deadlines before they start chasing you.
        </p>

        <div className='flex flex-wrap justify-center gap-4 mt-10'>
          <button
            onClick={openSignup}
            className='cursor-pointer px-8 py-3 bg-orange-100 text-stone-700
            rounded-full font-semibold hover:bg-neutral-500 transition'
          >
            Start Your Engine
          </button>
          <button
            onClick={openLogin}
            className='cursor-pointer px-8 py-3 border border-orange-100 
            rounded-full hover:bg-orange-100 hover:text-stone-700 transition'
          >
            Login
          </button>
        </div>

        {/* HERO IMAGE */}
        <div className='mt-14 w-full max-w-6xl'>
          <img
            src='https://via.placeholder.com/1200x600'
            alt='dashboard preview'
            className='w-full rounded-2xl border-4 border-neutral-500'
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className='px-6 lg:px-16 py-12 flex flex-col gap-24'>
        {features.map((feature, index) => (
          <Feature key={index} {...feature} />
        ))}
      </section>

      {/* CTA */}
      <section className='px-6 lg:px-16 py-24 text-center'>
        <h2 className='text-4xl lg:text-6xl font-bold'>
          Ready To Stop Managing Tasks Like It's 2005?
        </h2>
        <p className='mt-6 text-neutral-300 text-lg max-w-3xl mx-auto'>
          Whether you're running solo or leading a crew, Task & Furious keeps
          everything moving at full throttle.
        </p>
        <button
          onClick={openSignup}
          className='cursor-pointer mt-10 px-10 py-4 bg-orange-100 text-stone-700
          rounded-full text-lg font-semibold hover:bg-neutral-500 transition'
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
