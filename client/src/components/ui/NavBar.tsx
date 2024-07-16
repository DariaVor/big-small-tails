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

  const navLinks = [
    { path: '/pets/lost', label: 'Потерянные' },
    { path: '/pets/found', label: 'Найденные' },
    // { path: '/location', label: 'Расположение' },
    { path: '/account', label: 'Личный кабинет', private: true },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
        <Link to="/">
            <img src="/images/pets.png" alt="Logo" className="h-8 w-8"/>
          </Link>
          <Link to="/" className="text-2xl font-bold text-violet-800 font-rubik">Хвосты и хвостики</Link>
        </div>
        <div className="flex items-center space-x-4">
          {navLinks.map((link) =>
            (!link.private || (link.private && user.status === 'logged')) && (
              <Link key={link.path} to={link.path} className="text-violet-800 hover:text-violet-700 font-rubik font-medium">
                {link.label}
              </Link>
            )
          )}
          {user.status === 'logged' ? (
            <img
            src="/images/logout.svg"
            alt="Выйти"
            className="h-6 w-6 cursor-pointer hover:text-rose-600"
            onClick={handleLogout}
          />
          ) : (
            <Link to="/login" className="bg-violet-800 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded">
              Войти
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}