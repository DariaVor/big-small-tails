import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAllLostPetsThunk } from '../../redux/slices/pet/petThunk';
import OneLostPetCard from '../ui/OneLostPetCard';
import LostPetForm from '../ui/LostPetForm';

export default function LostPetPage(): JSX.Element {
  const pets = useAppSelector((store) => store.pets.lostPets);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getAllLostPetsThunk());
  }, [dispatch]);



  return (
    <div className="container mx-auto p-4">
      <LostPetForm />
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pets.map((pet) => (
          <OneLostPetCard key={pet.id} pet={pet}/>
        ))}
      </div>
    </div>
  );
}
