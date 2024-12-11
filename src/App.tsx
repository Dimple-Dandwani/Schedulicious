import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '@/slice/ThemeSlice';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';  // Use BrowserRouter as Router
import Header from '@/components/Header';
import Notification from '@/components/notificationBar';
import Dashboard from '@/components/dashboard';
import Calendar from '@/components/calendar';

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.theme.toggleTheme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  console.log(theme);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
      <Router>
        <Header />
        <Notification />

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
