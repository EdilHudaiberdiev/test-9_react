import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import {ICategoryForm} from '../types';

export const addCategory = createAsyncThunk(
  'category/add',
  async (category: ICategoryForm) => {
    await axiosApi.post(`category.json`, category);
  });


export const editCategoryById = createAsyncThunk(
  'category/edit',
  async ({category, id}: { category: ICategoryForm; id: string }) => {
    await axiosApi.put(`category/${id}.json`, category);
  });

export const getCategories = createAsyncThunk(
  'category/get',
  async () => {
    const response = await axiosApi.get(`category.json`);
    return response.data ?? [];
  });

export const getCategoryById = createAsyncThunk(
  'category/get-by-id',
  async (id: string) => {
    const response = await axiosApi.get(`category/${id}.json`);
    return response.data ?? null;
  });




