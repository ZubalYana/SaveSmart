// actions.js

// Action types
export const SET_INCOME_NAME = 'SET_INCOME_NAME';
export const SET_SAVING_METHOD = 'SET_SAVING_METHOD';
export const SET_RECEIVING_SUM = 'SET_RECEIVING_SUM';

// Action creators
export const setIncomeName = (incomeName) => ({
    type: SET_INCOME_NAME,
    payload: incomeName,
});

export const setSavingMethod = (savingMethod) => ({
    type: SET_SAVING_METHOD,
    payload: savingMethod,
});

export const setReceivingSum = (receivingSum) => ({
    type: SET_RECEIVING_SUM,
    payload: receivingSum,
});
