import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAllFoundPetsThunk, deleteOnePetThunk } from '../../redux/slices/pet/petThunk';
import OneFoundPetCard from '../ui/OneFoundPetCard';

export default function FoundPetPage(): JSX.Element {
  const pets = useAppSelector((store) => store.pets.foundPets);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getAllFoundPetsThunk());
  }, [dispatch]);

  const handleDelete = (id: number): void => {
    void dispatch(deleteOnePetThunk(id));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mt-4 flex flex-wrap justify-center">
        {pets.map((pet) => (
          <div key={pet.id} className="mr-4 mb-4">
            <OneFoundPetCard pet={pet} onDelete={handleDelete} />
          </div>
        ))}
      </div>
    </div>
  );
}
