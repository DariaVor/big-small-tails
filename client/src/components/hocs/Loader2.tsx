import React from 'react';
import SvgLoad from '../ui/SvgLoad';

export default function Loader({ children, isLoading }): JSX.Element {
  return isLoading ? <SvgLoad /> : children;
}
