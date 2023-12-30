import {createSlice} from '@reduxjs/toolkit';
import {ITransaction} from '../types';
import {addTransaction} from './TransactionThunk';



interface TransactionState {
  transactions: ITransaction[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: TransactionState = {
  transactions: [],
  isLoading: false,
  isError: false,
};

const TransactionSlice = createSlice({
  name: 'Transaction',
  initialState,
  reducers: {
    },

  extraReducers: (builder) => {

    builder.addCase(addTransaction.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(addTransaction.fulfilled, (state ) => {
      state.isLoading = false;
    });
    builder.addCase(addTransaction.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

  }




});

export const TransactionReducer = TransactionSlice.reducer;