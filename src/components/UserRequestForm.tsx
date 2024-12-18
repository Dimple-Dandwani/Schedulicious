import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAppointment, Appointment } from '../slice/BookingSlice';
import { setNotification } from '../slice/NotificationSlice';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const UserRequestForm: React.FC = () => {
  const dispatch = useDispatch();
  const [primaryTime, setPrimaryTime] = useState('');
  const [alternativeTime, setAlternativeTime] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      user: 'CurrentUser', // Replace with actual user info
      admin: 'AdminUser', // Replace with actual admin info
      start: new Date(primaryTime),
      end: new Date(new Date(primaryTime).getTime() + 60 * 60 * 1000), // 1 hour meeting
      status: 'pending',
      alternativeTime: alternativeTime,
      reason: reason
    };
    dispatch(addAppointment(newAppointment));
    dispatch(setNotification({
      message: 'New meeting request submitted',
      type: 'admin'
    }));
    // Reset form
    setPrimaryTime('');
    setAlternativeTime('');
    setReason('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="primaryTime" className="block text-sm font-medium text-gray-700">Preferred Time</label>
        <Input
          type="datetime-local"
          id="primaryTime"
          value={primaryTime}
          onChange={(e) => setPrimaryTime(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="alternativeTime" className="block text-sm font-medium text-gray-700">Alternative Time (Optional)</label>
        <Input
          type="datetime-local"
          id="alternativeTime"
          value={alternativeTime}
          onChange={(e) => setAlternativeTime(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason for Meeting</label>
        <Textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Submit Request</Button>
    </form>
  );
};

export default UserRequestForm;

