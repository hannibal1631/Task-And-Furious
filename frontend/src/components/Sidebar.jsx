import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMap,
  faList,
  faAlarmClock,
  faCalendarCheck,
  faTriangleExclamation,
  faChartLine,
  faGears,
} from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  return (
    <div className='flex flex-col w-[3%] justify-between items-center bg-neutral-500 px-8 py-6 rounded-xl'>
      <div className='flex flex-col gap-6'>
        <NavLink to='/dashboard' title='dashboard'>
          <FontAwesomeIcon
            icon={faMap}
            className='lg:text-3xl text-xl hover:text-orange-100 transition-all ease-in-out'
          />
        </NavLink>

        <NavLink to='/dashboard/categories' title='categories'>
          <FontAwesomeIcon
            icon={faList}
            className='lg:text-3xl text-xl hover:text-orange-100 transition-all ease-in-out'
          />
        </NavLink>

        <NavLink to='/dashboard/active' title='active tasks'>
          <FontAwesomeIcon
            icon={faChartLine}
            className='lg:text-3xl text-xl hover:text-orange-100 transition-all ease-in-out'
          />
        </NavLink>

        <NavLink to='/dashboard/upcoming' title='upcoming tasks'>
          <FontAwesomeIcon
            icon={faAlarmClock}
            className='lg:text-3xl text-xl hover:text-orange-100 transition-all ease-in-out'
          />
        </NavLink>

        <NavLink to='/dashboard/completed' title='completed tasks'>
          <FontAwesomeIcon
            icon={faCalendarCheck}
            className='lg:text-3xl text-xl hover:text-orange-100 transition-all ease-in-out'
          />
        </NavLink>

        <NavLink to='/dashboard/failed-task' title='failed tasks'>
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className='lg:text-3xl text-xl hover:text-orange-100 transition-all ease-in-out'
          />
        </NavLink>
      </div>

      <NavLink to='/dashboard/settings' title='settings'>
        <FontAwesomeIcon
          icon={faGears}
          className='lg:text-3xl text-xl hover:text-orange-100 transition-all ease-in-out'
        />
      </NavLink>
    </div>
  );
}

export default Sidebar;
