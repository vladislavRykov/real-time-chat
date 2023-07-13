import React from 'react';
import s from '../Chat.module.scss';
import { BsThreeDots } from 'react-icons/bs';
import { useAppSelector } from '../../../../hooks/reduxHooks';
import { Partner } from '../../../../types';

export const ChatHeader = ({ partner }: { partner: Partner | undefined }) => {
  return (
    <div className={s.header}>
      <div className={s.header_user}>
        <h2 className={s.header_name}>{partner?.fullName}</h2>
        <h2 className={s.header_status}>{partner?.createdAt}</h2>
      </div>
      <div className={s.header_settings}>
        <BsThreeDots className={s.header_settings_img} />
      </div>
    </div>
  );
};
