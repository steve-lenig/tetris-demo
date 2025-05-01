import React, { useState, useEffect, useCallback } from 'react';
import TetrisGameTemplate from '../templates/TetrisGameTemplate';

// Tetromino shapes
const tetrominos = {
  0: { shape: [[0]], color: '0' },
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    color: '1',
  },
  J: {
    shape: [
      [0, 0, 0],
      [2, 2, 2],
      [0, 0, 2]
    ],
    color: '2',
  },
  L: {
    shape: [
      [0, 0, 0],
      [3, 3, 3],
      [3, 0, 0]
    ],
    color: '3',
  },
  O: {
    shape: [
      [4, 4],
      [4, 4]
    ],
    color: '4',
  },
  S: {
    shape: [
      [0, 0, 0],
      [0, 5, 5],
      [5, 5, 0]
    ],
    color: '5',
  },
  T: {
    shape: [
      [0, 0, 0],
      [6, 6, 6],
      [0, 6, 0]
    ],
    color: '6',
  },
  Z: {
    shape: [
      [0, 0, 0],
      [7, 7, 0],
      [0, 7, 7]
    ],
    color: '7',
  }
};

// Generate random tetromino
const randomTetromino = () => {
  const shapes = 'IJLOSTZ';
  const randShape = shapes[Math.floor(Math.random() * shapes.length)];
  return tetrominos[randShape];
};

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

// Create empty board
const createBoard = () => 
  Array.from(Array(BOARD_HEIGHT), () => Array(BOARD_WIDTH).fill(0));

// High score utilities
const saveHighScore = (score) => {
  try {
    const now = new Date();
    const scoreData = {
      score,
      date: now.toISOString(),
      formattedDate: now.toLocaleString()
    };
    
    // Get existing high scores or initialize empty array
    const highScores = JSON.parse(localStorage.getItem('tetrisHighScores') || '[]');
    
    // Add new score
    highScores.push(scoreData);
    
    // Sort by score (highest first)
    highScores.sort((a, b) => b.score - a.score);
    
    // Keep only top 10 scores
    const topScores = highScores.slice(0, 10);
    
    // Save back to localStorage
    localStorage.setItem('tetrisHighScores', JSON.stringify(topScores));
    
    return topScores;
  } catch (error) {
    console.error('Error saving high score:', error);
    return [];
  }
};

const getHighScores = () => {
  try {
    return JSON.parse(localStorage.getItem('tetrisHighScores') || '[]');
  } catch (error) {
    console.error('Error getting high scores:', error);
    return [];
  }
};

/**
 * TetrisGame page - container for all game logic and state
 */
const TetrisGame = ({ onBack }) => {
  const [board, setBoard] = useState(createBoard());
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: tetrominos[0].shape,
    collided: false,
  });
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScores, setHighScores] = useState([]);
  const [showHighScores, setShowHighScores] = useState(false);

  // Check for collision
  const checkCollision = useCallback((player, board, { x: moveX, y: moveY }) => {
    for (let y = 0; y < player.tetromino.length; y++) {
      for (let x = 0; x < player.tetromino[y].length; x++) {
        // 1. Check that we're on a tetromino cell
        if (player.tetromino[y][x] !== 0) {
          // 2. Check boundaries
          if (
            // Check that our move is inside the game's height (y)
            !board[y + player.pos.y + moveY] ||
            // Check that our move is inside the game's width (x)
            x + player.pos.x + moveX < 0 ||
            x + player.pos.x + moveX >= BOARD_WIDTH ||
            // Check that cell we're moving to isn't already filled
            board[y + player.pos.y + moveY][x + player.pos.x + moveX] !== 0
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }, []);

  // Reset game
  const resetGame = useCallback(() => {
    setBoard(createBoard());
    const newTetromino = randomTetromino();
    const newPlayer = {
      pos: { x: BOARD_WIDTH / 2 - 2, y: 0 },
      tetromino: newTetromino.shape,
      collided: false,
    };
    setPlayer(newPlayer);
    setGameOver(false);
    setScore(0);
    setDropTime(1000);
    setShowHighScores(false);
    // Load high scores from local storage
    setHighScores(getHighScores());
  }, []);

  // Move tetromino
  const movePlayer = useCallback((dir) => {
    if (!checkCollision(player, board, { x: dir, y: 0 })) {
      setPlayer(prev => ({
        ...prev,
        pos: { x: prev.pos.x + dir, y: prev.pos.y }
      }));
    }
  }, [player, board, checkCollision]);

  // Drop tetromino
  const drop = useCallback(() => {
    if (!checkCollision(player, board, { x: 0, y: 1 })) {
      setPlayer(prev => ({
        ...prev,
        pos: { x: prev.pos.x, y: prev.pos.y + 1 }
      }));
    } else {
      // Game over check
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
        // Save the score when game is over
        const updatedHighScores = saveHighScore(score);
        setHighScores(updatedHighScores);
        return;
      }
      
      // Merge tetromino with board
      setBoard(prev => {
        const newBoard = [...prev];
        player.tetromino.forEach((row, y) => {
          row.forEach((value, x) => {
            if (value !== 0) {
              newBoard[y + player.pos.y][x + player.pos.x] = value;
            }
          });
        });
        
        // Check for completed rows and calculate score
        const completedRows = newBoard.reduce((acc, row, idx) => {
          if (row.every(cell => cell !== 0)) {
            acc.push(idx);
          }
          return acc;
        }, []);
        
        if (completedRows.length > 0) {
          // Remove completed rows and add new rows at the top
          completedRows.forEach(row => {
            newBoard.splice(row, 1);
            newBoard.unshift(Array(BOARD_WIDTH).fill(0));
          });
          
          // Update score
          setScore(prev => prev + completedRows.length * 100);
        }
        
        return newBoard;
      });
      
      // Reset player position and get new tetromino
      const newTetromino = randomTetromino();
      setPlayer({
        pos: { x: BOARD_WIDTH / 2 - 2, y: 0 },
        tetromino: newTetromino.shape,
        collided: false,
      });
    }
  }, [player, board, checkCollision, score]);

  // Rotate tetromino
  const rotate = (matrix) => {
    // Transpose matrix
    const rotated = matrix.map((_, index) => 
      matrix.map(col => col[index])
    );
    // Reverse each row to get a rotated matrix
    return rotated.map(row => row.reverse());
  };

  const rotatePlayer = useCallback(() => {
    const rotated = rotate(player.tetromino);
    if (!checkCollision({ ...player, tetromino: rotated }, board, { x: 0, y: 0 })) {
      setPlayer(prev => ({
        ...prev,
        tetromino: rotated
      }));
    }
  }, [player, board, checkCollision]);

  // Handle key presses
  useEffect(() => {
    if (gameOver) return;

    const handleKeyDown = (e) => {
      if (gameOver) return;

      switch (e.key) {
        case 'ArrowLeft':
          movePlayer(-1);
          break;
        case 'ArrowRight':
          movePlayer(1);
          break;
        case 'ArrowDown':
          drop();
          break;
        case 'ArrowUp':
          rotatePlayer();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameOver, movePlayer, drop, rotatePlayer]);

  // Start the game
  useEffect(() => {
    resetGame();
  }, [resetGame]);

  // Drop tetromino at interval
  useEffect(() => {
    if (!gameOver && dropTime) {
      const dropTetromino = setInterval(() => {
        drop();
      }, dropTime);
      
      return () => {
        clearInterval(dropTetromino);
      };
    }
  }, [drop, gameOver, dropTime]);

  const handleToggleHighScores = (show) => {
    setShowHighScores(show);
  };

  return (
    <TetrisGameTemplate
      board={board}
      player={player}
      score={score}
      gameOver={gameOver}
      showHighScores={showHighScores}
      highScores={highScores}
      onRestart={resetGame}
      onToggleHighScores={handleToggleHighScores}
      onBack={onBack}
    />
  );
};

export default TetrisGame;