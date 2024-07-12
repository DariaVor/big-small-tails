import { createSlice } from '@reduxjs/toolkit';
import {
  deleteOnePetThunk,
  getAllFoundPetsThunk,
  getAllLostPetsThunk,
  getAllPetsThunk,
  addPetThunk,
  updateOnePetThunk,
  // getOnePetThunk,
} from './petThunk';
import type { PetType } from '../../../types/petTypes';

type PetState = {
  pets: PetType[];
  lostPets: PetType[];
  foundPets: PetType[];
};

const initialState: PetState = {
  pets: [],
  lostPets: [],
  foundPets: [],
};

export const petsSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPetsThunk.fulfilled, (state, action) => {
        state.pets = action.payload;
      })
      .addCase(getAllPetsThunk.rejected, (state) => {
        state.pets = [];
      })
      .addCase(getAllLostPetsThunk.fulfilled, (state, action) => {
        state.lostPets = action.payload;
      })
      .addCase(getAllLostPetsThunk.rejected, (state) => {
        state.lostPets = [];
      })
      .addCase(getAllFoundPetsThunk.fulfilled, (state, action) => {
        state.foundPets = action.payload;
      })
      .addCase(getAllFoundPetsThunk.rejected, (state) => {
        state.foundPets = [];
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
      });
    // .addCase(getOnePetThunk.fulfilled, (state, action) => {
    //   state.onePet = action.payload;
    // })
    // .addCase(getOnePetThunk.rejected, (state) => {
    //   state.onePet = null;
    // });
  },
});

export default petsSlice.reducer;
