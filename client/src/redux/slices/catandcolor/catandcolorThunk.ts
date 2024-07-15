import { createAsyncThunk } from '@reduxjs/toolkit';
import catandcolorService from '../../../services/catandcolorService';

export const getCategoriesThunk = createAsyncThunk('data/getCategories', async () => {
  const response = await catandcolorService.getCategories();
  return response;
});

export const getColorsThunk = createAsyncThunk('data/getColors', async () => {
  const response = await catandcolorService.getColors();
  return response;
});
