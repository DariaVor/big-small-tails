import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type PrivateRouterProps = {
  children?: React.ReactElement;
  isAllowed: boolean;
  redirect?: string;
};

export default function PrivateRouter({
  children,
  isAllowed,
  redirect = '/',
}: PrivateRouterProps): JSX.Element {
  if (!isAllowed) return <Navigate to={redirect} />;
  return children || <Outlet />;
}