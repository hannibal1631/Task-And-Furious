import { useState, useEffect } from 'react';

const STORAGE_KEY = 'settings_active_tab';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('appearance');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setActiveTab(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, activeTab);
  }, [activeTab]);

  const tabs = [
    { id: 'account', label: 'Account' },
    { id: 'appearance', label: 'Appearance' },
    { id: 'tasks', label: 'Task Defaults' },
    { id: 'categories', label: 'Categories' },
    { id: 'productivity', label: 'Productivity' },
  ];

  return (
    <div className='flex h-full w-full'>
      {/* Sidebar */}
      <div className='w-64 border-r p-4 space-y-2'>
        <h2 className='text-xl font-semibold mb-4'>Settings</h2>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
              activeTab === tab.id ? 'bg-black text-white' : 'hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className='flex-1 p-6 overflow-y-auto'>
        <div key={activeTab} className='animate-fadeInUp'>
          {activeTab === 'account' && <AccountSettings />}
          {activeTab === 'appearance' && <AppearanceSettings />}
          {activeTab === 'tasks' && <TaskSettings />}
          {activeTab === 'categories' && <CategorySettings />}
          {activeTab === 'productivity' && <ProductivitySettings />}
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className='mb-8'>
      <h3 className='text-lg font-semibold mb-3'>{title}</h3>
      <div className='space-y-3'>{children}</div>
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300 cursor-pointer ${
        checked ? 'bg-black' : 'bg-gray-300'
      }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full transform transition-transform duration-300 cursor-pointer ${
          checked ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

function AccountSettings() {
  const [form, setForm] = useState({ name: '', email: '' });

  return (
    <div>
      <Section title='Profile'>
        <input
          type='text'
          placeholder='Name'
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className='bg-white border p-2 rounded w-full'
        />
        <input
          type='email'
          placeholder='Email'
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className='bg-white border p-2 rounded w-full'
        />
      </Section>

      <Section title='Security'>
        <button className='px-4 py-2 bg-black text-white rounded cursor-pointer hover:scale-105 transition ease-in-outbg-white '>
          Change Password
        </button>
      </Section>
    </div>
  );
}

function AppearanceSettings() {
  const [theme, setTheme] = useState('Light');
  const [layout, setLayout] = useState('Comfortable');

  return (
    <div>
      <Section title='Theme'>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className='bg-white border p-2 rounded w-full cursor-pointer'
        >
          <option>Light</option>
          <option>Dark</option>
        </select>
      </Section>

      <Section title='Layout'>
        <select
          value={layout}
          onChange={(e) => setLayout(e.target.value)}
          className='bg-white border p-2 rounded w-full cursor-pointer'
        >
          <option>Comfortable</option>
          <option>Compact</option>
        </select>
      </Section>
    </div>
  );
}

function TaskSettings() {
  const [priority, setPriority] = useState('Medium');
  const [time, setTime] = useState('');

  return (
    <div>
      <Section title='Defaults'>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className='bg-white border p-2 rounded w-full cursor-pointer'
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          type='time'
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className='bg-white border p-2 rounded w-full cursor-pointer'
        />
      </Section>
    </div>
  );
}

function CategorySettings() {
  return (
    <div>
      <Section title='Manage Categories'>
        <button className='px-4 py-2 bg-black text-white rounded cursor-pointer'>
          + Create Category
        </button>
        <p className='text-sm text-gray-500'>
          Category management UI goes here
        </p>
      </Section>
    </div>
  );
}

function ProductivitySettings() {
  const [focusMode, setFocusMode] = useState(false);
  const [autoMove, setAutoMove] = useState(false);
  const [carryOver, setCarryOver] = useState(false);

  return (
    <div>
      <Section title='Focus'>
        <div className='flex items-center justify-between'>
          <span>Enable Focus Mode</span>
          <Toggle checked={focusMode} onChange={setFocusMode} />
        </div>
      </Section>

      <Section title='Task Handling'>
        <div className='flex items-center justify-between'>
          <span>Auto-move overdue tasks</span>
          <Toggle checked={autoMove} onChange={setAutoMove} />
        </div>
        <div className='flex items-center justify-between'>
          <span>Carry unfinished tasks</span>
          <Toggle checked={carryOver} onChange={setCarryOver} />
        </div>
      </Section>
    </div>
  );
}
