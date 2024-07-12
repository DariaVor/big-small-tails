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
    { path: '/pets/found', label: 'Найденные' },
    { path: '/pets/lost', label: 'Потерянные' },
    { path: '/location', label: 'Расположение' },
    { path: '/account', label: 'Личный кабинет', private: true },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link to="/">
            <img src="images/pets.png" alt="Logo" className="h-8 w-8"/>
          </Link>
          <Link to="/" className="text-2xl font-bold text-green-700">Хвосты и хвостики</Link>
        </div>
        <div className="flex items-center space-x-4">
          {navLinks.map((link) =>
            (!link.private || (link.private && user.status === 'logged')) && (
              <Link key={link.path} to={link.path} className="text-green-700 hover:text-green-500">
                {link.label}
              </Link>
            )
          )}
          {user.status === 'logged' ? (
            <button
              type="button"
              onClick={() => void handleLogout()}
              className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
            >
              Выйти
            </button>
          ) : (
            <Link to="/login" className="bg-[#268a57] hover:bg-green-500 text-white font-bold py-2 px-4 rounded">
              Войти
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}



// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// import { logoutThunk } from '../../redux/slices/auth/authThunks';

// export default function NavBar(): JSX.Element {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const user = useAppSelector((state) => state.auth.user);

//   const handleLogout = async (): Promise<void> => {
//     void dispatch(logoutThunk());
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-white shadow-md">
//       <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//         <div className="flex items-center space-x-4">
//         <Link to="/">
//             <img src="images/pets.png" alt="Logo" className="h-8 w-8"/>
//           </Link>
//           <Link to="/" className="text-2xl font-bold text-green-700">Хвосты и хвостики</Link>
//         </div>
//         <div className="flex items-center space-x-4">
//           <input type="text" placeholder="Адрес или номер объявления" className="border rounded-md px-4 py-2"/>
//           {user.status === 'logged' ? (
//             <button
//               type="button"
//               onClick={() => void handleLogout()}
//               className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
//             >
//               Выйти
//             </button>
//           ) : (
//               <Link to="/login" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Войти</Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

