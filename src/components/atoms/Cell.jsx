import React from 'react';

/**
 * Cell atom component - the most basic building block for the Tetris board
 * @param {number} type - The type of cell (0 for empty, 1-7 for different tetrominos)
 */
const Cell = ({ type }) => {
  return <div className={`cell ${type > 0 ? 'filled' : 'empty'}`} />;
};

export default Cell;