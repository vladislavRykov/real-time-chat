import React, { useEffect, useRef } from 'react';
import s from '../Chat.module.scss';
import { Message } from '../../../UI/Message/Message';
import { Message as MessageType, Partner } from '../../../../types';
import { NoMessages } from './NoMessages/NoMessages';
import { BigLoader } from '../../../UI/Loaders/BigLoader';
import { BASE_URL } from '../../../../service/api/myApi';
import { io } from 'socket.io-client';
import { addMessage } from '../../../../redux/Slices/messagesSlice';
import { deleteMessage as deleteMessageThunk } from '../../../../redux/Slices/messagesSlice';
import { useAppDispatch } from '../../../../hooks/reduxHooks';

interface MessagesListProps {
  messages: MessageType[] | null;
  partner: Partner | undefined;
  isLoading: boolean;
}
export const MessagesList: React.FC<MessagesListProps> = ({ messages, partner, isLoading }) => {
  const dispatch = useAppDispatch();
  const deleteMessage = async (id: string) => {
    await dispatch(deleteMessageThunk(id));
  };
  const messageElements = messages?.map((message) => (
    <Message
      isMe={message.isMe}
      attachments={message.attachments}
      // messageStatus="checked"
      deleteMess={() => deleteMessage(message._id)}
      content={message.text}
      date={new Date(message.createdAt).getTime()}
    />
  ));
  const messageList = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageList.current?.scrollTo({ top: 9999, behavior: 'smooth' });
  }, [messages]);
  return (
    <div ref={messageList} className={s.messages}>
      {!isLoading ? (
        messages && messages.length !== 0 ? (
          messageElements
        ) : (
          <NoMessages fullName={partner?.fullName} />
        )
      ) : undefined}
      {/* <Message isTyping messageStatus="checked" content={null} />
      <Message
        isMe={true}
        messageStatus="checked"
        content={'Пк елакак елак елак елак елак елак елак елак елак ела'}
        date={Date.now()}
      />
      <Message
        avatar={require('../../../../assets/img/mock/mock_ava.png')}
        content={
          'Пк елак ек елак елаак ек елак елак елак елак ек елак елак елак елак ек елак елак елак елак ек елак елак елак елак ек елак елак елак елк елак елак елак елак елак елак елак ела'
        }
        date={Date.now()}
        attachments={[
          {
            filename: 'Morgana',
            src: 'http://img10.reactor.cc/pics/post/full/Morgana-%28Fata-Morgana-No-Yakata%29-The-House-in-Fata-Morgana-Foreign-VN-%D0%92%D0%B8%D0%B7%D1%83%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5-%D0%BD%D0%BE%D0%B2%D0%B5%D0%BB%D0%BB%D1%8B-6353049.jpeg',
          },

          {
            filename: 'Morgana',
            src: 'https://avatars.dzeninfra.ru/get-zen_doc/3765046/pub_63d54f5d5cb285585093c8cb_63d55be43391305389de5e79/scale_1200',
          },
          {
            filename: 'Morgana',
            src: 'http://img10.reactor.cc/pics/post/full/Morgana-%28Fata-Morgana-No-Yakata%29-The-House-in-Fata-Morgana-Foreign-VN-%D0%92%D0%B8%D0%B7%D1%83%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5-%D0%BD%D0%BE%D0%B2%D0%B5%D0%BB%D0%BB%D1%8B-6353049.jpeg',
          },
          {
            filename: 'Michel',
            src: 'https://i.ytimg.com/vi/E1dnlwPliUE/maxresdefault.jpg',
          },
          {
            filename: 'Giselle',
            src: 'https://myhandhelds.pl/wp-content/uploads/2020/03/2019-11-04-172636.jpg',
          },
        ]}
      />
      <Message
        content={null}
        date={Date.now()}
        attachments={[
          {
            filename: 'Morgana',
            src: 'http://img10.reactor.cc/pics/post/full/Morgana-%28Fata-Morgana-No-Yakata%29-The-House-in-Fata-Morgana-Foreign-VN-%D0%92%D0%B8%D0%B7%D1%83%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5-%D0%BD%D0%BE%D0%B2%D0%B5%D0%BB%D0%BB%D1%8B-6353049.jpeg',
          },
        ]}
      />
      <Message
        content={null}
        date={Date.now()}
        audio={require('../../../../assets/img/mock/AmazarashiNier.mp3')}
      /> */}
    </div>
  );
};
