// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

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
    <nav className="bg-white border-gray-200 shadow-md">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img src="/images/doglogo.png" alt="Logo" style={{ width: '70px' }}/>
          </Link>
          <Link to="/" className="text-xl md:text-2xl font-medium text-violet-900 font-rubik hover:text-violet-800">Хвосты и хвостики</Link>
        </div>
        <button
          type='button'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
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
        <div className={`w-full lg:block lg:w-auto ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 lg:mt-0 lg:border-0 lg:bg-white">
            {navLinks.map((link) =>
              (!link.private || (link.private && user.status === 'logged')) && (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-violet-900 hover:text-violet-700 font-rubik font-regular text-lg block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-violet-800 lg:p-0"
                    onClick={() => setIsMenuOpen(false)}
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
                  onClick={async () => {
                    await handleLogout();
                    setIsMenuOpen(false);
                  }}
                />
              ) : (
                <Link
                  to="/login"
                  className="text-violet-900 hover:text-violet-700 font-rubik font-regular text-lg block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-violet-800 lg:p-0"
                  onClick={() => setIsMenuOpen(false)}
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
