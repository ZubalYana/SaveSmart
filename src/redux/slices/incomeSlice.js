import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    type: '', //either 'regular' or 'irregular'
    name: '', //just income name
    periodicity: '', //only for 'regular' income
    received: '', //only for 'irregular' income
    amount: '', //amout of money to receive
    wayOfSaving: '', //either 'card' or 'cash'
    loggingDate: '', //date ( and time ) of logging the income into the database
};