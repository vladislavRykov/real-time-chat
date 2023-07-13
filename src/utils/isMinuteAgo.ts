import { isAfter } from 'date-fns/esm';

const isMinuteAgo = (date: number) => {
  const MinuteAgo = Date.now() - 60000;
  return isAfter(date, MinuteAgo);
};
export default isMinuteAgo;
