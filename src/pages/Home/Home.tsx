import React, { useEffect } from 'react';
import { Message } from '../../components/UI/Message/Message';
import s from './Home.module.scss';
import { SideBar } from '../../components/Home/SideBar/SideBar';
import { Chat } from '../../components/Home/Chat/Chat';
import { useAppSelector } from '../../hooks/reduxHooks';
import { NoDialogSelected } from '../../components/Home/NoDialogSelected/NoDialogSelected';
import { socket } from '../../service/ws/socket';

export const Home = () => {
  const [selectedDialog, userData] = useAppSelector((state) => [
    state.dialogsR.selectedDialog,
    state.auth.userData,
  ]);

  return (
    <div className={s.home}>
      <SideBar />
      {selectedDialog ? <Chat selectedDialogId={selectedDialog._id} /> : <NoDialogSelected />}
    </div>
  );
};
