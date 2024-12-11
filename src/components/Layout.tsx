import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Notification from '@/components/notificationBar';
import Dashboard from '@/components/dashboard';
import Calendar from '@/components/calendar';

function Layout() {
  const theme = useSelector((state: any) => state.theme.toggleTheme);
  const { isOpen } = useSelector((state: any) => state.notify);

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
      <Header />
      <Notification />
      <main className={`flex-grow pt-16 ${isOpen ? 'w-[calc(100%-300px)]' : 'w-full'}`}>
        <Outlet />
      </main>
    </div>
  );
}
export default Layout;