# 🎃 HAUNTED API HOUSE 👻

**A Frankenstein Mashup: 1981 Atari 2600 Horror Gaming + 2025 API Testing**

## What is this monstrosity?

Ever wanted to test your REST APIs while being chased by pixelated ghosts? No? Well, NOW YOU DO!

Haunted API House combines the classic 1981 Atari 2600 game "Haunted House" with modern API testing tools (Postman/Insomnia). Navigate a spooky mansion as a pair of floating eyes, where each room represents an API endpoint. Make requests, battle error monsters, and collect successful response "urn pieces" to escape!

## 🧟 The Frankenstein Factor

This project stitches together:
- **Dead Tech**: Atari 2600 graphics (4-bit color, 160x192 resolution aesthetic), retro game mechanics from 1981
- **Modern Tech**: React, TypeScript, REST APIs, real-time WebSocket updates, modern dev tools
- **The Result**: A fully functional API testing tool that looks like it crawled out of a 1981 arcade cabinet

## 🎮 Features

### Core Gameplay
- **Navigate as Eyes**: Move through a dark mansion using arrow keys
- **Rooms = Endpoints**: Each room represents a REST API endpoint (GET, POST, PUT, DELETE)
- **Monsters = Errors**: Failed requests spawn monsters (404 ghosts, 500 demons, timeout zombies)
- **Urn Pieces = Success**: Collect pieces on successful API responses
- **Flashlight**: Press SPACE to reveal request/response details

### API Testing Features
- Import/Export API collections (Postman-compatible JSON)
- Environment variables support
- Authentication (Bearer tokens, API keys, Basic Auth)
- Request history
- Response inspection (headers, body, status)
- Save favorite endpoints

### Retro Aesthetic
- Authentic Atari 2600 color palette
- Chunky pixel art (scaled up for modern screens)
- CRT screen effects (scanlines, phosphor glow)
- Retro sound effects (beeps, boops, static)
- Period-accurate UI limitations

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Rendering**: HTML5 Canvas (for pixel-perfect retro graphics)
- **API Client**: Axios
- **State Management**: React Context + Hooks
- **Styling**: CSS with CRT effects
- **Build Tool**: Vite
- **Audio**: Web Audio API (retro sound synthesis)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🎯 How to Play

1. **Load an API Collection**: Import a JSON file with your API endpoints
2. **Enter the Mansion**: Start exploring rooms (endpoints)
3. **Make Requests**: Walk into a room to trigger an API call
4. **Battle Errors**: Avoid or defeat error monsters
5. **Collect Responses**: Successful calls give you urn pieces
6. **Inspect Details**: Use flashlight (SPACE) to see request/response data
7. **Escape**: Collect all urn pieces to "win" (test all endpoints successfully)

## 🎨 Controls

- **Arrow Keys**: Move your eyes
- **SPACE**: Toggle flashlight (show/hide API details)
- **E**: Open endpoint editor
- **I**: Import API collection
- **ESC**: Pause menu

## 🏆 Kiroween Hackathon - How Kiro Built This

This project showcases multiple Kiro features:

### 1. Spec-Driven Development
Created a comprehensive spec for the game engine, API integration, and UI components. The spec broke down complex features into manageable tasks, allowing Kiro to implement each piece systematically.

### 2. Vibe Coding
Rapid iteration on the retro aesthetic - tweaking colors, animations, and game feel through natural conversation with Kiro.

### 3. Steering Documents
Custom steering docs ensured consistent Atari 2600 aesthetic across all components (color palette restrictions, pixel art guidelines, authentic retro behavior).

### 4. Agent Hooks
- Auto-format TypeScript on save
- Auto-run tests when game logic changes
- Auto-generate sprite sheets from descriptions

## 📦 Project Structure

```
haunted-api-house/
├── src/
│   ├── components/        # React components
│   │   ├── Game.tsx      # Main game canvas
│   │   ├── HUD.tsx       # Heads-up display
│   │   └── Menu.tsx      # Menus and UI
│   ├── engine/           # Game engine
│   │   ├── renderer.ts   # Atari-style rendering
│   │   ├── physics.ts    # Movement and collision
│   │   └── audio.ts      # Retro sound effects
│   ├── api/              # API testing logic
│   │   ├── client.ts     # HTTP client wrapper
│   │   ├── collection.ts # Collection management
│   │   └── types.ts      # API types
│   ├── game/             # Game logic
│   │   ├── mansion.ts    # Mansion generation
│   │   ├── entities.ts   # Player, monsters, items
│   │   └── state.ts      # Game state management
│   └── utils/            # Utilities
│       ├── colors.ts     # Atari color palette
│       └── storage.ts    # LocalStorage helpers
├── public/               # Static assets
└── docs/                 # Documentation
```

## 🎃 Why This Wins Kiroween

1. **True Frankenstein**: Genuinely incompatible tech (1981 gaming + 2025 APIs) stitched together
2. **Actually Useful**: Real API testing tool, not just a toy
3. **Visually Striking**: Authentic retro aesthetic that stands out
4. **Technical Depth**: Complex game engine + API client + state management
5. **Kiro Showcase**: Uses specs, vibe coding, steering, and hooks effectively

## 📝 License

MIT - Build something spooky!

## 🧛 Credits

Built with Kiro AI for Kiroween 2024 Hackathon
Inspired by Atari's Haunted House (1981)
