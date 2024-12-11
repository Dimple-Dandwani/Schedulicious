import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSingleNotification, clearNotification } from '@/slice/NotificationSlice'; 
import { toggleTheme } from '@/slice/ThemeSlice'; 
import { RiDeleteBin5Line } from "react-icons/ri";
import Card from '@/components/card'; 

const NotificationBar = () => {
    const dispatch = useDispatch();
    const { isOpen, notifications } = useSelector((state: any) => state.notify); 
    const theme = useSelector((state: any) => state.theme.toggleTheme);



    const handleClearNotification = () => {
        dispatch(clearNotification());
    };

    console.log(notifications)
    
    return (
        <div className={`w-full min-h-screen flex justify-end overflow-hidden`}>
            {isOpen && (
                <div className={`w-[300px] h-screen fixed top-16 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}>
                    <div className='w-full p-2 flex justify-between items-center'>
                        <h2 className='text-xl'>Notifications</h2>
                        <div className='text-2xl' onClick={handleClearNotification}>
                            <RiDeleteBin5Line />
                        </div>
                    </div>
                    
                    <div className='h-full overflow-y-auto p-2'>
                        {notifications.map((notification : any , index : any) => (
                            <Card
                            key={index} // Always use a unique key when rendering lists
                            message={notification.message}
                            date={notification.date}
                            type={notification.type}
                            index={index}  // Pass index here
                          /> ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBar;
