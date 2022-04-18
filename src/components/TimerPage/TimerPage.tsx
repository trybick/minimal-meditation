import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from '@rneui/base';
import { differenceInSeconds } from 'date-fns';
import { timerDurationState } from 'state/duration';
import { endingSoundState } from 'state/settings';
import BackgroundTask from 'components/common/BackgroundTask';
import { STORAGE } from 'utils/storage';
import { convertSecondsToClockTime } from 'utils/time';
import { playSound } from 'utils/soundPlayer';
import colors from 'style/colors';
import Layout from 'components/common/Layout';
import ButtonControls from './ButtonControls';

export default function TimerPage() {
  const timerDuration = useRecoilValue(timerDurationState);
  const endingSound = useRecoilValue(endingSoundState);
  const [secondsRemaining, setSecondsRemaining] = useState(timerDuration);
  const [isBackgroundTaskEnabled, setIsBackgroundTaskEnabled] = useState(true);
  const [isCountingDown, setIsCoutingDown] = useState(true);
  const [storedSeconds, setStoredSeconds] = useState(0);

  useEffect(() => {
    setStartTime();
  }, []);

  const setStartTime = async () => {
    await AsyncStorage.setItem(STORAGE.START_TIME, new Date().toISOString());
  };

  const endTimer = () => {
    setSecondsRemaining(0);
    setIsBackgroundTaskEnabled(false);
    playSound(endingSound);
  };

  const getSecondsSinceStart = async () => {
    const startTime = await AsyncStorage.getItem(STORAGE.START_TIME);
    return differenceInSeconds(new Date(), Date.parse(startTime!));
  };

  const updateTimerProgress = async () => {
    if (!isCountingDown) {
      return;
    }
    if (secondsRemaining <= 1) {
      return endTimer();
    }
    const secondsSinceStart = await getSecondsSinceStart();
    const updatedSecondsRemaining = timerDuration - storedSeconds - secondsSinceStart;
    setSecondsRemaining(updatedSecondsRemaining);
  };

  const onPressPause = async () => {
    setIsCoutingDown(false);
    const secondsSinceStart = await getSecondsSinceStart();
    await AsyncStorage.setItem(STORAGE.STORED_SECONDS, String(secondsSinceStart));
  };

  const onPressResume = async () => {
    setIsCoutingDown(true);
    const storedSeconds = await AsyncStorage.getItem(STORAGE.STORED_SECONDS);
    setStoredSeconds(prev => prev + +storedSeconds!);
    setStartTime();
  };

  return (
    <Layout>
      <View style={styles.pageContainer}>
        <Text style={styles.timeRemainingText}>{convertSecondsToClockTime(secondsRemaining)}</Text>
        <ButtonControls
          isCountingDown={isCountingDown}
          isTimerEnded={secondsRemaining === 0}
          onPressPause={onPressPause}
          onPressResume={onPressResume}
        />
      </View>

      {isBackgroundTaskEnabled && (
        <BackgroundTask functionToRun={updateTimerProgress} interval={1000} />
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  timeRemainingText: {
    color: colors.primary,
    fontSize: 50,
  },
});
