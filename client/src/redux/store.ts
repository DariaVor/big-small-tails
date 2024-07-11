import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import petReducer from './slices/pet/petSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pets: petReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type StoreType = typeof store;
