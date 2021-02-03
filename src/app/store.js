import { configureStore } from '@reduxjs/toolkit';
import unitReducer from '../components/Unit/unitSlice';

export default configureStore({
  reducer: {
    unit: unitReducer,
  },
});
