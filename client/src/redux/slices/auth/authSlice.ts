import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { UserStateType } from '../../../types/userTypes';
import { checkUserThunk, loginThunk, logoutThunk, registerThunk } from './authThunks';

type UserState = {
  accessToken: string;
  user: UserStateType;
};

const initialState: UserState = { accessToken: '', user: { status: 'fetching' } };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<UserState['accessToken']>) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user = { ...action.payload.user, status: 'logged' };
      })
      .addCase(registerThunk.rejected, (state) => {
        state.accessToken = '';
        state.user = { status: 'guest' };
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user = { ...action.payload.user, status: 'logged' };
      })
      .addCase(loginThunk.rejected, (state) => {
        state.accessToken = '';
        state.user = { status: 'guest' };
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.accessToken = '';
        state.user = { status: 'guest' };
      })
      .addCase(checkUserThunk.pending, (state) => {
        state.user = { status: 'fetching' };
      })
      .addCase(checkUserThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user = { ...action.payload.user, status: 'logged' };
      })
      .addCase(checkUserThunk.rejected, (state) => {
        state.accessToken = '';
        state.user = { status: 'guest' };
      });
  },
});

export default authSlice.reducer;
