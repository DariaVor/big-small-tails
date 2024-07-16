import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAllLostPetsThunk } from '../../redux/slices/pet/petThunk';
import OneLostPetCard from '../ui/OneLostPetCard';
import LostPetForm from '../ui/LostPetForm';
import SearchBar from '../ui/SearchBar';
import { getCategoriesThunk, getColorsThunk } from '../../redux/slices/catandcolor/catandcolorThunk';
import type { RootState } from '../../redux/store';

export default function LostPetPage(): JSX.Element {
  const pets = useAppSelector((store) => store.pets.lostPets);
  const categories = useAppSelector((state: RootState) => state.data.categories);
  const colors = useAppSelector((state: RootState) => state.data.colors);
  const dispatch = useAppDispatch();

  const [filteredPets, setFilteredPets] = useState(pets);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedColors, setSelectedColors] = useState<number[]>([]);
  const [hasCollar, setHasCollar] = useState<boolean | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    void dispatch(getAllLostPetsThunk());
    void dispatch(getCategoriesThunk());
    void dispatch(getColorsThunk());
  }, [dispatch]);

  useEffect(() => {
    setFilteredPets(pets);
  }, [pets]);

  useEffect(() => {
    filterPets();
  }, [searchTerm, selectedCategories, selectedColors, hasCollar, startDate, endDate]);

  const handleDelete = (id: number): void => {
    void dispatch(deleteOnePetThunk(id));
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((categoryId) => categoryId !== id) : [...prev, id]
    );
  };

  const handleColorChange = (id: number) => {
    setSelectedColors((prev) =>
      prev.includes(id) ? prev.filter((colorId) => colorId !== id) : [...prev, id]
    );
  };

  const handleCollarChange = (value: boolean | null) => {
    setHasCollar(value);
  };

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const filterPets = () => {
    let filtered = pets;

    if (searchTerm) {
      filtered = filtered.filter((pet) => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
          pet.description?.toLowerCase().includes(searchTermLower) ||
          pet.location?.toLowerCase().includes(searchTermLower) ||
          pet.contactInfo?.toLowerCase().includes(searchTermLower) ||
          pet.image?.toLowerCase().includes(searchTermLower) ||
          getCategoryName(pet.categoryId)?.toLowerCase().includes(searchTermLower) ||
          getColorName(pet.colorId)?.toLowerCase().includes(searchTermLower)
        );
      });
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((pet) =>
        selectedCategories.includes(pet.categoryId)
      );
    }

    if (selectedColors.length > 0) {
      filtered = filtered.filter((pet) =>
        selectedColors.includes(pet.colorId)
      );
    }

    if (hasCollar !== null) {
      filtered = filtered.filter((pet) => pet.hasCollar === hasCollar);
    }

    if (startDate && endDate) {
      filtered = filtered.filter((pet) => {
        const petDate = new Date(pet.date || '');
        return petDate >= startDate && petDate <= endDate;
      });
    }

    setFilteredPets(filtered);
  };

  const getCategoryName = (id: number | null) => {
    const category = categories.find((cat) => cat.id === id);
    return category ? category.category : 'Неизвестно';
  };

  const getColorName = (id: number | null) => {
    const color = colors.find((col) => col.id === id);
    return color ? color.color : 'Неизвестно';
  };

  return (
    <div className="container mx-auto p-4 flex">
      <div className="w-64 flex-shrink-0 mr-4">
        <SearchBar
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          onColorChange={handleColorChange}
          onCollarChange={handleCollarChange}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
          selectedCategories={selectedCategories}
          selectedColors={selectedColors}
          categories={categories}
          colors={colors}
        />
      </div>
      <div className="flex-1 min-h-screen">
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.length > 0 ? (
            filteredPets.map((pet) => (
              <OneLostPetCard key={pet.id} pet={pet} onDelete={handleDelete} isAccountPage={false} />
            ))
          ) : (
            <p className="text-center w-full">Ничего не найдено</p>
          )}
        </div>
      </div>
    </div>
  );
}
