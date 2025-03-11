import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
  isIncomeLoggingModalOpen: false,
  selectedIncomeType: null,
  modalStep: 1,
  incomeName: '',
  irregularIncomeName: '',
  selectedPeriodicity: '',
  dayOfMonth: '',
  yearlyDate: dayjs(),
  dayOfWeek: '',
  selectedCurrency: "840",
  savingMethod: "",
  receivingSum: '',
  receivedIncome: dayjs(),
  irregularSelectedCurrency: "840",
  irregularSavingMethod: "",
  irregularReceivingSum: '',
  openSnackbar: false,
  deletedIncome: null,
  startDate: null,
  endDate: null,
  openSnackbar: false,
};

const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    setIncomeState: (state, action) => {
      const payload = action.payload;

      if (payload.yearlyDate && payload.yearlyDate.isDayjs) {
        payload.yearlyDate = payload.yearlyDate.toISOString();
      }
      if (payload.receivedIncome && payload.receivedIncome.isDayjs) {
        payload.receivedIncome = payload.receivedIncome.toISOString();
      }
      if (payload.startDate && payload.startDate.isDayjs) {
        payload.startDate = payload.startDate.toISOString();
      }
      if (payload.endDate && payload.endDate.isDayjs) {
        payload.endDate = payload.endDate.toISOString();
      }

      return { ...state, ...payload };
    },
    resetIncomeState: () => initialState,
    setOpenSnackbar: (state, action) => {
      state.openSnackbar = action.payload;
    },
  },
});

export const { setIncomeState, resetIncomeState, setOpenSnackbar } = incomeSlice.actions;
export default incomeSlice.reducer;
