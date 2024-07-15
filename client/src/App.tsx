import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { checkUserThunk } from './redux/slices/auth/authThunks';
import PrivateRouter from './components/hocs/PrivateRouter';
import AdminRouter from './components/hocs/AdminRoute'; // Import the new AdminRouter
import RegisterPage from './components/pages/RegisterPage';
import LoginPage from './components/pages/LoginPage';
import Layout from './components/Layout';
import HomePage from './components/pages/HomePage';
import LocationPage from './components/pages/LocationPage';
import FoundPetPage from './components/pages/FoundPetPage';
import LostPetPage from './components/pages/LostPetPage';
import PetDetailPage from './components/pages/PetDetailPage';
import ErrorPage from './components/pages/ErrorPage';
import AccountPage from './components/pages/AccountPage';
import Example from './components/pages/Example';
import AdminDashboard from './components/pages/AdminDashboard';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.auth.user);

  useEffect(() => {
    void dispatch(checkUserThunk());
  }, [dispatch]);


  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/example',
          element: <Example />,
        },
        {
          path: 'location',
          element: <LocationPage />,
        },
        {
          path: '/pets/found',
          element: <FoundPetPage />,
        },
        {
          path: '/pets/lost',
          element: <LostPetPage />,
        },
        {
          path: '/pets/:id',
          element: <PetDetailPage />,
        },
        {
          path: '*',
          element: <ErrorPage />,
        },
        {
          element: <PrivateRouter isAllowed={user.status !== 'logged'} redirect="/" />,
          children: [
            {
              path: '/register',
              element: <RegisterPage />,
            },
            {
              path: '/login',
              element: <LoginPage />,
            },
          ],
        },
        {
          element: <PrivateRouter isAllowed={user.status === 'logged'} redirect="/login" />,
          children: [
            {
              path: '/account',
              element: <AccountPage />,
            },
            {
              path: '/admin/dashboard',
              element: <AdminDashboard />,
            },
          ],
        },
        // {
        //   element: <AdminRouter isAdmin={user.role === 'admin'} redirect="/login" />,
        //   children: [
        //     {
        //       path: '/admin/dashboard',
        //       element: <AdminDashboard />,
        //     },
        //   ],
        // },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
