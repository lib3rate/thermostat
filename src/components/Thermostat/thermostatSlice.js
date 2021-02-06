import { createSlice } from '@reduxjs/toolkit';

export const thermostatSlice = createSlice({
  name: 'thermostat',
  initialState: {
    id: '',
    currentUnit: 'Unit 100',
    mode: 'off',
    currentIndoorTemperature: null,
    currentOutdoorTemperature: null,
    desiredTemperature: null,
  },
  reducers: {
    registerThermostat: (state, action) => {
      state.id = action.payload;
    },
    changeThermostatUnit: (state, action) => {
      state.currentUnit = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setCurrentIndoorTemperature: (state, action) => {
      state.currentIndoorTemperature = action.payload;
    },
    setCurrentOutdoorTemperature: (state, action) => {
      state.currentOutdoorTemperature = action.payload;
    },
    setDesiredTemperature: (state, action) => {
      state.desiredTemperature = action.payload;
    },
    increaseDesiredTemperature: state => {
      if (!state.desiredTemperature) {
        state.desiredTemperature = state.currentIndoorTemperature;
      }

      state.desiredTemperature += 1;
    },
    decreaseDesiredTemperature: state => {
      if (!state.desiredTemperature) {
        state.desiredTemperature = state.currentIndoorTemperature;
      }

      state.desiredTemperature -= 1;
    }
  },
});

export const {
  registerThermostat,
  changeThermostatUnit,
  setMode,
  setCurrentIndoorTemperature,
  setCurrentOutdoorTemperature,
  setDesiredTemperature,
  increaseDesiredTemperature,
  decreaseDesiredTemperature
} = thermostatSlice.actions;

// Asynchronous state mutations
// export const setReceivedIndoorTemperature = temperature => dispatch => {
//   dispatch(setCurrentIndoorTemperature(temperature));
// };

// export const setReceivedOutdoorTemperature = temperature => dispatch => {
//   dispatch(setCurrentOutdoorTemperature(temperature));
// };

// Selectors
export const selectId = state => state.thermostat.id;
export const selectCurrentUnit = state => state.thermostat.currentUnit;
export const selectMode = state => state.thermostat.mode;
export const selectCurrentIndoorTemperature = state => state.thermostat.currentIndoorTemperature;
export const selectCurrentOutdoorTemperature = state => state.thermostat.currentOutdoorTemperature;
export const selectDesiredTemperature = state => state.thermostat.desiredTemperature;

export default thermostatSlice.reducer;
