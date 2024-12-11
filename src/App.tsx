import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Notification from '@/components/notificationBar';
import Dashboard from '@/components/dashboard';
import Calendar from '@/components/calendar';
import Layout from '@/components/layout';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="calendar" element={<Calendar />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

