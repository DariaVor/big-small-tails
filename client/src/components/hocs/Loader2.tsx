/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from 'react';
import SvgLoad from '../ui/SvgLoad';

export default function Loader({ children, isLoading }): JSX.Element {
  return isLoading ? <SvgLoad /> : children;
}
