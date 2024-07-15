import { createAsyncThunk } from '@reduxjs/toolkit';
import petsService from '../../../services/petService';
import type { PetFormDataType } from '../../../types/petTypes';

export const getAllPetsThunk = createAsyncThunk('pets/getAllPets', async () => {
  const data = await petsService.getAllPets();
  return data;
});

export const getAllPetsOfUserThunk = createAsyncThunk('account/getAllPets', async () => {
  const data = await petsService.getAllPetsOfUser();
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
  async ({ id, petForm }: { id: number; petForm: PetFormDataType }) => {
    const data = await petsService.updateOnePet(id, petForm);
    return data;
  },
);

export const deleteOnePetThunk = createAsyncThunk('pets/deleteOnePet', async (id: number) => {
  await petsService.deleteOnePet(id);
  return id;
});

export const addPetThunk = createAsyncThunk('pets/addPet', async (formData: PetFormDataType) => {
  const response = await petsService.addPet(formData);
  return response;
});

export const getOnePetThunk = createAsyncThunk('pets/getOnePet', async (id: number) => {
  const data = await petsService.getOnePet(id);
  return data;
});


export const getPendingPetsThunk = createAsyncThunk('pets/getPendingPets', async () => {
  const data = await petsService.getPendingPets();
  return data;
});

export const approvePetThunk = createAsyncThunk('pets/approvePet', async (id: number) => {
  const data = await petsService.approvePet(id);
  return data;
});

export const rejectPetThunk = createAsyncThunk('pets/rejectPet', async (id: number) => {
  const data = await petsService.rejectPet(id);
  return data;
});