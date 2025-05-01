import React from 'react';
import Text from '../atoms/Text';

/**
 * ScoreDisplay molecule component - displays the current score
 */
const ScoreDisplay = ({ score }) => {
  return (
    <div className="score-display">
      <Text variant="score" className="score">Score: {score}</Text>
    </div>
  );
};

export default ScoreDisplay;