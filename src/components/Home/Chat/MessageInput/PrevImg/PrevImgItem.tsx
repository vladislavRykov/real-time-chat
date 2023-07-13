import React, { useState } from 'react';
import s from './PrevImg.module.scss';
import { BigLoader } from '../../../../UI/Loaders/BigLoader';
import cn from 'classnames';

interface PrevImgItemProps {
  loading?: boolean;
  src?: string;
  setShowFullImgSrc: React.Dispatch<React.SetStateAction<string | null>>;
}

export const PrevImgItem: React.FC<PrevImgItemProps> = ({
  src,
  loading = false,
  setShowFullImgSrc,
}) => {
  return (
    <div
      onClick={() => setShowFullImgSrc((prev) => (!!prev ? null : src || ''))}
      className={s.item}>
      {!loading ? (
        <>
          <img src={src} />
          <div className={s.pop}>See</div>
        </>
      ) : (
        <BigLoader />
      )}
    </div>
  );
};
