export const calculateTime = (timeInSec: number): { minutes: string; seconds: string } => {
  const minutes_raw = Math.floor(timeInSec / 60);
  const seconds_init = String(timeInSec % 60);
  const seconds_raw = +seconds_init.substring(0, 2);
  const minutes = minutes_raw < 10 ? `0${minutes_raw}` : String(minutes_raw);
  const seconds = seconds_raw < 10 ? `0${seconds_raw}` : String(seconds_raw);
  return { minutes, seconds };
};
