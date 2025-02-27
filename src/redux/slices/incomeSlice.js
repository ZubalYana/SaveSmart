import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  incomes: []
};

const incomeSlice = createSlice({
  name: "income",
  initialState: { incomes: [] },
  reducers: {
    addIncome: (state, action) => {
      console.log("Reducer received:", action.payload);
      state.incomes.push(action.payload);
    },
    removeIncome: (state, action) => {
      state.incomes = state.incomes.filter(income => income.id !== action.payload);
    }
  }
});

export const { addIncome, removeIncome } = incomeSlice.actions;
export default incomeSlice.reducer;
