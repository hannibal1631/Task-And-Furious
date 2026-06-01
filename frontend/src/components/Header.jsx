import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleUser,
  faPalette,
  faBell,
  faMagnifyingGlass,
  faList,
  faUsers,
  faBellSlash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useMode } from '../context/ModeContext.jsx';

function Header() {
  const { logout } = useAuth();
  const { mode, setMode, workspaceId, setWorkspaceId } = useMode();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModeOpen, setIsModeOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  const [workspaces, setWorkspaces] = useState([]);

  const profileRef = useRef(null);
  const modeRef = useRef(null);
  const notificationRef = useRef(null);
  const themeRef = useRef(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // temp hardcoded workspace
  useEffect(() => {
    setWorkspaces([{ _id: 'demo-workspace-1', name: 'My Team' }]);
  }, []);

  // outside click close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }

      if (modeRef.current && !modeRef.current.contains(event.target)) {
        setIsModeOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }

      if (themeRef.current && !themeRef.current.contains(event.target)) {
        setIsThemeOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // close dropdowns on mobile close
  useEffect(() => {
    if (!isMobileMenuOpen) {
      setIsDropdownOpen(false);
      setIsModeOpen(false);
      setIsNotificationOpen(false);
      setIsThemeOpen(false);
    }
  }, [isMobileMenuOpen]);

  return (
    <div className='flex items-center justify-between bg-stone-700 py-4 px-4 md:px-7 relative'>
      {/* LOGO */}
      <NavLink to='/dashboard' className='shrink-0'>
        <img
          src='./hero-logo.png'
          alt='task-and-furious'
          className='w-28 md:w-40'
        />
      </NavLink>

      {/* DESKTOP SEARCH */}
      <div className='hidden md:flex flex-1 justify-center'>
        <div
          className='flex items-center justify-between bg-orange-100 w-full max-w-md gap-2 px-3 py-2 border-2 border-gray-400 rounded-2xl focus-within:border-black transition'
          title='search tasks'
        >
          <input
            type='text'
            placeholder='Search tasks...'
            className='outline-none bg-transparent text-base md:text-xl w-[90%]'
          />

          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className='text-neutral-800 cursor-pointer hover:scale-125 hover:text-slate-500 transition-all ease-in-out'
          />
        </div>
      </div>

      {/* DESKTOP ACTIONS */}
      <div className='hidden md:flex items-center gap-4'>
        {/* MODE SWITCH */}
        <div className='relative' title='Switch Mode' ref={modeRef}>
          <FontAwesomeIcon
            icon={faUsers}
            onClick={() => setIsModeOpen((prev) => !prev)}
            className={`lg:text-3xl text-2xl cursor-pointer transition ${
              mode === 'team' ? 'text-green-400' : 'hover:text-orange-100'
            }`}
          />

          {isModeOpen && (
            <div className='absolute right-0 mt-3 w-56 bg-slate-700 text-orange-100 rounded-lg overflow-hidden shadow-lg z-50'>
              <div className='flex flex-col'>
                {/* PERSONAL */}
                <div
                  onClick={() => {
                    setMode('personal');
                    setWorkspaceId(null);
                    setIsModeOpen(false);
                  }}
                  className={`px-4 py-2 cursor-pointer hover:text-orange-200 hover:tracking-wider transition-all ease-in-out ${
                    mode === 'personal' ? 'font-semibold text-orange-300' : ''
                  }`}
                >
                  Personal
                </div>

                {/* WORKSPACES */}
                {workspaces.map((ws) => (
                  <div
                    key={ws._id}
                    onClick={() => {
                      setMode('team');
                      setWorkspaceId(ws._id);
                      setIsModeOpen(false);
                    }}
                    className={`px-4 py-2 cursor-pointer hover:text-orange-200 hover:tracking-wider transition-all ease-in-out ${
                      workspaceId === ws._id
                        ? 'text-orange-300 font-semibold'
                        : ''
                    }`}
                  >
                    {ws.name}
                  </div>
                ))}

                {/* ACTIONS */}
                <div className='px-4 py-2 text-green-400 cursor-pointer hover:text-orange-200 hover:tracking-wider transition-all ease-in-out'>
                  + Create Workspace
                </div>

                <div className='px-4 py-2 text-green-400 cursor-pointer hover:text-orange-200 hover:tracking-wider transition-all ease-in-out'>
                  + Join Workspace
                </div>
              </div>
            </div>
          )}
        </div>

        {/* NOTIFICATIONS */}
        <div title='Notifications' className='relative' ref={notificationRef}>
          <FontAwesomeIcon
            icon={faBell}
            onClick={() => setIsNotificationOpen((prev) => !prev)}
            className='lg:text-3xl text-2xl cursor-pointer hover:text-orange-100'
          />

          {isNotificationOpen && (
            <div
              className='absolute right-0 mt-3
              w-70 sm:w-[320px]
            bg-slate-700 text-orange-100
              rounded-lg shadow-lg z-50 overflow-hidden'
            >
              {/* Header */}
              <div className='flex items-center justify-between px-4 py-3 border-b border-slate-600'>
                <h3 className='font-semibold text-lg'>Notifications</h3>

                <button
                  onClick={() => setIsNotificationOpen(false)}
                  className='text-xl hover:text-red-400 transition'
                >
                  <FontAwesomeIcon icon={faXmark} className='cursor-pointer' />
                </button>
              </div>

              {/* Empty State */}
              <div className='flex flex-col items-center justify-center py-10 px-4 text-center'>
                {/* Put your FontAwesome icon here */}
                <div className='text-4xl mb-3'>
                  <FontAwesomeIcon icon={faBellSlash} />
                </div>

                <p className='text-sm sm:text-base text-orange-100'>
                  No tasks for now
                </p>
              </div>
            </div>
          )}
        </div>

        {/* THEME */}
        <div title='Change Theme' className='relative' ref={themeRef}>
          <FontAwesomeIcon
            icon={faPalette}
            onClick={() => setIsThemeOpen((prev) => !prev)}
            className='lg:text-3xl text-2xl cursor-pointer hover:text-orange-100'
          />

          {isThemeOpen && (
            <div
              className='absolute right-0 mt-3 w-64
      bg-slate-700 text-orange-100
      rounded-lg shadow-lg z-50 overflow-hidden'
            >
              {/* Header */}
              <div className='flex items-center justify-between px-4 py-3 border-b border-slate-600'>
                <h3 className='font-semibold text-lg'>Themes</h3>

                <button
                  onClick={() => setIsThemeOpen(false)}
                  className='text-xl hover:text-red-400 transition'
                >
                  <FontAwesomeIcon icon={faXmark} className='cursor-pointer' />
                </button>
              </div>

              {/* Theme List */}
              <div className='p-3 flex flex-col gap-2'>
                {/* Chalkboard */}
                <div
                  className='px-3 py-2 rounded-lg cursor-pointer
                  transition-all duration-200
                hover:bg-neutral-800 hover:text-orange-100'
                >
                  Classic Chalkboard
                </div>

                {/* Blue */}
                <div
                  className='px-3 py-2 rounded-lg cursor-pointer
                  transition-all duration-200
                hover:bg-blue-950 hover:text-yellow-300'
                >
                  Oldschool Blue
                </div>

                {/* Fallout */}
                <div
                  className='px-3 py-2 rounded-lg cursor-pointer
                  transition-all duration-200
                hover:bg-green-950 hover:text-green-400'
                >
                  Fallout Green
                </div>

                {/* Comic */}
                <div
                  className='px-3 py-2 rounded-lg cursor-pointer
                  transition-all duration-200
                hover:bg-blue-900 hover:text-red-500'
                >
                  Comicbook
                </div>
              </div>
            </div>
          )}
        </div>

        {/* PROFILE */}
        <div className='relative' title='User Profile' ref={profileRef}>
          <FontAwesomeIcon
            icon={faCircleUser}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className='lg:text-3xl text-2xl cursor-pointer hover:text-orange-100'
          />

          {isDropdownOpen && (
            <div className='absolute right-0 mt-3 w-48 bg-slate-700 text-white rounded-lg overflow-hidden shadow-lg z-50'>
              <ul className='flex flex-col text-sm'>
                <li className='px-4 py-2 hover:text-orange-200 hover:tracking-wider transition-all ease-in-out cursor-pointer'>
                  User Settings
                </li>

                <li
                  onClick={handleLogout}
                  className='px-4 py-2 hover:text-red-500 hover:tracking-wider transition-all ease-in-out cursor-pointer'
                >
                  Sign Out
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE MENU BUTTON */}
      <div className='md:hidden'>
        <FontAwesomeIcon
          icon={faList}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className='text-2xl cursor-pointer'
        />
      </div>
    </div>
  );
}

export default Header;
