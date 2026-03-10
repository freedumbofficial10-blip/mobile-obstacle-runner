# PulseDash Survival (Playable Phaser Prototype)

A working mobile-friendly survival game built with **HTML + CSS + JavaScript + Phaser 3**.

## Project Structure

```text
mobile-obstacle-runner/
├── index.html     # App shell and screens (Menu, Gameplay, Game Over)
├── styles.css     # Mobile UI styles and layout
├── app.js         # Game flow, Phaser logic, localStorage persistence
└── README.md      # Setup and run instructions
```

## Features Implemented

- Main Menu with **Play Now** button
- Playable gameplay scene
- Character movement (tap left/right half of screen)
- Obstacle spawning
- Coin spawning and collection
- Live score timer
- Collision detection and Game Over trigger
- Game Over screen with Restart button
- Local storage persistence for:
  - `best time`
  - `coins`
  - `level`

## Game Flow

Main Menu → Play Now → Gameplay → Game Over → Restart

## Run Instructions

### Option 1: Python

```bash
python3 -m http.server 4173
```

Open: `http://localhost:4173`

### Option 2: VS Code Live Server

Serve `index.html` with any static server and open in browser.

## Controls

- **Tap left side**: move character left lane
- **Tap right side**: move character right lane

## Persistence

Progress is saved in browser localStorage using keys:

- `pulsedash_best_time`
- `pulsedash_total_coins`
- `pulsedash_level`
