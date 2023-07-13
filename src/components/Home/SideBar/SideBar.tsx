import React from 'react';
import { SearchInput } from './SearchInput/SearchInput';
import { Label } from './Label/Label';
import { Dialogs } from './Dialogs/Dialogs';
import s from './SideBar.module.scss';

export const SideBar = () => {
  return (
    <div className={s.sidebar}>
      <Label />
      <div className={s.search}>
        <SearchInput placeholder="Поиск среди контактов" />
      </div>
      <Dialogs />
    </div>
  );
};
