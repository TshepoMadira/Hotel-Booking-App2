import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomId: null,
  checkIn: null,
  checkOut: null,
  adults: 1,
  children: 0,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookingDetails: (state, action) => {
      const { roomId, checkIn, checkOut, adults, children } = action.payload;
      state.roomId = roomId;
      state.checkIn = checkIn;
      state.checkOut = checkOut;
      state.adults = adults;
      state.children = children;
    },
    clearBookingDetails: () => initialState,
  },
});

export const { setBookingDetails, clearBookingDetails } = bookingSlice.actions;
export default bookingSlice.reducer;
