import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HighScoresScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Tableau des scores</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HighScoresScreen;
