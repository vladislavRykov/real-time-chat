import React from 'react';
import { useAppSelector } from '../../../hooks/reduxHooks';
import s from './NoDialogSelected.module.scss';

export const NoDialogSelected = () => {
  return <div className={s.NoDialogSelected}>Начните или выберете диалог</div>;
};
