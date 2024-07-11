import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logoutThunk } from '../../redux/slices/auth/authThunks';

export default function NavBar(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = async (): Promise<void> => {
    void dispatch(logoutThunk());
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex justify-between items-center">
        <li className="font-bold text-lg">
          <Link to="/">Главная</Link>
        </li>
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/pets/found"
              className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600"
            >
              Найденные Животные
            </Link>
          </li>
          <li>
            <Link
              to="/pets/lost"
              className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600"
            >
              Пропавшие Животные
            </Link>
          </li>
          {user.status === 'logged' ? (
            <li>
              <button
                type="button"
                onClick={() => void handleLogout()}
                className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/location"
                  className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600"
                >
                  Локация
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600"
                >
                  Логин
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-600"
                >
                  Регистрация
                </Link>
              </li>
            </>
          )}
        </ul>
      </ul>
    </nav>
  );
}
