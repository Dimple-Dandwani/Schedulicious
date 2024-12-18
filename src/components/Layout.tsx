import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import NotificationBar from '@/components/notificationBar';

function Layout() {
  const theme = useSelector((state: any) => state.theme.toggleTheme);
  const { isOpen } = useSelector((state: any) => state.notify);

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
      <Header />
      <div className="flex flex-grow pt-16">
        <main className={`flex-grow ${isOpen ? 'mr-[300px]' : ''}`}>
          <Outlet />
        </main>
        <NotificationBar />
      </div>
    </div>
  );
}

export default Layout;

