import React from 'react';
import Text from '../atoms/Text';
import Button from '../atoms/Button';

/**
 * GameOver organism component - shows game over screen with score and options
 */
const GameOver = ({ score, onRestart, highScores, showHighScores, onToggleHighScores, onBack }) => {
  return (
    <div className="game-over">
      <Text variant="heading">Game Over</Text>
      <Text variant="subheading" className="final-score">Final Score: {score}</Text>
      
      {showHighScores ? (
        <div className="high-scores">
          <Text variant="subheading">High Scores</Text>
          {highScores.length > 0 ? (
            <div className="scores-list">
              {highScores.map((highScore, index) => (
                <div key={index} className="high-score-item">
                  <span className="rank">{index + 1}.</span>
                  <span className="high-score">{highScore.score}</span>
                  <span className="date">{highScore.formattedDate}</span>
                </div>
              ))}
            </div>
          ) : (
            <Text>No high scores yet</Text>
          )}
          <Button onClick={() => onToggleHighScores(false)}>Back</Button>
        </div>
      ) : (
        <div className="game-over-buttons">
          <Button onClick={onRestart}>Play Again</Button>
          <Button onClick={() => onToggleHighScores(true)}>High Scores</Button>
          <Button onClick={onBack}>Back to Menu</Button>
        </div>
      )}
    </div>
  );
};

export default GameOver;