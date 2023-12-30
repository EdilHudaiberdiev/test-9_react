import {configureStore} from "@reduxjs/toolkit";
import {CategoryReducer} from '../store/CategorySlice';
import {TransactionReducer} from '../store/TransactionSlice';

export const store = configureStore({
  reducer: {
    transactions: TransactionReducer,
    categories: CategoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;