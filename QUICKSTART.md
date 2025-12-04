# 🎮 Quick Start Guide - Haunted API House

## Installation (5 minutes)

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Steps
```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# Navigate to http://localhost:3000
```

That's it! The game will load with a sample API collection.

---

## First Playthrough (10 minutes)

### 1. Main Menu
- You'll see the title screen with sample APIs loaded
- Click **"START GAME"** to begin

### 2. Game Controls
- **Arrow Keys**: Move your eyes through the mansion
- **SPACE**: Toggle flashlight (inspect API details)
- **ESC**: Pause/exit game

### 3. Gameplay Loop
1. Navigate through dark corridors
2. Find rooms (marked with colored squares)
3. Enter a room to trigger an API request
4. **Success**: Collect an urn piece ✅
5. **Error**: A monster spawns! 👻
6. Use flashlight to inspect request/response details
7. Collect all urn pieces to win!

### 4. Understanding the HUD
- **Top Left**: Urn pieces collected / total
- **Top Right**: Flashlight status
- **Center**: Loading indicator during requests

---

## Using Your Own APIs

### Method 1: Import Postman Collection
1. Click **"IMPORT COLLECTION"** on main menu
2. Select your Postman v2.1 JSON file
3. Click **"START GAME"**

### Method 2: Create Custom Collection
Create a JSON file with this format:

```json
{
  "name": "My API Collection",
  "baseUrl": "https://api.example.com",
  "endpoints": [
    {
      "id": "1",
      "name": "Get Users",
      "method": "GET",
      "url": "https://api.example.com/users",
      "description": "Fetch all users"
    },
    {
      "id": "2",
      "name": "Create User",
      "method": "POST",
      "url": "https://api.example.com/users",
      "body": "{\"name\": \"Test User\"}",
      "headers": {
        "Content-Type": "application/json"
      }
    }
  ],
  "auth": {
    "type": "bearer",
    "token": "your-token-here"
  }
}
```

Then import via the menu.

---

## Tips & Tricks

### 🎯 Efficient Testing
- Use flashlight mode to inspect responses without leaving the room
- Monsters won't hurt you (yet) - they're just visual indicators
- Visit all rooms to ensure complete API coverage

### 🔦 Flashlight Mode
When enabled, you can see:
- Full mansion layout
- All rooms and their status
- Urn piece locations
- Monster positions
- Detailed API request/response data

### 👻 Monster Types
- **Purple Ghost**: 404 Not Found
- **Red Demon**: 500 Server Error
- **Orange Zombie**: 401 Unauthorized
- **Dark Red Vampire**: 403 Forbidden
- **Gray Wraith**: Request Timeout

### 🏆 Victory Condition
Collect all urn pieces by successfully calling every endpoint in your collection!

---

## Troubleshooting

### Game won't start
- Check browser console for errors
- Ensure you're using a modern browser (Chrome, Firefox, Edge)
- Try clearing cache and reloading

### API requests failing
- Check CORS settings on your API
- Verify authentication tokens
- Use browser DevTools Network tab to debug

### Performance issues
- Close flashlight mode for better FPS
- Reduce number of endpoints in collection
- Use a smaller browser window

### No sound
- Check browser audio permissions
- Unmute your system
- Some browsers block audio until user interaction

---

## Example Collections

### Test with Public APIs

**JSONPlaceholder (Default)**
Already loaded! Just click START GAME.

**GitHub API**
```json
{
  "name": "GitHub API",
  "endpoints": [
    {
      "id": "1",
      "name": "Get User",
      "method": "GET",
      "url": "https://api.github.com/users/octocat"
    },
    {
      "id": "2",
      "name": "Get Repos",
      "method": "GET",
      "url": "https://api.github.com/users/octocat/repos"
    }
  ]
}
```

**Dog API**
```json
{
  "name": "Dog API",
  "endpoints": [
    {
      "id": "1",
      "name": "Random Dog",
      "method": "GET",
      "url": "https://dog.ceo/api/breeds/image/random"
    },
    {
      "id": "2",
      "name": "List Breeds",
      "method": "GET",
      "url": "https://dog.ceo/api/breeds/list/all"
    }
  ]
}
```

---

## Advanced Features

### Environment Variables
Use `{{variable}}` syntax in URLs:

```json
{
  "name": "API with Variables",
  "variables": {
    "baseUrl": "https://api.example.com",
    "userId": "123"
  },
  "endpoints": [
    {
      "id": "1",
      "name": "Get User",
      "method": "GET",
      "url": "{{baseUrl}}/users/{{userId}}"
    }
  ]
}
```

### Authentication

**Bearer Token**
```json
{
  "auth": {
    "type": "bearer",
    "token": "your-jwt-token"
  }
}
```

**Basic Auth**
```json
{
  "auth": {
    "type": "basic",
    "username": "user",
    "password": "pass"
  }
}
```

**API Key**
```json
{
  "auth": {
    "type": "apikey",
    "apiKey": "your-key",
    "apiKeyHeader": "X-API-Key"
  }
}
```

---

## Building for Production

```bash
# Build optimized version
npm run build

# Preview production build
npm run preview

# Deploy dist/ folder to your hosting service
```

---

## Next Steps

1. ✅ Complete the tutorial with sample APIs
2. 📁 Import your own API collection
3. 🎮 Test all your endpoints
4. 🏆 Achieve victory by collecting all urn pieces
5. 📤 Export your collection for sharing
6. 🎨 Enjoy the retro aesthetic!

---

## Need Help?

- Check the main README.md for detailed documentation
- Review KIROWEEN_SUBMISSION.md for technical details
- Inspect the code - it's well-commented!
- Open browser DevTools for debugging

**Happy haunting! 👻🎃**
