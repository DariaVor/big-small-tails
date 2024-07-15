import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAllPetsOfUserThunk, getPendingPetsThunk } from '../../redux/slices/pet/petThunk';
import type { PetType } from '../../types/petTypes';
import OneFoundPetCard from '../ui/OneFoundPetCard';
import OneLostPetCard from '../ui/OneLostPetCard';

export default function AccountPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const pendingPets = useAppSelector((state) => state.pets.pendingPets);
  const pets = useAppSelector((state) => state.pets.pets)
  const user = useAppSelector((state) => state.auth.user);

  console.log(pets)

  useEffect(() => {
    if (user.roleId === 2) {
      dispatch(getPendingPetsThunk()).catch(console.log);
    } else if (user.roleId === 1) {
      dispatch(getAllPetsOfUserThunk()).catch(console.log);
    }
  }, [dispatch, user.roleId]);

  const userPendingPets = user.roleId === 1 ? pets.filter(pet => pet.userId === user.id) : pendingPets;

  console.log(userPendingPets);

  const foundPets = userPendingPets.filter((pet) => pet.petStatusId === 2);
  const lostPets = userPendingPets.filter((pet) => pet.petStatusId === 1);

  return (
    <div className="container mx-auto p-4">
      {user.roleId === 2 && (
        <>
          <div>
            <h1 className="text-2xl font-bold mb-4">Найденные питомцы ждут одобрения</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {foundPets.map((pet: PetType) => (
                <OneFoundPetCard key={pet.id} pet={pet} showButtons />
              ))}
            </div>
          </div>
          <div className="mt-8">
            <h1 className="text-2xl font-bold mb-4">Потерянные питомцы ждут одобрения</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lostPets.map((pet: PetType) => (
                <OneLostPetCard key={pet.id} pet={pet} showButtons />
              ))}
            </div>
          </div>
        </>
      )}
      {user.roleId === 1 && (
        <>
          <h1 className="text-2xl font-bold mb-4">Ваши питомцы ждут одобрения</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {foundPets.map((pet: PetType) => (
              <OneFoundPetCard key={pet.id} pet={pet} showButtons />
            ))}
            {lostPets.map((pet: PetType) => (
              <OneLostPetCard key={pet.id} pet={pet} showButtons />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

