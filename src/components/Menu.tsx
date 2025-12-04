 import { useState } from 'react';
import type { ApiCollection } from '../api/types';
import { parsePostmanCollection, exportCollection } from '../api/collection';
import './Menu.css';

interface MenuProps {
  collection: ApiCollection;
  onCollectionChange: (collection: ApiCollection) => void;
  onStartGame: () => void;
}

export default function Menu({ collection, onCollectionChange, onStartGame }: MenuProps) {
  const [showImport, setShowImport] = useState(false);

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        const parsed = parsePostmanCollection(json);
        if (parsed) {
          onCollectionChange(parsed);
          setShowImport(false);
        } else {
          alert('Failed to parse collection. Please check the format.');
        }
      } catch (err) {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  const handleExport = () => {
    const json = exportCollection(collection);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${collection.name.replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="menu crt-effect phosphor-glow">
      <div className="menu-content">
        <h1 className="title glitch">👻 HAUNTED API HOUSE 🎃</h1>
        <p className="subtitle">A Frankenstein Mashup: 1981 Horror Gaming + 2025 API Testing</p>
        
        <div className="collection-info">
          <h2>Current Collection: {collection.name}</h2>
          <p>{collection.endpoints.length} endpoints loaded</p>
        </div>

        <div className="menu-buttons">
          <button className="btn btn-primary" onClick={onStartGame}>
            🎮 START GAME
          </button>
          
          <button className="btn btn-secondary" onClick={() => setShowImport(!showImport)}>
            📁 IMPORT COLLECTION
          </button>
          
          <button className="btn btn-secondary" onClick={handleExport}>
            💾 EXPORT COLLECTION
          </button>
        </div>

        {showImport && (
          <div className="import-section">
            <h3>Import API Collection</h3>
            <p>Supports Postman v2.1 format or custom JSON</p>
            <input
              type="file"
              accept=".json"
              onChange={handleFileImport}
              className="file-input"
            />
          </div>
        )}

        <div className="instructions">
          <h3>How to Play</h3>
          <ul>
            <li>🎯 Navigate the mansion with ARROW KEYS</li>
            <li>👁️ You are a pair of floating eyes</li>
            <li>🚪 Each room = an API endpoint</li>
            <li>⚡ Enter rooms to make API requests</li>
            <li>👻 Monsters = failed requests (404, 500, etc.)</li>
            <li>🏺 Collect urn pieces = successful responses</li>
            <li>💡 Press SPACE for flashlight (inspect details)</li>
            <li>🏆 Collect all pieces to escape!</li>
          </ul>
        </div>

        <div className="credits">
          <p>Built with Kiro AI for Kiroween 2024</p>
          <p>Inspired by Atari's Haunted House (1981)</p>
        </div>
      </div>
    </div>
  );
}
