import TaskCardMin from '../components/TaskCardMin.jsx';

function ActiveTask() {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-4xl font-bold underline'>Active Tasks</h1>
      </div>

      <div className='max-w-full py-3 px-4 bg-yellow-400'>
        <h2 className='text-4xl font-semibold mb-5'>Current Date</h2>
        <div className='grid grid-cols-3 gap-y-8 gap-x-6'>
          <TaskCardMin />
          <TaskCardMin />
          <TaskCardMin />
          <TaskCardMin />
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

export default ActiveTask;
