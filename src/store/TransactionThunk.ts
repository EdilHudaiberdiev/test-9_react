import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import {ITransactionForm} from '../types';

export const getTransactions = createAsyncThunk(
    'transaction/get',
    async () => {
        const response =  await axiosApi.get(`transaction.json`);
        return response.data ?? [];
    });

export const addTransaction = createAsyncThunk(
    'transaction/add',
    async (transactions: ITransactionForm) => {
        await axiosApi.post(`transaction.json`, transactions);
    });

export const editTransactionById = createAsyncThunk(
    'transaction/edit-by-id-transaction',
    async ({transaction, id}: { transaction: ITransactionForm; id: string }) => {
        await axiosApi.put(`transaction/${id}.json`, transaction);
    });

export const deleteTransactions = createAsyncThunk(
    'transaction/delete',
    async (id: string) => {
        await axiosApi.delete(`transaction/${id}.json`);
    });
