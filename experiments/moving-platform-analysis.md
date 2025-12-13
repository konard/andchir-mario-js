# Moving Platform Display Issue Analysis

## Problem
Moving platforms defined in Level1Config.js are not displaying in the game.

## Current Implementation

### MovingPlatform.js
- Creates sprite with 'movingPlatform' texture
- Sets origin to (0, 0)
- Sets as immovable
- Disables gravity
- Sets up movement logic

### PreloadScene.js
- Creates 'movingPlatform' texture: 96x16 pixels
- Gray gradient design

### Level1Config.js
- Defines 3 platforms at:
  - { x: 3220, y: 500, width: 96 }
  - { x: 3350, y: 480, width: 96 }
  - { x: 3480, y: 500, width: 96 }

## Hypothesis 1: Missing Display Size
The sprite might not be visible because it doesn't explicitly set display size.

**Testing**: Compare with other entities (Player, Goomba) - they use setScale() not setDisplaySize().

**Result**: Other sprites work fine without explicit setDisplaySize(), so this is likely not the issue.

## Hypothesis 2: Missing Body Size
The physics body might have size 0x0, making it invisible.

**Testing**: Check if we need to call setSize() on the body.

## Hypothesis 3: Texture Not Loaded
The 'movingPlatform' texture might not be properly generated.

**Testing**: Check PreloadScene.createMovingPlatform() method.

**Result**: Method exists and is called in createAssets().

## Key Observations

Looking at the texture generation in PreloadScene.js:
```javascript
graphics.generateTexture('movingPlatform', 96, 16);
```

And comparing to static groups in Level1Scene.js:
- Ground tiles: created with `this.groundGroup.create(x, y, 'ground')`
- MovingPlatform: created with `new MovingPlatform(this, x, y, width)`

**Critical difference**: Static groups automatically handle the sprite display, but when creating a custom Phaser.Physics.Arcade.Sprite, we might need to explicitly set the display size!

## Root Cause (Most Likely)

The MovingPlatform sprite is created but **doesn't set its display size to match the texture dimensions (96x16)**. While the texture exists, the sprite might be rendering at 0x0 or some default size that doesn't match.

## Solution

Add `this.setDisplaySize(width, 16);` to the MovingPlatform constructor to ensure the sprite displays at the correct size.

Alternatively, since all platforms are 96 pixels wide (matching the texture), we could use:
```javascript
this.setDisplaySize(96, 16);
```

Or use the texture's natural size by ensuring the sprite inherits it properly.
