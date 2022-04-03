export const DURATIONS = {
  '00:03': 3,
  '5:00': 300,
  '10:00': 600,
  '15:00': 900,
};

export const DEFAULT_DURATION = '10:00';

export const durationsInTimestamps = Object.keys(DURATIONS);
export const durationsInSeconds = Object.values(DURATIONS);
export const durationsEntries = Object.entries(DURATIONS);

export type DurationTimestamp = keyof typeof DURATIONS;
