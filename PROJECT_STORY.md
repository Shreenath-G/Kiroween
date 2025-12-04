# 🎃 Haunted API House

**Tagline:** *"Test your APIs... if you dare. 👻"*

---

## Inspiration

The idea came from a late-night debugging session, toggling between Postman and a retro gaming emulator. The thought hit: *"What if API testing wasn't so boring?"*

Two worlds collided:

1. **Atari's Haunted House (1981)** — One of the first survival horror games, where you navigate a pitch-black mansion as floating eyes, avoiding ghosts and collecting urn pieces.

2. **Modern API Testing** — The repetitive task of hitting endpoints, checking responses, and hunting down errors.

The metaphor was perfect:
- Rooms → API Endpoints
- Darkness → Untested API state
- Monsters → HTTP Errors (404 ghosts, 500 demons)
- Urn Pieces → Successful responses
- Flashlight → Request/Response inspector

What if debugging felt like *surviving*?

---

## What it does

Haunted API House transforms API testing into a retro survival horror game:

1. **Import your API collection** (Postman-compatible JSON)
2. **Navigate a haunted mansion** where each room is an endpoint
3. **Trigger API calls** by entering rooms
4. **Battle error monsters** — failed requests spawn ghosts (404), demons (500), zombies (timeout)
5. **Collect urn pieces** from successful responses
6. **Use your flashlight** (SPACE) to inspect full request/response details
7. **Escape the mansion** by successfully testing all endpoints

It's a fully functional API testing tool wrapped in authentic Atari 2600 aesthetics — $160 \times 192$ resolution, 128-color palette, CRT scanlines, and retro sound synthesis.

---

## How we built it

### Architecture

```
┌─────────────────────────────────────┐
│           React UI Layer            │
│  (Menu, HUD, Game Canvas Component) │
├─────────────────────────────────────┤
│         Game Engine Layer           │
│   (Renderer, Audio, Game Loop)      │
├─────────────────────────────────────┤
│          API Client Layer           │
│  (HTTP Client, Collections, Auth)   │
├─────────────────────────────────────┤
│         State Management            │
│    (React Hooks, Game State)        │
└─────────────────────────────────────┘
```

### Tech Stack
- **Frontend**: React 18 + TypeScript
- **Rendering**: HTML5 Canvas with pixel-perfect scaling
- **API Client**: Axios with auth support
- **Audio**: Web Audio API for retro sound synthesis
- **Build**: Vite

### Rendering Math

The renderer scales Atari resolution to modern screens:

$$s = \min\left(\frac{w_{screen}}{160}, \frac{h_{screen}}{192}\right)$$

Each "pixel" becomes an $s \times s$ block for that chunky retro look.

### Gameplay Mechanics

Response time affects darkness level:

$$\text{darkness} = \min\left(1, \frac{t_{response}}{5000}\right)$$

Slow APIs literally leave you in the dark longer.

Monster spawn rates scale with HTTP method complexity:

| Method | Spawn Rate |
|--------|-----------|
| GET | $0.1$ |
| POST | $0.3$ |
| PUT | $0.4$ |
| DELETE | $0.5$ |

---

## Challenges we ran into

### 1. Canvas Performance

Initial CRT effects (scanlines, phosphor glow) killed frame rate:

$$t_{frame} = 45ms \approx 22 \text{ FPS}$$

Solution: Pre-render static effects to offscreen canvas:

$$t_{frame} = 12ms \approx 83 \text{ FPS}$$

### 2. CORS Nightmares

Browser-based API testing means CORS blocks many endpoints. We built proxy mode support and turned CORS errors into literal ghosts haunting the player.

### 3. Fun vs. Utility Balance

Too game-like → useless for real testing
Too tool-like → defeats the purpose

The flashlight mechanic solved this: immersive gameplay, but SPACE reveals full technical details.

### 4. Audio Fatigue

Retro beeps get annoying. Implemented volume decay:

$$v = v_{base} \cdot e^{-n/10}$$

Where $n$ = recent play count. Sounds naturally fade with repetition.

---

## Accomplishments that we're proud of

1. **Authentic Retro Feel** — Not just "pixel art" but actual Atari 2600 constraints: color limits, resolution, sprite sizes

2. **Actually Useful** — Real API testing with collections, auth, environment variables, and response inspection

3. **The Metaphor Works** — Error monsters, darkness for slow responses, flashlight for inspection — it all maps naturally

4. **Performance** — Smooth 60+ FPS despite CRT effects and real-time API calls

5. **Kiro-Powered Development** — Used specs, steering docs, and hooks to build systematically:
   ```
   Features: 47
   Spec-driven: 38 (81%)
   Vibe iterations: 156
   ```

---

## What we learned

### 1. Constraints Breed Creativity

The Atari 2600 had $128$ bytes of RAM. Working within artificial limits forced creative solutions.

### 2. Game Feel is Subtle

The difference between "functional" and "fun":
- Screen shake: amplitude $5px$, decay $e^{-t/100}$
- Phosphor persistence: $\alpha_{t+1} = 0.85 \cdot \alpha_t$
- Input latency: under $16ms$

### 3. APIs Mirror Games

Good APIs and good games share traits:
- Clear feedback (status codes = events)
- Predictable behavior (REST = learnable mechanics)
- Graceful failure (error handling = difficulty curve)

### 4. Kiro Changes Everything

Spec-driven development + vibe coding = rapid iteration with structure. Estimated 60% time savings.

---

## What's next for Kiro_Hack

1. **WebSocket Support** — Real-time API testing with live monster spawns

2. **Multiplayer Mode** — Team API testing where players explore different endpoints simultaneously

3. **API Coverage Visualization** — Mansion map shows tested vs. untested endpoints

4. **Custom Monsters** — Define your own error creatures for specific status codes

5. **Leaderboards** — Compete on response times and error-free runs

6. **CI/CD Integration** — Run the "game" headlessly as part of test pipelines, with pass/fail based on urn collection

7. **More Retro Modes** — NES, Game Boy, and CGA aesthetics for variety

---

*Built with Kiro AI for Kiroween 2024* 🎃
