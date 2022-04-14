import { ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ScrollView contentContainerStyle={styles.layout} keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  layout: {
    backgroundColor: 'black',
    display: 'flex',
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
