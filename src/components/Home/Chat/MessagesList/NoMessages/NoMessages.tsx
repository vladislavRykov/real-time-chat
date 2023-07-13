import React from 'react';
import s from './NoMessages.module.scss';

export const NoMessages = ({ fullName }: { fullName: string | undefined }) => {
  return <div className={s.NoMessages}>Вы еще не писали {fullName}</div>;
};
