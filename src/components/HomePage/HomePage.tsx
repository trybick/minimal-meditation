import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useBackButtonHandler } from 'hooks/useBackButtonHandler';
import Header from '../Header/Header';

export default function HomePage() {
  useBackButtonHandler();

  return (
    <ScrollView>
      <Header pageTitle="Word Categories" />
      <View style={styles.pageContainer}>
        <Text>home</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 40,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
