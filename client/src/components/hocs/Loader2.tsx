/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { ReactNode } from 'react';
import React from 'react';
import SvgLoad from '../ui/SvgLoad';

type LoaderProps = {
  children: ReactNode;
  isLoading: boolean;
}

export default function Loader({ children, isLoading }: LoaderProps): JSX.Element | null {
  return isLoading ? <SvgLoad /> : <>{children}</>;
}
