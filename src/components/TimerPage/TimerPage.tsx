import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from '@rneui/base';
import { differenceInSeconds } from 'date-fns';
import { endingSoundState, selectSecondsInSelectedDuration } from 'state/atoms';
import BackgroundTask from 'components/common/BackgroundTask';
import { STORAGE_KEYS } from 'utils/storage';
import { convertSecondsToClockTime } from 'utils/time';
import { playSound } from 'utils/soundPlayer';
import colors from 'style/colors';
import Layout from 'components/common/Layout';
import ButtonControls from './ButtonControls';

export default function TimerPage() {
  const endingSound = useRecoilValue(endingSoundState);
  const secondsInSelectedDuration = useRecoilValue(selectSecondsInSelectedDuration);
  const [secondsRemaining, setSecondsRemaining] = useState(secondsInSelectedDuration);
  const [isBackgroundTaskEnabled, setIsBackgroundTaskEnabled] = useState(true);
  const [isCountingDown, setIsCoutingDown] = useState(true);

  useEffect(() => {
    const recordStartTime = async () => {
      await AsyncStorage.setItem(STORAGE_KEYS.START_TIME, new Date().toISOString());
    };
    recordStartTime();
  }, []);

  const stopTimer = () => {
    playSound(endingSound);
    setIsBackgroundTaskEnabled(false);
  };

  const updateTimerProgress = async () => {
    if (!isCountingDown) {
      return;
    }
    if (secondsRemaining <= 0) {
      return stopTimer();
    }
    const startTime = await AsyncStorage.getItem(STORAGE_KEYS.START_TIME);
    const secondsSinceStart = differenceInSeconds(new Date(), Date.parse(startTime!));
    const updatedSecondsRemaining = secondsInSelectedDuration - secondsSinceStart;
    setSecondsRemaining(updatedSecondsRemaining);
  };

  const onPressPause = () => {
    setIsCoutingDown(prev => !prev);
  };

  return (
    <Layout>
      <View style={styles.pageContainer}>
        <Text style={styles.text}>{convertSecondsToClockTime(secondsRemaining)}</Text>
        <ButtonControls isCountingDown={isCountingDown} onPressPause={onPressPause} />

        {isBackgroundTaskEnabled && (
          <BackgroundTask functionToRun={updateTimerProgress} interval={1000} />
        )}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.primary,
    fontSize: 22,
    marginTop: 100,
  },
});
