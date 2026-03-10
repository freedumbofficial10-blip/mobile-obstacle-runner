# PulseDash Survival — Mobile Casual Game Prototype

## 1) Game Name
**PulseDash Survival**

## 2) Gameplay Concept
PulseDash Survival is a one-hand, endless obstacle survival game built for short and addictive sessions. Players control a runner with tap and hold interactions to dodge hazards, collect coins, and extend survival time while speed progressively ramps up.

### Core Pillars
- **One-hand mastery**: Simple input, high skill ceiling.
- **Session-friendly loops**: 1–3 minute runs with instant restart.
- **Visible progression**: Coins, missions, skins, upgrades, daily rewards.
- **Competitive motivation**: High score and leaderboard positioning.

## 3) Game Loop
1. Open app and claim daily reward.
2. Select mode (default: Endless Run).
3. Start run and survive while collecting coins.
4. Run ends after collision or manual stop.
5. Review result summary (time, score, coins, mission progress).
6. Spend coins in shop for skins/upgrades.
7. Repeat to chase high score and mission completion.

## 4) App Structure
- **Splash**: Brand identity and entry CTA.
- **Main Menu**: Quick status, mission snapshot, route to core actions.
- **Mode Selection**: Choose mode and difficulty flavor.
- **Gameplay**: HUD + playfield + one-hand input zone.
- **Pause**: Resume or end run.
- **Results**: Performance breakdown and reward feedback.
- **Daily Rewards**: Streak-based retention mechanic.
- **Shop**: Skins, boosts, and upgrade progression.
- **Profile / Settings**: User identity and control preferences.
- **Screen Gallery**: One-tap preview hub showing all screens for fast demo review.

## 5) Screen Explanations
### Splash Screen
Neon brand reveal, loading animation, and a single tap-to-start CTA for immediate onboarding.

### Main Menu
Displays best time, ranking, and mission prompt with a prominent Play button plus shortcut cards.

### Mode Selection
Mode cards with selected and locked states to set expectation and progression goals.

### Gameplay Screen
High-contrast HUD (time/score/coins), animated playfield representation, and large one-hand control zone.

### Pause Screen
Low-friction interruption state with clear resume and end-run options.

### Results Screen
Rewards closure using score card + reward popup + replay CTA.

### Daily Rewards
7-day streak grid with claimed/active states and claim call-to-action.

### Shop
Tabbed commerce layout for skins, boosts, bundles with coin-based price CTAs.

### Profile / Settings
Player identity card and compact toggles (audio, vibration, handedness) for personalization.

### Screen Gallery
Centralized preview list of every screen so reviewers can jump directly to any page instead of navigating linearly.

## 6) UI Design Direction
- **Style**: Futuristic arcade neon with dark gradients.
- **Visual hierarchy**: Bold headings, bright CTA buttons, clear HUD tokens.
- **Feedback cues**: Reward popup, locked state cards, selected mode highlighting.
- **Polish details**: Rounded cards, glow shadows, smooth screen transitions.
- **Mobile realism**: 360×760 phone frame and thumb-friendly component spacing.
- **Review efficiency**: Added quick navigation bar + gallery for full-screen preview workflow.

## 7) Front-End Code
The working prototype is implemented with:
- `index.html` for all app screens and UI structure.
- `styles.css` for visual system, animation, and layout.
- `app.js` for screen navigation and back-stack behavior.

## 8) Prototype Goals
This prototype is UI-first, intended for concept validation, usability walkthroughs, and visual handoff before wiring live gameplay logic.
