import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './navigation/Navigator'

import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigator />
      <StatusBar />
    </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
