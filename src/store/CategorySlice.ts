import {createSlice} from '@reduxjs/toolkit';
import {ICategory, ICategoryForm} from '../types';
import {addCategory, editCategoryById, getCategories, getCategoryById} from './CategoryThunk';


interface TransactionState {
  categories: ICategory[];
  categoryToEdit: ICategoryForm | null,
  isLoading: boolean;
  isError: boolean;
}

const initialState: TransactionState = {
  categories: [],
  categoryToEdit: null,
  isLoading: false,
  isError: false,
};

const CategorySlice = createSlice({
  name: 'Category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      const categoriesObject: { [key: string]: ICategory } = action.payload;
      const categoriesArray: ICategory[] = [];

      if (categoriesObject) {
        for (const [key, value] of Object.entries(categoriesObject)) {
          categoriesArray.push({
            id: key,
            title: value.title,
            type: value.type,
          });
        }
      }

      state.isLoading = false;
      state.categories = categoriesArray;
    });
    builder.addCase(getCategories.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(addCategory.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(addCategory.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addCategory.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(editCategoryById.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(editCategoryById.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(editCategoryById.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(getCategoryById.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getCategoryById.fulfilled, (state, action) => {
      state.categoryToEdit = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getCategoryById.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

  }
});

export const CategoryReducer = CategorySlice.reducer;