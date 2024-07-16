import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import json from '../../../public/JSON/Anim5.json';

export default function ErrorPage(): JSX.Element {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="">
        <Player
          src={json}
          background="#ffffff"
          speed={1}
          loop
          autoplay
          direction={1}
          className="w-[450px] h-[450px] transition-all duration-1000 hover:w-[490px] hover:h-[490px]"
        />
      </div>
      <div className="text-center">
        <div className="mt-6 flex items-center justify-center gap-x-6">
          <a
            href="/"
            className="rounded-md bg-violet-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Вернуться на главную страницу
          </a>
        </div>
      </div>
    </main>
  );
}
