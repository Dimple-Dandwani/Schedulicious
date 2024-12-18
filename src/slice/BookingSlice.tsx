import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Appointment {
  id: string;
  user: string;
  admin: string;
  start: Date;
  end: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'canceled';
  alternativeTime?: string;
  reason: string;
  rejectionReason?: string;
}

interface BookingState {
  appointments: Appointment[];
}

const initialState: BookingState = {
  appointments: [],
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    addAppointment(state, action: PayloadAction<Appointment>) {
      state.appointments.push(action.payload);
    },
    updateAppointment(state, action: PayloadAction<Appointment>) {
      const index = state.appointments.findIndex(
        (appointment) => appointment.id === action.payload.id
      );
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
    },
    deleteAppointment(state, action: PayloadAction<string>) {
      state.appointments = state.appointments.filter(
        (appointment) => appointment.id !== action.payload
      );
    },
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

