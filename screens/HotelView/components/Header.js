import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {colors} from '../../styles'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Header Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'colors.darkBg'
  },
});
