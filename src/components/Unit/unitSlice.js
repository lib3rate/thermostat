import { createSlice } from '@reduxjs/toolkit';

export const unitSlice = createSlice({
  name: 'unit',
  initialState: {
    currentUnit: 'Unit 100',
    isTurnedOn: false,
    mode: null,
    currentIndoorTemperature: null,
    currentOutdoorTemperature: null,
    desiredTemperature: null,
  },
  reducers: {
    changeThermostatUnit: (state, action) => {
      state.currentUnit = action.payload;
    },
    switchPower: state => {
      state.isTurnedOn ? state.isTurnedOn = false : state.isTurnedOn = true;
    },
    changeMode: (state, action) => {
      state.mode = action.payload;
    },
    setCurrentIndoorTemperature: (state, action) => {
      state.currentIndoorTemperature = action.payload;
    },
    setCurrentOutdoorTemperature: (state, action) => {
      state.currentOutdoorTemperature = action.payload;
    },
    increaseDesiredTemperature: state => {
      state.currentIndoorTemperature += 1;
    },
    decreaseDesiredTemperature: state => {
      state.currentIndoorTemperature -= 1;
    }
  },
});

export const {
  changeThermostatUnit,
  switchPower,
  changeMode,
  setCurrentIndoorTemperature,
  setCurrentOutdoorTemperature,
  increaseDesiredTemperature,
  decreaseDesiredTemperature
} = unitSlice.actions;

// Asynchronous state mutations
// export const setReceivedIndoorTemperature = temperature => dispatch => {
//   dispatch(setCurrentIndoorTemperature(temperature));
// };

// export const setReceivedOutdoorTemperature = temperature => dispatch => {
//   dispatch(setCurrentOutdoorTemperature(temperature));
// };

// Selectors
export const selectCurrentUnit = state => state.unit.currentUnit;
export const isTurnedOn = state => state.unit.isTurnedOn;
export const selectMode = state => state.unit.mode;
export const selectCurrentIndoorTemperature = state => state.unit.currentIndoorTemperature;
export const selectCurrentOutdoorTemperature = state => state.unit.currentOutdoorTemperature;
export const selectDesiredTemperature = state => state.unit.desiredTemperature;

export default unitSlice.reducer;
