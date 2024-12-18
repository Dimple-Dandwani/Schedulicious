import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAppointment, deleteAppointment, updateAppointment } from '@/slice/BookingSlice';
import { Calendar as BigCalendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, addHours } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

export interface Appointment {
  id: string;
  user: string;
  admin: string;
  start: Date;
  end: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'canceled';  
}


const Calendar: React.FC = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state: any) => state.booking.appointments);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>('month');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>({
    user: '',
    admin: '',
    start: new Date(),
    end: addHours(new Date(), 1),
    status: 'pending',
  });

  const handleAddAppointment = () => {
    if (newAppointment.user && newAppointment.admin && newAppointment.start && newAppointment.end) {
      const appointmentToAdd = {
        ...newAppointment,
        id: Math.random().toString(36).substr(2, 9),
      } as Appointment;
      dispatch(addAppointment(appointmentToAdd));
      setIsDialogOpen(false);
      setNewAppointment({
        user: '',
        admin: '',
        start: new Date(),
        end: addHours(new Date(), 1),
        status: 'pending',
      });
    }
  };

  const handleSelectEvent = (event: Appointment) => {
    setSelectedAppointment(event);
    setIsDialogOpen(true);
  };

  const handleDeleteAppointment = () => {
    if (selectedAppointment) {
      dispatch(deleteAppointment(selectedAppointment.id));
      setIsDialogOpen(false);
      setSelectedAppointment(null);
    }
  };

  const handleUpdateAppointment = () => {
    if (selectedAppointment) {
      dispatch(updateAppointment(selectedAppointment));
      setIsDialogOpen(false);
      setSelectedAppointment(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Calendar</h1>
      <div className="p-4">
        <BigCalendar
          localizer={localizer}
          events={appointments}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          onSelectEvent={handleSelectEvent}
          date={date}
          onNavigate={setDate}
          view={view}
          onView={(newView) => setView(newView)}
        />
        <Button
          onClick={() => {
            setSelectedAppointment(null);
            setIsDialogOpen(true);
          }}
          className="mt-4 "
        >
          Add Appointment
        </Button>
      </div>

      <Dialog open={isDialogOpen}  onOpenChange={setIsDialogOpen}>

        <DialogContent className='bg-white'>
          <DialogHeader>
            <DialogTitle>{selectedAppointment ? 'Edit Appointment' : 'Add New Appointment'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="user" className="text-right">
                User
              </Label>
              <Input
                id="user"
                value={selectedAppointment?.user || newAppointment.user}
                onChange={(e) => selectedAppointment 
                  ? setSelectedAppointment({...selectedAppointment, user: e.target.value})
                  : setNewAppointment({...newAppointment, user: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="admin" className="text-right">
                Admin
              </Label>
              <Input
                id="admin"
                value={selectedAppointment?.admin || newAppointment.admin}
                onChange={(e) => selectedAppointment 
                  ? setSelectedAppointment({...selectedAppointment, admin: e.target.value})
                  : setNewAppointment({...newAppointment, admin: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start" className="text-right">
                Start
              </Label>
              <Input
                id="start"
                type="datetime-local"
                value={format(selectedAppointment?.start || newAppointment.start || new Date(), "yyyy-MM-dd'T'HH:mm")}
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  selectedAppointment 
                    ? setSelectedAppointment({...selectedAppointment, start: date})
                    : setNewAppointment({...newAppointment, start: date});
                }}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end" className="text-right">
                End
              </Label>
              <Input
                id="end"
                type="datetime-local"
                value={format(selectedAppointment?.end || newAppointment.end || addHours(new Date(), 1), "yyyy-MM-dd'T'HH:mm")}
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  selectedAppointment 
                    ? setSelectedAppointment({...selectedAppointment, end: date})
                    : setNewAppointment({...newAppointment, end: date});
                }}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            {selectedAppointment ? (
              <>
                <Button variant="destructive" onClick={handleDeleteAppointment}>
                  Delete
                </Button>
                <Button onClick={handleUpdateAppointment}>Save Changes</Button>
              </>
            ) : (
              <Button onClick={handleAddAppointment}>Add Appointment</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar;