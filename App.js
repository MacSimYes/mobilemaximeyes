// HomeScreen.js

import React from 'react';
import { View, Text, Button, ImageBackground, StyleSheet, TouchableOpacity, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={{uri: 'https://example.com/your-image.jpg'}} style={styles.backgroundImage}>
        <View style={styles.content}>
          {/* Contenu centré verticalement */}
          <View style={styles.centeredContent}>
            <Text style={styles.title}>Snake</Text>
            {/* Image */}
            <Image source={{uri: 'https://jeu-du-serpent.fr/wp-content/themes/snake/img/snake-game.png'}} style={styles.image} />
          </View>
          {/* Boutons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SnakeGame')}>
              <Text style={styles.buttonText}>Jouer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HighScores')}>
              <Text style={styles.buttonText}>Tableau des scores</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
              <Text style={styles.buttonText}>Paramètres</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 128, 0, 0.5)', // Vert citron avec une opacité de 0.5
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  title: {
    fontSize: 34,
    color: 'white',
    marginBottom: 20,
  },
  image: {
    width: 200, // Largeur de l'image
    height: 200, // Hauteur de l'image
    resizeMode: 'contain', // Ajustement de l'image
  },
  buttonContainer: {
    marginBottom: 100, // Positionner les boutons à 100px du bas de la page
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center', // Centrer le texte au milieu du bouton
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default HomeScreen;
