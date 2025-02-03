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
  token: null, 
  userId: null, 
  loading: false,
  error: null,
  success: false
};


export const registerUser = createAsyncThunk(
  'registration/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const registerResponse = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const registerData = await registerResponse.json();
      if (!registerResponse.ok) {
        throw new Error(registerData.message || 'Registration failed');
      }

      const loginResponse = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
        }),
      });

      const loginData = await loginResponse.json();
      if (!loginResponse.ok) {
        throw new Error(loginData.message || 'Login failed');
      }

      return { userId: registerData.userId, token: loginData.token };
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
        state.userId = action.payload.userId; 
        state.token = action.payload.token; 
        localStorage.setItem('token', action.payload.token); 
      })      
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateField, toggleSubscription, nextStep, prevStep, resetRegistration, setHeardFrom, setPurposeOfUsage } = registrationSlice.actions;
export default registrationSlice.reducer;
