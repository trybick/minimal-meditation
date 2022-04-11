import { ReactNode } from 'react';
import { ScrollView } from 'react-native';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={{ backgroundColor: 'black' }}>
      {children}
    </ScrollView>
  );
}
