import React, { useState, useEffect } from 'react';
import s from './Chat.module.scss';

import { ChatHeader } from './ChatHeader/ChatHeader';
import { MessagesList } from './MessagesList/MessagesList';
import { MessageInput } from './MessageInput/MessageInput';
import API from '../../../service/api/myApi';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { getUserMessages } from '../../../redux/Slices/messagesSlice';

// import audio from '../../../assets/img/mock/AmazarashiNier.mp3';

interface ChatProps {
  selectedDialogId: string;
}

export const Chat: React.FC<ChatProps> = ({ selectedDialogId }) => {
  const dispatch = useAppDispatch();
  const [{ messages, isLoading }, partner] = useAppSelector((state) => [
    state.messagesR,
    state.dialogsR.selectedDialog?.partner,
  ]);
  useEffect(() => {
    dispatch(getUserMessages(selectedDialogId));
  }, [selectedDialogId]);
  return (
    <div className={s.chat}>
      <ChatHeader partner={partner} />
      <MessagesList isLoading={isLoading} messages={messages} partner={partner} />
      <MessageInput />
    </div>
  );
};
