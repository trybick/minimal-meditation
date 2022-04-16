import { Dispatch, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useSetRecoilState } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dialog, Input } from '@rneui/base';
import { timerDurationState } from 'state/duration';
import { STORAGE } from 'utils/storage';
import { numberRegex } from 'utils/regex';
import { convertMinutesToSeconds } from 'utils/time';
import { Action } from '../OptionsContainerTypes';

export default function CustomDurationDialog({
  isVisible,
  closeDialogs,
  dispatch,
  customDuration,
}: {
  isVisible: boolean;
  closeDialogs: () => void;
  dispatch: Dispatch<Action>;
  customDuration: string;
}) {
  const setTimerDuration = useSetRecoilState(timerDurationState);
  const clearInput = () => dispatch({ type: 'setCustomDuration', value: '' });
  const inputRef = useRef<Input | null>(null);

  const onChange = (value: string) => {
    if (!value) {
      clearInput();
    } else if (numberRegex.test(value)) {
      dispatch({ type: 'setCustomDuration', value });
    }
  };

  const onSubmit = async () => {
    const customDurationToSet = convertMinutesToSeconds(+customDuration);
    setTimerDuration(customDurationToSet);
    await AsyncStorage.setItem(STORAGE.SAVED_DURATION, String(customDurationToSet));
    clearInput();
    closeDialogs();
  };

  const onCancel = () => {
    clearInput();
    closeDialogs();
  };

  const onDialogShow = () => {
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <Dialog isVisible={isVisible} onBackdropPress={() => closeDialogs()} onShow={onDialogShow}>
      <Input
        inputStyle={styles.colorWhite}
        keyboardType="numeric"
        onChangeText={onChange}
        placeholder="Duration in minutes"
        ref={inputRef as any}
        shake={() => null}
        value={customDuration}
      />
      <Dialog.Actions>
        <Dialog.Button onPress={onSubmit} title="ENTER" titleStyle={styles.colorWhite} />
        <Dialog.Button onPress={onCancel} title="CANCEL" titleStyle={styles.colorWhite} />
      </Dialog.Actions>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  colorWhite: {
    color: 'white',
  },
});
