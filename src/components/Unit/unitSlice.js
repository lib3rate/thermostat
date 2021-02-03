import { createSlice } from '@reduxjs/toolkit';

export const unitSlice = createSlice({
  name: 'unit',
  initialState: {
    currentUnit: null,
    isTurnedOn: false,
    mode: null,
    currentIndoorTemperature: null,
    currentOutdoorTemperature: null,
    desiredTemperature: null,
  },
  reducers: {
    changeUnit: (state, action) => {
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
  changeUnit,
  switchPower,
  changeMode,
  setCurrentIndoorTemperature,
  setCurrentOutdoorTemperature,
  increaseDesiredTemperature,
  decreaseDesiredTemperature
} = unitSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

export const selectCurrentUnit = state => state.currentUnit.value;
export const isTurnedOn = state => state.isTurnedOn.value;
export const selectMode = state => state.mode.value;
export const selectCurrentTemperature = state => state.currentTemperature.value;
export const selectDesiredTemperature = state => state.desiredTemperature.value;

export default unitSlice.reducer;
