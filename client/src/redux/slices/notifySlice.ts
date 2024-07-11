import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type NotifyState = {
  type: 'error' | 'success' | '';
  message: string;
};

const initialState: NotifyState = {
  type: '',
  message: '',
};

const notifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    setNotify: (_, action: PayloadAction<NotifyState>) => action.payload,
    resetNotify: (state) => {
      state.type = '';
      state.message = '';
    },
  },
});

export const { setNotify, resetNotify } = notifySlice.actions;

export default notifySlice.reducer;
