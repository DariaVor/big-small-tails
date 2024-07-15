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
};

type OneLostPetCardProps = {
  pet: PetType;
  showButtons?: boolean;
};

export default function OneLostPetCard({ pet, showButtons }: OneLostPetCardProps): JSX.Element {
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
  });

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

  const handleEditPet = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(editedPet).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value as string | Blob);
      }
    });
    void dispatch(updateOnePetThunk({ id: pet.id, petForm: formData }));
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
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <Link to={`/pets/${pet.id}`}>
            <img
              className="h-48 w-full object-cover md:h-full md:w-48"
              src={`/img/${pet.image}`}
              alt="Lost Pet"
            />
          </Link>
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Потерянные
          </div>
          {pet.categoryId !== null && (
            <p className="block mt-1 text-lg leading-tight font-medium text-black">
              Категория: {getCategoryName(pet.categoryId)}
            </p>
          )}
          {pet.colorId !== null && (
            <p className="block mt-1 text-lg leading-tight font-medium text-black">
              Цвет: {getColorName(pet.colorId)}
            </p>
          )}
          {pet.description && <p className="mt-2 text-gray-500">Описание: {pet.description}</p>}
          {pet.location && <p className="mt-2 text-gray-500">Локация: {pet.location}</p>}
          <p className="mt-2 text-gray-500">Наличие ошейника: {pet.hasCollar ? 'Да' : 'Нет'}</p>
          {pet.contactInfo && (
            <p className="mt-2 text-gray-500">Контактная информация: {pet.contactInfo}</p>
          )}
          {pet.date && (
            <p className="mt-2 text-gray-500">Дата: {new Date(pet.date).toLocaleDateString()}</p>
          )}
          <div className="flex justify-between items-center mt-4">
          {showButtons && user.roleId === 2 && (
              <button
                type="submit"
                onClick={() => handleApprove(pet.id)}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Одобрить
              </button>
            )} {showButtons && user.roleId === 1 && (
              <AppModal
                title="Изменить информацию о питомце"
                buttonText="Редактировать"
                buttonVariant="bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                <form onSubmit={handleEditPet}>
                  <div className="mb-3">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                      Имя
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Введите имя питомца"
                      value={editedPet.name}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="categoryId"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Категория
                    </label>
                    <select
                      id="categoryId"
                      name="categoryId"
                      value={editedPet.categoryId || ''}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                    <label htmlFor="colorId" className="block text-gray-700 text-sm font-bold mb-2">
                      Цвет
                    </label>
                    <select
                      id="colorId"
                      name="colorId"
                      value={editedPet.colorId || ''}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                      className="block text-gray-700 text-sm font-bold mb-2"
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
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="location"
                      className="block text-gray-700 text-sm font-bold mb-2"
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
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="hasCollar"
                      className="block text-gray-700 text-sm font-bold mb-2"
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
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="contactInfo"
                      className="block text-gray-700 text-sm font-bold mb-2"
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
                    <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
                      Дата
                    </label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      value={editedPet.date || ''}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
                      Картинка
                    </label>
                    <input
                      id="image"
                      name="file"
                      type="file"
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="flex justify-end mt-3">
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                    >
                      Сохранить
                    </button>
                  </div>
                </form>
              </AppModal>
            )}
            {showButtons && user.roleId === 2 && (
              <button
                type="submit"
                onClick={() => handleReject(pet.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Отклонить
              </button>
            )} {showButtons && user.roleId === 1 && (
              <button
                type="button"
                onClick={() => handleDelete(pet.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Удалить
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
