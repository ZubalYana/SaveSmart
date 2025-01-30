import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import registrationReducer from './slices/registrationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    registration: registrationReducer,
  },
});

export default store;
