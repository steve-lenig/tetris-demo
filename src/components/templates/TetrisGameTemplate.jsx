import React from 'react';
import Board from '../molecules/Board';
import ScoreDisplay from '../molecules/ScoreDisplay';
import GameOver from '../organisms/GameOver';
import Button from '../atoms/Button';

/**
 * TetrisGameTemplate - template for organizing the game layout
 */
const TetrisGameTemplate = ({ 
  board,
  player, 
  score, 
  gameOver,
  showHighScores,
  highScores,
  onRestart,
  onToggleHighScores,
  onBack
}) => {
  return (
    <div className="tetris-container">
      <div className="game-info">
        <ScoreDisplay score={score} />
        <Button onClick={onBack} className="back-button">Back to Menu</Button>
      </div>
      <Board board={board} player={player} />
      
      {gameOver && (
        <GameOver 
          score={score}
          onRestart={onRestart}
          highScores={highScores}
          showHighScores={showHighScores}
          onToggleHighScores={onToggleHighScores}
          onBack={onBack}
        />
      )}
    </div>
  );
};

export default TetrisGameTemplate;