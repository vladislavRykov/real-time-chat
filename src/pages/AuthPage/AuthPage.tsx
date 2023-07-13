import React from 'react';
import s from './AuthPage.module.scss';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';

export const AuthPage: React.FC = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  if (isAuth) {
    return <Navigate to={'/home'} />;
  }
  return (
    <div className={s.auth}>
      <div className={s.auth_content}>
        <Outlet />
      </div>
    </div>
  );
};
