import { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useOutletContext } from 'react-router-dom';
import axios, { all } from 'axios';
import API_BASE_URL from '../config/api.js';
import { useAuth } from '../context/AuthContext.jsx';

import TaskCardMin from '../components/TaskCardMin.jsx';

function Categories() {
  const { setView, categories, setCategories, setSelectedTask } = useOutletContext();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [allTasks, setAllTasks] = useState([])

  // to fetch tasks 
  useEffect(() => {
    const fetchTasks = async () => {
      if (!user?._id) return;

      setLoadingTasks(true);

      try {
        const res = await axios.get(`${API_BASE_URL}/tasks/user/${user._id}`);
        setAllTasks(res.data?.data || []);
      } catch (err) {
        console.error('Failed to fetch tasks', err);
      } finally {
        setLoadingTasks(false);
      }
    };

    fetchTasks();
  }, [user]);

  // showing tasks when category changes
  useEffect(() => {
    if (!selectedCategory) {
      setTasks(allTasks);
      return;
    }

    const filtered = allTasks.filter(
      (task) =>
        task.categoryId === selectedCategory.value ||
        task.categoryId?._id === selectedCategory.value,
    );

    setTasks(filtered);
  }, [selectedCategory, allTasks]);

  // handleCreate to add more categories
  const handleCreate = async (inputValue) => {
    if (!user?._id) return;

    try {
      const res = await axios.post(`${API_BASE_URL}/categories/personal/${user._id}`, {
        categoryName: inputValue,
      });

      const newCat = res.data?.data;

      const formatted = {
        value: newCat._id,
        label: newCat.categoryName,
      };

      setCategories((prev) => [...prev, formatted]);
      setSelectedCategory(formatted);
    } catch (err) {
      console.error('Failed to create category', err);
    }
  };

  return (
    <div className='flex flex-col gap-6'>
      {/* top heading row with select and searchable input and create button */}
      <div className='flex justify-between items-center'>
        <h1 className='text-4xl font-bold underline'>Categories</h1>
        {/* select/searchable component for categories */}
        <div className='flex items-center gap-3'>
          <div className='w-64'>
            <CreatableSelect
              options={categories}
              value={selectedCategory}
              onChange={setSelectedCategory}
              onCreateOption={handleCreate}
              placeholder='Search or select...'
            />
          </div>

          {/* create category button */}
          <button
            onClick={() => handleCreate(`Category ${categories.length + 1}`)}
            className='px-4 py-2 bg-neutral-800 text-orange-100 rounded-md flex items-center gap-2 cursor-pointer hover:bg-neutral-700 transition-all ease-in-out'
          >
            <FontAwesomeIcon icon={faPlus} />
            Create
          </button>
        </div>
      </div>

      {/* default category bubbles */}
      <div className='flex flex-wrap gap-3'>
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border transition-all ease-in-out cursor-pointer
            ${
              selectedCategory?.value === cat.value
                ? 'bg-slate-700 text-orange-100 font-semibold'
                : 'bg-neutral-400 hover:bg-neutral-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* task section */}
      <div className='max-w-full py-3 px-3 rounded-xl bg-neutral-800'>
        <h2 className='text-4xl font-semibold text-orange-100 mb-4'>
          {selectedCategory?.label || 'Select a Category'}
        </h2>

        <div className='grid grid-cols-3 gap-y-8 gap-x-6'>
          {!selectedCategory ? (
            <div className='col-span-3 text-center text-orange-100 text-lg'>
              Select a category to view tasks
            </div>
          ) : loadingTasks ? (
            <div className='col-span-3 text-center text-orange-100'>
              Loading tasks...
            </div>
          ) : tasks.length === 0 ? (
            <div className='col-span-3 text-center text-orange-100 text-lg'>
              No tasks in this category
            </div>
          ) : (
            tasks.map((task) => (
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

export default Categories;
