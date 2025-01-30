import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  dateOfBirth: null,
  password: '',
  step: 1,
  subscribed: false,
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    toggleSubscription: (state) => {
      state.subscribed = !state.subscribed;
    },
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    resetRegistration: () => initialState,
  },
});

export const { updateField, toggleSubscription, nextStep, prevStep, resetRegistration } = registrationSlice.actions;
export default registrationSlice.reducer;
