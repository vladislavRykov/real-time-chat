import React, { useRef } from 'react';
import s from '../Chat.module.scss';
import { BiMicrophone } from 'react-icons/bi';
import { MdPhotoCamera } from 'react-icons/md';

interface UploadPhotosProps {
  setAttachments: React.Dispatch<React.SetStateAction<FileList | null>>;
}

export const UploadPhotos: React.FC<UploadPhotosProps> = ({ setAttachments }) => {
  const inputFile = useRef<HTMLInputElement>(null);
  return (
    <div
      onClick={() => {
        inputFile.current?.click();
      }}
      className={s.messageInput_img_wrapper}>
      <input
        accept=".jpg,.png,.jpeg,.wemb,.gif"
        onChange={(e) => setAttachments(e.target.files)}
        className={s.uploadPhotosInput}
        multiple
        type="file"
        ref={inputFile}
      />
      <MdPhotoCamera className={s.messageInput_img} />
      <div className={s.messageInput_img_hover}></div>
    </div>
  );
};
