import {createSlice} from '@reduxjs/toolkit';
import {ITransaction} from '../types';
import {addTransaction, getTransactions} from './TransactionThunk';



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



    builder.addCase(getTransactions.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getTransactions.fulfilled, (state, action ) => {
      const contactsObject: {[key: string]: ITransaction} = action.payload;
      const contactArray: ITransaction[] = [];

      if (contactsObject) {
        for (const [key, value] of Object.entries(contactsObject)) {
          contactArray.push({

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
      state.transactions = contactArray;
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

  }




});

export const TransactionReducer = TransactionSlice.reducer;