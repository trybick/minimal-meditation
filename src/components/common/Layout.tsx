import { ReactNode } from 'react';
import { ScrollView } from 'react-native';

export default function Layout({ children }: { children: ReactNode }) {
  return <ScrollView style={{ backgroundColor: 'black' }}>{children}</ScrollView>;
}
