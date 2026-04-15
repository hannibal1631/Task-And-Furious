import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleUser,
  faPalette,
  faBell,
  faMagnifyingGlass,
  faMap,
  faList,
  faAlarmClock,
  faCalendarCheck,
  faTriangleExclamation,
  faChartLine,
  faGears,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import CardModal from './CardModal.jsx';
import TaskCardMax from './TaskCardMax.jsx';
import TaskCardEdit from './TaskCardEdit.jsx';
import AddTaskBtn from './AddTaskBtn.jsx';
import ProgressTrackerBtn from './ProgressTrackerBtn.jsx';
import axios from 'axios';
import API_BASE_URL from '../config/api.js';

function Layout() {
  const { user } = useAuth();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [view, setView] = useState(null); //null | "max" | "edit"
  const [categories, setCategories] = useState([]);
  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null)

  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // fetching existing/default categories from backend server
  useEffect(() => {
    const fetchCategories = async () => {
      if (!user?._id) return;

      try {
        const defaultRes = await axios.get(
          `${API_BASE_URL}/categories/default`,
        );

        const userRes = await axios.get(
          `${API_BASE_URL}/categories/${user._id}`,
        );

        const merged = [
          ...(defaultRes.data?.data || []),
          ...(userRes.data?.data || []),
        ];

        // remove duplicates
        const uniqueMap = new Map();
        merged.forEach((cat) => uniqueMap.set(cat._id, cat));

        const formatted = Array.from(uniqueMap.values()).map((cat) => ({
          value: cat._id,
          label: cat.categoryName,
        }));

        setCategories(formatted);
      } catch (err) {
        console.error('Failed to fetch categories', err);
      }
    };

    fetchCategories();
  }, [user]);

  return (
    <main>
      <div className='bg-blue-900 h-screen max-w-full flex flex-col overflow-hidden'>
        {/* HEADER */}
        <div className='flex items-center justify-between bg-yellow-300 py-4 px-4 md:px-7 relative'>
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
              className='flex items-center justify-between bg-white w-full max-w-md gap-2 px-3 py-2 border-2 border-gray-400 rounded-2xl focus-within:border-black transition'
              title='search tasks'
            >
              <input
                type='text'
                placeholder='Search tasks...'
                className='outline-none bg-transparent text-base md:text-xl w-[90%]'
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className='text-gray-500 cursor-pointer'
              />
            </div>
          </div>

          {/* DESKTOP ACTIONS */}
          <div className='hidden md:flex items-center gap-4'>
            <FontAwesomeIcon
              icon={faBell}
              className='lg:text-4xl text-2xl hover:cursor-pointer hover:text-white'
            />
            <FontAwesomeIcon
              icon={faPalette}
              className='lg:text-4xl text-2xl hover:cursor-pointer hover:text-white'
            />

            {/* PROFILE */}
            <div className='relative' title='user profile'>
              <FontAwesomeIcon
                icon={faCircleUser}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className='lg:text-4xl text-2xl cursor-pointer hover:text-white'
              />

              {isDropdownOpen && (
                <div className='absolute right-0 mt-3 w-48 bg-blue-800 text-white rounded-lg shadow-lg z-50'>
                  <ul className='flex flex-col text-sm'>
                    <li className='px-4 py-2 hover:bg-blue-700 cursor-pointer'>
                      User Settings
                    </li>

                    <li
                      onClick={handleLogout}
                      className='px-4 py-2 hover:bg-red-500 cursor-pointer'
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

          {/* MOBILE PANEL */}
          {isMobileMenuOpen && (
            <div className='absolute top-full left-0 w-full bg-yellow-200 p-4 flex flex-col gap-4 md:hidden z-50'>
              {/* SEARCH */}
              <div className='flex items-center bg-white gap-2 px-3 py-2 border-2 border-gray-400 rounded-2xl'>
                <input
                  type='text'
                  placeholder='Search tasks...'
                  className='outline-none bg-transparent w-full'
                />
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </div>

              {/* ICONS */}
              <div className='flex justify-around items-center'>
                <FontAwesomeIcon icon={faBell} className='text-xl' />
                <FontAwesomeIcon icon={faPalette} className='text-xl' />

                {/* PROFILE */}
                <div className='relative'>
                  <FontAwesomeIcon
                    icon={faCircleUser}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className='text-xl cursor-pointer'
                  />

                  {isDropdownOpen && (
                    <div className='absolute right-0 mt-2 w-40 bg-blue-800 text-white rounded-lg shadow-lg z-50'>
                      <ul className='flex flex-col text-sm'>
                        <li className='px-4 py-2 hover:bg-blue-700 cursor-pointer'>
                          User Settings
                        </li>

                        <li
                          onClick={handleLogout}
                          className='px-4 py-2 hover:bg-red-500 cursor-pointer'
                        >
                          Sign Out
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* BODY */}
        <div className='flex flex-1 items-stretch gap-6 bg-red-500 py-4 px-7 overflow-hidden'>
          {/* SIDEBAR */}
          <div className='flex flex-col w-[5%] justify-between items-center bg-blue-600 px-8 py-6 rounded-xl'>
            <div className='flex flex-col gap-6'>
              <NavLink to='/dashboard' title='dashboard'>
                <FontAwesomeIcon
                  icon={faMap}
                  className='lg:text-3xl text-xl hover:text-white'
                />
              </NavLink>

              <NavLink to='/dashboard/categories' title='categories'>
                <FontAwesomeIcon
                  icon={faList}
                  className='lg:text-3xl text-xl hover:text-white'
                />
              </NavLink>

              <NavLink to='/dashboard/active' title='active tasks'>
                <FontAwesomeIcon
                  icon={faChartLine}
                  className='lg:text-3xl text-xl hover:text-white'
                />
              </NavLink>

              <NavLink to='/dashboard/upcoming' title='upcoming tasks'>
                <FontAwesomeIcon
                  icon={faAlarmClock}
                  className='lg:text-3xl text-xl hover:text-white'
                />
              </NavLink>

              <NavLink to='/dashboard/completed' title='completed tasks'>
                <FontAwesomeIcon
                  icon={faCalendarCheck}
                  className='lg:text-3xl text-xl hover:text-white'
                />
              </NavLink>

              <NavLink to='/dashboard/failed-task' title='failed tasks'>
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  className='lg:text-3xl text-xl hover:text-white'
                />
              </NavLink>
            </div>

            <NavLink to='/dashboard/settings' title='settings'>
              <FontAwesomeIcon
                icon={faGears}
                className='lg:text-3xl text-xl hover:text-white'
              />
            </NavLink>
          </div>

          {/* MAIN CONTENT */}
          <div className='relative flex flex-col w-[95%] px-8 py-6 bg-blue-600 rounded-xl overflow-y-auto no-scrollbar'>
            {/* <Outlet context={{ setView }} /> */}
            <div className='flex-1 overflow-y-auto no-scrollbar px-8 py-6 pb-24'>
              <Outlet context={{ setView, categories, setCategories, setSelectedTask }} />
            </div>

            {/* progress tracker button */}
            <ProgressTrackerBtn
              isOpen={isProgressOpen}
              toggle={() => setIsProgressOpen((prev) => !prev)}
            />

            {/* floating add new task button */}
            <AddTaskBtn onClick={() => setView('edit')} />
          </div>
        </div>
      </div>

      {/* card modal */}
      <CardModal isOpen={view !== null} onClose={() => setView(null)}>
        {view === 'max' && (
          <TaskCardMax
            task={selectedTask}
            onEdit={() => setView('edit')}
            onClose={() => setView(null)}
          />
        )}

        {view === 'edit' && (
          <TaskCardEdit onClose={() => setView(null)} categories={categories} task={selectedTask} />
        )}
      </CardModal>
    </main>
  );
}

export default Layout;
