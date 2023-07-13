import React, { useEffect, useState, useRef } from 'react';
import s from '../Chat.module.scss';
import EmojiPicker from 'emoji-picker-react';
import { AiOutlineSmile } from 'react-icons/ai';
import { ModalWrapper } from '../../../UI/ModalWrapper/ModalWrapper';
import { UploadPhotos } from '../UploadPhotos/UploadPhotos';
import { Button } from '../../../UI/Button/Button';
import { BiMicrophone } from 'react-icons/bi';
import { IoMdSend } from 'react-icons/io';
import API, { BASE_URL } from '../../../../service/api/myApi';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { addMessage, createMessage } from '../../../../redux/Slices/messagesSlice';
import { socket } from '../../../../service/ws/socket';
import { getAllDialogs } from '../../../../redux/Slices/dialogSlice';
import { PrevImg } from './PrevImg/PrevImg';

export const MessageInput = () => {
  const dispatch = useAppDispatch();
  const [dialogId, userId] = useAppSelector((state) => [
    state.dialogsR.selectedDialog?._id,
    state.auth.userData?._id,
  ]);
  const [messageValue, setMessageValue] = useState('');
  const [isShowEmoji, setIsShowEmoji] = useState(false);
  const [attachments, setAttachments] = useState<FileList | null>(null);
  useEffect(() => {
    socket.on('MESSAGE:SEND', async (data) => {
      if (data.dialog.members.includes(userId)) {
        await dispatch(getAllDialogs());
        if (dialogId === data.dialog._id) {
          dispatch(addMessage(data));
        }
      }
    });
    return () => {
      socket.off('MESSAGE:SEND', async (data) => {
        if (data.dialog.members.includes(userId)) {
          await dispatch(getAllDialogs());
          if (dialogId === data.dialog._id) {
            dispatch(addMessage(data));
          }
        }
      });
    };
  }, []);
  const sendMessage = async () => {
    if (dialogId) {
      let files = null;
      if (attachments) {
        const formData = new FormData();
        Array.from(attachments).forEach((file) => {
          formData.append('images', file);
        });
        const { data } = await API.uploadImages(formData);

        files = data.map((el: any) => el._id);
        console.log(files);
      }
      const action = await dispatch(
        createMessage({
          text: messageValue,
          dialog: dialogId,
          attachments: files,
        }),
      );
      await dispatch(getAllDialogs());
      setMessageValue('');
      setAttachments(null);
      socket.emit('MESSAGE:GET', action.payload);
    }
  };
  const onChange = (e: any) => {
    setMessageValue(e.target.value);
    e.target.style.height = '';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <div className={s.messageInput}>
      <div className={s.messageInput_wrapper}>
        <div onClick={() => setIsShowEmoji((prev) => !prev)} className={s.messageInput_img_wrapper}>
          <AiOutlineSmile className={s.messageInput_img} />
          <div className={s.messageInput_img_hover}></div>
        </div>
        {isShowEmoji && (
          <ModalWrapper onClick={() => setIsShowEmoji(false)}>
            <div onClick={(e) => e.stopPropagation()} className={s.messageInput_emoji}>
              <EmojiPicker
                onEmojiClick={(e) => setMessageValue((prev) => prev + e.unified)}
                width={350}
                height={400}
              />
            </div>
          </ModalWrapper>
        )}

        <textarea
          rows={1}
          // onKeyDown={expandTextArea}
          value={messageValue}
          onChange={onChange}
          placeholder="Введите текст..."
          className={s.messageInput_input}
        />
        <UploadPhotos setAttachments={setAttachments} />
        <Button>
          <BiMicrophone fontSize={28} />
        </Button>
        {(messageValue || attachments) && (
          <Button onClick={sendMessage}>
            <IoMdSend fontSize={28} />
          </Button>
        )}
      </div>
      <PrevImg attachments={attachments} />
    </div>
  );
};
