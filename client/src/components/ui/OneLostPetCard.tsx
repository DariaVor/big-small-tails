import React, { useState } from 'react';
import { updateOnePetThunk } from '../../redux/slices/pet/petThunk';
import AppModal from './AppModal';
import { useAppDispatch } from '../../redux/hooks';

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
  onDelete: (id: number) => void;
};

export default function OneLostPetCard({ pet, onDelete }: OneLostPetCardProps): JSX.Element {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target;
    setEditedPet((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleEditPet = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault(); // Prevent default form submission behavior
    const formData = new FormData();
    Object.entries(editedPet).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value as string | Blob);
      }
    });
    void dispatch(updateOnePetThunk({ id: pet.id, petForm: formData }));
  };

  return (
    <div className="max-w-sm bg-white shadow-md rounded-lg overflow-hidden">
      <img src={`/img/${pet.image}`} alt="Lost Pet" className="w-full h-48 object-cover" />
      <div className="p-4">
        <h5 className="text-xl font-bold mb-2">Ищу {pet.name}</h5>
        {pet.categoryId !== null && <p className="text-gray-700">Категория: {pet.categoryId}</p>}
        {pet.colorId !== null && <p className="text-gray-700">Цвет: {pet.colorId}</p>}
        {pet.description && <p className="text-gray-700">Описание: {pet.description}</p>}
        {pet.location && <p className="text-gray-700">Локация: {pet.location}</p>}
        <p className="text-gray-700">Наличие ошейника: {pet.hasCollar ? 'Да' : 'Нет'}</p>
        {pet.contactInfo && (
          <p className="text-gray-700">Контактная информация: {pet.contactInfo}</p>
        )}
        {pet.date && (
          <p className="text-gray-700">Дата: {new Date(pet.date).toLocaleDateString()}</p>
        )}
        <div className="flex justify-between items-center mt-4">
          <AppModal
            title="Изменить информацию о питомце"
            buttonText="Редактировать"
            buttonVariant="bg-yellow-500 hover:bg-yellow-600 text-white"
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
                <label htmlFor="categoryId" className="block text-gray-700 text-sm font-bold mb-2">
                  Категория
                </label>
                <input
                  id="categoryId"
                  name="categoryId"
                  type="number"
                  placeholder="Введите категорию"
                  value={editedPet.categoryId || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="colorId" className="block text-gray-700 text-sm font-bold mb-2">
                  Цвет
                </label>
                <input
                  id="colorId"
                  name="colorId"
                  type="number"
                  placeholder="Введите цвет"
                  value={editedPet.colorId || ''}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
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
                <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
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
                <label htmlFor="hasCollar" className="block text-gray-700 text-sm font-bold mb-2">
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
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="contactInfo" className="block text-gray-700 text-sm font-bold mb-2">
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
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </AppModal>
          <button
            type="button"
            onClick={() => onDelete(pet.id)}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}
