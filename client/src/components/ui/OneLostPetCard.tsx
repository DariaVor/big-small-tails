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
          <div className="uppercase tracking-wide text-sm text-violet-500 font-semibold font-rubik">
            Потерянные
          </div>
          {pet.categoryId !== null && (
            <p className="block mt-1 text-lg leading-tight font-medium text-black font-rubik">
              Категория: {getCategoryName(pet.categoryId)}
            </p>
          )}
          {pet.colorId !== null && (
            <p className="block mt-1 text-lg leading-tight font-medium text-black font-rubik">
              Цвет: {getColorName(pet.colorId)}
            </p>
          )}
          {pet.description && <p className="mt-2 text-gray-500 font-rubik">Описание: {pet.description}</p>}
          {pet.location && <p className="mt-2 text-gray-500 font-rubik">Локация: {pet.location}</p>}
          <p className="mt-2 text-gray-500 font-rubik">Наличие ошейника: {pet.hasCollar ? 'Да' : 'Нет'}</p>
          {pet.contactInfo && (
            <p className="mt-2 text-gray-500 font-rubik">Контактная информация: {pet.contactInfo}</p>
          )}
          {pet.date && (
            <p className="mt-2 text-gray-500 font-rubik">Дата: {new Date(pet.date).toLocaleDateString()}</p>
          )}
          <div className="flex justify-between items-center mt-4">
            {showButtons && user.roleId === 2 && (
              <button
                type="submit"
                onClick={() => handleApprove(pet.id)}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-rubik font-semibold"
              >
                Одобрить
              </button>
            )}{' '}
            {showButtons && user.roleId === 1 && (
              <AppModal
                title="Изменить информацию о питомце"
                buttonText="Редактировать"
                buttonVariant="bg-indigo-500 hover:bg-indigo-600 text-white"
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
              >
                {(closeModal) => (
                  <form onSubmit={(e) => handleEditPet(e, closeModal)}>
                    <div className="mb-3">
                      <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 font-rubik">
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
                      <label htmlFor="date" className="font-rubik block text-gray-700 text-sm font-bold mb-2">
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
                      <label htmlFor="image" className="font-rubik block text-gray-700 text-sm font-bold mb-2">
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
            {showButtons && user.roleId === 2 && (
              <button
                type="submit"
                onClick={() => handleReject(pet.id)}
                className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 font-rubik font-semibold"
              >
                Отклонить
              </button>
            )}
            {showButtons && user.roleId === 1 && (
              <button
                type="button"
                onClick={() => handleDelete(pet.id)}
                className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 font-rubik font-semibold"
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
