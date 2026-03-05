import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
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

function Layout() {
  return (
    <main>
      <div className='bg-blue-900 h-screen max-w-full flex flex-col overflow-hidden'>
        {/* HEADER */}
        <div className='flex items-center bg-yellow-300 py-4 px-7'>
          <div className='shrink-0'>
            <img
              src='./hero-logo.png'
              alt='task-and-furious'
              className='w-40 h-25'
            />
          </div>
          <div className='flex-1 flex justify-center'>
            <div className='flex items-center justify-between bg-white w-100 gap-2 px-3 py-2 border-2 border-gray-400 rounded-2xl focus-within:border-black transition'>
              <input
                type='text'
                placeholder='Search tasks...'
                className='outline-none bg-transparent text-xl w-[90%]'
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className='text-gray-500 text-lg cursor-pointer'
              />
            </div>
          </div>
          <div className='flex shrink-0 items-center gap-4'>
            <FontAwesomeIcon
              icon={faBell}
              className='lg:text-4xl text-2xl hover:cursor-pointer hover:text-white'
            />
            <FontAwesomeIcon
              icon={faPalette}
              className='lg:text-4xl text-2xl hover:cursor-pointer hover:text-white'
            />
            <FontAwesomeIcon
              icon={faCircleUser}
              className='lg:text-4xl text-2xl hover:cursor-pointer hover:text-white'
            />
          </div>
        </div>

        {/* BODY */}
        <div className='flex flex-1 items-stretch gap-6 bg-red-500 py-4 px-7 overflow-hidden'>
          {/* Sidebar */}
          <div className='flex flex-col w-[5%] justify-between items-center bg-blue-600 px-8 py-6 rounded-xl'>
            <div className='flex flex-col gap-6'>
              <NavLink to='/'>
                <FontAwesomeIcon
                  icon={faMap}
                  className='lg:text-3xl text-xl hover:cursor-pointer hover:text-white'
                />
              </NavLink>
              <NavLink to='/categories'>
                <FontAwesomeIcon
                  icon={faList}
                  className='lg:text-3xl text-xl hover:cursor-pointer hover:text-white'
                />
              </NavLink>

              <NavLink to='/active'>
                <FontAwesomeIcon
                  icon={faChartLine}
                  className='lg:text-3xl text-xl hover:cursor-pointer hover:text-white'
                />
              </NavLink>

              <NavLink to='/upcoming'>
                <FontAwesomeIcon
                  icon={faAlarmClock}
                  className='lg:text-3xl text-xl hover:cursor-pointer hover:text-white'
                />
              </NavLink>

              <NavLink to='/completed'>
                <FontAwesomeIcon
                  icon={faCalendarCheck}
                  className='lg:text-3xl text-xl hover:cursor-pointer hover:text-white'
                />
              </NavLink>

              <NavLink to='/failed-task'>
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  className='lg:text-3xl text-xl hover:cursor-pointer hover:text-white'
                />
              </NavLink>
            </div>
            <div className=''>
              <FontAwesomeIcon
                icon={faGears}
                className='lg:text-3xl text-xl hover:cursor-pointer hover:text-white'
              />
            </div>
          </div>

          {/* THIS IS WHERE PAGES CHANGE */}
          <div className='flex flex-col w-[80%] px-8 py-6 bg-blue-600 rounded-xl overflow-y-auto no-scrollbar'>
            <Outlet />
          </div>

          {/* Progress Tracker */}
          <div className='flex flex-col w-[15%] gap-5 bg-blue-600 px-8 py-6 rounded-xl'>
            <h1 className='text-3xl font-bold underline'>Progress Tracker</h1>
            <div className='py-4 px-2 bg-sky-500 rounded-xl'>
              <h2 className='text-2xl mb-3 font-semibold'>Upcoming Task</h2>
              <p className='text-xl'>10</p>
            </div>
            <div className='py-4 px-2 bg-sky-500 rounded-xl'>
              <h2 className='text-2xl mb-3 font-semibold'>Ongoing Task</h2>
              <p className='text-xl'>10</p>
            </div>
            <div className='py-4 px-2 bg-sky-500 rounded-xl'>
              <h2 className='text-2xl mb-3 font-semibold'>Completed Task</h2>
              <p className='text-xl'>10</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Layout;
