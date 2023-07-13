import React, { PropsWithChildren, ComponentPropsWithoutRef } from 'react';
import s from './ButtonForm.module.scss';
import cn from 'classnames';

interface ButtonFormProps extends ComponentPropsWithoutRef<'button'> {
  classNames?: string[];
}

export const ButtonForm: React.FC<PropsWithChildren<ButtonFormProps>> = ({
  classNames = [],
  children,
  ...rest
}) => {
  return (
    <button {...rest} className={cn(s.button, ...classNames)}>
      {children}
    </button>
  );
};
