// Level 2 Configuration
// Second level with increased difficulty

export default {
    name: 'WORLD 1-2',
    width: 6400,
    height: 600,
    backgroundColor: '#5c94fc',

    // Player starting position
    playerStart: {
        x: 100,
        y: 400
    },

    // Ground platforms
    grounds: [
        // Main ground with more gaps
        { x: 0, y: 568, width: 1600, height: 32 },
        // Gap
        { x: 1800, y: 568, width: 800, height: 32 },
        // Gap
        { x: 2800, y: 568, width: 1200, height: 32 },
        // Gap
        { x: 4200, y: 568, width: 1000, height: 32 },
        // Final stretch
        { x: 5400, y: 568, width: 1000, height: 32 },
        // Floating platforms
        { x: 600, y: 450, width: 128, height: 32 },
        { x: 900, y: 400, width: 128, height: 32 },
        { x: 1200, y: 350, width: 128, height: 32 },
        { x: 1500, y: 300, width: 160, height: 32 },
        { x: 2000, y: 400, width: 192, height: 32 },
        { x: 2400, y: 350, width: 128, height: 32 },
        { x: 3200, y: 400, width: 160, height: 32 },
        { x: 3600, y: 350, width: 128, height: 32 },
        { x: 4000, y: 300, width: 128, height: 32 }
    ],

    // Brick blocks
    bricks: [
        { x: 300, y: 400 },
        { x: 332, y: 400 },
        { x: 364, y: 400 },
        { x: 396, y: 400 },
        { x: 364, y: 336 },
        { x: 700, y: 400 },
        { x: 732, y: 400 },
        { x: 764, y: 336 },
        { x: 1400, y: 400 },
        { x: 1432, y: 336 },
        { x: 1464, y: 272 },
        { x: 1800, y: 400 },
        { x: 1832, y: 400 },
        { x: 1864, y: 336 },
        { x: 2200, y: 400 },
        { x: 2232, y: 336 },
        { x: 2600, y: 400 },
        { x: 2632, y: 400 },
        { x: 2664, y: 336 },
        { x: 3400, y: 400 },
        { x: 3432, y: 336 },
        { x: 3800, y: 400 },
        { x: 3832, y: 400 },
        { x: 3864, y: 336 }
    ],

    // Question blocks
    questions: [
        { x: 428, y: 400, contains: 'mushroom' },
        { x: 796, y: 336, contains: 'coin' },
        { x: 1100, y: 336, contains: 'coin' },
        { x: 1496, y: 272, contains: 'mushroom' },
        { x: 1896, y: 336, contains: 'coin' },
        { x: 2264, y: 336, contains: 'coin' },
        { x: 2696, y: 336, contains: 'mushroom' },
        { x: 3100, y: 400, contains: 'coin' },
        { x: 3464, y: 336, contains: 'coin' },
        { x: 3896, y: 336, contains: 'mushroom' },
        { x: 4500, y: 400, contains: 'coin' }
    ],

    // Coins
    coins: [
        { x: 450, y: 300 },
        { x: 482, y: 300 },
        { x: 514, y: 300 },
        { x: 546, y: 300 },
        { x: 616, y: 400 },
        { x: 648, y: 400 },
        { x: 916, y: 350 },
        { x: 948, y: 350 },
        { x: 1216, y: 300 },
        { x: 1248, y: 300 },
        { x: 1516, y: 250 },
        { x: 1548, y: 250 },
        { x: 1580, y: 250 },
        { x: 2016, y: 350 },
        { x: 2048, y: 350 },
        { x: 2080, y: 350 },
        { x: 2416, y: 300 },
        { x: 2448, y: 300 },
        { x: 3216, y: 350 },
        { x: 3248, y: 350 },
        { x: 3616, y: 300 },
        { x: 3648, y: 300 },
        { x: 4016, y: 250 },
        { x: 4048, y: 250 },
        { x: 5000, y: 300 },
        { x: 5032, y: 300 },
        { x: 5064, y: 300 },
        { x: 5096, y: 300 }
    ],

    // Enemies - more than Level 1
    enemies: [
        { type: 'goomba', x: 400, y: 500 },
        { type: 'goomba', x: 550, y: 500 },
        { type: 'goomba', x: 800, y: 500 },
        { type: 'goomba', x: 850, y: 500 },
        { type: 'goomba', x: 1000, y: 500 },
        { type: 'goomba', x: 1300, y: 500 },
        { type: 'goomba', x: 1350, y: 500 },
        { type: 'goomba', x: 1700, y: 500 },
        { type: 'goomba', x: 2100, y: 500 },
        { type: 'goomba', x: 2150, y: 500 },
        { type: 'goomba', x: 2500, y: 500 },
        { type: 'goomba', x: 2900, y: 500 },
        { type: 'goomba', x: 2950, y: 500 },
        { type: 'goomba', x: 3000, y: 500 },
        { type: 'goomba', x: 3300, y: 500 },
        { type: 'goomba', x: 3700, y: 500 },
        { type: 'goomba', x: 3750, y: 500 },
        { type: 'goomba', x: 4500, y: 500 },
        { type: 'goomba', x: 4550, y: 500 },
        { type: 'goomba', x: 5000, y: 500 },
        { type: 'goomba', x: 5050, y: 500 },
        { type: 'goomba', x: 5500, y: 500 },
        { type: 'goomba', x: 5550, y: 500 }
    ],

    // Pipes - more obstacles
    pipes: [
        { x: 1000, y: 504, height: 64 },
        { x: 1600, y: 504, height: 96 },
        { x: 2200, y: 504, height: 64 },
        { x: 2700, y: 504, height: 96 },
        { x: 3500, y: 504, height: 64 },
        { x: 4100, y: 504, height: 96 },
        { x: 4800, y: 504, height: 64 },
        { x: 5600, y: 504, height: 64 }
    ],

    // Staircase before goal (classic Mario pyramid)
    staircase: [
        // Step 1 (bottom, 1 block high)
        { x: 5968, y: 536 },
        // Step 2 (2 blocks high)
        { x: 6000, y: 536 },
        { x: 6000, y: 504 },
        // Step 3 (3 blocks high)
        { x: 6032, y: 536 },
        { x: 6032, y: 504 },
        { x: 6032, y: 472 },
        // Step 4 (4 blocks high)
        { x: 6064, y: 536 },
        { x: 6064, y: 504 },
        { x: 6064, y: 472 },
        { x: 6064, y: 440 },
        // Step 5 (5 blocks high)
        { x: 6096, y: 536 },
        { x: 6096, y: 504 },
        { x: 6096, y: 472 },
        { x: 6096, y: 440 },
        { x: 6096, y: 408 },
        // Step 6 (6 blocks high)
        { x: 6128, y: 536 },
        { x: 6128, y: 504 },
        { x: 6128, y: 472 },
        { x: 6128, y: 440 },
        { x: 6128, y: 408 },
        { x: 6128, y: 376 },
        // Step 7 (7 blocks high)
        { x: 6160, y: 536 },
        { x: 6160, y: 504 },
        { x: 6160, y: 472 },
        { x: 6160, y: 440 },
        { x: 6160, y: 408 },
        { x: 6160, y: 376 },
        { x: 6160, y: 344 },
        // Step 8 (8 blocks high, top of staircase)
        { x: 6192, y: 536 },
        { x: 6192, y: 504 },
        { x: 6192, y: 472 },
        { x: 6192, y: 440 },
        { x: 6192, y: 408 },
        { x: 6192, y: 376 },
        { x: 6192, y: 344 },
        { x: 6192, y: 312 }
    ],

    // Goal (flag) - now grounded with flag pole touching the ground
    goal: {
        x: 6240,
        y: 536
    }
};
