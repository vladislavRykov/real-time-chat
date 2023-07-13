import React, { PropsWithChildren, useRef, useEffect, useState, useMemo } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import s from './Message.module.scss';
import mockAva from '../../../assets/img/mock/mock_ava.png';
import readed from '../../../assets/img/UI/readed.svg';
import noreaded from '../../../assets/img/UI/noreaded.svg';
import typingA from '../../../assets/img/mock/typing.gif';
import cn from 'classnames';
import audioMessageImg from '../../../assets/img/UI/audioMessage.gif';
import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai';
import { calculateTime } from '../../../utils/calculateTime';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import { BsThreeDots } from 'react-icons/bs';
import { Button } from '../Button/Button';

interface MessageProps {
  avatar?: string | null;
  content: string | null;
  date?: number | null;
  isMe?: boolean;
  messageStatus?: 'checked' | 'sended';
  attachments?: any[] | null;
  isTyping?: boolean;
  audio?: string | null;
  deleteMess?: () => void;
}

export const Message: React.FC<MessageProps> = ({
  avatar = null,
  content,
  date = null,
  isMe = false,
  messageStatus = 'sended',
  attachments = null,
  isTyping = false,
  audio = null,
  deleteMess,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDur, setAudioDur] = useState<number>(1);
  const { minutes, seconds } = useMemo(
    () => calculateTime(audioProgress),
    [audioDur, audioProgress],
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onloadeddata = () => {
        setAudioDur(audioRef.current?.duration || 1);
      };
    }
  }, []);
  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);
  const isOnlyOneFile = attachments && (content ? false : attachments.length <= 1);
  const attachmentElements =
    attachments &&
    (!isOnlyOneFile ? (
      <div className={cn(s.message_attachments, { [s.my_attachments]: isMe })}>
        {attachments.map((el) => (
          <img className={s.message_attachments_img} src={el.source} />
        ))}
      </div>
    ) : (
      <img className={s.message_attachments_imgSingle} src={attachments[0].source} />
    ));

  return (
    <div className={cn(s.wrapper, { [s.my_wrapper]: isMe })}>
      <div className={cn(s.message, { [s.my_message]: isMe })}>
        {/* <img className={s.message_ava} src={avatar} alt="User Avatar" /> */}
        <UserAvatar classNames={[s.message_ava]} src={avatar} />
        <div className={s.message_textBlock}>
          <p
            onClick={(e) => {}}
            className={cn(s.message_text, {
              [s.my_text]: isMe,
              [s.message_typing_text]: isTyping,
              [s.message_singeFile_text]: isOnlyOneFile,
              [s.message_audio_text]: audio,
            })}>
            {content && !audio && <span>{content}</span>}
            {isTyping && <img src={typingA} className={s.message_typing_img} />}
            {isMe && (
              <img src={messageStatus === 'checked' ? readed : noreaded} className={s.my_checked} />
            )}
            <Button onClick={deleteMess} classNames={[s.message_settings]}>
              <BsThreeDots className={s.message_settings_img} />
            </Button>
            {attachmentElements}
            {audio && (
              <>
                <div className={s.audioBlock_controls}>
                  <audio
                    preload="auto"
                    onTimeUpdate={(e: React.ChangeEvent<HTMLAudioElement>) => {
                      setAudioProgress(e.target.currentTime);
                    }}
                    ref={audioRef}
                    className={s.audioBlock_tag}
                    src={audio}
                    onEnded={() => setAudioProgress(0)}
                  />
                  {isPlaying ? (
                    <AiFillPauseCircle
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPlaying((prev) => !prev);
                      }}
                      className={s.audioBlock_btn}
                      color="lightblue"
                      fontSize={'30px'}
                    />
                  ) : (
                    <AiFillPlayCircle
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPlaying((prev) => !prev);
                      }}
                      className={s.audioBlock_btn}
                      color="lightblue"
                      fontSize={'30px'}
                    />
                  )}
                  <img className={s.audioBlock_img} src={audioMessageImg} />
                  <span className={s.audioBlock_time}>
                    {minutes}:{seconds}
                  </span>
                </div>
                <div
                  style={{ width: `${(audioProgress / audioDur) * 100}%` }}
                  className={s.audioBlock_progress}></div>
              </>
            )}
          </p>
          {date && (
            <p className={cn(s.message_date, { [s.my_date]: isMe })}>{formatDistanceToNow(date)}</p>
          )}
        </div>
      </div>
    </div>
  );
};
