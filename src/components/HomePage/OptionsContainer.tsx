import { useRecoilValue } from 'recoil';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@rneui/base';
import Icon from 'react-native-vector-icons/Entypo';
import { timerDurationState } from 'state/duration';
import { endingSoundState } from 'state/settings';
import { convertSecondsToClockTime } from 'utils/time';
import colors from 'style/colors';
import { DialogName } from './OptionsContainerTypes';

export default function OptionsContainer({
  openDialog,
}: {
  openDialog: (name: DialogName) => void;
}) {
  const timerDuration = useRecoilValue(timerDurationState);
  const endingSound = useRecoilValue(endingSoundState);

  return (
    <View style={styles.pageContainer}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
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
