import React from 'react';
import { Rings } from 'react-loader-spinner';

type LoaderProps = {
  children: React.ReactElement;
  isLoading: boolean;
};

export default function Loader({ children, isLoading }: LoaderProps): JSX.Element {
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Rings
          visible
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="rings-loading"
        />
      </div>
    );
  return children;
}

