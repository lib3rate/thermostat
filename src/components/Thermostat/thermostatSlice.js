import { createSlice } from '@reduxjs/toolkit';

export const thermostatSlice = createSlice({
  name: 'thermostat',
  initialState: {
    currentUnit: 'Unit 100',
    // isTurnedOn: false,
    mode: null,
    currentIndoorTemperature: null,
    currentOutdoorTemperature: null,
    desiredTemperature: null,
  },
  reducers: {
    changeThermostatUnit: (state, action) => {
      state.currentUnit = action.payload;
    },
    // switchPower: state => {
    //   state.isTurnedOn ? state.isTurnedOn = false : state.isTurnedOn = true;
    // },
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
      state.desiredTemperature
        ? state.desiredTemperature = state.desiredTemperature
        : state.desiredTemperature = state.currentIndoorTemperature;

      state.desiredTemperature += 1;
    },
    decreaseDesiredTemperature: state => {
      state.desiredTemperature
        ? state.desiredTemperature = state.desiredTemperature
        : state.desiredTemperature = state.currentIndoorTemperature;

      state.desiredTemperature -= 1;
    }
  },
});

export const {
  changeThermostatUnit,
  // switchPower,
  changeMode,
  setCurrentIndoorTemperature,
  setCurrentOutdoorTemperature,
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
export const selectCurrentUnit = state => state.thermostat.currentUnit;
// export const selectPower = state => state.thermostat.isTurnedOn;
export const selectMode = state => state.thermostat.mode;
export const selectCurrentIndoorTemperature = state => state.thermostat.currentIndoorTemperature;
export const selectCurrentOutdoorTemperature = state => state.thermostat.currentOutdoorTemperature;
export const selectDesiredTemperature = state => state.thermostat.desiredTemperature;

export default thermostatSlice.reducer;
