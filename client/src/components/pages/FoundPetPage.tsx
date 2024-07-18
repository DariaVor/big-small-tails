// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getAllFoundPetsThunk } from '../../redux/slices/pet/petThunk';
import OneFoundPetCard from '../ui/OneFoundPetCard';
import SearchBar from '../ui/SearchBar';
import {
  getCategoriesThunk,
  getColorsThunk,
} from '../../redux/slices/catandcolor/catandcolorThunk';
import type { RootState } from '../../redux/store';

export default function FoundPetPage(): JSX.Element {
  const pets = useAppSelector((store) => store.pets.foundPets);
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
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    void dispatch(
      getAllFoundPetsThunk({
        page: 1,
        limit: 6,
        searchTerm,
        selectedCategories,
        selectedColors,
        hasCollar,
        startDate,
        endDate,
      }),
    );
    void dispatch(getCategoriesThunk());
    void dispatch(getColorsThunk());

    const handleResize = (): void => {
      void setIsMobileView(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  const handleSearchChange = (term: string): void => {
    setSearchTerm(term);
    void dispatch(
      getAllFoundPetsThunk({
        page: 1,
        limit: 6,
        searchTerm: term,
        selectedCategories,
        selectedColors,
        hasCollar,
        startDate,
        endDate,
      }),
    );
  };

  const handleCategoryChange = (id: number): void => {
    const updatedCategories = selectedCategories.includes(id)
      ? selectedCategories.filter((categoryId) => categoryId !== id)
      : [...selectedCategories, id];
    setSelectedCategories(updatedCategories);
    void dispatch(
      getAllFoundPetsThunk({
        page: 1,
        limit: 6,
        searchTerm,
        selectedCategories: updatedCategories,
        selectedColors,
        hasCollar,
        startDate,
        endDate,
      }),
    );
  };

  const handleColorChange = (id: number): void => {
    const updatedColors = selectedColors.includes(id)
      ? selectedColors.filter((colorId) => colorId !== id)
      : [...selectedColors, id];
    setSelectedColors(updatedColors);
    void dispatch(
      getAllFoundPetsThunk({
        page: 1,
        limit: 6,
        searchTerm,
        selectedCategories,
        selectedColors: updatedColors,
        hasCollar,
        startDate,
        endDate,
      }),
    );
  };

  const handleCollarChange = (value: boolean | null): void => {
    setHasCollar(value);
    void dispatch(
      getAllFoundPetsThunk({
        page: 1,
        limit: 6,
        searchTerm,
        selectedCategories,
        selectedColors,
        hasCollar: value,
        startDate,
        endDate,
      }),
    );
  };

  const handleStartDateChange = (date: Date | null): void => {
    setStartDate(date);
    void dispatch(
      getAllFoundPetsThunk({
        page: 1,
        limit: 6,
        searchTerm,
        selectedCategories,
        selectedColors,
        hasCollar,
        startDate: date,
        endDate,
      }),
    );
  };

  const handleEndDateChange = (date: Date | null): void => {
    setEndDate(date);
    void dispatch(
      getAllFoundPetsThunk({
        page: 1,
        limit: 6,
        searchTerm,
        selectedCategories,
        selectedColors,
        hasCollar,
        startDate,
        endDate: date,
      }),
    );
  };

  const handleLoadMore = useCallback(() => {
    if (currentPage < totalPages && !loading) {
      void dispatch(
        getAllFoundPetsThunk({
          page: currentPage + 1,
          limit: 6,
          searchTerm,
          selectedCategories,
          selectedColors,
          hasCollar,
          startDate,
          endDate,
        }),
      );
    }
  }, [
    currentPage,
    totalPages,
    loading,
    searchTerm,
    selectedCategories,
    selectedColors,
    hasCollar,
    startDate,
    endDate,
    dispatch,
  ]);

  useEffect(() => {
    const handleScroll = (): void => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 50 &&
        !loading
      ) {
        handleLoadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleLoadMore, loading]);

  return (
    <div className="container mx-auto p-4 flex flex-col sm:flex-row">
      <div
        className={`w-full sm:w-64 flex-shrink-0 sm:mr-4 ${isMobileView ? 'sticky top-0 z-20' : ''}`}
      >
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
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {pets.length > 0 ? (
            pets.map((pet) => <OneFoundPetCard key={pet.id} pet={pet} isAccountPage={false} />)
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
