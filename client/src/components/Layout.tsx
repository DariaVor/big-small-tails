import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './ui/NavBar';
import { useAppSelector } from '../redux/hooks';
import Loader from './hocs/Loader';
import Notify from './ui/Notify';
import AddPetForm from './ui/AddPetForm';
import LostPetForm from './ui/LostPetForm';
import FoundPetForm from './ui/FoundPetForm';

export default function Layout(): JSX.Element {
  // return (
  //   <div className="bg-gray-100 min-h-screen">
  //     <header className="bg-white shadow-md">
  //       <NavBar />
  //     </header>
  //     <main className="container mx-auto p-4">
  //       <Outlet />
  //     </main>
  //   </div>
  // );

  const user = useAppSelector((store) => store.auth.user);

  return (
    <div className="container mx-auto p-4">
      <Loader isLoading={user.status === 'fetching'}>
        <>
          <NavBar />
          <AddPetForm />
          <LostPetForm />
          <FoundPetForm />
          <Outlet />
        </>
      </Loader>
      <Notify />
    </div>
  );
}
