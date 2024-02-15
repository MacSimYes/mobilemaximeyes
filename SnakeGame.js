import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importez cette ligne

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CELL_SIZE = 20;
const CELL_MARGIN = 1;
const GRID_SIZE = Math.floor(screenWidth / CELL_SIZE);
const INITIAL_SNAKE = [{ x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const INITIAL_FOOD = { x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) };

const SnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(INITIAL_FOOD);
    setGameOver(false);
    setScore(0);
  };

  const moveSnake = () => {
    if (gameOver) return;

    const newSnake = [...snake];
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    newSnake.unshift(newHead);

    // Check if snake collided with walls
    if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
      setGameOver(true);
      return;
    }

    // Check if snake collided with itself
    if (newSnake.slice(1).some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
      setGameOver(true);
      return;
    }

    // Check if snake ate food
    if (newHead.x === food.x && newHead.y === food.y) {
      setFood({ x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) });
      setScore(score + 1);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const handlePress = (direction) => {
    switch (direction) {
      case 'UP':
        setDirection({ x: 0, y: -1 });
        break;
      case 'DOWN':
        setDirection({ x: 0, y: 1 });
        break;
      case 'LEFT':
        setDirection({ x: -1, y: 0 });
        break;
      case 'RIGHT':
        setDirection({ x: 1, y: 0 });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const interval = setInterval(moveSnake, 100);
    return () => clearInterval(interval);
  }, [snake, direction, gameOver]);

  const navigation = useNavigation(); // Utilisez la navigation

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>
      <View style={styles.grid}>
        {Array.from({ length: GRID_SIZE }).map((_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {Array.from({ length: GRID_SIZE }).map((_, colIndex) => {
              const cellStyle = [
                styles.cell,
                { width: CELL_SIZE, height: CELL_SIZE },
                snake.some(segment => segment.x === colIndex && segment.y === rowIndex) && styles.snakeCell,
                food.x === colIndex && food.y === rowIndex && styles.foodCell,
              ];
              return <View key={colIndex} style={cellStyle} />;
            })}
          </View>
        ))}
      </View>
      {gameOver && (
        <View style={styles.gameOver}>
          <Text style={styles.gameOverText}>Game Over</Text>
          <Text style={styles.gameOverScore}>Final Score: {score}</Text>
          <TouchableOpacity style={styles.restartButton} onPress={resetGame}>
            <Text style={styles.restartButtonText}>Restart</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.controls}>
        <View style={styles.joystick}>
          <TouchableOpacity style={styles.controlButton} onPress={() => handlePress('UP')}>
            <Text style={styles.controlButtonText}>UP</Text>
          </TouchableOpacity>
          <View style={styles.horizontalControls}>
            <TouchableOpacity style={styles.controlButtonLEFT} onPress={() => handlePress('LEFT')}>
              <Text style={styles.controlButtonText}>LEFT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton} onPress={() => handlePress('RIGHT')}>
              <Text style={styles.controlButtonText}>RIGHT</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.controlButton} onPress={() => handlePress('DOWN')}>
            <Text style={styles.controlButtonText}>DOWN</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Bouton pour revenir à la page d'accueil */}
      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.homeButtonText}>Accueil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  score: {
    fontSize: 20,
    marginBottom: 10,
  },
  grid: {
    borderWidth: 2,
    borderColor: 'black',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    borderWidth: CELL_MARGIN,
    borderColor: 'white',
  },
  snakeCell: {
    backgroundColor: 'green',
  },
  foodCell: {
    backgroundColor: 'red',
  },
  gameOver: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  gameOverText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  gameOverScore: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  restartButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  restartButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    marginTop: 20,
  },
  joystick: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  horizontalControls: {
    flexDirection: 'row',
  },
  controlButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  controlButtonLEFT: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    marginRight: 10,
  },
  controlButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  homeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  homeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SnakeGame;
