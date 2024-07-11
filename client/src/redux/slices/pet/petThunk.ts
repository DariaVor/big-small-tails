import { createAsyncThunk } from '@reduxjs/toolkit';
import petsService from '../../../services/petService';
import type { PetFormType } from '../../../types/petTypes';

export const getAllPetsThunk = createAsyncThunk('pets/getAllPets', async () => {
  const data = await petsService.getAllPets();
  return data;
});

export const getAllLostPetsThunk = createAsyncThunk('pets/getAllLostPets', async () => {
  const data = await petsService.getAllLostPets();
  return data;
});

export const getAllFoundPetsThunk = createAsyncThunk('pets/getAllFoundPets', async () => {
  const data = await petsService.getAllFoundPets();
  return data;
});

export const updateOnePetThunk = createAsyncThunk(
  'pets/updateOnePet',
  async ({ id, petForm }: { id: number; petForm: PetFormType }) => {
    const data = await petsService.updateOnePet(id, petForm);
    return data;
  },
);

export const deleteOnePetThunk = createAsyncThunk('pets/deleteOnePet', async (id: number) => {
  await petsService.deleteOnePet(id);
  return id;
});

export const addPetThunk = createAsyncThunk(
  'pets/addPet',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await petsService.addPet(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// export const getOnePetThunk = createAsyncThunk('pets/getOnePet', async (id: number) => {
//   const data = await petsService.getOnePet(id);
//   return data;
// });
