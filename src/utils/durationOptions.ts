const DURATIONS = {
  '5:00': 300,
  '10:00': 600,
  '15:00': 900,
  '20:00': 1200,
  '25:00': 1500,
  '30:00': 1800,
  '45:00': 2700,
  '60:00': 3600,
  '90:00': 5400,
};

export const DEFAULT_DURATION = DURATIONS['10:00'];
export const durationsInSeconds = Object.values(DURATIONS);

export const durationsInTimestamps = Object.keys(DURATIONS);
export const durationsEntries = Object.entries(DURATIONS);

export type DurationTimestamp = keyof typeof DURATIONS;

export const convertDurationSecondsToTimestamp = (durationSeconds: number) =>
  durationsInTimestamps.find(
    timestamp => DURATIONS[timestamp as DurationTimestamp] === durationSeconds
  );
