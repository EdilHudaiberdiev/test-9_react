import {createSlice} from '@reduxjs/toolkit';
import {ITransaction} from '../types';
import {addTransaction, deleteTransactions, getTransactions} from './TransactionThunk';



interface TransactionState {
  transactions: ITransaction[];
  total: number;
  isLoading: boolean;
  isError: boolean;
}

const initialState: TransactionState = {
  transactions: [],
  total: 0,
  isLoading: false,
  isError: false,
};

const TransactionSlice = createSlice({
  name: 'Transaction',
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder.addCase(getTransactions.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getTransactions.fulfilled, (state, action ) => {
      const transactionObject: {[key: string]: ITransaction} = action.payload;
      const transactionArray: ITransaction[] = [];
      state.total = 0;

      if (transactionObject) {
        for (const [key, value] of Object.entries(transactionObject)) {

          if (value.type === 'income') {
            state.total += +value.transactionSum;
          } else {
            state.total -= +value.transactionSum;
          }

          transactionArray.push({
            id: key,
            title: value.title,
            transactionSum: value.transactionSum,
            type: value.type,
            category: value.category,
            date: value.date,

          });
        }
      }

      state.isLoading = false;
      state.transactions = transactionArray.reverse();
    });

    builder.addCase(getTransactions.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });


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

    builder.addCase(deleteTransactions.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(deleteTransactions.fulfilled, (state ) => {
      state.isLoading = false;
    });
    builder.addCase(deleteTransactions.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

  }
});

export const TransactionReducer = TransactionSlice.reducer;