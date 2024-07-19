import React from 'react';
import { Link } from 'react-router-dom';
import AboutMeCard from '../ui/AboutMeCard';
import data from '../../../public/TS/aboutMeData';
import Footer from '../ui/Footer';
import AboutUs from '../ui/AboutUs';
import Questions from '../ui/Questions';
import './homePageStyles.css';

export default function HomePage(): JSX.Element {
  return (
    <div className="container mx-auto p-4 fade-in">
      <div className="p-8 rounded-md h-56 m_bot">
        <h1 className="text-3xl font-bold text-center mb-4 font-rubik">
          Всероссийская система поиска пропавших питомцев
        </h1>
        <p className="text-gray-600 text-center mb-6 font-rubik text-lg">
          Помогите питомцу вернуться домой.
        </p>
        <div className="flex justify-center space-x-4 but_text">
          <Link to="/lostaddpage">
            <button
              type="button"
              className="px-6 py-3 text-lg rounded-md bg-fuchsia-700 text-white hover:bg-fuchsia-800 font-rubik transition-transform transform hover:scale-105"
            >
              Я потерял питомца
            </button>
          </Link>
          <Link to="/foundaddpage">
            <button
              type="button"
              className="px-6 py-3 text-lg rounded-md bg-indigo-700 text-white hover:bg-indigo-800 font-rubik transition-transform transform hover:scale-105"
            >
              Я нашёл питомца
            </button>
          </Link>
        </div>
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
      <AboutUs />
      <Questions />
      <Footer />
    </div>
  );
}
