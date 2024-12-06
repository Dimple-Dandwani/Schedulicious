import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '@/slice/ThemeSlice';



function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state: any ) => state.theme.toggleTheme); 

  const handleToggle = () => {
    dispatch(toggleTheme());
  };
  console.log(theme);

  return (
    <div className={`h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <h1>Current Theme:{theme} </h1>
      <button onClick={handleToggle}>Toggle Theme</button>
    </div>
  );
}

export default App;
