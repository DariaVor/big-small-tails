// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { registerThunk } from '../../redux/slices/auth/authThunks';
import type { UserRegisterType } from '../../types/userTypes';

export default function RegisterPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<UserRegisterType>({
    username: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    void dispatch(registerThunk(formData));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-4 flex justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="flex flex-col border-b border-violet-700 py-2 mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Имя пользователя
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col border-b border-violet-700 py-2 mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Электронная почта
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
              required
            />
          </div>
          <div className="flex flex-col border-b border-violet-700 py-2 mb-6 relative">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Пароль
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none pr-10"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-2 text-gray-700 focus:outline-none"
              >
                <img
                  src={showPassword ? '/images/eye-close.svg' : '/images/eye-open.svg'}
                  alt={showPassword ? 'Hide password' : 'Show password'}
                  className="h-5 w-5"
                />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-violet-800 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
            >
              Зарегистрироваться
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
