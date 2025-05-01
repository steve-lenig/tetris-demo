import React from 'react';
import Cell from '../atoms/Cell';

/**
 * Board molecule component - renders the grid of cells
 */
const Board = ({ board, player }) => {
  // Create a merged board that includes both the static board and active tetromino
  const mergedBoard = [...board].map(row => [...row]);
  
  if (player && player.tetromino) {
    player.tetromino.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          // Make sure the position is valid before adding the tetromino to the merged board
          if (
            y + player.pos.y >= 0 && 
            y + player.pos.y < mergedBoard.length && 
            x + player.pos.x >= 0 && 
            x + player.pos.x < mergedBoard[0].length
          ) {
            mergedBoard[y + player.pos.y][x + player.pos.x] = value;
          }
        }
      });
    });
  }
  
  return (
    <div className="board">
      {mergedBoard.map((row, y) => (
        <div key={y} className="row">
          {row.map((cell, x) => (
            <Cell key={`${y}-${x}`} type={cell} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;