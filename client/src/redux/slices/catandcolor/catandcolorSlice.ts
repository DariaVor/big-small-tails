// redux/slices/dataSlice.ts

import { createSlice } from '@reduxjs/toolkit';
import { getCategoriesThunk, getColorsThunk } from './catandcolorThunk';
import type { CategoryType, ColorType } from '../../../types/petTypes';

type DataState = {
  categories: CategoryType[];
  colors: ColorType[];
  loading: boolean;
  error: string | null;
};

const initialState: DataState = {
  categories: [],
  colors: [],
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoriesThunk.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(getCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при загрузке категорий';
      })
      .addCase(getColorsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getColorsThunk.fulfilled, (state, action) => {
        state.colors = action.payload;
        state.loading = false;
      })
      .addCase(getColorsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при загрузке цветов';
      });
  },
});

export default dataSlice.reducer;
