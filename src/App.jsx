import { useState } from 'react'
import './App.css'
import EntryScreen from './components/organisms/EntryScreen'
import TetrisGame from './components/pages/TetrisGame'
import HighScoresPage from './components/pages/HighScoresPage'

// App screens for navigation
const SCREENS = {
  ENTRY: 'entry',
  GAME: 'game',
  HIGH_SCORES: 'highScores'
};

function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.ENTRY);

  const navigateToGame = () => {
    setCurrentScreen(SCREENS.GAME);
  };

  const navigateToHighScores = () => {
    setCurrentScreen(SCREENS.HIGH_SCORES);
  };

  const navigateToMenu = () => {
    setCurrentScreen(SCREENS.ENTRY);
  };

  return (
    <div className="App">
      {currentScreen === SCREENS.ENTRY && (
        <EntryScreen 
          onStart={navigateToGame} 
          onHighScores={navigateToHighScores} 
        />
      )}
      
      {currentScreen === SCREENS.GAME && (
        <TetrisGame 
          onBack={navigateToMenu}
        />
      )}
      
      {currentScreen === SCREENS.HIGH_SCORES && (
        <HighScoresPage 
          onBack={navigateToMenu}
        />
      )}
    </div>
  );
}

export default App
