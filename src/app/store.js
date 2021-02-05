import { configureStore } from '@reduxjs/toolkit';
import navigationReducer from '../components/Navigation/navigationSlice';
import thermostatReducer from '../components/Thermostat/thermostatSlice';
import alertReducer from '../components/Alert/alertSlice';

export default configureStore({
  reducer: {
    navigation: navigationReducer,
    thermostat: thermostatReducer,
    alert: alertReducer,
  },
});
