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
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
  },
});
