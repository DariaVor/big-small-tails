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

const initialState = {
  pets: [],
  lostPets: [],
  foundPets: [],
  loading: false,
  error: null,
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
      })
      .addCase(deleteOnePetThunk.fulfilled, (state, action) => {
        state.pets = state.pets.filter((pet) => pet.id !== action.payload);
      })
      .addCase(addPetThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPetThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.pets.unshift(action.payload);
      })
      .addCase(addPetThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
