# Super Mario - Phaser.js

https://andchir.github.io/mario-js/

A classic Super Mario game implementation built with Phaser.js 3.87.0 featuring the complete first level with professional visuals and gameplay mechanics.

## 🎮 Features

- **Complete Level 1-1**: Full implementation of the classic first Mario level
- **Smooth Controls**: Arrow keys for movement, Space bar for jumping
- **Classic Enemies**: Goombas with AI patrolling behavior
- **Power-ups**: Collect mushrooms to grow bigger and break bricks
- **Collectibles**: Coins scattered throughout the level and hidden in question blocks
- **Physics**: Realistic jumping, gravity, and collision detection
- **Score System**: Points for collecting coins, defeating enemies, and completing levels
- **Lives System**: Start with 3 lives, gain extra lives every 100 coins
- **Timer**: Complete the level before time runs out
- **Professional UI**: Score, coins, lives, and timer display

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/andchir/mario-js.git
cd mario-js
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎯 How to Play

### Controls
- **Arrow Left/Right**: Move Mario left and right
- **Space Bar**: Jump
- **Space Bar (in menu)**: Start game

### Gameplay
- Collect coins for points (100 points each)
- Stomp on enemies by jumping on them (200 points)
- Hit question blocks from below to reveal power-ups or coins
- Collect mushrooms to grow bigger (allows breaking bricks)
- Break bricks when powered up for 50 points each
- Reach the flag at the end to complete the level
- Avoid falling into pits
- Complete the level before time runs out

### Scoring
- Coin collected: 100 points
- Enemy stomped: 200 points
- Brick broken: 50 points
- Mushroom collected: 1000 points
- 100 coins: Extra life
- Time bonus: 50 points per second remaining

## 📁 Project Structure

```
mario-js/
├── src/
│   ├── index.js              # Main entry point and game configuration
│   ├── scenes/               # Game scenes
│   │   ├── BootScene.js      # Initial loading scene
│   │   ├── PreloadScene.js   # Asset creation and preloading
│   │   ├── MenuScene.js      # Main menu
│   │   ├── Level1Scene.js    # Level 1 gameplay
│   │   └── UIScene.js        # HUD overlay
│   ├── entities/             # Game entities
│   │   ├── Player.js         # Mario player character
│   │   └── Goomba.js         # Goomba enemy
│   └── config/               # Level configurations
│       └── Level1Config.js   # Level 1 data structure
├── index.html                # HTML entry point
├── vite.config.js            # Vite bundler configuration
└── package.json              # Project dependencies
```

## 🏗️ Architecture

### Scene Management
The game uses Phaser's scene system for clean separation of concerns:
- **BootScene**: Displays loading progress
- **PreloadScene**: Generates visual assets programmatically
- **MenuScene**: Main menu with instructions
- **Level1Scene**: Main gameplay scene
- **UIScene**: Persistent HUD overlay

### Entity System
Game entities are organized as ES6 classes extending Phaser sprites:
- **Player**: Manages Mario's movement, jumping, power-ups, and collision responses
- **Goomba**: Enemy AI with patrol behavior and collision detection

### Level Configuration
Levels are defined as data structures in separate config files, making it easy to:
- Add new levels by creating new config files
- Modify existing levels by editing the data
- Reuse the same scene code for multiple levels

### Adding New Levels

To add a new level:

1. Create a new config file in `src/config/` (e.g., `Level2Config.js`):
```javascript
export default {
    name: 'Level 1-2',
    width: 6400,
    height: 600,
    playerStart: { x: 100, y: 400 },
    grounds: [ /* ... */ ],
    bricks: [ /* ... */ ],
    questions: [ /* ... */ ],
    coins: [ /* ... */ ],
    enemies: [ /* ... */ ],
    pipes: [ /* ... */ ],
    goal: { x: 6200, y: 400 }
};
```

2. Create a new scene file in `src/scenes/` (e.g., `Level2Scene.js`):
```javascript
import Level1Scene from './Level1Scene.js';
import Level2Config from '../config/Level2Config.js';

export default class Level2Scene extends Level1Scene {
    constructor() {
        super();
        this.sceneKey = 'Level2Scene';
    }

    create() {
        this.levelConfig = Level2Config;
        super.create();
    }
}
```

3. Add the new scene to `src/index.js`:
```javascript
import Level2Scene from './scenes/Level2Scene.js';

// Add to scene array in config
scene: [BootScene, PreloadScene, MenuScene, Level1Scene, Level2Scene, UIScene]
```

4. Update level progression in `Level1Scene.js` `levelComplete()` method to transition to the next level.

## 🎨 Visual Assets

All visual assets are generated programmatically using Phaser's Graphics API, ensuring:
- No external dependencies on image files
- Easy customization of colors and styles
- Small bundle size
- Consistent pixel-art aesthetic

Assets can be easily replaced with sprite sheets by modifying `PreloadScene.js`.

## 🛠️ Technologies Used

- **Phaser 3.87.0**: Modern HTML5 game framework
- **Vite 5.0**: Fast build tool and dev server
- **ES6 Modules**: Modern JavaScript module system
- **Arcade Physics**: Phaser's built-in 2D physics engine

## 🧪 Future Enhancements

Potential additions to expand the game:
- Additional enemy types (Koopa Troopas, Piranha Plants)
- More power-ups (Fire Flower, Star)
- Multiple levels (1-2, 1-3, etc.)
- Secret areas and warp zones
- Sound effects and background music
- Sprite animations for walking, jumping
- Particle effects for interactions
- Mobile touch controls
- High score persistence (localStorage)
- Level editor

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by the original Super Mario Bros. by Nintendo
- Built with Phaser.js framework
- Educational project demonstrating game development architecture
