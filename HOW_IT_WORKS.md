# 🎓 How Haunted API House Works - Complete Explanation

This document explains every aspect of the project so you can confidently present it and answer questions.

---

## 🏗️ Architecture Overview

### High-Level Flow
```
User Input → Game State → API Calls → Monster/Urn Logic → Renderer → Canvas
     ↓           ↓            ↓              ↓              ↓          ↓
  Keyboard   React Hooks   Axios      Game Logic      Canvas 2D   Screen
```

### Layer Breakdown

**1. Presentation Layer** (React Components)
- `App.tsx`: Root component, manages menu vs game state
- `Menu.tsx`: Main menu, collection import/export
- `Game.tsx`: Main game component, orchestrates everything
- `HUD.tsx`: Overlay for API details and loading states

**2. Game Logic Layer**
- `game/mansion.ts`: Procedural mansion generation
- `game/types.ts`: Type definitions for game state
- `hooks/useGameState.ts`: Core game state management

**3. Rendering Layer**
- `engine/renderer.ts`: Canvas-based rendering
- `engine/audio.ts`: Web Audio API sound effects
- `utils/colors.ts`: Atari 2600 color palette

**4. API Layer**
- `api/client.ts`: HTTP client wrapper around Axios
- `api/collection.ts`: Import/export Postman collections
- `api/types.ts`: API-related type definitions

---

## 🎮 Core Systems Explained

### 1. Mansion Generation

**How it works:**
```typescript
// Input: Array of API endpoints
// Output: 2D grid mansion with rooms

1. Calculate grid size based on endpoint count
   - cols = ceil(sqrt(endpointCount))
   - rows = ceil(endpointCount / cols)

2. Create 2D array filled with walls (1)

3. For each endpoint:
   - Carve out a 3x3 room space (0)
   - Mark center as room (2)
   - Create corridors to adjacent rooms

4. Return layout + room positions
```

**Example:**
```
5 endpoints → 3x2 grid → 17x12 tile mansion

[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
[1,0,0,0,1,0,0,0,1,0,0,0,1,1,1,1,1]
[1,0,2,0,0,0,2,0,0,0,2,0,1,1,1,1,1]  ← 3 rooms
[1,0,0,0,1,0,0,0,1,0,0,0,1,1,1,1,1]
[1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,1]  ← corridors
[1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,1]
[1,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1]
[1,0,2,0,1,0,2,0,1,1,1,1,1,1,1,1,1]  ← 2 rooms
[1,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1]
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

Legend: 1=wall, 0=floor, 2=room center
```

### 2. Game State Management

**State Structure:**
```typescript
{
  player: {
    position: { x, y },      // Float coordinates
    urnPieces: number,       // Collected pieces
    flashlightOn: boolean    // Vision mode
  },
  rooms: [{
    id: string,              // Endpoint ID
    position: { x, y },      // Grid position
    endpoint: ApiEndpoint,   // API details
    visited: boolean,        // Request made?
    hasUrnPiece: boolean,    // Collectible?
    monster?: Monster        // Spawned on error
  }],
  mansion: {
    layout: number[][]       // 2D grid
  },
  currentRequest: {          // Active API call
    endpointId: string,
    loading: boolean
  },
  lastResponse: ApiResponse, // Last successful call
  lastError: ApiError        // Last failed call
}
```

**State Updates:**
1. **Player Movement**: Updates position, checks collisions
2. **Room Entry**: Detects when player enters room center
3. **API Request**: Triggers when entering unvisited room
4. **Response Handling**: Updates room state, spawns monster or gives urn piece
5. **Victory Check**: All urn pieces collected?

### 3. Rendering System

**Two Render Modes:**

**Darkness Mode** (flashlight off):
```typescript
1. Calculate vision radius (3 tiles)
2. For each tile in mansion:
   - Calculate distance from player
   - If within radius:
     - Render with alpha fade based on distance
     - Darker = farther away
3. Render monsters in vision
4. Always render player (bright green eyes)
```

**Flashlight Mode** (flashlight on):
```typescript
1. Render entire mansion layout
2. Show all walls with borders
3. Render all rooms (color = visited status)
4. Show urn piece locations
5. Render all monsters
6. Render player
```

**Camera System:**
```typescript
// Center camera on player
cameraX = player.x * TILE_SIZE - screenWidth / 2
cameraY = player.y * TILE_SIZE - screenHeight / 2

// Convert world to screen coordinates
screenX = worldX * TILE_SIZE - cameraX
screenY = worldY * TILE_SIZE - cameraY
```

### 4. API Request Flow

**Sequence:**
```
1. Player enters room center
   ↓
2. Check if room unvisited
   ↓
3. Set currentRequest = { loading: true }
   ↓
4. Play "enter room" sound
   ↓
5. Call apiClient.makeRequest()
   ↓
6. Wait for response...
   ↓
7a. SUCCESS:                    7b. ERROR:
    - Play success sound            - Play error sound
    - Mark room visited             - Play monster sound
    - Remove urn piece              - Spawn monster
    - Increment player pieces       - Store error details
    - Check victory                 - Mark room visited
   ↓
8. Set currentRequest = null
   ↓
9. Update UI
```

**API Client Details:**
```typescript
makeRequest(endpoint, auth, variables) {
  // 1. Replace variables in URL
  url = endpoint.url.replace(/{{(\w+)}}/g, variables[$1])
  
  // 2. Build headers
  headers = { ...endpoint.headers }
  
  // 3. Add authentication
  if (auth.type === 'bearer') {
    headers['Authorization'] = `Bearer ${auth.token}`
  }
  
  // 4. Make request with Axios
  response = await axios({
    method: endpoint.method,
    url,
    headers,
    data: endpoint.body,
    timeout: 10000
  })
  
  // 5. Return response or error
  return { response, error }
}
```

### 5. Monster System

**Monster Spawning:**
```typescript
// On API error:
errorCode = error.status || 'timeout'
monsterType = getMonsterType(errorCode)

monster = {
  type: monsterType,           // ghost, demon, zombie, etc.
  position: room.position,     // Spawn at room center
  errorCode: errorCode,        // 404, 500, etc.
  active: true,
  speed: 1
}
```

**Monster AI:**
```typescript
// Simple chase behavior
updateMonsters() {
  for each monster:
    // Calculate direction to player
    dx = player.x - monster.x
    dy = player.y - monster.y
    distance = sqrt(dx² + dy²)
    
    // Move towards player
    monster.x += (dx / distance) * monster.speed * 0.05
    monster.y += (dy / distance) * monster.speed * 0.05
}
```

**Monster Types:**
| Error Code | Monster Type | Color | Shape |
|------------|-------------|-------|-------|
| 404 | Ghost | Purple | Circle |
| 500+ | Demon | Red | Square |
| 401 | Zombie | Orange | Rectangle |
| 403 | Vampire | Dark Red | Triangle |
| Timeout | Wraith | Gray | Faded Circle |

### 6. Audio System

**Web Audio API Synthesis:**
```typescript
playSuccess() {
  // Ascending arpeggio
  frequencies = [400, 500, 600, 800]
  
  for each freq:
    oscillator = createOscillator()
    oscillator.frequency = freq
    oscillator.type = 'sine'
    
    // Play for 0.1s with fade out
    oscillator.start(time)
    gain.exponentialRampToValueAtTime(0.01, time + 0.1)
    oscillator.stop(time + 0.1)
}
```

**Sound Effects:**
- **Move**: Quick 200Hz beep
- **Enter Room**: 400→600Hz sweep
- **Success**: Ascending arpeggio (4 notes)
- **Error**: Descending 100→50Hz
- **Monster**: Sawtooth wave 150→80Hz
- **Flashlight**: Quick 800Hz click
- **Victory**: Full scale (8 notes)

---

## 🎨 Retro Aesthetic

### Atari 2600 Color Palette

**Why these specific colors?**
The Atari 2600 used the NTSC color system with only 128 colors available. We use an authentic subset:

```typescript
ATARI_COLORS = {
  BLACK: '#000000',        // Background
  DARK_BLUE: '#000084',    // Walls
  BRIGHT_GREEN: '#58F898', // Player eyes
  RED: '#E40058',          // Errors
  YELLOW: '#F8B800',       // Items
  PURPLE: '#8800BC',       // 404 Ghost
  // ... etc
}
```

### CRT Effects

**Scanlines:**
```css
.crt-effect::before {
  background: linear-gradient(
    rgba(18, 16, 16, 0) 50%,
    rgba(0, 0, 0, 0.25) 50%
  );
  background-size: 100% 4px;  /* 4px scanlines */
}
```

**Phosphor Glow:**
```css
.phosphor-glow {
  box-shadow: 
    0 0 20px rgba(0, 255, 0, 0.3),      /* Outer glow */
    inset 0 0 20px rgba(0, 255, 0, 0.1); /* Inner glow */
}
```

**Flicker Animation:**
```css
@keyframes flicker {
  /* Random opacity values to simulate CRT flicker */
  0% { opacity: 0.27861; }
  5% { opacity: 0.34769; }
  /* ... 20 keyframes total */
}
```

---

## 🔧 Technical Decisions

### Why React?
- Component-based architecture
- Hooks for clean state management
- Fast development with Vite
- Easy to understand and modify

### Why Canvas instead of DOM?
- Pixel-perfect rendering
- Better performance for game graphics
- Easier to implement retro aesthetic
- Full control over rendering pipeline

### Why Axios?
- Clean API for HTTP requests
- Built-in timeout handling
- Interceptors for auth
- Better error handling than fetch

### Why TypeScript?
- Type safety for complex game state
- Better IDE support
- Catches bugs at compile time
- Self-documenting code

---

## 🎯 Key Features Explained

### 1. Postman Import

**How it works:**
```typescript
parsePostmanCollection(json) {
  // Postman v2.1 format:
  {
    info: { name: "Collection Name" },
    item: [
      {
        name: "Request Name",
        request: {
          method: "GET",
          url: "https://...",
          header: [...],
          body: {...}
        }
      }
    ]
  }
  
  // Convert to our format:
  {
    name: json.info.name,
    endpoints: json.item.map(item => ({
      id: item.id,
      name: item.name,
      method: item.request.method,
      url: item.request.url.raw,
      headers: item.request.header,
      body: item.request.body.raw
    }))
  }
}
```

### 2. Variable Substitution

**Example:**
```typescript
// Collection has:
variables = { baseUrl: "https://api.example.com", userId: "123" }

// Endpoint URL:
url = "{{baseUrl}}/users/{{userId}}"

// After substitution:
url = "https://api.example.com/users/123"

// Implementation:
Object.entries(variables).forEach(([key, value]) => {
  url = url.replace(`{{${key}}}`, value)
})
```

### 3. Authentication

**Bearer Token:**
```typescript
headers['Authorization'] = `Bearer ${token}`
```

**Basic Auth:**
```typescript
encoded = btoa(`${username}:${password}`)
headers['Authorization'] = `Basic ${encoded}`
```

**API Key:**
```typescript
headers[apiKeyHeader] = apiKey
// Example: headers['X-API-Key'] = 'abc123'
```

---

## 🐛 Common Issues & Solutions

### Issue: CORS Errors
**Problem:** Browser blocks cross-origin requests
**Solution:** 
- Use APIs with CORS enabled
- Run a proxy server
- Use browser extension to disable CORS (dev only)

### Issue: Monsters too fast
**Problem:** Monster speed not balanced
**Solution:** Adjust `monster.speed` in game state (currently 1)

### Issue: Can't see in darkness
**Problem:** Vision radius too small
**Solution:** Increase `visionRadius` in renderer (currently 3 tiles)

### Issue: Requests timeout
**Problem:** API slow or unreachable
**Solution:** Increase timeout in `api/client.ts` (currently 10s)

---

## 📊 Performance Considerations

### Rendering Optimization
- Only render visible tiles (camera culling)
- Use `requestAnimationFrame` for smooth 30 FPS
- Disable image smoothing for crisp pixels
- Minimize canvas state changes

### State Management
- Immutable updates with spread operator
- Memoized callbacks with `useCallback`
- Efficient collision detection (grid-based)
- Lazy monster AI updates (only active monsters)

### Memory Usage
- No image assets (all procedural)
- Minimal audio (synthesized, not sampled)
- Small state tree
- No memory leaks (proper cleanup in useEffect)

---

## 🚀 Extending the Project

### Add New Monster Type
```typescript
// 1. Add to types
type MonsterType = 'ghost' | 'demon' | 'newtype'

// 2. Add color
MONSTER_COLORS = {
  ...existing,
  418: ATARI_COLORS.CYAN  // I'm a teapot
}

// 3. Add to getMonsterType()
if (errorCode === 418) return 'teapot'

// 4. Add rendering in renderer.ts
case 'teapot':
  // Draw teapot shape
  break
```

### Add New API Auth Type
```typescript
// 1. Add to types
type AuthType = 'bearer' | 'basic' | 'oauth'

// 2. Add to addAuth()
case 'oauth':
  headers['Authorization'] = `OAuth ${auth.oauthToken}`
  break
```

### Add Multiplayer
```typescript
// 1. Add WebSocket connection
const ws = new WebSocket('ws://server')

// 2. Broadcast player position
ws.send(JSON.stringify({ 
  type: 'move', 
  position: player.position 
}))

// 3. Receive other players
ws.onmessage = (msg) => {
  const data = JSON.parse(msg.data)
  updateOtherPlayers(data)
}

// 4. Render other players
otherPlayers.forEach(p => renderPlayer(p))
```

---

## 🎓 Learning Resources

### Concepts Used
- **Game Loop**: Fixed timestep updates
- **State Management**: React hooks pattern
- **Procedural Generation**: Algorithm-based content
- **Canvas Rendering**: 2D graphics programming
- **Web Audio**: Sound synthesis
- **HTTP Clients**: REST API interaction
- **Type Systems**: TypeScript generics

### Similar Projects
- Atari 2600 homebrew games
- Retro game engines (PICO-8, TIC-80)
- API testing tools (Postman, Insomnia)
- Roguelike dungeon generators

---

## 💡 Presentation Tips

### Demo Flow
1. **Show the menu** - Explain the concept
2. **Start game** - Show the retro aesthetic
3. **Navigate** - Demonstrate controls
4. **Enter room** - Trigger API request
5. **Show success** - Collect urn piece
6. **Show error** - Spawn monster
7. **Use flashlight** - Inspect details
8. **Import collection** - Show flexibility
9. **Win game** - Collect all pieces

### Key Talking Points
- "True Frankenstein mashup of 1981 and 2025"
- "Fully functional API testing tool"
- "Authentic Atari 2600 aesthetic"
- "Built entirely with Kiro in 2 hours"
- "Actually useful for developers"

### Questions You Might Get

**Q: Why Atari 2600?**
A: It's the perfect dead tech - iconic, limited, and creates a stark contrast with modern APIs.

**Q: Is it actually useful?**
A: Yes! You can import real API collections and test them. The visual feedback makes errors memorable.

**Q: How long did it take?**
A: About 2 hours with Kiro, including all code, documentation, and polish.

**Q: What was hardest?**
A: Getting the retro aesthetic authentic - color palette, rendering, and sound effects.

**Q: What's next?**
A: Multiplayer, API mocking, test automation, custom monster designs.

---

## 🎉 You're Ready!

You now understand:
- ✅ How every system works
- ✅ Why technical decisions were made
- ✅ How to extend the project
- ✅ How to demo effectively
- ✅ How to answer questions

**Go win that hackathon! 🏆👻🎃**
