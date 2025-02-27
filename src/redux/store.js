import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import registrationReducer from './slices/registrationSlice';
import incomeReducer from './slices/incomeSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    registration: registrationReducer,
    income: incomeReducer
  },
});

export default store;
