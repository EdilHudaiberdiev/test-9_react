import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import {ITransaction} from '../types';

export const addTransaction = createAsyncThunk(
  'transaction/add',
  async (transactions: ITransaction) => {
    await axiosApi.post(`transaction.json`, transactions);
  });