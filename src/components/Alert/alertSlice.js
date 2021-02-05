import { createSlice } from '@reduxjs/toolkit';

export const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    isOpen: false,
    message: ''
  },
  reducers: {
    setAlertOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setAlertMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setAlertOpen, setAlertMessage } = alertSlice.actions;

// Selectors
export const checkIfOpen = state => state.alert.isOpen;
export const selectAlertMessage = state => state.alert.message;

export default alertSlice.reducer;
