import TaskCardMin from './TaskCardMin.jsx';
import { useOutletContext } from 'react-router-dom';
import { useTasks } from '../context/TaskContext.jsx';

function Dashboard() {
  const { setView, setSelectedTask } = useOutletContext();
  const { tasks, loading, getTaskDateTime } = useTasks();

  // current time
  const now = new Date();

  const todayISO = now.toLocaleDateString('en-CA');

  // ongoing tasks
  // Only pending tasks scheduled for today and not yet passed
  const ongoingTasks = tasks.filter((task) => {
    if (task.status !== 'pending') return false;

    const taskDateTime = getTaskDateTime(task);

    if (!taskDateTime) return false;

    const taskISO = taskDateTime.toLocaleDateString('en-CA');

    // must be today
    if (taskISO !== todayISO) return false;

    // must not have passed
    return taskDateTime >= now;
  });

  // upcoming tasks
  // Pending tasks scheduled from tomorrow onward
  const upcomingTasks = tasks.filter((task) => {
    if (task.status !== 'pending') return false;

    const taskDateTime = getTaskDateTime(task);

    if (!taskDateTime) return false;

    const taskISO = taskDateTime.toLocaleDateString('en-CA');

    // anything after today
    return taskISO > todayISO;
  });

  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-xl md:text-4xl font-bold underline'>Dashboard</h1>

      {/* ongoing tasks */}
      <div className='max-w-full py-3 px-3 bg-neutral-800 text-orange-100 rounded-xl'>
        <h2 className='text-xl md:text-4xl font-semibold mb-1 md:mb-5'>
          Ongoing Tasks
        </h2>
        <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-y-2 md:gap-y-4 gap-x-4'>
          {loading ? (
            <p>Loading...</p>
          ) : ongoingTasks.length === 0 ? (
            <p>No ongoing tasks</p>
          ) : (
            ongoingTasks.map((task) => (
              <TaskCardMin
                key={task._id}
                task={task}
                setSelectedTask={setSelectedTask}
                onOpen={() => setView('max')}
              />
            ))
          )}
        </div>
      </div>

      {/* upcoming tasks */}
      <div className='max-w-full py-3 px-3 bg-neutral-800 text-orange-100 rounded-xl'>
        <h2 className='text-xl md:text-4xl font-semibold mb-1 md:mb-5'>
          Upcoming Tasks
        </h2>
        <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-y-2 md:gap-y-4 gap-x-4'>
          {loading ? (
            <p>Loading...</p>
          ) : upcomingTasks.length === 0 ? (
            <p>No upcoming tasks</p>
          ) : (
            upcomingTasks.map((task) => (
              <TaskCardMin
                key={task._id}
                task={task}
                setSelectedTask={setSelectedTask}
                onOpen={() => setView('max')}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
