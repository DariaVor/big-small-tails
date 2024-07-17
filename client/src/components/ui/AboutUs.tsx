import React from 'react';

const features = [
  { name: 'Регистрация и авторизация пользователей', description: 'Легкий доступ к функциям сайта через удобную систему авторизации.' },
  {
    name: 'Поддержка сообщества волонтеров',
    description: 'Активная работа с волонтерами и организациями для помощи бездомным животным.',
  },
  { name: 'Сообщение о потерянных питомцах', description: ' Возможность быстро оповестить о пропаже, добавив фото, описание и местоположение на карте.' },
  { name: 'Сообщение о найденных животных', description: 'Возможность сообщить о найденных животных, предоставив все необходимые детали.' },
  { name: 'Просмотр потерянных и найденных животных', description: 'Удобный список с фильтрацией по различным критериям для быстрого поиска.' },
  {
    name: 'Административная панель для модераторов:',
    description: 'Инструменты для управления заявками и сообщениями пользователей.',
  },
];

export default function AboutUs(): JSX.Element {
  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-rubik">
            О нас
          </h2>
          <p className="mt-4 text-gray-500 font-rubik">Как мы помогаем возвращать пропавших питомцев домой</p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8 font-rubik">
            {features.map((feature) => (
              <div key={feature.name} className="border-t border-gray-200 pt-4 font-rubik">
                <dt className="font-medium text-gray-900 font-rubik">{feature.name}</dt>
                <dd className="mt-2 text-sm text-gray-500 font-rubik">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8 ">
          <img
            alt="Счастливый котик"
            src="images/cat-about.jpg"
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="Счастливый песик"
            src="images/dog-about.jpg"
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="Счастливый песик"
            src="images/dog2-about.jpg"
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="Счастливый котик"
            src="images/cat2-about.jpg"
            className="rounded-lg bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
}
