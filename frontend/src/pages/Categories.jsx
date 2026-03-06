import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import TaskCardMin from '../components/TaskCardMin.jsx';

function Categories() {
  const defaultCategories = [
    { value: 'work', label: 'Work' },
    { value: 'personal', label: 'Personal' },
    { value: 'study', label: 'Study' },
    { value: 'health', label: 'Health' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'finance', label: 'Finance' },
  ];

  const [categories, setCategories] = useState(defaultCategories);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCreate = (inputValue) => {
    const newCategory = {
      value: inputValue.toLowerCase(),
      label: inputValue,
    };

    setCategories((prev) => [...prev, newCategory]);
    setSelectedCategory(newCategory);
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
            className='px-4 py-2 bg-black text-white rounded-md flex items-center gap-2 cursor-pointer hover:bg-gray-800'
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
            className={`px-4 py-2 rounded-full border transition cursor-pointer
            ${
              selectedCategory?.value === cat.value
                ? 'bg-black text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* task section */}
      <div className='max-w-full py-3 px-4 bg-yellow-400'>
        <h2 className='text-4xl font-semibold mb-4'>Category Title</h2>

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
        </div>
      </div>
    </div>
  );
}

export default Categories;
