import React, { useState, useEffect } from 'react';
import s from './PrevImg.module.scss';
import { PrevImgItem } from './PrevImgItem';
import cn from 'classnames';
import delay from '../../../../../utils/delay';

interface PrevImgProps {
  attachments: FileList | null;
}

export const PrevImg: React.FC<PrevImgProps> = ({ attachments }) => {
  const [imgPrevSrc, setImgPrevSrc] = useState<any[]>([]);
  const [showFullImgSrc, setShowFullImgSrc] = useState<string | null>(null);

  useEffect(() => {
    setImgPrevSrc([]);
    if (attachments) {
      Array.from(attachments).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImgPrevSrc((prev) => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  }, [attachments]);

  const smallDelay = async () => {
    if (!showFullImgSrc) {
      return false;
    }
    await delay(100);
    return true;
  };

  return (
    <div className={s.prevImgs}>
      {imgPrevSrc.map((src) => (
        <PrevImgItem setShowFullImgSrc={setShowFullImgSrc} src={src} />
      ))}
      {showFullImgSrc && (
        <div className={cn(s.prevImgs_fullImg, { [s.show]: showFullImgSrc })}>
          <div className={s.prevImgs_fullImg_close} onClick={() => setShowFullImgSrc(null)}>
            Закрыть
          </div>
          <img src={showFullImgSrc || undefined} />
        </div>
      )}
    </div>
  );
};
