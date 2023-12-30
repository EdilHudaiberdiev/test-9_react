import {configureStore} from "@reduxjs/toolkit";
import {TransactionReducer} from '../store/TransactionSlice';

export const store = configureStore({
  reducer: {
    transactions: TransactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;