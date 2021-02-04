import { configureStore } from '@reduxjs/toolkit';
import navigationReducer from '../components/Navigation/navigationSlice';
import thermostatReducer from '../components/Thermostat/thermostatSlice';

export default configureStore({
  reducer: {
    navigation: navigationReducer,
    thermostat: thermostatReducer,
  },
});
