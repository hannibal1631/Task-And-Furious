import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ModeProvider } from './context/ModeContext.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ModeProvider>
      <App />
    </ModeProvider>
  </AuthProvider>,
);
