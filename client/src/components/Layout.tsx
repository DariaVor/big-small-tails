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
  const user = useAppSelector((store) => store.auth.user);

  return (
    <div className="min-h-screen flex flex-col">
      <Loader isLoading={user.status === 'fetching'}>
        <>
          <NavBar />
          {/* <AddPetForm /> */}
          {/* <LostPetForm />
          <FoundPetForm /> */}
          <Outlet />
        </>
      </Loader>
      <Notify />
    </div>
  );
}
