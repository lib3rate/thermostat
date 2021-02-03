import { createSlice } from '@reduxjs/toolkit';

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    currentUnit: 'Unit 100',
  },
  reducers: {
    changeDrawerUnit: (state, action) => {
      state.currentUnit = action.payload;
    },
  },
});

export const { changeDrawerUnit } = navigationSlice.actions;

// Selectors
export const selectCurrentUnit = state => state.navigation.currentUnit;

export default navigationSlice.reducer;
