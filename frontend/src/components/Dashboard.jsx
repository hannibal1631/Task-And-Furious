import TaskCardMin from './TaskCardMin.jsx';

function Dashboard() {
  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-4xl font-bold underline'>Dashboard</h1>

      <div className='max-w-full py-3 px-4 bg-yellow-400'>
        <h2 className='text-4xl font-semibold mb-5'>Ongoing Tasks</h2>
        <div className='grid grid-cols-3 gap-y-8 gap-x-6'>
          <TaskCardMin />
          <TaskCardMin />
          <TaskCardMin />
        </div>
      </div>

      <div className='max-w-full py-3 px-4 bg-yellow-400'>
        <h2 className='text-4xl font-semibold mb-5'>Upcoming Tasks</h2>
        <div className='grid grid-cols-3 gap-y-8 gap-x-6'>
          <TaskCardMin />
          <TaskCardMin />
          <TaskCardMin />
          <TaskCardMin />
          <TaskCardMin />
          <TaskCardMin />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
