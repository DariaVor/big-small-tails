// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getOnePetThunk } from '../../redux/slices/pet/petThunk';

type PetStatus = {
  status: string;
};

type Category = {
  category: string;
};

type Color = {
  color: string;
};

type User = {
  username: string;
  email: string;
};

type Pet = {
  name: string;
  image: string;
  PetStatus: PetStatus;
  Category: Category;
  Color: Color;
  description: string;
  location: string;
  hasCollar: boolean;
  contactInfo: string;
  date: string;
  User: User;
};

export default function PetDetailPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const pet = useAppSelector((state) => state.pets.onePet) as Pet | null;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getOnePetThunk(Number(id))).catch(console.log);
    }
  }, [dispatch, id]);

  const openModal = (): void => {
    setShowModal(true);
  };

  const closeModal = (): void => {
    setShowModal(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      openModal();
    }
  };

  if (!pet) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto px-4 mt-8 py-8 bg-white shadow-md rounded-lg mb-8">
        <div className="text-center mb-8">
          {pet?.name !== 'Имя отсутствует' && (
            <h1 className="text-3xl font-semibold mb-7 font-rubik ">{pet?.name}</h1>
          )}

          <div
            role="button"
            tabIndex={0}
            className="focus:outline-none"
            onClick={openModal}
            onKeyDown={handleKeyDown}
          >
            <img
              src={`/img/${pet?.image}`}
              alt={pet?.name}
              className="mx-auto rounded-lg shadow-md cursor-pointer object-cover h-64 w-full sm:h-80 md:h-96 lg:h-108 transition-transform duration-300 transform hover:scale-105"
            />
          </div>
        </div>
        <div className="border-t border-gray-200 py-4">
          <dl className="divide-y divide-gray-200">
            <div className="py-2">
              <dt className="text-sm font-medium text-gray-500 font-rubik">Статус</dt>
              <dd className="mt-1 text-lg text-gray-900 font-rubik">{pet?.PetStatus?.status}</dd>
            </div>
            <div className="py-2">
              <dt className="text-sm font-medium text-gray-500 font-rubik">Вид</dt>
              <dd className="mt-1 text-lg text-gray-900 font-rubik">{pet?.Category?.category}</dd>
            </div>
            <div className="py-2">
              <dt className="text-sm font-medium text-gray-500 font-rubik">Раскрас</dt>
              <dd className="mt-1 text-lg text-gray-900 font-rubik">{pet?.Color?.color}</dd>
            </div>
            <div className="py-2">
              <dt className="text-sm font-medium text-gray-500 font-rubik">Описание</dt>
              <dd className="mt-1 text-lg text-gray-900 font-rubik">{pet?.description}</dd>
            </div>
            <div className="py-2">
              <dt className="text-sm font-medium text-gray-500 font-rubik">Местонахождение</dt>
              <dd className="mt-1 text-lg text-gray-900 font-rubik">{pet?.location}</dd>
            </div>
            <div className="py-2">
              <dt className="text-sm font-medium text-gray-500 font-rubik">Наличие ошейника</dt>
              <dd className="mt-1 text-lg text-gray-900 font-rubik">
                {pet?.hasCollar ? 'Присутствует' : 'Отсутствует'}
              </dd>
            </div>
            <div className="py-2">
              <dt className="text-sm font-medium text-gray-500 font-rubik">Контактная информация</dt>
              <dd className="mt-1 text-lg text-gray-900 font-rubik">+{pet?.contactInfo}</dd>
            </div>
            <div className="py-2">
              <dt className="text-sm font-medium text-gray-500 font-rubik">
                {pet?.PetStatus?.status === 'Найден' ? 'Дата нахождения' : 'Дата потери'}
              </dt>
              <dd className="mt-1 text-lg text-gray-900 font-rubik">
                {new Date(pet?.date).toLocaleDateString('ru-RU')}
              </dd>
            </div>
            <div className="py-2">
              <dt className="text-sm font-medium text-gray-500 font-rubik">Добавлено</dt>
              <dd className="mt-1 text-lg text-gray-900 font-rubik">{pet?.User?.username}</dd>
            </div>
          </dl>
        </div>

        {showModal && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={closeModal}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                closeModal();
              }
            }}
            role="button"
            tabIndex={0}
          >
            <div className="max-w-3xl mx-auto">
              <img
                src={`/img/${pet?.image}`}
                alt={pet?.name}
                className="rounded-lg shadow-lg max-h-screen max-w-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
