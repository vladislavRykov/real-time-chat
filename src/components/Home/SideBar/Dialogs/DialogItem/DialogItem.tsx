import React from 'react';
import s from './DialogItem.module.scss';
import mockAva from '../../../../../assets/img/mock/mock_ava.png';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import readed from '../../../../assets/img/UI/readed.svg';
import noreaded from '../../../../assets/img/UI/noreaded.svg';
import isToday from 'date-fns/isToday';
import format from 'date-fns/format';
import isFuture from 'date-fns/isFuture';
import { UserAvatar } from '../../../../UI/UserAvatar/UserAvatar';
import cn from 'classnames';

interface DialogItemProps {
  ava?: string | null;
  fullName: string;
  isOnline: boolean;
  isReaded: boolean;
  text: string | null;
  time: number | null;
  onClick?: () => void;
  isSelected?: boolean;
}

const Time = (created_at: number) => {
  if (isToday(created_at)) {
    const millisec = Date.now() - created_at;
    const hours = millisec / 36e5;
    return hours <= 5 ? formatDistanceToNow(created_at) : format(created_at, 'HH:mm');
  } else {
    return format(created_at, 'dd.MM.yy');
  }
};

export const DialogItem: React.FC<DialogItemProps> = ({
  ava = null,
  fullName,
  isOnline,
  isReaded,
  text,
  time,
  onClick,
  isSelected = false,
}) => {
  return (
    <div className={cn(s.wrapper, { [s.isSelected]: isSelected })} onClick={onClick}>
      <div className={s.dItem}>
        <div className={s.dItem_ava}>
          <UserAvatar isOnline={isOnline} src={ava} />
        </div>
        <div className={s.dItem_content}>
          <div className={s.dItem_fullNameBlock}>
            <h3 className={s.dItem_fullName}>{fullName}</h3>
            <span className={s.dItem_time}>{time && Time(time)}</span>
          </div>
          <div className={s.dItem_textBlock}>
            <p className={s.dItem_message}>{text || 'Новый чат'}</p>
            {/* <img className={s.dItem_checked} src={isReaded ? readed : noreaded} /> */}
            <div className={s.dItem_counter}>55</div>
          </div>
        </div>
      </div>
    </div>
  );
};
