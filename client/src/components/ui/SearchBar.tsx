/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-lonely-if */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

type CategoryType = {
  id: number;
  category: string;
};

type ColorType = {
  id: number;
  color: string;
};

type SearchBarProps = {
  onSearchChange: (term: string) => void;
  onCategoryChange: (id: number) => void;
  onColorChange: (id: number) => void;
  onCollarChange: (value: boolean | null) => void;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  selectedCategories: number[];
  selectedColors: number[];
  categories: CategoryType[];
  colors: ColorType[];
};

function SearchBar({
  onSearchChange,
  onCategoryChange,
  onColorChange,
  onCollarChange,
  onStartDateChange,
  onEndDateChange,
  selectedCategories,
  selectedColors,
  categories,
  colors,
}: SearchBarProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const [hasCollar, setHasCollar] = useState<boolean | null>(null);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    onCollarChange(hasCollar);
  }, [hasCollar]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearchChange(term);
    setShowFilters(true);
  };

  const handleCollarChange = (value: boolean | null): void => {
    if (value === null) {
      // Show items with both true and false
      setHasCollar(null);
      onCollarChange(null);
    } else {
      if (value === hasCollar) {
        setHasCollar(null);
        onCollarChange(null);
      } else {
        setHasCollar(value);
        onCollarChange(value);
      }
    }
  };

  const handleDateRangeChange = (values: [number, number]): void => {
    const [start, end] = values.map((val) => new Date(val));
    setDateRange([start, end]);
    onStartDateChange(start);
    onEndDateChange(end);
  };

  const handleCategoryChange = (id: number): void => {
    onCategoryChange(id);
  };

  const handleColorChange = (id: number): void => {
    onColorChange(id);
  };

  const handleRemoveCategory = (id: number): void => {
    onCategoryChange(id);
  };

  const handleRemoveColor = (id: number): void => {
    onColorChange(id);
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setShowFilters(false);
  };

  return (
    <div
      className={`sticky top-0 z-20 p-4 bg-white shadow-md rounded-md ${isMobileView ? 'w-full' : 'w-full sm:w-64 sm:flex-shrink-0'}`}
    >
      <div className="relative flex items-center space-x-10 mb-0 mt-0 mx-0">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Поиск..."
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 w-full"
          onClick={() => setShowFilters(true)}
        />
        {isMobileView && showFilters && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            &times;
          </button>
        )}
      </div>

      {isMobileView && showFilters && (
        <>
          <div className="flex flex-wrap gap-2 mb-4 mt-4">
            {categories.map((category) => (
              <button
                type="button"
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-2 py-1 rounded-full ${
                  selectedCategories.includes(category.id)
                    ? 'bg-blue-500 text-white'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {category.category}
              </button>
            ))}
            {colors.map((color) => (
              <button
                type="button"
                key={color.id}
                onClick={() => handleColorChange(color.id)}
                className={`px-2 py-1 rounded-full ${
                  selectedColors.includes(color.id)
                    ? 'bg-green-500 text-white'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {color.color}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleCollarChange(true)}
              className={`px-2 py-1 rounded-full ${
                hasCollar === true ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-700'
              }`}
            >
              Есть ошейник
            </button>
            <button
              type="button"
              onClick={() => handleCollarChange(false)}
              className={`px-2 py-1 rounded-full ${
                hasCollar === false ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-700'
              }`}
            >
              Нет ошейника
            </button>
            <button
              type="button"
              onClick={() => handleCollarChange(null)}
              className={`px-2 py-1 rounded-full ${
                hasCollar === null ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-700'
              }`}
            >
              Неважно
            </button>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 font-rubik">Дата</h3>
            <div className="px-2">
              <Slider
                range
                min={new Date('2024-01-01').getTime()}
                max={new Date().getTime()}
                step={24 * 60 * 60 * 1000}
                defaultValue={[
                  dateRange[0]?.getTime() || new Date('2024-01-01').getTime(),
                  dateRange[1]?.getTime() || new Date().getTime(),
                ]}
                onChange={handleDateRangeChange}
                tipFormatter={(value) => formatDate(new Date(value))}
                className="mb-2"
                railStyle={{ backgroundColor: '#5c21b5', height: 2 }}
                handleStyle={{
                  borderColor: '#5c21b5',
                  height: 14,
                  width: 14,
                  marginLeft: -7,
                  marginTop: -6,
                  backgroundColor: '#5c21b5',
                }}
                trackStyle={{ backgroundColor: '#5c21b5', height: 2 }}
              />
              <div className="flex justify-between text-sm font-semibold font-rubik">
                <span>{dateRange[0] ? formatDate(dateRange[0]) : 'Дата начала'}</span>
                <span>{dateRange[1] ? formatDate(dateRange[1]) : 'Дата окончания'}</span>
              </div>
            </div>
          </div>
        </>
      )}

      {!isMobileView && (
        <>
          <div className="flex flex-wrap mb-4 mt-4">
            {selectedCategories.map((id) => (
              <div
                key={id}
                className="flex items-center bg-blue-100 px-2 py-1 rounded-full mr-2 mb-2"
              >
                <span className="text-sm text-blue-700">
                  {categories.find((cat) => cat.id === id)?.category}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(id)}
                  className="ml-1 text-rose-500 hover:text-rose-700"
                >
                  &times;
                </button>
              </div>
            ))}
            {selectedColors.map((id) => (
              <div
                key={id}
                className="flex items-center bg-green-100 px-2 py-1 rounded-full mr-2 mb-2"
              >
                <span className="text-sm text-green-700">
                  {colors.find((color) => color.id === id)?.color}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveColor(id)}
                  className="ml-1 text-rose-500 hover:text-rose-700"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col mb-4">
            <h3 className="text-lg font-semibold mb-2 font-rubik">Категории</h3>
            <div className="flex flex-col space-y-2">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                    className="form-checkbox h-4 w-4 text-blue-600 rounded"
                  />
                  <span className="text-sm font-rubik">{category.category}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <h3 className="text-lg font-semibold mb-2 font-rubik">Цвета</h3>
            <div className="flex flex-col space-y-2">
              {colors.map((color) => (
                <label key={color.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedColors.includes(color.id)}
                    onChange={() => handleColorChange(color.id)}
                    className="form-checkbox h-4 w-4 text-green-600 rounded"
                  />
                  <span className="text-sm font-rubik">{color.color}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <h3 className="text-lg font-semibold mb-2 font-rubik">Наличие ошейника</h3>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="collar"
                  checked={hasCollar === true}
                  onChange={() => handleCollarChange(true)}
                  className="form-radio h-4 w-4 text-purple-600"
                />
                <span className="text-sm font-rubik">Есть</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="collar"
                  checked={hasCollar === false}
                  onChange={() => handleCollarChange(false)}
                  className="form-radio h-4 w-4 text-purple-600"
                />
                <span className="text-sm font-rubik">Нет</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="collar"
                  checked={hasCollar === null}
                  onChange={() => handleCollarChange(null)}
                  className="form-radio h-4 w-4 text-purple-600"
                />
                <span className="text-sm font-rubik">Неважно</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-2 font-rubik">Дата</h3>
            <div className="px-2">
              <Slider
                range
                min={new Date('2024-01-01').getTime()}
                max={new Date().getTime()}
                step={24 * 60 * 60 * 1000}
                defaultValue={[
                  dateRange[0]?.getTime() || new Date('2024-01-01').getTime(),
                  dateRange[1]?.getTime() || new Date().getTime(),
                ]}
                onChange={handleDateRangeChange}
                tipFormatter={(value) => formatDate(new Date(value))}
                className="mb-2"
                railStyle={{ backgroundColor: '#5c21b5', height: 2 }}
                handleStyle={{
                  borderColor: '#5c21b5',
                  height: 14,
                  width: 14,
                  marginLeft: -7,
                  marginTop: -6,
                  backgroundColor: '#5c21b5',
                }}
                trackStyle={{ backgroundColor: '#5c21b5', height: 2 }}
              />
              <div className="flex justify-between text-sm font-semibold font-rubik">
                <span>{dateRange[0] ? formatDate(dateRange[0]) : 'Дата начала'}</span>
                <span>{dateRange[1] ? formatDate(dateRange[1]) : 'Дата окончания'}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SearchBar;
