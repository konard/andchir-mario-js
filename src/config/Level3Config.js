// Level 3 Configuration
// Final level with maximum difficulty

export default {
    name: 'WORLD 1-3',
    width: 7200,
    height: 600,
    backgroundColor: '#5c94fc',

    // Player starting position
    playerStart: {
        x: 100,
        y: 400
    },

    // Ground platforms - more challenging with larger gaps
    grounds: [
        // Start area
        { x: 0, y: 568, width: 1200, height: 32 },
        // Series of gaps
        { x: 1400, y: 568, width: 600, height: 32 },
        { x: 2200, y: 568, width: 500, height: 32 },
        { x: 2900, y: 568, width: 600, height: 32 },
        { x: 3700, y: 568, width: 500, height: 32 },
        { x: 4400, y: 568, width: 800, height: 32 },
        // Final area before victory
        { x: 5400, y: 568, width: 1800, height: 32 },

        // Floating platforms - creating vertical challenges
        { x: 500, y: 450, width: 128, height: 32 },
        { x: 700, y: 380, width: 128, height: 32 },
        { x: 900, y: 320, width: 160, height: 32 },
        { x: 1100, y: 380, width: 128, height: 32 },
        { x: 1500, y: 400, width: 160, height: 32 },
        { x: 1800, y: 350, width: 128, height: 32 },
        { x: 2100, y: 420, width: 160, height: 32 },
        { x: 2500, y: 380, width: 128, height: 32 },
        { x: 2800, y: 300, width: 160, height: 32 },
        { x: 3100, y: 400, width: 192, height: 32 },
        { x: 3400, y: 350, width: 128, height: 32 },
        { x: 3900, y: 380, width: 160, height: 32 },
        { x: 4200, y: 300, width: 128, height: 32 }
    ],

    // Brick blocks - more than previous levels
    bricks: [
        { x: 250, y: 400 },
        { x: 282, y: 400 },
        { x: 314, y: 400 },
        { x: 346, y: 336 },
        { x: 378, y: 336 },
        { x: 410, y: 272 },
        { x: 600, y: 400 },
        { x: 632, y: 400 },
        { x: 664, y: 336 },
        { x: 696, y: 336 },
        { x: 728, y: 272 },
        { x: 1300, y: 400 },
        { x: 1332, y: 336 },
        { x: 1364, y: 272 },
        { x: 1700, y: 400 },
        { x: 1732, y: 400 },
        { x: 1764, y: 336 },
        { x: 2000, y: 400 },
        { x: 2032, y: 336 },
        { x: 2064, y: 272 },
        { x: 2400, y: 400 },
        { x: 2432, y: 400 },
        { x: 2464, y: 336 },
        { x: 2700, y: 400 },
        { x: 2732, y: 336 },
        { x: 2764, y: 272 },
        { x: 3200, y: 400 },
        { x: 3232, y: 400 },
        { x: 3264, y: 336 },
        { x: 3600, y: 400 },
        { x: 3632, y: 336 },
        { x: 3664, y: 272 },
        { x: 4000, y: 400 },
        { x: 4032, y: 400 },
        { x: 4064, y: 336 },
        { x: 4500, y: 400 },
        { x: 4532, y: 336 },
        { x: 4900, y: 400 },
        { x: 4932, y: 400 },
        { x: 4964, y: 336 }
    ],

    // Question blocks - generous rewards for challenging level
    questions: [
        { x: 378, y: 400, contains: 'mushroom' },
        { x: 760, y: 272, contains: 'coin' },
        { x: 1100, y: 336, contains: 'mushroom' },
        { x: 1396, y: 272, contains: 'coin' },
        { x: 1796, y: 336, contains: 'coin' },
        { x: 2096, y: 272, contains: 'mushroom' },
        { x: 2496, y: 336, contains: 'coin' },
        { x: 2796, y: 272, contains: 'mushroom' },
        { x: 3296, y: 336, contains: 'coin' },
        { x: 3696, y: 272, contains: 'mushroom' },
        { x: 4096, y: 336, contains: 'coin' },
        { x: 4564, y: 336, contains: 'mushroom' },
        { x: 4996, y: 336, contains: 'coin' },
        { x: 5500, y: 400, contains: 'mushroom' },
        { x: 6000, y: 400, contains: 'coin' }
    ],

    // Coins - many collectibles for the final level
    coins: [
        { x: 400, y: 300 },
        { x: 432, y: 300 },
        { x: 464, y: 300 },
        { x: 496, y: 300 },
        { x: 528, y: 300 },
        { x: 516, y: 400 },
        { x: 548, y: 400 },
        { x: 716, y: 330 },
        { x: 748, y: 330 },
        { x: 916, y: 270 },
        { x: 948, y: 270 },
        { x: 980, y: 270 },
        { x: 1116, y: 330 },
        { x: 1148, y: 330 },
        { x: 1516, y: 350 },
        { x: 1548, y: 350 },
        { x: 1580, y: 350 },
        { x: 1816, y: 300 },
        { x: 1848, y: 300 },
        { x: 2116, y: 370 },
        { x: 2148, y: 370 },
        { x: 2180, y: 370 },
        { x: 2516, y: 330 },
        { x: 2548, y: 330 },
        { x: 2816, y: 250 },
        { x: 2848, y: 250 },
        { x: 2880, y: 250 },
        { x: 3116, y: 350 },
        { x: 3148, y: 350 },
        { x: 3180, y: 350 },
        { x: 3212, y: 350 },
        { x: 3416, y: 300 },
        { x: 3448, y: 300 },
        { x: 3916, y: 330 },
        { x: 3948, y: 330 },
        { x: 3980, y: 330 },
        { x: 4216, y: 250 },
        { x: 4248, y: 250 },
        { x: 5500, y: 300 },
        { x: 5532, y: 300 },
        { x: 5564, y: 300 },
        { x: 5596, y: 300 },
        { x: 6200, y: 300 },
        { x: 6232, y: 300 },
        { x: 6264, y: 300 },
        { x: 6296, y: 300 }
    ],

    // Enemies - significantly more than previous levels
    enemies: [
        { type: 'goomba', x: 350, y: 500 },
        { type: 'goomba', x: 450, y: 500 },
        { type: 'goomba', x: 650, y: 500 },
        { type: 'goomba', x: 700, y: 500 },
        { type: 'goomba', x: 850, y: 500 },
        { type: 'goomba', x: 900, y: 500 },
        { type: 'goomba', x: 1050, y: 500 },
        { type: 'goomba', x: 1250, y: 500 },
        { type: 'goomba', x: 1300, y: 500 },
        { type: 'goomba', x: 1450, y: 500 },
        { type: 'goomba', x: 1500, y: 500 },
        { type: 'goomba', x: 1650, y: 500 },
        { type: 'goomba', x: 1850, y: 500 },
        { type: 'goomba', x: 1900, y: 500 },
        { type: 'goomba', x: 2050, y: 500 },
        { type: 'goomba', x: 2250, y: 500 },
        { type: 'goomba', x: 2300, y: 500 },
        { type: 'goomba', x: 2450, y: 500 },
        { type: 'goomba', x: 2650, y: 500 },
        { type: 'goomba', x: 2700, y: 500 },
        { type: 'goomba', x: 2950, y: 500 },
        { type: 'goomba', x: 3000, y: 500 },
        { type: 'goomba', x: 3050, y: 500 },
        { type: 'goomba', x: 3300, y: 500 },
        { type: 'goomba', x: 3450, y: 500 },
        { type: 'goomba', x: 3500, y: 500 },
        { type: 'goomba', x: 3750, y: 500 },
        { type: 'goomba', x: 3800, y: 500 },
        { type: 'goomba', x: 4050, y: 500 },
        { type: 'goomba', x: 4250, y: 500 },
        { type: 'goomba', x: 4300, y: 500 },
        { type: 'goomba', x: 4450, y: 500 },
        { type: 'goomba', x: 4650, y: 500 },
        { type: 'goomba', x: 4700, y: 500 },
        { type: 'goomba', x: 4850, y: 500 },
        { type: 'goomba', x: 5000, y: 500 },
        { type: 'goomba', x: 5050, y: 500 },
        { type: 'goomba', x: 5500, y: 500 },
        { type: 'goomba', x: 5550, y: 500 },
        { type: 'goomba', x: 5700, y: 500 },
        { type: 'goomba', x: 6000, y: 500 },
        { type: 'goomba', x: 6050, y: 500 },
        { type: 'goomba', x: 6300, y: 500 },
        { type: 'goomba', x: 6350, y: 500 }
    ],

    // Pipes - many obstacles throughout the level
    pipes: [
        { x: 800, y: 504, height: 64 },
        { x: 1100, y: 504, height: 96 },
        { x: 1600, y: 504, height: 64 },
        { x: 2000, y: 504, height: 96 },
        { x: 2300, y: 504, height: 64 },
        { x: 2600, y: 504, height: 96 },
        { x: 3000, y: 504, height: 64 },
        { x: 3300, y: 504, height: 96 },
        { x: 3700, y: 504, height: 64 },
        { x: 4100, y: 504, height: 96 },
        { x: 4600, y: 504, height: 64 },
        { x: 5200, y: 504, height: 96 },
        { x: 5800, y: 504, height: 64 },
        { x: 6400, y: 504, height: 64 }
    ],

    // Staircase before goal (classic Mario pyramid)
    staircase: [
        // Step 1 (bottom, 1 block high)
        { x: 6768, y: 536 },
        // Step 2 (2 blocks high)
        { x: 6800, y: 536 },
        { x: 6800, y: 504 },
        // Step 3 (3 blocks high)
        { x: 6832, y: 536 },
        { x: 6832, y: 504 },
        { x: 6832, y: 472 },
        // Step 4 (4 blocks high)
        { x: 6864, y: 536 },
        { x: 6864, y: 504 },
        { x: 6864, y: 472 },
        { x: 6864, y: 440 },
        // Step 5 (5 blocks high)
        { x: 6896, y: 536 },
        { x: 6896, y: 504 },
        { x: 6896, y: 472 },
        { x: 6896, y: 440 },
        { x: 6896, y: 408 },
        // Step 6 (6 blocks high)
        { x: 6928, y: 536 },
        { x: 6928, y: 504 },
        { x: 6928, y: 472 },
        { x: 6928, y: 440 },
        { x: 6928, y: 408 },
        { x: 6928, y: 376 },
        // Step 7 (7 blocks high)
        { x: 6960, y: 536 },
        { x: 6960, y: 504 },
        { x: 6960, y: 472 },
        { x: 6960, y: 440 },
        { x: 6960, y: 408 },
        { x: 6960, y: 376 },
        { x: 6960, y: 344 },
        // Step 8 (8 blocks high, top of staircase)
        { x: 6992, y: 536 },
        { x: 6992, y: 504 },
        { x: 6992, y: 472 },
        { x: 6992, y: 440 },
        { x: 6992, y: 408 },
        { x: 6992, y: 376 },
        { x: 6992, y: 344 },
        { x: 6992, y: 312 }
    ],

    // Goal (flag) - end of the game
    goal: {
        x: 7040,
        y: 536
    }
};
