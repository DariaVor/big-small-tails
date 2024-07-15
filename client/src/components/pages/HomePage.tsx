import React from 'react';
import { Link } from 'react-router-dom';
import AboutMeCard from '../ui/AboutMeCard';
import data from '../../../public/TS/aboutMeData';
import Footer from '../ui/Footer';

export default function HomePage(): JSX.Element {
  return (
    <div className="container mx-auto p-4 mt-8 fade-in">
      <div className="p-8 rounded-md mb-8 h-56">
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
          <Link to="/lostaddpage">
            <button
              type="button"
              className="px-6 py-3 text-lg rounded-md bg-[#eab308] text-white hover:bg-[#ca8a04]"
            >
              Я потерял питомца
            </button>
          </Link>
          <Link to="/foundaddpage">
            <button
              type="button"
              className="px-6 py-3 text-lg rounded-md bg-green-500 text-white hover:bg-green-700"
            >
              Я нашёл питомца
            </button>
          </Link>
        </div>
      </div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Хотите помогать в поиске пропавших животных?</h2>
        <button
          type="button"
          className="px-4 py-2 rounded-md bg-[#268a57] text-white hover:bg-green-500"
        >
          Станьте волонтёром
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {data.map((item, id) => (
          <AboutMeCard
            key={Number(id)}
            title={item.title}
            description={item.description}
            svgUrl={item.svgUrl}
            bgColor={item.bgColor}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}
