import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { checkUserThunk } from './redux/slices/auth/authThunks';
import PrivateRouter from './components/hocs/PrivateRouter';
import RegisterPage from './components/pages/RegisterPage';
import LoginPage from './components/pages/LoginPage';
import Layout from './components/Layout';
import HomePage from './components/pages/HomePage';


function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.auth.user);

  useEffect(() => {
    void dispatch(checkUserThunk());
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        // {
        //   element: <PrivateRouter isAllowed={user.status === 'logged'} redirect="/login" />,
        //   children: [
        //     {
        //       path: '/',
        //       element: <GamePage />,
        //     },
        //   ],
        // },
        {
          element: <PrivateRouter isAllowed={user.status !== 'logged'} redirect="/game" />,
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

