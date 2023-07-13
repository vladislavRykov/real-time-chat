import React, { ComponentPropsWithoutRef } from 'react';
import s from './SearchInput.module.scss';
import { BsSearch } from 'react-icons/bs';
import cn from 'classnames';

interface SearchInputProps extends ComponentPropsWithoutRef<'input'> {
  classNames?: string[];
}

export const SearchInput: React.FC<SearchInputProps> = ({ classNames = [], ...rest }) => {
  return (
    <div className={s.search}>
      <input className={cn(s.search_input, ...classNames)} {...rest} />
      <BsSearch className={s.search_img} />
    </div>
  );
};
