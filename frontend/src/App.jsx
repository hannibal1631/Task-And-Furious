import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';
import Layout from './components/Layout.jsx';
import Categories from './pages/Categories.jsx';
import ActiveTask from './pages/ActiveTask.jsx';
import UpcomingTask from './pages/UpcomingTask.jsx';
import CompletedTask from './pages/CompletedTask.jsx';
import FailedTask from './pages/FailedTask.jsx';
import Settings from './pages/Settings.jsx';
import Landing from './pages/Landing.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import { useEffect, useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  return (
    <BrowserRouter>
      {/* <Routes>
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
      </Routes> */}
      <Routes>
        {/* Landing */}
        <Route
          path='/'
          element={<Landing setIsAuthenticated={setIsAuthenticated} />}
        />

        {/* Optional auth pages */}
        <Route
          path='/login'
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path='/signup'
          element={<Signup setIsAuthenticated={setIsAuthenticated} />}
        />

        {/* main app routes */}
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout />
            </ProtectedRoute>
          }
        >
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
