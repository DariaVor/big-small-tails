import React, { useState } from 'react';
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
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [hasCollar, setHasCollar] = useState<boolean | null>(null);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearchChange(term);
  };

  const handleCollarChange = (value: boolean | null) => {
    setHasCollar(value);
    onCollarChange(value);
  };

  const handleDateRangeChange = (values: [number, number]) => {
    const [start, end] = values.map((val) => new Date(val));
    setDateRange([start, end]);
    onStartDateChange(start);
    onEndDateChange(end);
  };

  const handleCategoryChange = (id: number) => {
    onCategoryChange(id);
  };

  const handleColorChange = (id: number) => {
    onColorChange(id);
  };

  const handleRemoveCategory = (id: number) => {
    onCategoryChange(id);
  };

  const handleRemoveColor = (id: number) => {
    onColorChange(id);
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <div className="sticky top-0 flex flex-col space-y-4 p-4 bg-white shadow-md rounded-md w-64">
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Поиск..."
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
        />
      </div>

      <div className="flex flex-wrap mb-4">
        {selectedCategories.map((id) => (
          <div
            key={id}
            className="flex items-center bg-indigo-100 px-2 py-1 rounded-full mr-2 mb-2"
          >
            <span className="text-sm text-indigo-700">
              {categories.find((cat) => cat.id === id)?.category}
            </span>
            <button
              type="button"
              onClick={() => handleRemoveCategory(id)}
              className="ml-1 text-red-500 hover:text-red-700"
            >
              &times;
            </button>
          </div>
        ))}
        {selectedColors.map((id) => (
          <div
            key={id}
            className="flex items-center bg-indigo-100 px-2 py-1 rounded-full mr-2 mb-2"
          >
            <span className="text-sm text-indigo-700">
              {colors.find((color) => color.id === id)?.color}
            </span>
            <button
              type="button"
              onClick={() => handleRemoveColor(id)}
              className="ml-1 text-red-500 hover:text-red-700"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-col mb-4">
        <h3 className="text-lg font-semibold mb-2">Категории</h3>
        <div className="flex flex-col space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
                className="form-checkbox h-4 w-4 text-indigo-600 rounded"
              />
              <span className="text-sm">{category.category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col mb-4">
        <h3 className="text-lg font-semibold mb-2">Цвета</h3>
        <div className="flex flex-col space-y-2">
          {colors.map((color) => (
            <label key={color.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedColors.includes(color.id)}
                onChange={() => handleColorChange(color.id)}
                className="form-checkbox h-4 w-4 text-indigo-600 rounded"
              />
              <span className="text-sm">{color.color}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col mb-4">
        <h3 className="text-lg font-semibold mb-2">Наличие ошейника</h3>
        <div className="flex flex-col space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="collar"
              checked={hasCollar === true}
              onChange={() => handleCollarChange(true)}
              className="form-radio h-4 w-4 text-indigo-600"
            />
            <span className="text-sm">Есть</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="collar"
              checked={hasCollar === false}
              onChange={() => handleCollarChange(false)}
              className="form-radio h-4 w-4 text-indigo-600"
            />
            <span className="text-sm">Нет</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="collar"
              checked={hasCollar === null}
              onChange={() => handleCollarChange(null)}
              className="form-radio h-4 w-4 text-indigo-600"
            />
            <span className="text-sm">Неважно</span>
          </label>
        </div>
      </div>

      <div className="flex flex-col">
        <h3 className="text-lg font-semibold mb-2">Дата</h3>
        <div className="px-2">
          <Slider
            range
            min={new Date('2020-01-01').getTime()}
            max={new Date().getTime()}
            step={24 * 60 * 60 * 1000}
            defaultValue={[
              dateRange[0]?.getTime() || new Date('2020-01-01').getTime(),
              dateRange[1]?.getTime() || new Date().getTime(),
            ]}
            onChange={handleDateRangeChange}
            tipFormatter={(value) => formatDate(new Date(value))}
            className="mb-2"
            railStyle={{ backgroundColor: '#e2e8f0', height: 2 }}
            handleStyle={{
              borderColor: '#6366f1',
              height: 14,
              width: 14,
              marginLeft: -7,
              marginTop: -6,
              backgroundColor: '#6366f1',
            }}
            trackStyle={{ backgroundColor: '#6366f1', height: 2 }}
          />
          <div className="flex justify-between text-sm font-semibold">
            <span>{dateRange[0] ? formatDate(dateRange[0]) : 'Дата начала'}</span>
            <span>{dateRange[1] ? formatDate(dateRange[1]) : 'Дата окончания'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;