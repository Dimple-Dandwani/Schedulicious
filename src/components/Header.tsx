import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '@/slice/ThemeSlice';
import { Bell, Moon, Sun } from 'lucide-react';
import pfp from '@/media/admin-pfp.jpg'

function Header() {
    const dispatch = useDispatch();
    const theme = useSelector((state: any) => state.theme.toggleTheme);

    const handleToggle = () => {
        dispatch(toggleTheme());
    };
    console.log(theme);
    return (
        <div className={`w-full h-16 p-6 ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-100'} gap-2 flex justify-between items-center`}>

            <div className='flex justify-center items-center gap-10'>
                <p>Dashboard</p>
                <p>Calender</p>
            </div>

            <div className='flex justify-center items-center gap-2'>
                <div className='rounded-xl p-1 inline border-5 text-xs'>
                    <button onClick={handleToggle}>
                        {theme === 'light' ? <Moon /> : <Sun />}
                    </button>
                </div>

                <div className='rounded-xl p-1 inline border-5 text-xs'>
                    <button>
                        <Bell />
                    </button>
                </div>

                <div className='w-9 rounded-full'>
                    <img src={pfp} className='rounded-full' />
                </div>
            </div>


        </div>
    )
}

export default Header
