import React, { useEffect } from 'react';
import s from './Dialogs.module.scss';
import { DialogItem } from './DialogItem/DialogItem';
import orderBy from 'lodash/orderBy';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { getAllDialogs, selectDialog } from '../../../../redux/Slices/dialogSlice';
import isMinuteAgo from '../../../../utils/isMinuteAgo';
import { getMilliseconds } from 'date-fns/esm';

export const Dialogs = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllDialogs());
  }, []);
  const { dialogs, selectedDialog } = useAppSelector((state) => state.dialogsR);
  // const dialogsArray = [
  //   {
  //     user: {
  //       fullName: 'Никита Шадрин',
  //       isOnline: true,
  //       ava: null,
  //     },
  //     message: {
  //       text: 'Соси хуй',
  //       isReaded: true,
  //       time: new Date('2023-05-21T21:50:00').getTime(),
  //     },
  //   },
  //   {
  //     user: {
  //       fullName: 'Никита Шадрин',
  //       isOnline: true,
  //       ava: require('../../../../assets/img/mock/mock_ava.png'),
  //     },
  //     message: {
  //       text: 'Соси хуйси хуйси хуйси уйси хуйси уйси хуйси уйси хуйси хуйси хуйси хуй',
  //       isReaded: false,
  //       time: new Date(2023, 4, 1).getTime(),
  //     },
  //   },
  //   {
  //     user: {
  //       fullName: 'Никита Шадрин',
  //       isOnline: false,
  //       ava: null,
  //     },
  //     message: {
  //       text: 'Соси хуйси хуйси хуйси уйси хуйси уйси хуйси уйси хуйси хуйси хуйси хуй',
  //       isReaded: false,
  //       time: new Date(2023, 4, 1).getTime(),
  //     },
  //   },
  //   {
  //     user: {
  //       fullName: 'Никита Шадрин',
  //       isOnline: false,
  //       ava: null,
  //     },
  //     message: {
  //       text: 'Соси хуйси хуйси хуйси уйси хуйси уйси хуйси уйси хуйси хуйси хуйси хуй',
  //       isReaded: false,
  //       time: new Date(2023, 4, 1).getTime(),
  //     },
  //   },
  //   {
  //     user: {
  //       fullName: 'Никита Шадрин',
  //       isOnline: false,
  //       ava: null,
  //     },
  //     message: {
  //       text: 'Соси хуйси хуйси хуйси уйси хуйси уйси хуйси уйси хуйси хуйси хуйси хуй',
  //       isReaded: false,
  //       time: new Date(2023, 4, 1).getTime(),
  //     },
  //   },
  //   {
  //     user: {
  //       fullName: 'Никита Шадрин',
  //       isOnline: false,
  //       ava: null,
  //     },
  //     message: {
  //       text: 'Соси хуйси хуйси хуйси уйси хуйси уйси хуйси уйси хуйси хуйси хуйси хуй',
  //       isReaded: false,
  //       time: new Date(2023, 4, 1).getTime(),
  //     },
  //   },
  //   {
  //     user: {
  //       fullName: 'Никита Шадрин',
  //       isOnline: false,
  //       ava: null,
  //     },
  //     message: {
  //       text: 'Соси хуйси хуйси хуйси уйси хуйси уйси хуйси уйси хуйси хуйси хуйси хуй',
  //       isReaded: false,
  //       time: new Date(2023, 4, 1).getTime(),
  //     },
  //   },
  //   {
  //     user: {
  //       fullName: 'Никита Шадрин',
  //       isOnline: false,
  //       ava: null,
  //     },
  //     message: {
  //       text: 'Соси хуйси хуйси хуйси уйси хуйси уйси хуйси уйси хуйси хуйси хуйси хуй',
  //       isReaded: false,
  //       time: new Date(2023, 4, 1).getTime(),
  //     },
  //   },
  //   {
  //     user: {
  //       fullName: 'Никита Шадрин',
  //       isOnline: false,
  //       ava: null,
  //     },
  //     message: {
  //       text: 'Соси хуйси хуйси хуйси уйси хуйси уйси хуйси уйси хуйси хуйси хуйси хуй',
  //       isReaded: false,
  //       time: new Date(2023, 4, 1).getTime(),
  //     },
  //   },
  //   {
  //     user: {
  //       fullName: 'Никита Шадрин',
  //       isOnline: false,
  //       ava: null,
  //     },
  //     message: {
  //       text: 'Соси хуйси хуйси хуйси уйси хуйси уйси хуйси уйси хуйси хуйси хуйси хуй',
  //       isReaded: false,
  //       time: new Date(2023, 4, 1).getTime(),
  //     },
  //   },
  //   {
  //     user: {
  //       fullName: 'Никита Шадрин',
  //       isOnline: false,
  //       ava: null,
  //     },
  //     message: {
  //       text: 'Соси хуйси хуйси хуйси уйси хуйси уйси хуйси уйси хуйси хуйси хуйси хуй',
  //       isReaded: false,
  //       time: new Date(2023, 4, 1).getTime(),
  //     },
  //   },
  // ];
  // const newArr = orderBy(dialogsArray, ['message.time'], ['desc']);
  return (
    <div className={s.dialogs}>
      {dialogs && dialogs.length !== 0 ? (
        dialogs.map((dialog) => (
          <DialogItem
            isSelected={Boolean(dialog._id === selectedDialog?._id)}
            onClick={() => dispatch(selectDialog({ _id: dialog._id, partner: dialog.partner }))}
            fullName={dialog.partner.fullName}
            // isOnline={isMinuteAgo(new Date(dialog.partner.last_seen).getTime())}
            isOnline={dialog.partner.isOnline}
            isReaded
            time={new Date(
              dialog.lastMessage ? dialog.lastMessage.createdAt : dialog.createdAt,
            ).getTime()}
            text={dialog.lastMessage && dialog.lastMessage?.text}
          />
        ))
      ) : (
        <div>Нет диалогов</div>
      )}
    </div>
  );
};
