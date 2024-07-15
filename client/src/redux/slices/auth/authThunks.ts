import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';
import authService from '../../../services/authService';
import type { UserLoginType, UserRegisterType } from '../../../types/userTypes';
import { setNotify } from '../notifySlice';

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (formData: UserRegisterType, thunkApi) => {
    try {
      const data = await authService.register(formData);
      thunkApi.dispatch(setNotify({ type: 'success', message: 'Вы вошли в систему' }));
      return data;
    } catch (error) {
      const err = error as AxiosError;
      thunkApi.dispatch(setNotify({ type: 'error', message: err.message }));
      return thunkApi.rejectWithValue(err.message);
    }
  },
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (formData: UserLoginType, thunkApi) => {
    try {
      const data = await authService.login(formData);
      thunkApi.dispatch(setNotify({ type: 'success', message: 'Вы вошли в систему' }));
      return data;
    } catch (error) {
      const err = error as AxiosError;
      thunkApi.dispatch(setNotify({ type: 'error', message: err.message }));
      return thunkApi.rejectWithValue(err.message);
    }
  },
);

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
  return {};
});

export const checkUserThunk = createAsyncThunk('auth/checkUser', async () => {
  const data = await authService.check();
  return data;
});
