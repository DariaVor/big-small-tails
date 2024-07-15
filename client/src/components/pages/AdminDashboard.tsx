import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  getPendingPetsThunk,
  approvePetThunk,
  rejectPetThunk,
} from '../../redux/slices/pet/petThunk';
import type { PetType } from '../../types/petTypes';

export default function AdminDashboard(): JSX.Element {
  const dispatch = useAppDispatch();
  const pendingPets = useAppSelector((state) => state.pets.pendingPets);

  useEffect(() => {
    dispatch(getPendingPetsThunk());
  }, [dispatch]);

  const handleApprove = (id: number) => {
    dispatch(approvePetThunk(id));
  };

  const handleReject = (id: number) => {
    dispatch(rejectPetThunk(id));
  };

  return (
    <div>
      <h1>Pending Pet Approvals</h1>
      <ul>
        {pendingPets.map((pet: PetType) => (
          <li key={pet.id}>
            <h3>{pet.name}</h3>
            <p>{pet.description}</p>
            <button onClick={() => handleApprove(pet.id)}>Approve</button>
            <button onClick={() => handleReject(pet.id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
