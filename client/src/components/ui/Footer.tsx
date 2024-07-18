/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React from 'react';

export default function Footer(): JSX.Element {
  return (
<footer
  className="flex flex-row flex-wrap items-center justify-center w-full py-6 text-center border-t gap-y-6 gap-x-12 border-blue-gray-50 md:justify-between mt-8">
  <p className="block font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900 font-rubik">
    © 2024 Хвосты и хвостики
  </p>
  <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
    <li>
      <a href="/contact-us"
        className="block font-sans text-base antialiased font-normal leading-relaxed transition-colors text-blue-gray-900 hover:text-violet-600 focus:text-violet-600 font-rubik">
        Свяжитесь с нами
      </a>
    </li>
  </ul>
</footer> 
  );
}
