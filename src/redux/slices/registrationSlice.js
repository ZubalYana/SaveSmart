import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  dateOfBirth: null,
  password: '',
  step: 1,
  subscribed: false,
  heardFrom: '',
  purposeOfUsage: '',
};

export const registerUser = createAsyncThunk(
  'registration/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
    setHeardFrom: (state, action) => { 
      state.heardFrom = action.payload;
    },
    setPurposeOfUsage: (state, action) => { 
      state.purposeOfUsage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateField, toggleSubscription, nextStep, prevStep, resetRegistration, setHeardFrom, setPurposeOfUsage } = registrationSlice.actions;
export default registrationSlice.reducer;
