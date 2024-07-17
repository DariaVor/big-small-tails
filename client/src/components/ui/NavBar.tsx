/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logoutThunk } from '../../redux/slices/auth/authThunks';

export default function NavBar(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async (): Promise<void> => {
    void dispatch(logoutThunk());
    navigate('/login');
  };

  const navLinks = [
    { path: '/pets/lost', label: 'Потерянные' },
    { path: '/pets/found', label: 'Найденные' },
    { path: '/account', label: 'Личный кабинет', private: true },
  ];

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img src="/images/logo.svg" alt="Logo" className="h-8 w-8"/>
          </Link>
          <Link to="/" className="text-2xl font-bold text-violet-800 font-rubik">Хвосты и хвостики</Link>
        </div>
        <button
          type='button'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <img
                  src="/images/burger-menu.svg"
                  alt="Меню"
                  className="pt-0.5"
                />
        </button>
        <div className={`w-full md:block md:w-auto ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {navLinks.map((link) =>
              (!link.private || (link.private && user.status === 'logged')) && (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-violet-800 md:p-0 dark:text-white md:dark:hover:text-violet-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
            <li>
              {user.status === 'logged' ? (
                <img
                  src="/images/logout.svg"
                  alt="Выйти"
                  className={`${isMenuOpen ? 'w-5 ml-2.5 pt-1 cursor-pointer' : 'w-6 cursor-pointer'}`}
                  onClick={handleLogout}
                />
              ) : (
                <Link
                  to="/login"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-violet-800 md:p-0 dark:text-white md:dark:hover:text-violet-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Войти
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
