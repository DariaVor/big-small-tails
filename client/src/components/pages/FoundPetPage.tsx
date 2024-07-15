import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAllFoundPetsThunk } from '../../redux/slices/pet/petThunk';
import OneFoundPetCard from '../ui/OneFoundPetCard';
import FoundPetForm from '../ui/FoundPetForm';

export default function FoundPetPage(): JSX.Element {
  const pets = useAppSelector((store) => store.pets.foundPets);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getAllFoundPetsThunk());
  }, [dispatch]);
  

  return (
    <div className="container mx-auto p-4">
      <FoundPetForm />
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pets.map((pet) => (
          <OneFoundPetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
}
