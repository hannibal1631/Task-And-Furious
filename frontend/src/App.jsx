import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';
import Layout from './components/Layout.jsx';
import Categories from './pages/Categories.jsx';
import ActiveTask from './pages/ActiveTask.jsx';
import UpcomingTask from './pages/UpcomingTask.jsx';
import CompletedTask from './pages/CompletedTask.jsx';
import FailedTask from './pages/FailedTask.jsx';
import Settings from './pages/Settings.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Navigate to='dashboard' />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='categories' element={<Categories />} />
          <Route path='active' element={<ActiveTask />} />
          <Route path='upcoming' element={<UpcomingTask />} />
          <Route path='completed' element={<CompletedTask />} />
          <Route path='failed-task' element={<FailedTask />} />
          <Route path='settings' element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
