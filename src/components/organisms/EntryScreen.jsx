import React from 'react';
import Text from '../atoms/Text';
import Button from '../atoms/Button';

/**
 * EntryScreen organism component - welcome screen with menu buttons
 */
const EntryScreen = ({ onStart, onHighScores }) => {
  return (
    <div className="entry-screen">
      <Text variant="title" className="game-title">Tetris</Text>
      
      <div className="menu-buttons">
        <Button onClick={onStart} className="play-button">Play</Button>
        <Button onClick={onHighScores} className="high-scores-button">High Scores</Button>
      </div>
    </div>
  );
};

export default EntryScreen;