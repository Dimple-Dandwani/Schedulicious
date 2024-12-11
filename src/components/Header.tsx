import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '@/slice/ThemeSlice';
import { Bell, Moon, Sun } from 'lucide-react';
import pfp from '@/media/admin-pfp.jpg';
import { toggleNotification } from '@/slice/NotificationSlice';
import { NavLink } from 'react-router-dom';

function Header() {
    const dispatch = useDispatch();
    const theme = useSelector((state: any) => state.theme.toggleTheme);

    const handleToggle = () => {
        dispatch(toggleTheme());
    };

    const handleToggleNotification = () => {
        dispatch(toggleNotification());
    };

    return (
        <header className={`w-full fixed top-0 left-0 h-16 px-6 ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-100'} flex justify-between items-center z-10`}>
            <nav className='flex justify-center items-center gap-10'>
                <NavLink to="/" className={({ isActive }) => `text-xl ${isActive ? 'text-blue-500 font-bold' : ''}`}>
                    Dashboard
                </NavLink>
                <NavLink to="/calendar" className={({ isActive }) => `text-xl ${isActive ? 'text-blue-500 font-bold' : ''}`}>
                    Calendar
                </NavLink>
            </nav>

            <div className='flex justify-center items-center gap-2'>
                <button onClick={handleToggle} className='rounded-xl p-1 inline border-5 text-xs'>
                    {theme === 'light' ? <Moon /> : <Sun />}
                </button>

                <button onClick={handleToggleNotification} className='rounded-xl p-1 inline border-5 text-xs'>
                    <Bell />
                </button>

                <div className='w-9 rounded-full'>
                    <img src={pfp} className='rounded-full' alt="Profile" />
                </div>
            </div>
        </header>
    );
}

export default Header;

