// Level 1 Configuration
// This structure makes it easy to add new levels

export default {
    name: 'Level 1-1',
    width: 6400, // Level width in pixels
    height: 600,
    backgroundColor: '#5c94fc',

    // Player starting position
    playerStart: {
        x: 100,
        y: 400
    },

    // Ground platforms
    grounds: [
        // Main ground
        { x: 0, y: 568, width: 3200, height: 32 },
        // Gap
        { x: 3400, y: 568, width: 1600, height: 32 },
        // Floating platform
        { x: 800, y: 400, width: 192, height: 32 },
        { x: 1200, y: 350, width: 128, height: 32 },
        { x: 1500, y: 300, width: 128, height: 32 }
    ],

    // Brick blocks
    bricks: [
        { x: 400, y: 400 },
        { x: 432, y: 400 },
        { x: 464, y: 400 },
        { x: 496, y: 400 },
        { x: 528, y: 400 },
        { x: 464, y: 336 },
        { x: 1600, y: 400 },
        { x: 1632, y: 400 },
        { x: 1664, y: 336 },
        { x: 1696, y: 336 },
        { x: 2000, y: 400 },
        { x: 2032, y: 336 },
        { x: 2064, y: 272 }
    ],

    // Question blocks (contain power-ups or coins)
    questions: [
        { x: 352, y: 400, contains: 'coin' },
        { x: 560, y: 400, contains: 'mushroom' },
        { x: 1000, y: 336, contains: 'coin' },
        { x: 1632, y: 336, contains: 'coin' },
        { x: 2032, y: 400, contains: 'mushroom' },
        { x: 2500, y: 400, contains: 'coin' }
    ],

    // Coins placed in the level
    coins: [
        { x: 600, y: 300 },
        { x: 632, y: 300 },
        { x: 664, y: 300 },
        { x: 816, y: 350 },
        { x: 848, y: 350 },
        { x: 880, y: 350 },
        { x: 1216, y: 300 },
        { x: 1248, y: 300 },
        { x: 1516, y: 250 },
        { x: 1548, y: 250 },
        { x: 1800, y: 300 },
        { x: 2800, y: 300 },
        { x: 2832, y: 300 },
        { x: 2864, y: 300 }
    ],

    // Enemies (Goombas)
    enemies: [
        { type: 'goomba', x: 600, y: 500 },
        { type: 'goomba', x: 900, y: 500 },
        { type: 'goomba', x: 1100, y: 500 },
        { type: 'goomba', x: 1400, y: 500 },
        { type: 'goomba', x: 1700, y: 500 },
        { type: 'goomba', x: 1750, y: 500 },
        { type: 'goomba', x: 2200, y: 500 },
        { type: 'goomba', x: 2600, y: 500 },
        { type: 'goomba', x: 2650, y: 500 },
        { type: 'goomba', x: 3000, y: 500 }
    ],

    // Pipes
    pipes: [
        { x: 1200, y: 504, height: 64 },
        { x: 1800, y: 504, height: 64 },
        { x: 2400, y: 504, height: 96 },
        { x: 3100, y: 504, height: 64 }
    ],

    // Goal (flag)
    goal: {
        x: 6200,
        y: 400
    },

    // House (level transition to Level 2)
    house: {
        x: 6300,
        y: 472
    }
};
