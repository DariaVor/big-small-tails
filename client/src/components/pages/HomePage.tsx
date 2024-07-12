import React from 'react';
import AboutMeCard from '../ui/AboutMeCard';
import data from '../../../public/TS/aboutMeData';

export default function HomePage(): JSX.Element {
  return (
    <div className="container mx-auto p-4 bg-green-300">
      <div className="bg-gray-100 p-8 rounded-md shadow-md mb-8">
        <h1 className="text-3xl font-bold text-center mb-4">
          Всероссийская система поиска пропавших животных
        </h1>
        <p className="text-gray-600 text-center mb-4">
          Мы уже вернули домой 107 922 питомцев. Сегодня опубликовано 514 новых объявлений{' '}
          <button type="button" className="text-blue-500">
            посмотреть
          </button>
          .
        </p>
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
          >
            Я потерял питомца
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
          >
            Я нашёл питомца
          </button>
        </div>
      </div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Хотите помогать в поиске пропавших животных?</h2>
        <button
          type="button"
          className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
        >
          Станьте волонтёром
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {data.map((item, id) => (
          <AboutMeCard key={Number(id)} title={item.title} description={item.description} svgUrl={item.svgUrl} />
        ))}
      </div>
    </div>
  );
}
