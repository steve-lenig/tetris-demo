import React from 'react';

/**
 * Button atom component - reusable button for game controls
 */
const Button = ({ onClick, children, className = '' }) => {
  return (
    <button 
      className={`tetris-button ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;