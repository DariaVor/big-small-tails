import React from 'react';
import { useDispatch } from 'react-redux';
import { addPetThunk } from '../../redux/slices/pet/petThunk';

export default function FoundPetForm(): JSX.Element {
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    void dispatch(addPetThunk(formData));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <label htmlFor="categoryId" className="block text-gray-700 text-sm font-bold mb-2">
          Категория:
        </label>
        <input
          id="categoryId"
          name="categoryId"
          type="number"
          placeholder="Введите категорию"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="colorId" className="block text-gray-700 text-sm font-bold mb-2">
          Цвет:
        </label>
        <input
          id="colorId"
          name="colorId"
          type="number"
          placeholder="Введите цвет"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
          Описание:
        </label>
        <textarea
          id="description"
          name="description"
          rows="3"
          placeholder="Введите описание"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
          Локация:
        </label>
        <input
          id="location"
          name="location"
          type="text"
          placeholder="Введите локацию"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="hasCollar" className="block text-gray-700 text-sm font-bold mb-2">
          Наличие ошейника:
        </label>
        <input
          id="hasCollar"
          name="hasCollar"
          type="checkbox"
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="contactInfo" className="block text-gray-700 text-sm font-bold mb-2">
          Контактная информация:
        </label>
        <input
          id="contactInfo"
          name="contactInfo"
          type="text"
          placeholder="Введите контактную информацию"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
          Дата:
        </label>
        <input
          id="date"
          name="date"
          type="date"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
          Добавьте картинку:
        </label>
        <input
          id="image"
          name="file"
          type="file"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <input type="hidden" name="petStatusId" value="2" />

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Добавить питомца
      </button>
    </form>
  );
}
