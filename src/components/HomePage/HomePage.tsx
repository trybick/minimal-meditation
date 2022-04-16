import { useReducer } from 'react';
import { StyleSheet, View } from 'react-native';
import { useBackButtonHandler } from 'hooks/useBackButtonHandler';
import Layout from 'components/common/Layout';
import OptionsContainer from './OptionsContainer';
import StartButton from './StartButton';
import DurationOptionsDialog from './Dialogs/DurationOptionsDialog';
import CustomDurationDialog from './Dialogs/CustomDurationDialog';
import EndingSoundDialog from './Dialogs/EndingSoundDialog';
import { Action, DialogName, State } from './HomePageTypes';

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

export default function HomePage() {
  useBackButtonHandler();
  const [{ currentDialog, customDuration }, dispatch] = useReducer(reducer, initialState);

  const isDialogVisible = (name: DialogName) => currentDialog === name;
  const openDialog = (name: DialogName) => dispatch({ type: 'openDialog', name });
  const closeDialogs = () => dispatch({ type: 'closeDialogs' });

  return (
    <Layout>
      <View style={[styles.pageContainer, !!currentDialog && styles.hidden]}>
        <OptionsContainer openDialog={openDialog} />
        <StartButton />
      </View>

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
    </Layout>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    flex: 1,
  },
  hidden: {
    opacity: 0,
  },
});
