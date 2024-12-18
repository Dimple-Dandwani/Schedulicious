import React from 'react';
import { useSelector } from 'react-redux';
import UserRequestForm from './UserRequestForm';
import AdminDashboard from './adminDashboard';

function Dashboard() {
  const user = useSelector((state: any) => state.user);
  const isAdmin = user?.isAdmin ?? false; // Provide a default value if user or isAdmin is undefined

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {isAdmin ? (
        <AdminDashboard />
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-2">Request a Meeting</h2>
          <UserRequestForm />
        </div>
      )}
    </div>
  );
}

export default Dashboard;

