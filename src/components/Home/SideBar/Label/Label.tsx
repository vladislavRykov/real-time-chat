import React, { useState } from 'react';
import s from './Label.module.scss';
import { BsPeople } from 'react-icons/bs';
import { BiEdit } from 'react-icons/bi';
import { Button } from '../../../UI/Button/Button';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { logoutUser } from '../../../../redux/Slices/authSlice';
import { getAllUsers } from '../../../../redux/Slices/usersSlice';
import { UserList } from './UsersList/UserList';
import { ModalWrapper } from '../../../UI/ModalWrapper/ModalWrapper';

export const Label = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);
  const [isListShow, setIsListShow] = useState(false);
  return (
    <div className={s.label}>
      <div className={s.label_left}>
        <BsPeople className={s.label_people} />
        <h2 className={s.label_text}>Список диалогов</h2>
      </div>
      <div className={s.label_right}>
        <Button onClick={() => setIsListShow((prev) => !prev)}>
          <BiEdit />
        </Button>
        {isListShow && (
          <ModalWrapper onClick={() => setIsListShow(false)}>
            <UserList isListShow={isListShow} users={users} />
          </ModalWrapper>
        )}
        <div onClick={() => dispatch(logoutUser())} className={s.label_exit}>
          <Button>
            <span className={s.label_text}>Выйти</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
