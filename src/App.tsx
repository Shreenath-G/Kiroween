import { useState } from 'react';
import Game from './components/Game';
import Menu from './components/Menu';
import { createSampleCollection } from './api/collection';
import type { ApiCollection } from './api/types';
import './App.css';

function App() {
  const [collection, setCollection] = useState<ApiCollection>(createSampleCollection());
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="app">
      {!gameStarted ? (
        <Menu
          collection={collection}
          onCollectionChange={setCollection}
          onStartGame={() => setGameStarted(true)}
        />
      ) : (
        <Game
          collection={collection}
          onExit={() => setGameStarted(false)}
        />
      )}
    </div>
  );
}

export default App;
