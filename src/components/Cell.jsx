import React from 'react';

const Cell = ({ type }) => {
  return <div className={`cell ${type > 0 ? 'filled' : 'empty'}`} />;
};

export default Cell;