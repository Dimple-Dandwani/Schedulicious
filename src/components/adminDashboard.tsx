import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateAppointment } from '../slice/BookingSlice';
import { setNotification } from '../slice/NotificationSlice';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state: any) => state.booking.appointments);
  const pendingAppointments = appointments.filter((app: any) => app.status === 'pending');

  const handleAccept = (appointment: any) => {
    dispatch(updateAppointment({
      ...appointment,
      status: 'confirmed'
    }));
    dispatch(setNotification({
      message: `Meeting with ${appointment.user} confirmed for ${appointment.start}`,
      type: 'user'
    }));
  };

  const handleReject = (appointment: any, reason: string) => {
    dispatch(updateAppointment({
      ...appointment,
      status: 'canceled',
      rejectionReason: reason
    }));
    dispatch(setNotification({
      message: `Meeting request rejected. Reason: ${reason}`,
      type: 'user'
    }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Pending Meeting Requests</h2>
      {pendingAppointments.map((appointment: any) => (
        <Card key={appointment.id}>
          <CardHeader>
            <CardTitle>Meeting Request from {appointment.user}</CardTitle>
            <CardDescription>Requested for: {new Date(appointment.start).toLocaleString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <p><strong>Reason:</strong> {appointment.reason}</p>
            {appointment.alternativeTime && (
              <p><strong>Alternative Time:</strong> {new Date(appointment.alternativeTime).toLocaleString()}</p>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={() => handleAccept(appointment)}>Accept</Button>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Reason for rejection"
                onChange={(e) => appointment.rejectionReason = e.target.value}
              />
              <Button variant="destructive" onClick={() => handleReject(appointment, appointment.rejectionReason)}>Reject</Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default AdminDashboard;

