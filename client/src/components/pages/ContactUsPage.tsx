import React from 'react';

export default function ContactUs(): JSX.Element {
  return (
    <div className="container mx-auto p-4 mt-8 fade-in">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Свяжитесь с нами</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Мы всегда рады помочь вам и ответить на любые вопросы, связанные с нашим сайтом.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Компания</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              Хвосты и хвостики
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Наш Офис</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              ул.Орджоникидзе, д. 11 стр. 10 (м. Ленинский проспект)
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Электронная почта</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              info@elbrusboot.camp
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Телефон</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              +7 499 938-68-24
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Часы Работы</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              Будни: 9:00 - 19:00
              <br />
              Суббота: 10:00 - 14:00
              <br />
              Воскресенье: Выходной
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
