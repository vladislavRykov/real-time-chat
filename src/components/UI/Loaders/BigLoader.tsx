import React from 'react';

interface BigLoaderProps {
  classNames?: string[];
}

export const BigLoader: React.FC<BigLoaderProps> = ({ classNames = [] }) => {
  return (
    <img
      className={classNames.join(' ')}
      src={require('../../../assets/img/UI/loaders/bigLoader.gif')}
    />
  );
};
