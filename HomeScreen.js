import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Accueil</Text>
      <Button title="Paramètres" onPress={() => navigation.navigate('Settings')} />
      <Button title="Tableau des scores" onPress={() => navigation.navigate('HighScores')} />
      <Button title="Jouer au Snake" onPress={() => navigation.navigate('SnakeGame')} />
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

export default HomeScreen;
