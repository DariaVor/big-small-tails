/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppModal from './AppModal';
import { approvePetThunk, deleteOnePetThunk, rejectPetThunk, updateOnePetThunk } from '../../redux/slices/pet/petThunk';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import type { RootState } from '../../redux/store';
import {
  getCategoriesThunk,
  getColorsThunk,
} from '../../redux/slices/catandcolor/catandcolorThunk';

type PetType = {
  id: number;
  name: string;
  petStatusId: number;
  categoryId: number | null;
  colorId: number | null;
  description: string;
  location: string | null;
  image: string;
  hasCollar: boolean;
  contactInfo: string | null;
  date: string | null; // ISO 8601 date string
  requestStatusId: number | null;
};

type OneLostPetCardProps = {
  pet: PetType;
  showButtons?: boolean;
  isAccountPage?: boolean;
};

export default function OneLostPetCard({
  pet,
  showButtons,
  isAccountPage = true,
}: OneLostPetCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [editedPet, setEditedPet] = useState({
    name: pet.name,
    categoryId: pet.categoryId,
    colorId: pet.colorId,
    description: pet.description,
    location: pet.location,
    hasCollar: pet.hasCollar,
    contactInfo: pet.contactInfo,
    date: pet.date,
    image: null,
    requestStatusId: pet.requestStatusId,
  });

  const [modalVisible, setModalVisible] = useState(false);

  const categories = useAppSelector((state: RootState) => state.data.categories);
  const colors = useAppSelector((state: RootState) => state.data.colors);
  const user = useAppSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    dispatch(getCategoriesThunk()).catch(console.log);
    dispatch(getColorsThunk()).catch(console.log);
  }, [dispatch]);

  const handleDelete = (id: number): void => {
    void dispatch(deleteOnePetThunk(id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target;
    setEditedPet((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleEditPet = (
    e: React.FormEvent<HTMLFormElement>,
    closeModal: () => void,
  ): Promise<void> => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(editedPet).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value as string | Blob);
      }
    });
    void dispatch(updateOnePetThunk({ id: pet.id, petForm: formData }));
    closeModal();
  };

  const getCategoryName = (id: number | null) => {
    const category = categories.find((cat) => cat.id === id);
    return category ? category.category : 'Неизвестно';
  };

  const getColorName = (id: number | null) => {
    const color = colors.find((col) => col.id === id);
    return color ? color.color : 'Неизвестно';
  };

  const handleApprove = (id: number): void => {
    dispatch(approvePetThunk(id)).catch(console.log);
  };

  const handleReject = (id: number): void => {
    dispatch(rejectPetThunk(id)).catch(console.log);
  };

  return (
    <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
        <div className="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
          <Link to={`/pets/${pet.id}`}>
            <img
              className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
              style={{ aspectRatio: '1 / 1' }}
              src={`/img/${pet.image}`}
              alt="Потерянный питомец"
            />
          </Link>
        </div>
        <div className="p-8 relative flex flex-col justify-between flex-grow">
        {isAccountPage && user.roleId === 1 && pet.requestStatusId === 1 && (
            <div className="mb-2 uppercase tracking-wide text-sm text-indigo-700 font-semibold font-rubik">
              Ожидает одобрения
            </div>
          )}
          {isAccountPage && user.roleId === 1 && pet.requestStatusId === 2 && (
            <div className="mb-2 uppercase tracking-wide text-sm text-teal-600 font-semibold font-rubik">
              Одобрено
            </div>
          )}
          {isAccountPage && user.roleId === 1 && pet.requestStatusId === 4 && (
            <div className="mb-2 uppercase tracking-wide text-sm text-rose-600 font-semibold font-rubik">
              Отклонено
            </div>
          )}
          <div className="uppercase tracking-wide text-sm text-fuchsia-700 font-semibold font-rubik">
            Потерян
          </div>
          {pet.categoryId !== null && (
            <p className="block mt-1 text-lg leading-tight font-medium text-black font-rubik truncate">
              {getCategoryName(pet.categoryId)}
            </p>
          )}
          {pet.colorId !== null && (
            <p className="mt-2 text-gray-500 font-rubik truncate">
              Цвет: {getColorName(pet.colorId)}
            </p>
          )}
          {pet.description && (
            <p className="mt-2 text-gray-500 font-rubik line-clamp-1">Описание: {pet.description}</p>
          )}
          {pet.location && <p className="mt-2 text-gray-500 font-rubik truncate">Локация: {pet.location}</p>}
          <p className="mt-2 text-gray-500 font-rubik truncate">
            Наличие ошейника: {pet.hasCollar ? 'Присутствует' : 'Отсутствует'}
          </p>
          {pet.date && (
            <p className="mt-2 text-gray-500 font-rubik truncate">
              Дата: {new Date(pet.date).toLocaleDateString('ru-RU')}
            </p>
          )}
          <div className="flex justify-between items-center mt-4">
            {isAccountPage && showButtons && user.roleId === 2 && (
              <button
                type="submit"
                onClick={() => handleApprove(pet.id)}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 font-rubik font-semibold transition-transform transform hover:scale-105"
              >
                Одобрить
              </button>
            )}{' '}
            {isAccountPage && showButtons && user.roleId === 1 && (
              <AppModal
                title="Изменить информацию о питомце"
                buttonText="Редактировать"
                buttonVariant="bg-indigo-500 hover:bg-indigo-600 text-white transition-transform transform hover:scale-105"
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
              >
                {(closeModal) => (
                  <form onSubmit={(e) => handleEditPet(e, closeModal)}>
                    <div className="mb-3">
                      <label
                        htmlFor="name"
                        className="block text-gray-700 text-sm font-bold mb-2 font-rubik"
                      >
                        Имя
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Введите имя питомца"
                        value={editedPet.name}
                        onChange={handleChange}
                        className="font-rubik shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="categoryId"
                        className="font-rubik block text-gray-700 text-sm font-bold mb-2"
                      >
                        Категория
                      </label>
                      <select
                        id="categoryId"
                        name="categoryId"
                        value={editedPet.categoryId || ''}
                        onChange={handleChange}
                        className="font-rubik block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="">Выберите категорию</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="colorId"
                        className="font-rubik block text-gray-700 text-sm font-bold mb-2"
                      >
                        Цвет
                      </label>
                      <select
                        id="colorId"
                        name="colorId"
                        value={editedPet.colorId || ''}
                        onChange={handleChange}
                        className="font-rubik block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="">Выберите цвет</option>
                        {colors.map((color) => (
                          <option key={color.id} value={color.id}>
                            {color.color}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="description"
                        className="font-rubik block text-gray-700 text-sm font-bold mb-2"
                      >
                        Описание
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows="3"
                        placeholder="Введите описание"
                        value={editedPet.description}
                        onChange={handleChange}
                        className="font-rubik shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="location"
                        className="font-rubik block text-gray-700 text-sm font-bold mb-2"
                      >
                        Локация
                      </label>
                      <input
                        id="location"
                        name="location"
                        type="text"
                        placeholder="Введите локацию"
                        value={editedPet.location || ''}
                        onChange={handleChange}
                        className="font-rubik shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="hasCollar"
                        className="font-rubik block text-gray-700 text-sm font-bold mb-2"
                      >
                        Наличие ошейника
                      </label>
                      <input
                        id="hasCollar"
                        name="hasCollar"
                        type="checkbox"
                        checked={editedPet.hasCollar}
                        onChange={(e) =>
                          setEditedPet((prev) => ({ ...prev, hasCollar: e.target.checked }))
                        }
                        className="font-rubik h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="contactInfo"
                        className="font-rubik block text-gray-700 text-sm font-bold mb-2"
                      >
                        Контактная информация
                      </label>
                      <input
                        id="contactInfo"
                        name="contactInfo"
                        type="text"
                        placeholder="Введите контактную информацию"
                        value={editedPet.contactInfo || ''}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="date"
                        className="font-rubik block text-gray-700 text-sm font-bold mb-2"
                      >
                        Дата
                      </label>
                      <input
                        id="date"
                        name="date"
                        type="date"
                        value={editedPet.date || ''}
                        onChange={handleChange}
                        className="font-rubik shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="image"
                        className="font-rubik block text-gray-700 text-sm font-bold mb-2"
                      >
                        Картинка
                      </label>
                      <input
                        id="image"
                        name="file"
                        type="file"
                        onChange={handleChange}
                        className="font-rubik shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="flex justify-end mt-3">
                      <button
                        type="submit"
                        className="font-rubik rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600"
                      >
                        Сохранить
                      </button>
                    </div>
                  </form>
                )}
              </AppModal>
            )}
            {isAccountPage && showButtons && user.roleId === 2 && (
              <button
                type="submit"
                onClick={() => handleReject(pet.id)}
                className="px-4 py-2 bg-rose-300 text-white rounded-lg hover:bg-rose-400 font-rubik font-semibold transition-transform transform hover:scale-105"
              >
                Отклонить
              </button>
            )}
            {isAccountPage && showButtons && user.roleId === 1 && (
              <button
                type="button"
                onClick={() => handleDelete(pet.id)}
                className="px-4 py-2 bg-rose-300 text-white rounded-lg hover:bg-rose-400 font-rubik font-semibold transition-transform transform hover:scale-105"
              >
                Удалить
              </button>
            )}
            {user.roleId === 2 && !isAccountPage && (
              <button
                type="button"
                onClick={() => handleDelete(pet.id)}
                className="px-4 py-2 bg-rose-300 text-white rounded-lg hover:bg-rose-400 font-semibold font-rubik transition-transform transform hover:scale-105"
              >
                Удалить
              </button>
            )}
          </div>
        </div>
    </div>
  );
}
