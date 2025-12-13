// Level 4 Configuration
// Fourth level with 40% moving platforms - maximum platforming challenge

export default {
    name: 'WORLD 1-4',
    width: 8000, // Longer level for more platforming sections
    height: 600,
    backgroundColor: '#5c94fc',

    // Player starting position
    playerStart: {
        x: 100,
        y: 400
    },

    // Ground platforms - reduced to allow for more moving platform sections
    // Total ground coverage is approximately 60% of 8000 = 4800 pixels
    // Moving platforms cover gaps totaling approximately 40% = 3200 pixels
    grounds: [
        // Starting area (0-600)
        { x: 0, y: 568, width: 600, height: 32 },
        // Gap 1: 600-1000 (400px) - Moving platforms

        // Section 2 (1000-1400)
        { x: 1000, y: 568, width: 400, height: 32 },
        // Gap 2: 1400-1900 (500px) - Moving platforms

        // Section 3 (1900-2200)
        { x: 1900, y: 568, width: 300, height: 32 },
        // Gap 3: 2200-2800 (600px) - Moving platforms

        // Section 4 (2800-3200)
        { x: 2800, y: 568, width: 400, height: 32 },
        // Gap 4: 3200-3700 (500px) - Moving platforms

        // Section 5 (3700-4000)
        { x: 3700, y: 568, width: 300, height: 32 },
        // Gap 5: 4000-4600 (600px) - Moving platforms

        // Section 6 (4600-5000)
        { x: 4600, y: 568, width: 400, height: 32 },
        // Gap 6: 5000-5500 (500px) - Moving platforms

        // Section 7 (5500-5800)
        { x: 5500, y: 568, width: 300, height: 32 },
        // Gap 7: 5800-6400 (600px) - Moving platforms

        // Final stretch (6400-8000)
        { x: 6400, y: 568, width: 1600, height: 32 },

        // Floating platforms for variety (not moving)
        { x: 300, y: 450, width: 128, height: 32 },
        { x: 1100, y: 400, width: 128, height: 32 },
        { x: 2000, y: 420, width: 96, height: 32 },
        { x: 2900, y: 380, width: 128, height: 32 },
        { x: 3800, y: 400, width: 96, height: 32 },
        { x: 4700, y: 420, width: 128, height: 32 },
        { x: 5600, y: 400, width: 96, height: 32 },
        { x: 6800, y: 380, width: 160, height: 32 },
        { x: 7200, y: 350, width: 128, height: 32 }
    ],

    // Brick blocks
    bricks: [
        { x: 200, y: 400 },
        { x: 232, y: 400 },
        { x: 264, y: 336 },
        { x: 1050, y: 400 },
        { x: 1082, y: 336 },
        { x: 1114, y: 336 },
        { x: 2000, y: 350 },
        { x: 2032, y: 350 },
        { x: 2900, y: 400 },
        { x: 2932, y: 336 },
        { x: 3800, y: 350 },
        { x: 3832, y: 350 },
        { x: 4700, y: 380 },
        { x: 4732, y: 380 },
        { x: 5600, y: 350 },
        { x: 5632, y: 350 },
        { x: 6600, y: 400 },
        { x: 6632, y: 400 },
        { x: 6664, y: 336 },
        { x: 7000, y: 400 },
        { x: 7032, y: 336 },
        { x: 7400, y: 400 },
        { x: 7432, y: 400 }
    ],

    // Question blocks - generous rewards for challenging level
    questions: [
        { x: 296, y: 336, contains: 'mushroom' },
        { x: 1146, y: 336, contains: 'coin' },
        { x: 2064, y: 350, contains: 'mushroom' },
        { x: 2964, y: 336, contains: 'coin' },
        { x: 3864, y: 350, contains: 'mushroom' },
        { x: 4764, y: 380, contains: 'coin' },
        { x: 5664, y: 350, contains: 'mushroom' },
        { x: 6696, y: 336, contains: 'coin' },
        { x: 7064, y: 336, contains: 'mushroom' },
        { x: 7464, y: 400, contains: 'coin' }
    ],

    // Coins - placed strategically on platforms and moving platform routes
    coins: [
        // Starting area
        { x: 316, y: 400 },
        { x: 348, y: 400 },
        // Gap 1 area (floating for moving platforms)
        { x: 700, y: 450 },
        { x: 800, y: 420 },
        { x: 900, y: 450 },
        // Section 2
        { x: 1116, y: 350 },
        { x: 1148, y: 350 },
        // Gap 2 area
        { x: 1500, y: 420 },
        { x: 1600, y: 400 },
        { x: 1700, y: 420 },
        { x: 1800, y: 400 },
        // Section 3
        { x: 2016, y: 370 },
        { x: 2048, y: 370 },
        // Gap 3 area
        { x: 2300, y: 420 },
        { x: 2400, y: 400 },
        { x: 2500, y: 420 },
        { x: 2600, y: 400 },
        { x: 2700, y: 420 },
        // Section 4
        { x: 2916, y: 330 },
        { x: 2948, y: 330 },
        // Gap 4 area
        { x: 3300, y: 420 },
        { x: 3400, y: 400 },
        { x: 3500, y: 420 },
        { x: 3600, y: 400 },
        // Section 5
        { x: 3816, y: 350 },
        { x: 3848, y: 350 },
        // Gap 5 area
        { x: 4100, y: 420 },
        { x: 4200, y: 400 },
        { x: 4300, y: 420 },
        { x: 4400, y: 400 },
        { x: 4500, y: 420 },
        // Section 6
        { x: 4716, y: 370 },
        { x: 4748, y: 370 },
        // Gap 6 area
        { x: 5100, y: 420 },
        { x: 5200, y: 400 },
        { x: 5300, y: 420 },
        { x: 5400, y: 400 },
        // Section 7
        { x: 5616, y: 350 },
        { x: 5648, y: 350 },
        // Gap 7 area
        { x: 5900, y: 420 },
        { x: 6000, y: 400 },
        { x: 6100, y: 420 },
        { x: 6200, y: 400 },
        { x: 6300, y: 420 },
        // Final stretch
        { x: 6816, y: 330 },
        { x: 6848, y: 330 },
        { x: 7216, y: 300 },
        { x: 7248, y: 300 },
        { x: 7500, y: 300 },
        { x: 7532, y: 300 }
    ],

    // Enemies - challenging but fair placement
    enemies: [
        { type: 'goomba', x: 300, y: 500 },
        { type: 'goomba', x: 400, y: 500 },
        { type: 'goomba', x: 1100, y: 500 },
        { type: 'goomba', x: 1200, y: 500 },
        { type: 'goomba', x: 2000, y: 500 },
        { type: 'goomba', x: 2050, y: 500 },
        { type: 'goomba', x: 2900, y: 500 },
        { type: 'goomba', x: 3000, y: 500 },
        { type: 'goomba', x: 3050, y: 500 },
        { type: 'goomba', x: 3800, y: 500 },
        { type: 'goomba', x: 3900, y: 500 },
        { type: 'goomba', x: 4700, y: 500 },
        { type: 'goomba', x: 4800, y: 500 },
        { type: 'goomba', x: 4850, y: 500 },
        { type: 'goomba', x: 5600, y: 500 },
        { type: 'goomba', x: 5700, y: 500 },
        { type: 'goomba', x: 6500, y: 500 },
        { type: 'goomba', x: 6600, y: 500 },
        { type: 'goomba', x: 6700, y: 500 },
        { type: 'goomba', x: 6900, y: 500 },
        { type: 'goomba', x: 7100, y: 500 },
        { type: 'goomba', x: 7150, y: 500 },
        { type: 'goomba', x: 7300, y: 500 },
        { type: 'goomba', x: 7500, y: 500 },
        { type: 'goomba', x: 7550, y: 500 }
    ],

    // Pipes - fewer pipes due to platform focus
    pipes: [
        { x: 400, y: 504, height: 64 },
        { x: 1200, y: 504, height: 64 },
        { x: 3000, y: 504, height: 64 },
        { x: 4800, y: 504, height: 64 },
        { x: 6600, y: 504, height: 64 },
        { x: 7100, y: 504, height: 96 },
        { x: 7500, y: 504, height: 64 }
    ],

    // Moving platforms - 40% of traversable area
    // 7 gap sections with multiple platforms each
    movingPlatforms: [
        // Gap 1: 600-1000 (400px gap)
        { x: 620, y: 500, width: 96, speed: 45 },
        { x: 780, y: 470, width: 96, speed: 50 },
        { x: 880, y: 510, width: 96, speed: 55 },

        // Gap 2: 1400-1900 (500px gap)
        { x: 1420, y: 490, width: 96, speed: 50 },
        { x: 1560, y: 460, width: 96, speed: 55 },
        { x: 1700, y: 500, width: 96, speed: 48 },
        { x: 1800, y: 470, width: 96, speed: 52 },

        // Gap 3: 2200-2800 (600px gap)
        { x: 2220, y: 500, width: 96, speed: 52 },
        { x: 2360, y: 470, width: 96, speed: 55 },
        { x: 2500, y: 490, width: 96, speed: 50 },
        { x: 2620, y: 460, width: 96, speed: 58 },
        { x: 2720, y: 510, width: 96, speed: 48 },

        // Gap 4: 3200-3700 (500px gap)
        { x: 3220, y: 490, width: 96, speed: 55 },
        { x: 3360, y: 460, width: 96, speed: 50 },
        { x: 3500, y: 500, width: 96, speed: 58 },
        { x: 3620, y: 470, width: 96, speed: 52 },

        // Gap 5: 4000-4600 (600px gap)
        { x: 4020, y: 500, width: 96, speed: 50 },
        { x: 4160, y: 470, width: 96, speed: 55 },
        { x: 4280, y: 490, width: 96, speed: 52 },
        { x: 4400, y: 460, width: 96, speed: 58 },
        { x: 4520, y: 510, width: 96, speed: 48 },

        // Gap 6: 5000-5500 (500px gap)
        { x: 5020, y: 490, width: 96, speed: 55 },
        { x: 5160, y: 460, width: 96, speed: 50 },
        { x: 5280, y: 500, width: 96, speed: 58 },
        { x: 5420, y: 470, width: 96, speed: 52 },

        // Gap 7: 5800-6400 (600px gap)
        { x: 5820, y: 500, width: 96, speed: 52 },
        { x: 5960, y: 470, width: 96, speed: 55 },
        { x: 6080, y: 490, width: 96, speed: 50 },
        { x: 6200, y: 460, width: 96, speed: 58 },
        { x: 6320, y: 510, width: 96, speed: 48 }
    ],

    // Staircase before goal (classic Mario pyramid)
    staircase: [
        // Step 1 (bottom, 1 block high)
        { x: 7568, y: 536 },
        // Step 2 (2 blocks high)
        { x: 7600, y: 536 },
        { x: 7600, y: 504 },
        // Step 3 (3 blocks high)
        { x: 7632, y: 536 },
        { x: 7632, y: 504 },
        { x: 7632, y: 472 },
        // Step 4 (4 blocks high)
        { x: 7664, y: 536 },
        { x: 7664, y: 504 },
        { x: 7664, y: 472 },
        { x: 7664, y: 440 },
        // Step 5 (5 blocks high)
        { x: 7696, y: 536 },
        { x: 7696, y: 504 },
        { x: 7696, y: 472 },
        { x: 7696, y: 440 },
        { x: 7696, y: 408 },
        // Step 6 (6 blocks high)
        { x: 7728, y: 536 },
        { x: 7728, y: 504 },
        { x: 7728, y: 472 },
        { x: 7728, y: 440 },
        { x: 7728, y: 408 },
        { x: 7728, y: 376 },
        // Step 7 (7 blocks high)
        { x: 7760, y: 536 },
        { x: 7760, y: 504 },
        { x: 7760, y: 472 },
        { x: 7760, y: 440 },
        { x: 7760, y: 408 },
        { x: 7760, y: 376 },
        { x: 7760, y: 344 }
    ],

    // House (game completion) - end of the game
    house: {
        x: 7900,
        y: 462
    }
};
