// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PhoneInput from 'react-phone-input-2';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import { addPetThunk } from '../../redux/slices/pet/petThunk';
import type { RootState } from '../../redux/store';
import {
  getCategoriesThunk,
  getColorsThunk,
} from '../../redux/slices/catandcolor/catandcolorThunk';
import 'react-phone-input-2/lib/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import getAddress from '../../services/getAddress';
import svgUrl from '../../../public/JSON/Anim6.json';
import svgUrl2 from '../../../public/JSON/Anim3.json';

type CategoryType = {
  id: number;
  category: string;
};

type ColorType = {
  id: number;
  color: string;
};

export default function LostPetForm(): JSX.Element {
  const dispatch = useDispatch();
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State для предварительного просмотра изображения
  const navigate = useNavigate();
  const [locActive, setLocActive] = useState(true);

  const [formState, setFormState] = useState({
    name: '',
    categoryId: '',
    colorId: '',
    description: '',
    location: '',
    hasCollar: false,
    contactInfo: '',
    date: new Date(),
    petStatusId: '1',
  });

  const categories = useSelector((state: RootState) => state.data.categories);
  const colors = useSelector((state: RootState) => state.data.colors);

  useEffect(() => {
    void dispatch(getCategoriesThunk());
    void dispatch(getColorsThunk());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(formState).forEach(([key, value]) => {
      formData.append(key, value instanceof Date ? value.toISOString() : value);
    });
    if (file) {
      formData.append('file', file);
    }
    void dispatch(addPetThunk(formData));
    navigate('/account');
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      previewImage(e.dataTransfer.files[0]); // Предварительный просмотр изображения при перетаскивании
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      previewImage(e.target.files[0]); // Предварительный просмотр изображения при выборе файла
    }
  };

  const handleGetLocation = async () => {
    setLocActive(!locActive);
    const address = await getAddress();
    setFormState((prevState) => ({
      ...prevState,
      location: address || '',
    }));
  };

  const previewImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setFile(null);
    setImagePreview(null); // Очистка предварительного просмотра при удалении файла
  };

  const handleCategoryClick = (id: number) => {
    setFormState((prevState) => ({
      ...prevState,
      categoryId: prevState.categoryId === id.toString() ? '' : id.toString(),
    }));
  };

  const handleColorClick = (id: number) => {
    setFormState((prevState) => ({
      ...prevState,
      colorId: prevState.colorId === id.toString() ? '' : id.toString(),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto p-4 max-w-2xl">
        <form onSubmit={handleSubmit} className="w-full bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-center font-rubik">
            Форма для потерянного питомца
          </h2>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 font-rubik">
              Укажите имя
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Введите имя"
              value={formState.name}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm p-3 font-rubik"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 font-rubik">
              Кого ищем?
            </label>
            <div className="flex space-x-2">
              {categories.map((category: CategoryType) => (
                <button
                  type="button"
                  key={category.id}
                  className={`flex-grow px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-600 font-rubik ${
                    formState.categoryId === category.id.toString()
                      ? 'bg-violet-200'
                      : 'bg-gray-100'
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.category}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 font-rubik">
              Цвет вашего питомца?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {colors.map((color: ColorType) => (
                <button
                  type="button"
                  key={color.id}
                  className={`w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-600 font-rubik ${
                    formState.colorId === color.id.toString() ? 'bg-violet-200' : 'bg-gray-100'
                  }`}
                  onClick={() => handleColorClick(color.id)}
                >
                  {color.color}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2 font-rubik"
            >
              Опишите дополнительную информацию о пропавшем питомце
            </label>
            <textarea
              id="description"
              name="description"
              rows={5}
              placeholder="Введите описание"
              value={formState.description}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm p-3 font-rubik"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-gray-700 text-sm font-bold mb-2 font-rubik"
            >
              Укажите место, где потерялся питомец
            </label>
            <div className="flex">
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Введите локацию"
                value={formState.location}
                onChange={handleInputChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm p-3 font-rubik"
              />
              <div className="" onClick={handleGetLocation}>
                <Player
                  src={locActive || formState.location ? svgUrl : svgUrl2}
                  background="#ffffff"
                  speed={1}
                  loop
                  autoplay
                  direction={1}
                  className="w-[55px] h-[55px] transition-all duration-1000"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2 font-rubik">
              Когда потерялся питомец?
            </label>
            <DatePicker
              selected={formState.date}
              onChange={(date: Date) => setFormState((prevState) => ({ ...prevState, date }))}
              dateFormat="dd.MM.yyyy"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm p-3 font-rubik"
            />
          </div>

          <div className="mb-4 flex items-center">
            <input
              id="hasCollar"
              name="hasCollar"
              type="checkbox"
              checked={formState.hasCollar}
              onChange={(e) =>
                setFormState((prevState) => ({
                  ...prevState,
                  hasCollar: e.target.checked,
                }))
              }
              className="h-4 w-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
            />
            <label
              htmlFor="hasCollar"
              className="ml-2 block text-gray-700 text-sm font-bold font-rubik"
            >
              Был ли ошейник?
            </label>
          </div>

          <div className="mb-4">
            <label
              htmlFor="contactInfo"
              className="block text-gray-700 text-sm font-bold mb-2 font-rubik"
            >
              Контактная информация
            </label>
            <PhoneInput
              country="ru"
              value={formState.contactInfo}
              onChange={(value) =>
                setFormState((prevState) => ({
                  ...prevState,
                  contactInfo: value,
                }))
              }
              inputClass="w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm p-3 font-rubik"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray-700 text-sm font-bold mb-2 font-rubik"
            >
              Добавьте фотографию вашего питомца
            </label>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`mt-2 flex justify-center rounded-lg border-2 border-dashed ${
                dragActive ? 'border-indigo-600' : 'border-gray-300'
              } px-6 py-10`}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="mx-auto h-32" />
              ) : (
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-300"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 16V4a4 4 0 014-4h8m0 0h16m0 0h8a4 4 0 014 4v12m-8 0H12M4 16l16 16m0-16h16m-8 0v32m-8-8h8m-8 0h-8a4 4 0 01-4-4V20m16 24v-4M8 32l8-8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  <div className="mt-4 flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-violet-800 hover:text-violet-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-violet-500 focus-within:ring-offset-2 font-rubik"
                    >
                      <span>Загрузите файл</span>
                      <input
                        id="file-upload"
                        name="file"
                        type="file"
                        className="sr-only"
                        onChange={handleChange}
                      />
                    </label>
                    <p className="pl-1 font-rubik">или перетащите сюда</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF до 10MB</p>
                </div>
              )}
              {file && (
                <div className="mt-2 text-center">
                  <p className="text-xs text-green-500">{file.name}</p>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="text-xs text-rose-600 underline"
                  >
                    Удалить
                  </button>
                </div>
              )}
            </div>
          </div>

          <input type="hidden" name="petStatusId" value={formState.petStatusId} />

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900 font-rubik"
              onClick={() => {
                setFormState({
                  name: '',
                  categoryId: '',
                  colorId: '',
                  description: '',
                  location: '',
                  hasCollar: false,
                  contactInfo: '',
                  date: new Date(),
                  petStatusId: '1',
                });
                navigate('/');
              }}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="rounded-md bg-violet-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600 font-rubik"
            >
              Добавить питомца
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
