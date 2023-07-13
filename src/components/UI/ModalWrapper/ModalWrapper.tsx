import React, { PropsWithChildren } from 'react';

export const ModalWrapper: React.FC<PropsWithChildren<{ onClick: () => void }>> = ({
  onClick,
  children,
}) => {
  return (
    <>
      <div
        style={{
          zIndex: '1000',
          position: 'fixed',
          top: '0',
          left: '0',
          bottom: '0',
          right: '0',
        }}
        onClick={onClick}></div>
      {children}
    </>
  );
};
