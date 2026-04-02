import TaskCardMin from './TaskCardMin.jsx';
import { useOutletContext } from 'react-router-dom';

function Dashboard() {
  const { setView } = useOutletContext();

  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-4xl font-bold underline'>Dashboard</h1>

      <div className='max-w-full py-3 px-4 bg-yellow-400'>
        <h2 className='text-4xl font-semibold mb-5'>Ongoing Tasks</h2>
        <div className='grid grid-cols-3 gap-y-8 gap-x-6'>
          <TaskCardMin onOpen={() => setView('max')} />
          <TaskCardMin onOpen={() => setView('max')} />
          <TaskCardMin onOpen={() => setView('max')} />
        </div>
      </div>

      <div className='max-w-full py-3 px-4 bg-yellow-400'>
        <h2 className='text-4xl font-semibold mb-5'>Upcoming Tasks</h2>
        <div className='grid grid-cols-3 gap-y-8 gap-x-6'>
          <TaskCardMin onOpen={() => setView('max')} />
          <TaskCardMin onOpen={() => setView('max')} />
          <TaskCardMin onOpen={() => setView('max')} />
          <TaskCardMin onOpen={() => setView('max')} />
          <TaskCardMin onOpen={() => setView('max')} />
          <TaskCardMin onOpen={() => setView('max')} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
