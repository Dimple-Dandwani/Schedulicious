import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '@/slice/ThemeSlice';
import Header from '@/components/Header';
import Notification from '@/components/userNotification';

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state: any ) => state.theme.toggleTheme); 

  const handleToggle = () => {
    dispatch(toggleTheme());
  };
  console.log(theme);

  return (
    <div className={`h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
      
      <Header />
      <Notification />
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
