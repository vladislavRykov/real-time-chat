import React, { ComponentPropsWithoutRef } from 'react';
import s from './InputForm.module.scss';
import cn from 'classnames';
import { AiFillCheckCircle } from 'react-icons/ai';

export enum InputStatues {
  error = 'error',
  default = 'default',
  ok = 'ok',
}

interface InputFormProps extends ComponentPropsWithoutRef<'input'> {
  classNames?: string[];
  status?: InputStatues;
}

export const InputForm: React.FC<InputFormProps> = ({
  classNames = [],
  status = InputStatues.default,
  ...rest
}) => {
  return (
    <div className={s.wrapper}>
      <input
        className={cn(
          s.input,
          {
            [s.input_error]: status === InputStatues.error,
            [s.input_ok]: status === InputStatues.ok,
          },
          ...classNames,
        )}
        {...rest}
      />
      {status === InputStatues.ok && <AiFillCheckCircle className={s.input_check} />}
    </div>
  );
};
