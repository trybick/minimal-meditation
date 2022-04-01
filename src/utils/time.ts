// example input '10:00'
export const convertMinutesToSeconds = (duration: string) => {
  const [minutes, seconds] = duration.split(':');
  return +minutes * 60 + seconds;
};

export const convertSecondsToClockTime = (secondsRemaining: number) => {
  const minutes = Math.floor((secondsRemaining / 60) % 60);
  const seconds = Math.floor(secondsRemaining % 60);
  const minutesForDisplay = minutes < 10 ? `0${minutes}` : minutes;
  const secondsForDisplay = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutesForDisplay}:${secondsForDisplay}`;
};
