import { ReactNode } from 'react';
import { ScrollView } from 'react-native';
import Header from 'components/Header/Header';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ScrollView>
      <Header />
      {children}
    </ScrollView>
  );
}
