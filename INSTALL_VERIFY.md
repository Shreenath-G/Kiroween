# ✅ Installation Verification Guide

Follow these steps to verify your Haunted API House installation is working correctly.

---

## 🚀 Step 1: Install Dependencies

```bash
npm install
```

**Expected Output:**
```
added 200+ packages in 30s
```

**Verify:**
- [ ] No error messages
- [ ] `node_modules/` folder created
- [ ] `package-lock.json` created

---

## 🔧 Step 2: Check TypeScript Compilation

```bash
npx tsc --noEmit
```

**Expected Output:**
```
(no output = success)
```

**Verify:**
- [ ] No compilation errors
- [ ] No type errors
- [ ] Command exits with code 0

**If errors appear:**
- Check Node.js version (need 18+)
- Delete `node_modules` and reinstall
- Check `tsconfig.json` is present

---

## 🎮 Step 3: Start Development Server

```bash
npm run dev
```

**Expected Output:**
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

**Verify:**
- [ ] Server starts without errors
- [ ] Port 3000 is available
- [ ] URL is displayed

**If port 3000 is busy:**
- Edit `vite.config.ts` to use different port
- Or stop other services using port 3000

---

## 🌐 Step 4: Open in Browser

Open: `http://localhost:3000`

**Expected Result:**
- [ ] Page loads without errors
- [ ] Title screen appears
- [ ] "HAUNTED API HOUSE" text visible
- [ ] Menu buttons visible
- [ ] No console errors (F12 to check)

**Visual Checklist:**
- [ ] Green border around menu
- [ ] CRT scanline effects visible
- [ ] Text is readable
- [ ] Buttons are styled
- [ ] Ghost emoji/icons display

---

## 🎯 Step 5: Test Menu Functions

### Test 1: Start Game
1. Click "START GAME" button
2. Wait for game to load

**Expected:**
- [ ] Game canvas appears
- [ ] Black background with green border
- [ ] Player eyes visible (green circles)
- [ ] HUD shows "URN PIECES: 0/10"
- [ ] No errors in console

### Test 2: Controls
1. Press Arrow Keys (↑ ↓ ← →)
2. Move around the mansion

**Expected:**
- [ ] Player moves smoothly
- [ ] Walls block movement
- [ ] Camera follows player
- [ ] Subtle movement sound (if audio enabled)

### Test 3: Flashlight
1. Press SPACE key
2. Observe changes

**Expected:**
- [ ] Mansion becomes fully visible
- [ ] Walls show blue color
- [ ] Rooms are highlighted
- [ ] "FLASHLIGHT ON" appears in HUD
- [ ] Click sound plays

### Test 4: API Request
1. Navigate to a room (colored square)
2. Stand in the center
3. Wait for request

**Expected:**
- [ ] "REQUESTING..." appears
- [ ] Loading indicator shows
- [ ] After 1-2 seconds, result appears
- [ ] Either: Urn piece collected OR monster spawns
- [ ] Sound effect plays

### Test 5: Flashlight Details
1. Stand in a visited room
2. Press SPACE for flashlight
3. Observe overlay

**Expected:**
- [ ] Overlay panel appears
- [ ] Endpoint name visible
- [ ] HTTP method badge shown
- [ ] URL displayed
- [ ] Response data visible (if successful)
- [ ] Close button (X) works

---

## 📁 Step 6: Test Import/Export

### Test Import
1. Click "IMPORT COLLECTION"
2. Select `examples/sample-collection.json`
3. Observe result

**Expected:**
- [ ] File loads without error
- [ ] Collection name updates
- [ ] Endpoint count shows 10
- [ ] Import section closes

### Test Export
1. Click "EXPORT COLLECTION"
2. Check downloads folder

**Expected:**
- [ ] JSON file downloads
- [ ] File name matches collection
- [ ] File contains valid JSON
- [ ] Can re-import the file

---

## 🏆 Step 7: Test Victory Condition

1. Start game
2. Visit all 10 rooms
3. Collect all urn pieces

**Expected:**
- [ ] HUD shows "10/10" urn pieces
- [ ] Victory sound plays
- [ ] Alert appears: "YOU ESCAPED!"
- [ ] Returns to menu

**Note:** Some rooms may spawn monsters (404 errors). That's expected!

---

## 🔊 Step 8: Test Audio

**Test Each Sound:**
- [ ] Movement (arrow keys) - quick beep
- [ ] Enter room - ascending tone
- [ ] Success - happy arpeggio
- [ ] Error - descending tone
- [ ] Monster - scary growl
- [ ] Flashlight - click
- [ ] Victory - full scale

**If no audio:**
- Check browser audio permissions
- Unmute system volume
- Try different browser
- Some browsers block audio until user interaction

---

## 🎨 Step 9: Visual Quality Check

### Colors
- [ ] Background is pure black
- [ ] Player eyes are bright green
- [ ] Walls are dark blue
- [ ] UI text is white/yellow
- [ ] Monsters have distinct colors

### Effects
- [ ] CRT scanlines visible
- [ ] Phosphor glow around border
- [ ] Slight screen flicker
- [ ] Pixels are crisp (not blurred)

### Performance
- [ ] Smooth 30 FPS
- [ ] No lag when moving
- [ ] No stuttering during requests
- [ ] Responsive controls

---

## 🐛 Step 10: Error Testing

### Test 404 Error
1. Start game
2. Find "Trigger 404" room
3. Enter it

**Expected:**
- [ ] Purple ghost spawns
- [ ] Error sound plays
- [ ] Monster chases player
- [ ] Flashlight shows error details

### Test CORS Error
1. Import collection with CORS-blocked API
2. Try to test endpoint

**Expected:**
- [ ] Request fails
- [ ] Error message shown
- [ ] Monster spawns
- [ ] Game doesn't crash

---

## 📊 Verification Checklist

### Installation
- [ ] Dependencies installed
- [ ] TypeScript compiles
- [ ] Dev server starts
- [ ] Browser loads page

### Core Functionality
- [ ] Menu displays correctly
- [ ] Game starts
- [ ] Player moves
- [ ] Flashlight toggles
- [ ] API requests work
- [ ] Responses display

### Features
- [ ] Import collection works
- [ ] Export collection works
- [ ] Authentication supported
- [ ] Error handling works
- [ ] Victory condition triggers

### Polish
- [ ] Audio plays
- [ ] Visuals are crisp
- [ ] Performance is smooth
- [ ] No console errors

### Documentation
- [ ] README is clear
- [ ] Quick start works
- [ ] Examples provided
- [ ] Code is commented

---

## 🔧 Common Issues & Fixes

### Issue: "Cannot find module 'react'"
**Fix:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Port 3000 already in use"
**Fix:**
Edit `vite.config.ts`:
```typescript
server: {
  port: 3001, // Change to different port
}
```

### Issue: TypeScript errors
**Fix:**
```bash
npm install --save-dev typescript@latest
npx tsc --noEmit
```

### Issue: Blank screen in browser
**Fix:**
1. Check browser console (F12)
2. Clear cache (Ctrl+Shift+R)
3. Try different browser
4. Check `index.html` exists

### Issue: API requests fail
**Fix:**
1. Check internet connection
2. Try different API (use sample collection)
3. Check CORS settings
4. Use browser DevTools Network tab

### Issue: No audio
**Fix:**
1. Check browser audio permissions
2. Unmute system
3. Click on page first (browsers block audio until interaction)
4. Try different browser

### Issue: Slow performance
**Fix:**
1. Close other tabs
2. Disable browser extensions
3. Check CPU usage
4. Try smaller collection (fewer endpoints)

---

## ✅ Success Criteria

Your installation is verified if:

1. ✅ All dependencies installed without errors
2. ✅ TypeScript compiles with no errors
3. ✅ Dev server starts successfully
4. ✅ Page loads in browser
5. ✅ Game starts and is playable
6. ✅ API requests work (at least with sample collection)
7. ✅ Flashlight mode shows details
8. ✅ Import/export functions work
9. ✅ Audio plays (or you know why it doesn't)
10. ✅ No critical console errors

---

## 🎉 You're Ready!

If all checks pass, your installation is complete and working correctly!

**Next Steps:**
1. Read `QUICKSTART.md` for usage guide
2. Try importing your own API collections
3. Explore the code in `src/`
4. Prepare your demo with `PRESENTATION_SCRIPT.md`

**For Hackathon:**
1. Practice the demo
2. Prepare to explain technical details
3. Have backup plan if internet fails
4. Be ready to answer questions

---

## 📞 Still Having Issues?

### Debug Checklist
- [ ] Node.js version 18 or higher?
- [ ] npm version 9 or higher?
- [ ] Modern browser (Chrome, Firefox, Edge)?
- [ ] Internet connection working?
- [ ] Firewall not blocking localhost?
- [ ] Antivirus not blocking Node?

### Get Help
1. Check browser console for errors
2. Check terminal for error messages
3. Review `HOW_IT_WORKS.md` for technical details
4. Try on different computer
5. Ask for help with specific error messages

---

## 🎯 Quick Verification Script

Run this to verify everything at once:

```bash
# Install
npm install

# Type check
npx tsc --noEmit

# Build test
npm run build

# If all succeed, you're good!
echo "✅ Installation verified!"
```

**Expected:** All commands succeed with no errors.

---

**Good luck with your hackathon! 🏆👻🎃**
