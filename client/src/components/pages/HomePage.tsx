import React from 'react';
import AboutMeCard from '../ui/AboutMeCard';
import data from '../../../public/TS/aboutMeData';
import Footer from '../ui/Footer';

export default function HomePage(): JSX.Element {
  return (
    <div className="container mx-auto p-4 mt-8">
      {/* <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-green-500 to-green-700 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div> */}

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
          <button
            type="button"
            className="px-6 py-3 text-lg rounded-md bg-[#eab308] text-white hover:bg-[#ca8a04]"
          >
            Я потерял питомца
          </button>
          <button
            type="button"
            className="px-6 py-3 text-lg rounded-md bg-green-500 text-white hover:bg-green-700"
          >
            Я нашёл питомца
          </button>
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
