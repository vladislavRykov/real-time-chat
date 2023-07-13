import React, { PropsWithChildren } from 'react';
import s from './Button.module.scss';
import cn from 'classnames';
import { BiMicrophone } from 'react-icons/bi';

interface ButtonProps {
  onClick?: () => void;
  classNames?: any[];
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  onClick,
  classNames = [],
}) => {
  return (
    <div onClick={onClick} className={cn(s.button_img_wrapper, ...classNames)}>
      <div className={s.button_img}>{children}</div>
      <div className={s.button_img_hover}></div>
    </div>
  );
};
