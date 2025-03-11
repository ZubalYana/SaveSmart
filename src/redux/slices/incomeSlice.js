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
  endDate: null
};

const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    setIncomeState: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetIncomeState: (state) => {
      return initialState;
    },
  },
});

export const { setIncomeState, resetIncomeState } = incomeSlice.actions;
export default incomeSlice.reducer;
