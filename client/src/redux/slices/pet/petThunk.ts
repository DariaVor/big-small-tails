// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { createAsyncThunk } from '@reduxjs/toolkit';
import petsService from '../../../services/petService';
import type { PetFormDataType } from '../../../types/petTypes';
import { setNotify } from '../notifySlice';

export const getAllPetsThunk = createAsyncThunk('pets/getAllPets', async () => {
  const data = await petsService.getAllPets();
  return data;
});

export const getAllPetsOfUserThunk = createAsyncThunk('account/getAllPets', async () => {
  const data = await petsService.getAllPetsOfUser();
  return data;
});

export const getAllLostPetsThunk = createAsyncThunk(
  'pets/getAllLostPets',
  async (params: {
    page: number;
    limit: number;
    searchTerm?: string;
    selectedCategories?: number[];
    selectedColors?: number[];
    hasCollar?: boolean | 'any'; 
    startDate?: Date | null;
    endDate?: Date | null;
  }) => {
    const data = await petsService.getAllLostPets(params);
    return data;
  },
);

export const getAllFoundPetsThunk = createAsyncThunk(
  'pets/getAllFoundPets',
  async (params: {
    page: number;
    limit: number;
    searchTerm?: string;
    selectedCategories?: number[];
    selectedColors?: number[];
    hasCollar?: boolean | 'any';  // Change to accept 'any'
    startDate?: Date | null;
    endDate?: Date | null;
  }) => {
    const data = await petsService.getAllFoundPets(params);
    return data;
  },
);


export const updateOnePetThunk = createAsyncThunk(
  'pets/updateOnePet',
  async ({ id, petForm }: { id: number; petForm: PetFormDataType }, thunkApi) => {
    try {
      const data = await petsService.updateOnePet(id, petForm);
      thunkApi.dispatch(
        setNotify({ type: 'success', message: 'Объявление успешно отредактировано' }),
      );
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка';
      thunkApi.dispatch(
        setNotify({ type: 'error', message: 'Произошла ошибка при редактировании объявления' }),
      );
      return thunkApi.rejectWithValue(errorMessage);
    }
  },
);

export const deleteOnePetThunk = createAsyncThunk(
  'pets/deleteOnePet',
  async (id: number, thunkApi) => {
    try {
      await petsService.deleteOnePet(id);
      thunkApi.dispatch(setNotify({ type: 'success', message: 'Объявление успешно удалено' }));
      return id;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка';
      thunkApi.dispatch(setNotify({ type: 'error', message: 'Произошла ошибка при удалении' }));
      return thunkApi.rejectWithValue(errorMessage);
    }
  },
);

export const addPetThunk = createAsyncThunk(
  'pets/addPet',
  async (formData: PetFormDataType, thunkApi) => {
    try {
      const response = await petsService.addPet(formData);
      thunkApi.dispatch(setNotify({ type: 'success', message: 'Заявка отправлена на одобрение' }));
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка';
      thunkApi.dispatch(
        setNotify({ type: 'error', message: 'Произошла ошибка при отправке заявки' }),
      );
      return thunkApi.rejectWithValue(errorMessage);
    }
  },
);

export const getOnePetThunk = createAsyncThunk('pets/getOnePet', async (id: number) => {
  const data = await petsService.getOnePet(id);
  return data;
});

export const getPendingPetsThunk = createAsyncThunk('pets/getPendingPets', async () => {
  const data = await petsService.getPendingPets();
  return data;
});

export const approvePetThunk = createAsyncThunk('pets/approvePet', async (id: number, thunkApi) => {
  try {
    const data = await petsService.approvePet(id);
    thunkApi.dispatch(setNotify({ type: 'success', message: 'Заявка одобрена' }));
    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Ошибка';
    thunkApi.dispatch(
      setNotify({ type: 'error', message: 'Произошла ошибка при одобрении заявки' }),
    );
    return thunkApi.rejectWithValue(errorMessage);
  }
});

export const rejectPetThunk = createAsyncThunk('pets/rejectPet', async (id: number, thunkApi) => {
  try {
    const data = await petsService.rejectPet(id);
    thunkApi.dispatch(setNotify({ type: 'success', message: 'Заявка отклонена' }));
    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Ошибка';
    thunkApi.dispatch(
      setNotify({ type: 'error', message: 'Произошла ошибка при отклонении заявки' }),
    );
    return thunkApi.rejectWithValue(errorMessage);
  }
});
