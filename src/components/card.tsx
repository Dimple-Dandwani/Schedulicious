import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@/slice/ThemeSlice';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { clearSingleNotification } from '@/slice/NotificationSlice';

interface CardProps {
  message: string;
  date: string;
  type: 'admin' | 'user';
  index: number;  // Pass the index of the notification
}

const Card = ({ message, date, type, index }: CardProps) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.theme.toggleTheme);
  
  const isUserLoggedIn = true;  // Replace with your actual login check
  const isAdminLoggedIn = false; // Replace with your actual admin check

  const handleClearSingleNotification = (index: number) => {
    dispatch(clearSingleNotification(index));
  };

  return (
    <>
      {((type === 'admin' && isAdminLoggedIn) || (type === 'user' && isUserLoggedIn)) && (
        <div className={` ${theme === 'light' ? 'bg-white' : 'bg-gray-900' } min-h-[150px] m-2 bg rounded-xl shadow p-2`}>
          <div className="flex justify-between">
            <div className="font-bold text-md">
              <p>{type === 'admin' ? 'Admin Notification' : 'User Notification'}</p>
            </div>
            <div className="text-xl text-red-500 mt-1">
              <IoIosCloseCircleOutline 
                onClick={() => handleClearSingleNotification(index)} 
                className="cursor-pointer"
              />
            </div>
          </div>
          <div className="m-0 p-0 flex justify-center items-center">
            <div className="mt-3 mb-3 w-[100%]">{message}</div>
          </div>
          <div className="text-xs text-gray-500 mt-1">{date}</div>
        </div>
      )}
    </>
  );
};

export default Card;
