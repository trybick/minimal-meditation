import { useReducer } from 'react';
import { useRecoilValue } from 'recoil';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@rneui/base';
import Icon from 'react-native-vector-icons/Entypo';
import { timerDurationState } from 'state/duration';
import { endingSoundState } from 'state/settings';
import { convertSecondsToClockTime } from 'utils/time';
import colors from 'style/colors';
import DurationOptionsDialog from './Dialogs/DurationOptionsDialog';
import CustomDurationDialog from './Dialogs/CustomDurationDialog';
import EndingSoundDialog from './Dialogs/EndingSoundDialog';
import { Action, DialogName, State } from './OptionsContainerTypes';

const initialState = {
  currentDialog: null,
  customDuration: '',
};

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
  const timerDuration = useRecoilValue(timerDurationState);
  const endingSound = useRecoilValue(endingSoundState);
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
        <Text style={styles.text}>Duration</Text>
        <View style={styles.currentSetting}>
          <Text style={styles.text}>{convertSecondsToClockTime(timerDuration)}</Text>
          <Icon color={colors.primary} name="chevron-small-right" size={22} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => openDialog('EndingSound')} style={styles.optionContainer}>
        <Text style={styles.text}>Ending Sound</Text>
        <View style={styles.currentSetting}>
          <Text style={styles.text}>{endingSound}</Text>
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
    alignItems: 'center',
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
  text: {
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
