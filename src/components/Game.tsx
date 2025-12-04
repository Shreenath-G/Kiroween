import { useEffect, useRef, useState } from 'react';
import type { ApiCollection } from '../api/types';
import { Renderer } from '../engine/renderer';
import { audioEngine } from '../engine/audio';
import { useGameState } from '../hooks/useGameState';
import { useGameLoop } from '../hooks/useGameLoop';
import { useKeyboard } from '../hooks/useKeyboard';
import HUD from './HUD';
import './Game.css';

interface GameProps {
  collection: ApiCollection;
  onExit: () => void;
}

export default function Game({ collection, onExit }: GameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  
  const { state, actions } = useGameState(collection);
  const keys = useKeyboard();

  // Initialize renderer
  useEffect(() => {
    if (canvasRef.current && !rendererRef.current) {
      rendererRef.current = new Renderer(canvasRef.current);
    }
  }, []);

  // Handle keyboard input
  useEffect(() => {
    if (keys.ArrowUp) actions.movePlayer(0, -1);
    if (keys.ArrowDown) actions.movePlayer(0, 1);
    if (keys.ArrowLeft) actions.movePlayer(-1, 0);
    if (keys.ArrowRight) actions.movePlayer(1, 0);
    if (keys[' ']) {
      actions.toggleFlashlight();
      setShowDetails(state.player.flashlightOn);
    }
    if (keys.Escape) onExit();
  }, [keys, actions, state.player.flashlightOn, onExit]);

  // Game loop
  useGameLoop(() => {
    if (rendererRef.current) {
      rendererRef.current.render(state);
    }
    actions.updateMonsters();
  }, 1000 / 30); // 30 FPS

  // Victory/Game Over
  useEffect(() => {
    if (state.victory) {
      audioEngine.playVictory();
      setTimeout(() => {
        alert('🎉 YOU ESCAPED THE HAUNTED API HOUSE! 🎉\nAll endpoints tested successfully!');
        onExit();
      }, 1000);
    }
  }, [state.victory, onExit]);

  return (
    <div className="game-container crt-effect phosphor-glow">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="game-canvas"
      />
      
      <HUD
        state={state}
        showDetails={showDetails}
        onClose={() => setShowDetails(false)}
      />

      {state.gameOver && !state.victory && (
        <div className="game-over-overlay">
          <div className="game-over-content">
            <h1>💀 GAME OVER 💀</h1>
            <p>You were consumed by API errors...</p>
            <button className="btn btn-primary" onClick={onExit}>
              Return to Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
