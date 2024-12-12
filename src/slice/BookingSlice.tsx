import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types for Appointment
export interface Appointment {
  id: string;
  user: string;
  admin: string;
  start: Date;
  end: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'canceled';
}

interface BookingState {
  appointments: Appointment[];
}

// Function to generate dummy appointments
const generateDummyAppointments = (): Appointment[] => {
  const appointments: Appointment[] = [];
  const startDate = new Date();
  const statuses: ('pending' | 'confirmed' | 'completed' | 'canceled')[] = ['pending', 'confirmed', 'completed', 'canceled'];

  for (let i = 0; i < 200; i++) {
    const isAdmin = i < 100;
    const appointmentDate = new Date(startDate);
    appointmentDate.setDate(appointmentDate.getDate() + Math.floor(i / 4));
    appointmentDate.setHours(9 + (i % 4) * 2, 0, 0, 0);

    appointments.push({
      id: `appointment-${i + 1}`,
      user: isAdmin ? `User${i % 10 + 1}` : `User${i - 99}`,
      admin: isAdmin ? `Admin${i % 5 + 1}` : `Admin${Math.floor((i - 100) / 20) + 1}`,
      start: new Date(appointmentDate),
      end: new Date(appointmentDate.setHours(appointmentDate.getHours() + 1)),
      status: statuses[Math.floor(Math.random() * statuses.length)]
    });
  }

  return appointments;
};

const initialState: BookingState = {
  appointments: generateDummyAppointments(),
};

// Slice to handle appointments
const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    // Action to add a new appointment
    addAppointment(state, action: PayloadAction<Appointment>) {
      state.appointments.push(action.payload);
    },

    // Action to update an appointment (e.g., confirmation, cancellation)
    updateAppointment(state, action: PayloadAction<Appointment>) {
      const index = state.appointments.findIndex(
        (appointment) => appointment.id === action.payload.id
      );
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
    },

    // Action to delete an appointment
    deleteAppointment(state, action: PayloadAction<string>) {
      state.appointments = state.appointments.filter(
        (appointment) => appointment.id !== action.payload
      );
    },

    // Action to fetch appointments (could be used to load appointments from a server)
    setAppointments(state, action: PayloadAction<Appointment[]>) {
      state.appointments = action.payload;
    },
  },
});

export const {
  addAppointment,
  updateAppointment,
  deleteAppointment,
  setAppointments,
} = bookingSlice.actions;

export default bookingSlice.reducer;

