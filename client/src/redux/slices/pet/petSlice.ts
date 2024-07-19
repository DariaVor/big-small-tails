import { createSlice } from '@reduxjs/toolkit';
import {
  getAllLostPetsThunk,
  getAllFoundPetsThunk,
  deleteOnePetThunk,
  updateOnePetThunk,
  addPetThunk,
  getOnePetThunk,
  getPendingPetsThunk,
  approvePetThunk,
  rejectPetThunk,
  getAllPetsOfUserThunk,
} from './petThunk';
import type { PetType } from '../../../types/petTypes';

type PetState = {
  pets: PetType[];
  lostPets: PetType[];
  foundPets: PetType[];
  onePet: PetType | null;
  pendingPets: PetType[];
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
};

const initialState: PetState = {
  pets: [],
  lostPets: [],
  foundPets: [],
  onePet: null,
  pendingPets: [],
  currentPage: 0,
  totalPages: 0,
  loading: false,
  error: null,
};

export const petsSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getAllPetsOfUserThunk.fulfilled, (state, action) => {
      state.pets = action.payload;
    })
      .addCase(getAllLostPetsThunk.fulfilled, (state, action) => {
        if (action.meta.arg.page === 1) {
          state.lostPets = action.payload.pets;
        } else {
          state.lostPets = [...state.lostPets, ...action.payload.pets];
        }
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.loading = false;
      })
      .addCase(getAllLostPetsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllLostPetsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(updateOnePetThunk.fulfilled, (state, action) => {
        const index = state.pets.findIndex((pet) => pet.id === action.payload.id);
        if (index !== -1) {
          state.pets[index] = action.payload;
        }

        if (action.payload.petStatusId === 1) {
          const lostIndex = state.lostPets.findIndex((pet) => pet.id === action.payload.id);
          if (lostIndex !== -1) {
            state.lostPets[lostIndex] = action.payload;
          }
        } else if (action.payload.petStatusId === 2) {
          const foundIndex = state.foundPets.findIndex((pet) => pet.id === action.payload.id);
          if (foundIndex !== -1) {
            state.foundPets[foundIndex] = action.payload;
          }
        }
      })
      .addCase(getAllFoundPetsThunk.fulfilled, (state, action) => {
        if (action.meta.arg.page === 1) {
          state.foundPets = action.payload.pets;
        } else {
          state.foundPets = [...state.foundPets, ...action.payload.pets];
        }
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.loading = false;
      })
      .addCase(getAllFoundPetsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllFoundPetsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(deleteOnePetThunk.fulfilled, (state, action) => {
        state.pets = state.pets.filter((pet) => pet.id !== action.payload);
        state.lostPets = state.lostPets.filter((pet) => pet.id !== action.payload);
        state.foundPets = state.foundPets.filter((pet) => pet.id !== action.payload);
      })
      .addCase(addPetThunk.fulfilled, (state, action) => {
        state.pets.unshift(action.payload);
        if (action.payload.petStatusId === 1) {
          state.lostPets.unshift(action.payload);
        } else if (action.payload.petStatusId === 2) {
          state.foundPets.unshift(action.payload);
        }
      })
      .addCase(getOnePetThunk.fulfilled, (state, action) => {
        state.onePet = action.payload;
      })
      .addCase(getOnePetThunk.rejected, (state) => {
        state.onePet = null;
      })
      .addCase(getPendingPetsThunk.fulfilled, (state, action) => {
        state.pendingPets = action.payload;
      })
      .addCase(approvePetThunk.fulfilled, (state, action) => {
        state.pendingPets = state.pendingPets.filter((pet) => pet.id !== action.payload.id);
      })
      .addCase(rejectPetThunk.fulfilled, (state, action) => {
        state.pendingPets = state.pendingPets.filter((pet) => pet.id !== action.payload.id);
      });
  },
});

export default petsSlice.reducer;
