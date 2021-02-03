import { configureStore } from '@reduxjs/toolkit';
import navigationReducer from '../components/Navigation/navigationSlice';
import unitReducer from '../components/Unit/unitSlice';

export default configureStore({
  reducer: {
    navigation: navigationReducer,
    unit: unitReducer,
  },
});
