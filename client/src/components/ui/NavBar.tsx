import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logoutThunk } from '../../redux/slices/auth/authThunks';

export default function NavBar(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = async (): Promise<void> => {
    await dispatch(logoutThunk());
    navigate('/login');
  };

  return (
    <ul>
      <li>
        <Link to="/">Главная</Link>
      </li>
      {user.status === 'logged' ? (
        <li>
            <button type='button' onClick={handleLogout}>Logout</button>
          </li>
      ) : (
        <>
          <li>
            <Link to="/login">Логин</Link>
          </li>
          <li>
            <Link to="/register">Регистрация</Link>
          </li>
        </>
      )}
    </ul>
  );
}
