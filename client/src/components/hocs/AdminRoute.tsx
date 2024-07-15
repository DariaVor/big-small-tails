import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type AdminRouterProps = {
  children?: React.ReactElement;
  isAdmin: boolean;
  redirect?: string;
};

export default function AdminRouter({
  children,
  isAdmin,
  redirect = '/',
}: AdminRouterProps): JSX.Element {
  if (!isAdmin) return <Navigate to={redirect} />;
  return children || <Outlet />;
}
