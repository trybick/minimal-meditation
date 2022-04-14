import React, { useReducer } from 'react';
import { useRecoilValue } from 'recoil';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@rneui/base';
import Icon from 'react-native-vector-icons/Entypo';
import { selectTimerDuration } from 'state/duration';
import { selectEndingSound } from 'state/settings';
import { convertSecondsToClockTime } from 'utils/time';
import colors from 'style/colors';
import DurationOptionsDialog from './Dialogs/DurationOptionsDialog';
import CustomDurationDialog from './Dialogs/CustomDurationDialog';
import EndingSoundDialog from './Dialogs/EndingSoundDialog';

type State = {
  currentDialog: DialogName | null;
  customDuration: string;
};

const initialState = {
  currentDialog: null,
  customDuration: '',
};

export type DialogName = 'DurationOptions' | 'CustomDuration' | 'EndingSound';

export type Action =
  | { type: 'openDialog'; name: DialogName }
  | { type: 'closeDialogs' }
  | { type: 'setCustomDuration'; value: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'openDialog':
      return { ...state, currentDialog: action.name };
    case 'closeDialogs':
      return { ...state, currentDialog: null };
    case 'setCustomDuration':
      return { ...state, customDuration: action.value };
    default:
      throw new Error('reducer failed');
  }
}

export default function OptionsContainer() {
  const timerDuration = useRecoilValue(selectTimerDuration);
  const endingSound = useRecoilValue(selectEndingSound);
  const [{ currentDialog, customDuration }, dispatch] = useReducer(reducer, initialState);

  const isDialogVisible = (name: DialogName) => currentDialog === name;
  const openDialog = (name: DialogName) => dispatch({ type: 'openDialog', name });
  const closeDialogs = () => dispatch({ type: 'closeDialogs' });

  return (
    <View style={styles.optionsContainer}>
      <TouchableOpacity
        onPress={() => openDialog('DurationOptions')}
        style={styles.optionContainer}
      >
        <Text style={styles.optionText}>Duration</Text>
        <View style={styles.currentSetting}>
          <Text style={styles.optionText}>{convertSecondsToClockTime(timerDuration)}</Text>
          <Icon color={colors.primary} name="chevron-small-right" size={22} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => openDialog('EndingSound')} style={styles.optionContainer}>
        <Text style={styles.optionText}>Ending Sound</Text>
        <View style={styles.currentSetting}>
          <Text style={styles.optionText}>{endingSound}</Text>
          <Icon color={colors.primary} name="chevron-small-right" size={22} />
        </View>
      </TouchableOpacity>

      <DurationOptionsDialog
        closeDialogs={closeDialogs}
        isVisible={isDialogVisible('DurationOptions')}
        openDialog={openDialog}
      />
      <CustomDurationDialog
        closeDialogs={closeDialogs}
        customDuration={customDuration}
        dispatch={dispatch}
        isVisible={isDialogVisible('CustomDuration')}
      />
      <EndingSoundDialog closeDialogs={closeDialogs} isVisible={isDialogVisible('EndingSound')} />
    </View>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 400,
    width: '100%',
  },
  optionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginBottom: 24,
    padding: 14,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 10,
  },
  optionText: {
    color: colors.primary,
    fontSize: 18,
    marginRight: 5,
  },
  currentSetting: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
