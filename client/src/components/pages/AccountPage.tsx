import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  getPendingPetsThunk,
  approvePetThunk,
  rejectPetThunk,
} from '../../redux/slices/pet/petThunk';
import type { PetType } from '../../types/petTypes';
import OneFoundPetCard from '../ui/OneFoundPetCard';
import OneLostPetCard from '../ui/OneLostPetCard';

export default function AccountPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const pendingPets = useAppSelector((state) => state.pets.pendingPets);
  const user = useAppSelector((state) => state.auth.user);

  console.log(user);

  useEffect(() => {
    dispatch(getPendingPetsThunk()).catch(console.log);
  }, [dispatch]);

  const handleApprove = (id: number): void => {
    dispatch(approvePetThunk(id)).catch(console.log);
  };

  const handleReject = (id: number): void => {
    dispatch(rejectPetThunk(id)).catch(console.log);
  };

  const foundPets = pendingPets.filter((pet) => pet.petStatusId === 2);
  const lostPets = pendingPets.filter((pet) => pet.petStatusId === 1);

  return (
    <div className="container mx-auto p-4">
      {user.roleId === 2 ? (
        <>
          <div>
            <h1 className="text-2xl font-bold mb-4">Найденные питомцы ждут одобрения</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {foundPets.map((pet: PetType) => (
                <div key={pet.id} className="bg-white rounded-lg shadow-md p-4">
                  <OneFoundPetCard pet={pet} />
                  <div className="flex justify-between mt-4">
                    <button
                      type="submit"
                      onClick={() => handleApprove(pet.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Одобрить
                    </button>
                    <button
                      type="submit"
                      onClick={() => handleReject(pet.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Отклонить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <h1 className="text-2xl font-bold mb-4">Потерянные питомцы ждут одобрения</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lostPets.map((pet: PetType) => (
                <div key={pet.id} className="bg-white rounded-lg shadow-md p-4">
                  <OneLostPetCard pet={pet} />
                  <div className="flex justify-between mt-4">
                    <button
                      type="submit"
                      onClick={() => handleApprove(pet.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Одобрить
                    </button>
                    <button
                      type="submit"
                      onClick={() => handleReject(pet.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Отклонить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div>Личный кабинет</div>
      )}
    </div>
  );
}
