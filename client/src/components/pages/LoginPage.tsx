import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { loginThunk } from '../../redux/slices/auth/authThunks';
import type { UserLoginType } from '../../types/userTypes';

export default function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<UserLoginType>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(loginThunk(formData));
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-4 pt-[15%] flex justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="flex items-center border-b border-green-500 py-2 mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              required
            />
          </div>
          <div className="flex items-center border-b border-green-500 py-2 mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Войти
            </button>
            <Link to="/register" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Регистрация
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}


