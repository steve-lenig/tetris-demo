import { useState, useEffect } from 'react';

function EntryScreen({ onStart }) {
  const [isVisible, setIsVisible] = useState(true);
  
  // Flashing effect for "Press Enter to Continue" text
  useEffect(() => {
    const flashInterval = setInterval(() => {
      setIsVisible(prev => !prev);
    }, 800); // Toggle visibility every 800ms
    
    return () => clearInterval(flashInterval);
  }, []);
  
  // Handle Enter key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        onStart();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onStart]);
  
  return (
    <div className="entry-screen">
      <h1 className="game-title">Tetris</h1>
      <p className={`start-prompt ${isVisible ? 'visible' : 'hidden'}`}>
        Press Enter to Continue
      </p>
    </div>
  );
}

export default EntryScreen;