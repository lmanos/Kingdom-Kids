# ⚔️ Kingdom Kids: Bible Adventure
## Complete PWA Game - Deployment Guide

---

### 🚀 INSTANT DEPLOY (1 Minute)
1. **Netlify**: Drag the entire output folder to https://app.netlify.com/drop
2. **Vercel**: `npx vercel --prod` in the output folder
3. **GitHub Pages**: Push to repo → Settings → Pages → Deploy

That's it! HTTPS is automatic. Works offline after first load!

---

### 📱 WHAT'S INCLUDED (Fully Playable MVP)

**Files:**
- `index.html` — Full game (all JS/CSS inline, ~60KB)
- `manifest.json` — PWA manifest (installable on phones!)
- `sw.js` — Service worker (offline play, asset caching)

**Complete Game Features:**
- ✅ 4 Biomes: Forest, Sea, Mountains, Plains
- ✅ All 9 Puzzles fully coded and playable
- ✅ Full 3D scenes using Babylon.js 6
- ✅ Mobile virtual joystick + touch buttons
- ✅ Desktop WASD/mouse controls
- ✅ Enemy combat (Zelda-style blob fights)
- ✅ Coin collection & XP system
- ✅ 9 Fruit of the Spirit unlocks + abilities
- ✅ Cinematic reward screens with NLT Bible verses
- ✅ Voice narration (Web Speech API)
- ✅ 6 family profiles (localStorage)
- ✅ Daily streak system (7-day rewards)
- ✅ Shop (coin purchases + IAP stubs)
- ✅ Bible Hero Gallery + quizzes
- ✅ Pause menu with easy mode, accessibility
- ✅ Dev cheats (Alt+G, Alt+C, Alt+S)
- ✅ PWA installable + offline play

---

### 🎮 CONTROLS

| Mobile | Desktop |
|--------|---------|
| Left joystick → Move | WASD → Move |
| ⚔️ button → Attack | LMB / Space → Attack |
| 🦘 button → Jump | Space → Jump |
| 💬 button → Interact | E → Interact |
| Pinch → Zoom camera | Scroll → Zoom |

---

### 📖 BIBLE CONTENT (NLT)

**Main Verse:** Galatians 5:22-23 NLT
"But the Holy Spirit produces this kind of fruit in our lives: love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control."

**9 Puzzle Bible Stories:**
1. **Creation** (Gen 1:31) → Love → Heal Orbs
2. **Noah's Ark** (Gen 9:13) → Joy → Speed Dash
3. **David & Goliath** (1 Sam 17:47) → Peace → Shield
4. **Red Sea** (Ex 14:14) → Patience → Grapple Hook
5. **Loaves & Fish** (John 6:11) → Kindness → Aura Heal
6. **Good Samaritan** (Luke 10:37) → Goodness → Light Reveal
7. **Armor of God** (Eph 6:11) → Faithfulness → Sword Upgrade
8. **Prodigal Son** (Luke 15:20) → Gentleness → Slow-Mo
9. **Jonah** (Jonah 2:10) → Self-Control → Freeze

---

### 🔧 CONFIGURATION

**To enable Firebase (profiles/leaderboards):**
1. Create project at console.firebase.google.com
2. Add config to index.html (search `firebaseConfig`)

**To enable Stripe (IAP purchases):**
1. Get publishable key from stripe.com
2. Search `pk_test_XXX` → replace with your key
3. Create Price IDs in Stripe dashboard

**To enable Google Analytics:**
1. Add gtag.js before `</head>`

---

### 🎨 CUSTOMIZATION

**Add more levels:** Copy `loadBiomeScene()` pattern
**Add puzzles:** Add to `PUZZLE_CONFIGS` and create `buildXXXPuzzle()`
**Change character:** Modify `createPlayer()` mesh shapes
**Music:** Add Howler.js + MP3 files, uncomment `startBGM()`

---

### 📊 PERFORMANCE

- Target: 30-60fps on mobile
- Poly count: ~500-2000 tris per scene (low-poly style)
- Texture: Dynamic textures only (no image loading)
- Bundle: ~60KB HTML + Babylon.js CDN (~3MB cached)
- First load: ~3-5 seconds on 4G
- Subsequent loads: <1 second (service worker cache)

---

### 🔒 KID SAFETY

- ✅ No violence (enemies "poof" into coins)
- ✅ No adult content
- ✅ No external chat/social features
- ✅ Positive, encouraging messages only
- ✅ Bible-based content throughout
- ✅ Respawn with humor ("Oof! Try again!")
- ✅ Easy mode for younger children

---

### 📞 SUPPORT

For church deployments, bulk licenses, or custom branding:
- Configure your church's Stripe account for donations
- Add Firebase for cloud saves across devices
- Customize King Jesus dialogue with your pastor's messages

*"Be strong and courageous! Do not be afraid or discouraged. For the Lord your God is with you wherever you go." — Joshua 1:9 NLT*

**Version:** 1.0.0 | Built for Kingdom families 👑
