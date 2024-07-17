import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './ui/NavBar';
import { useAppSelector } from '../redux/hooks';
import Loader from './hocs/Loader2';
import Notify from './ui/Notify';

export default function Layout(): JSX.Element {
  const user = useAppSelector((store) => store.auth.user);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Loader isLoading={user.status === 'fetching' || isLoading}>
        <>
          <NavBar />
          <Outlet />
        </>
      </Loader>
      <Notify />
    </div>
  );
}
