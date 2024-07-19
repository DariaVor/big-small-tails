import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import json from '../../../public/JSON/Anim5.json';

export default function ErrorPage(): JSX.Element {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="flex justify-center w-full">
        <Player
          src={json}
          background="#ffffff"
          speed={1}
          loop
          autoplay
          direction={1}
          className="w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px] transition-all duration-1000 hover:w-[290px] hover:h-[290px] sm:hover:w-[390px] sm:hover:h-[390px] lg:hover:w-[490px] lg:hover:h-[490px]"
        />
      </div>
      <div className="text-center mt-6">
        <a
          href="/"
          className="rounded-md bg-violet-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Вернуться на главную страницу
        </a>
      </div>
    </main>
  );
}
