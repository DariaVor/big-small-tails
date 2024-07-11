import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './ui/NavBar';
import AddPetForm from './ui/AddPetForm';

export default function Layout(): JSX.Element {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md">
        <NavBar />
        <AddPetForm />
      </header>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
