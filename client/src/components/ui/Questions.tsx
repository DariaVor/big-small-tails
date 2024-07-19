// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'Что такое Хвосты и хвостики?',
    answer:
      'В 2024 году мы нашли на улице кошку и долго не могли отыскать ее хозяев. По старинке вешали объявления и расспрашивали людей в округе – ничего не работало. Так родилась идея проекта поиска животных с использованием современных технологий. В настоящее время Хвосты и хвостики – самая большая и популярная система поиска пропавших животных.',
  },
  {
    question: 'Могу ли я опубликовать объявление бесплатно?',
    answer:
      'Да, объявления публикуются на сайте бесплатно.',
  },
  {
    question: 'Какие гарантии, что мой питомец найдется?',
    answer:
      'Мы не можем гарантировать что ваш питомец обязательно найдется. Но накопленный нами опыт позволяет в несколько раз увеличить шансы на успешное завершение поисков.',
  },
  {
    question: 'Как снять объявление с сайта?',
    answer:
      'Перейдите в свой личный кабинет. У объявления вы увидите красную надпись “Удалить”, после нажатия на которую ваше объявление удалится из каталога.',
  },
  {
    question: 'Вы принимаете животных на передержку?',
    answer:
      'К сожалению, на данный момент мы такую услугу мы не предоставляем.',
  },
];

export default function Questions() :JSX.Element {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleItem = (index: number): void => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-rubik">
          Вопросы и ответы
        </h2>
        <div className="mt-6">
          {faqData.map((item, index) => (
            <div key={index} className="mb-4">
              <button
              type='button'
                onClick={() => toggleItem(index)}
                className="flex justify-between w-full px-4 py-2 text-left rounded-lg focus:outline-none bg-violet-100 hover:bg-violet-200 transition-transform transform hover:scale-105"
              >
                <span className="text-lg font-medium text-gray-900 font-rubik">
                  {item.question}
                </span>
                <svg
                  className={`w-6 h-6 transition-transform transform ${
                    expandedIndex === index ? 'rotate-180' : 'rotate-0'
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {expandedIndex === index && (
                <p className="mt-2 text-md text-gray-600 font-rubik">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};