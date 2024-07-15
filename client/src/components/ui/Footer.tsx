/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

export default function Footer(): JSX.Element {
  return (
<footer
  className="flex flex-row flex-wrap items-center justify-center w-full py-6 text-center border-t gap-y-6 gap-x-12 border-blue-gray-50 md:justify-between mt-8">
  <p className="block font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900">
    © 2024 Elbrus Bootcamp 
  </p>
  <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
    <li>
      <a href="#"
        className="block font-sans text-base antialiased font-normal leading-relaxed transition-colors text-blue-gray-900 hover:text-blue-500 focus:text-blue-500">
        About Us
      </a>
    </li>
    <li>
      <a href="#"
        className="block font-sans text-base antialiased font-normal leading-relaxed transition-colors text-blue-gray-900 hover:text-blue-500 focus:text-blue-500">
        License
      </a>
    </li>
    <li>
      <a href="#"
        className="block font-sans text-base antialiased font-normal leading-relaxed transition-colors text-blue-gray-900 hover:text-blue-500 focus:text-blue-500">
        Contribute
      </a>
    </li>
    <li>
      <a href="#"
        className="block font-sans text-base antialiased font-normal leading-relaxed transition-colors text-blue-gray-900 hover:text-blue-500 focus:text-blue-500">
        Contact Us
      </a>
    </li>
  </ul>
</footer> 
  );
}
