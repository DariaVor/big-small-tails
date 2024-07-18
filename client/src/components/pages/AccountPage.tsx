// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAllPetsOfUserThunk, getPendingPetsThunk } from '../../redux/slices/pet/petThunk';
import type { PetType } from '../../types/petTypes';
import OneFoundPetCard from '../ui/OneFoundPetCard';
import OneLostPetCard from '../ui/OneLostPetCard';

export default function AccountPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const pendingPets = useAppSelector((state) => state.pets.pendingPets);
  const pets = useAppSelector((state) => state.pets.pets);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user.roleId === 2) {
      dispatch(getPendingPetsThunk()).catch(console.log);
    } else if (user.roleId === 1) {
      dispatch(getAllPetsOfUserThunk()).catch(console.log);
    }
  }, [dispatch, user.roleId]);

  const userPendingPets =
    user.roleId === 1
      ? pets.filter(
          (pet) =>
            (pet.userId === user.id && pet.requestStatusId === 1) ||
            pet.requestStatusId === 2 ||
            pet.requestStatusId === 3 ||
            pet.requestStatusId === 4,
        )
      : pendingPets;

  const foundPets = userPendingPets.filter((pet) => pet.petStatusId === 2);
  const lostPets = userPendingPets.filter((pet) => pet.petStatusId === 1);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center space-x-4 mt-4 mb-3">
        <Link to="/lostaddpage">
          <button
            type="button"
            className="px-6 py-3 text-lg rounded-md bg-fuchsia-700 text-white hover:bg-fuchsia-800 font-rubik transition-transform transform hover:scale-105"
          >
            Я потерял питомца
          </button>
        </Link>
        <Link to="/foundaddpage">
          <button
            type="button"
            className="px-6 py-3 text-lg rounded-md bg-indigo-700 text-white hover:bg-indigo-800 font-rubik transition-transform transform hover:scale-105"
          >
            Я нашёл питомца
          </button>
        </Link>
      </div>
      {user.roleId === 2 && (
        <>
          <div className="mt-8 mb-8">
            {!lostPets.length ? (
              <h2 className="text-2xl font-semibold font-rubik mb-4">
                Нет заявок на потерянных питомцев
              </h2>
            ) : (
              <h2 className="text-2xl font-semibold font-rubik mb-4">
                Потерянные питомцы ждут одобрения
              </h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lostPets.map((pet: PetType) => (
                <OneLostPetCard key={pet.id} pet={pet} showButtons isAccountPage />
              ))}
            </div>
          </div>
          <div>
            {!foundPets.length ? (
              <h2 className="text-2xl font-semibold mb-4 font-rubik">
                Нет заявок на найденных питомцев
              </h2>
            ) : (
              <h2 className="text-2xl font-semibold mb-4 font-rubik">
                Найденные питомцы ждут одобрения
              </h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {foundPets.map((pet: PetType) => (
                <OneFoundPetCard key={pet.id} pet={pet} showButtons isAccountPage />
              ))}
            </div>
          </div>
        </>
      )}
      {user.roleId === 1 && (
        <>
          <h1 className="text-2xl font-bold mb-4">Добавленные питомцы</h1>
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
