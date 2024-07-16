import React, { useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAllLostPetsThunk } from '../../redux/slices/pet/petThunk';
import OneLostPetCard from '../ui/OneLostPetCard';
import SearchBar from '../ui/SearchBar';
import { getCategoriesThunk, getColorsThunk } from '../../redux/slices/catandcolor/catandcolorThunk';
import type { RootState } from '../../redux/store';

export default function LostPetPage(): JSX.Element {
  const pets = useAppSelector((store) => store.pets.lostPets);
  const categories = useAppSelector((state: RootState) => state.data.categories);
  const colors = useAppSelector((state: RootState) => state.data.colors);
  const totalPages = useAppSelector((store) => store.pets.totalPages);
  const currentPage = useAppSelector((store) => store.pets.currentPage);
  const loading = useAppSelector((store) => store.pets.loading);
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedColors, setSelectedColors] = useState<number[]>([]);
  const [hasCollar, setHasCollar] = useState<boolean | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    dispatch(getAllLostPetsThunk({ page: 1, limit: 12, searchTerm, selectedCategories, selectedColors, hasCollar, startDate, endDate }));
    dispatch(getCategoriesThunk());
    dispatch(getColorsThunk());
  }, [dispatch]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    dispatch(getAllLostPetsThunk({ page: 1, limit: 12, searchTerm: term, selectedCategories, selectedColors, hasCollar, startDate, endDate }));
  };

  const handleCategoryChange = (id: number) => {
    const updatedCategories = selectedCategories.includes(id)
      ? selectedCategories.filter((categoryId) => categoryId !== id)
      : [...selectedCategories, id];
    setSelectedCategories(updatedCategories);
    dispatch(getAllLostPetsThunk({ page: 1, limit: 12, searchTerm, selectedCategories: updatedCategories, selectedColors, hasCollar, startDate, endDate }));
  };

  const handleColorChange = (id: number) => {
    const updatedColors = selectedColors.includes(id)
      ? selectedColors.filter((colorId) => colorId !== id)
      : [...selectedColors, id];
    setSelectedColors(updatedColors);
    dispatch(getAllLostPetsThunk({ page: 1, limit: 12, searchTerm, selectedCategories, selectedColors: updatedColors, hasCollar, startDate, endDate }));
  };

  const handleCollarChange = (value: boolean | null) => {
    setHasCollar(value);
    dispatch(getAllLostPetsThunk({ page: 1, limit: 12, searchTerm, selectedCategories, selectedColors, hasCollar: value, startDate, endDate }));
  };

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    dispatch(getAllLostPetsThunk({ page: 1, limit: 12, searchTerm, selectedCategories, selectedColors, hasCollar, startDate: date, endDate }));
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    dispatch(getAllLostPetsThunk({ page: 1, limit: 12, searchTerm, selectedCategories, selectedColors, hasCollar, startDate, endDate: date }));
  };

  const handleLoadMore = useCallback(() => {
    if (currentPage < totalPages && !loading) {
      dispatch(getAllLostPetsThunk({ page: currentPage + 1, limit: 12, searchTerm, selectedCategories, selectedColors, hasCollar, startDate, endDate }));
    }
  }, [currentPage, totalPages, loading, searchTerm, selectedCategories, selectedColors, hasCollar, startDate, endDate, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50 && !loading) {
        handleLoadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleLoadMore, loading]);

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
          {pets.length > 0 ? (
            pets.map((pet) => (
              <OneLostPetCard key={pet.id} pet={pet} /*onDelete={handleDelete}*/ isAccountPage={false}/>
            ))
          ) : (
            <p className="text-center w-full">Ничего не найдено</p>
          )}
        </div>
        {loading && currentPage > 1 && (
          <div className="text-center mt-4">
            <p>Loading more...</p>
          </div>
        )}
      </div>
    </div>
  );
}
