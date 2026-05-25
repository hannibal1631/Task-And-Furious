import { Outlet } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import CardModal from './CardModal.jsx';
import TaskCardMax from './TaskCardMax.jsx';
import TaskCardEdit from './TaskCardEdit.jsx';
import AddTaskBtn from './AddTaskBtn.jsx';
import ProgressTrackerBtn from './ProgressTrackerBtn.jsx';
import axios from 'axios';
import API_BASE_URL from '../config/api.js';
import Header from './Header.jsx';

// mode imports
import { useMode } from '../context/ModeContext.jsx';
import Sidebar from './Sidebar.jsx';

function Layout() {
  const { user } = useAuth();
  const { mode, setMode, workspaceId, setWorkspaceId } = useMode();

  const [view, setView] = useState(null); //null | "max" | "edit"
  const [categories, setCategories] = useState([]);
  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModeOpen, setIsModeOpen] = useState(false);
  const profileRef = useRef(null);
  const modeRef = useRef(null);

  // fetching existing/default categories from backend server
  useEffect(() => {
    const fetchCategories = async () => {
      if (!user?._id) return;
      if (mode === 'team' && !workspaceId) return;

      try {
        const defaultRes = await axios.get(
          `${API_BASE_URL}/categories/default`,
        );

        const userRes =
          mode === 'personal'
            ? await axios.get(`${API_BASE_URL}/categories/${user._id}`)
            : await axios.get(
                `${API_BASE_URL}/categories/team/${workspaceId}/${user._id}`,
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
  }, [user, mode, workspaceId]);

  // outside click handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      // close profile dropdown
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }

      // close workspace dropdown
      if (modeRef.current && !modeRef.current.contains(event.target)) {
        setIsModeOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // close every dropdown upon menu closing
  useEffect(() => {
    if (!isMobileMenuOpen) {
      setIsDropdownOpen(false);
      setIsModeOpen(false);
    }
  }, [isMobileMenuOpen]);

  return (
    <main>
      <div className='bg-neutral-900 h-screen max-w-full flex flex-col overflow-hidden text-neutral-900'>
        {/* HEADER */}
        <Header />
        {/* header ends here */}

        {/* BODY */}
        <div className='flex flex-1 items-stretch gap-4 bg-stone-700 py-4 px-7 overflow-hidden'>
          {/* SIDEBAR */}
          <Sidebar />
          {/* SIDEBAR ENDS HERE */}

          {/* MAIN CONTENT */}
          <div className='relative flex flex-col w-[97%] md:px-8 md:py-6 px-1 py-1 bg-neutral-500 rounded-xl overflow-y-auto no-scrollbar'>
            {/* <Outlet context={{ setView }} /> */}
            <div className='flex-1 overflow-y-auto no-scrollbar px-8 py-6 sm:p-0 pb-24'>
              <Outlet
                context={{
                  setView,
                  categories,
                  setCategories,
                  setSelectedTask,
                }}
              />
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
          <TaskCardEdit
            onClose={() => setView(null)}
            categories={categories}
            task={selectedTask}
          />
        )}
      </CardModal>
    </main>
  );
}

export default Layout;
