import React from 'react';
import cn from 'classnames';
import mock from '../../../assets/img/mock/mock_ava.png';
import { getAvatarColorFromHash } from '../../../utils/getAvatarColorFromHash';
import s from './UserAvatar.module.scss';

interface UserAvatarProps {
  src?: string | null;
  classNames?: string[];
  userId?: string;
  isOnline?: boolean;
  fullName?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  src = null,
  userId = 'ght',
  fullName = 'Владос',
  isOnline = false,
  classNames = [],
}) => {
  if (!src) {
    const colors = getAvatarColorFromHash(userId);
    const firstChar = fullName.substring(0, 1).toUpperCase();
    return (
      <div className={s.avatar}>
        <div
          className={s.avatar_img}
          style={{
            background: `linear-gradient(135deg,${colors.color} 0%,${colors.colorLighten} 96.52%)`,
          }}>
          {firstChar}
        </div>
        {isOnline && <div className={s.avatar_dot}></div>}
      </div>
    );
  } else {
    return (
      <div className={s.avatar}>
        <img className={cn(s.avatar_img, ...classNames)} src={src} />
        {isOnline && <div className={s.avatar_dot}></div>}
      </div>
    );
  }
};
