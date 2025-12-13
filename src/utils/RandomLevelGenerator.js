/**
 * RandomLevelGenerator
 * Generates procedural levels with the following constraints:
 * - Limited length (configurable)
 * - No unjumpable gaps (max gap size based on Mario's jump distance)
 * - Randomized platforms, bricks, enemies, and collectibles
 * - Ensures playability
 */

export default class RandomLevelGenerator {
    constructor(seed = null) {
        // Mario's maximum jump distance: approximately 200-250 pixels horizontally
        // To be safe, we'll limit gaps to 160 pixels max
        this.MAX_GAP_SIZE = 160;
        this.TILE_SIZE = 32;

        // Level dimensions
        this.LEVEL_WIDTH = 4000; // Shorter than normal levels for random mode
        this.LEVEL_HEIGHT = 600;
        this.GROUND_Y = 568;

        // Random seed for reproducibility (optional)
        this.seed = seed || Math.random();
        this.random = this.seededRandom(this.seed);
    }

    // Simple seeded random number generator
    seededRandom(seed) {
        let value = seed;
        return () => {
            value = (value * 9301 + 49297) % 233280;
            return value / 233280;
        };
    }

    // Get random integer between min and max (inclusive)
    randomInt(min, max) {
        return Math.floor(this.random() * (max - min + 1)) + min;
    }

    // Get random boolean with given probability (0-1)
    randomBool(probability = 0.5) {
        return this.random() < probability;
    }

    // Check if two rectangles overlap
    rectanglesOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
        return !(x1 + w1 <= x2 || x2 + w2 <= x1 || y1 + h1 <= y2 || y2 + h2 <= y1);
    }

    // Check if a position would overlap with existing objects
    // Checks against floating platforms, bricks, questions, coins, pipes, and enemies
    isPositionClear(config, x, y, width = 32, height = 32) {
        // Check floating platforms (not main ground at y=568)
        for (const ground of config.grounds) {
            if (ground.y !== this.GROUND_Y) {
                if (this.rectanglesOverlap(x, y, width, height, ground.x, ground.y, ground.width, 32)) {
                    return false;
                }
            }
        }

        // Check bricks
        for (const brick of config.bricks) {
            if (this.rectanglesOverlap(x, y, width, height, brick.x, brick.y, 32, 32)) {
                return false;
            }
        }

        // Check question blocks
        for (const question of config.questions) {
            if (this.rectanglesOverlap(x, y, width, height, question.x, question.y, 32, 32)) {
                return false;
            }
        }

        // Check coins to prevent overlap
        for (const coin of config.coins) {
            if (this.rectanglesOverlap(x, y, width, height, coin.x, coin.y, 32, 32)) {
                return false;
            }
        }

        // Check pipes
        for (const pipe of config.pipes) {
            if (this.rectanglesOverlap(x, y, width, height, pipe.x, pipe.y, 64, pipe.height)) {
                return false;
            }
        }

        // Check enemies (add buffer zone to prevent clustering)
        for (const enemy of config.enemies) {
            // Use a larger buffer zone (64px) to prevent enemies from being too close
            const buffer = 64;
            if (this.rectanglesOverlap(x, y, width, height, enemy.x - buffer, enemy.y - buffer, 32 + buffer * 2, 32 + buffer * 2)) {
                return false;
            }
        }

        return true;
    }

    generate() {
        const config = {
            name: `RANDOM ${Math.floor(this.seed * 10000)}`,
            width: this.LEVEL_WIDTH,
            height: this.LEVEL_HEIGHT,
            backgroundColor: '#5c94fc',
            playerStart: {
                x: 100,
                y: this.GROUND_Y - 32  // Place player on ground (32 pixels above ground surface)
            },
            grounds: [],
            bricks: [],
            questions: [],
            coins: [],
            enemies: [],
            pipes: [],
            house: {
                x: this.LEVEL_WIDTH - 200,
                y: 462  // Position on ground like in Level 1 and Level 2
            }
        };

        // Generate ground platforms with safe gaps
        this.generateGroundPlatforms(config);

        // Generate floating platforms
        this.generateFloatingPlatforms(config);

        // Generate bricks
        this.generateBricks(config);

        // Generate question blocks
        this.generateQuestionBlocks(config);

        // Generate coins
        this.generateCoins(config);

        // Generate enemies
        this.generateEnemies(config);

        // Generate pipes
        this.generatePipes(config);

        return config;
    }

    generateGroundPlatforms(config) {
        let currentX = 0;

        while (currentX < this.LEVEL_WIDTH) {
            // Random platform width (between 400 and 1000 pixels)
            const platformWidth = this.randomInt(400, 1000);

            config.grounds.push({
                x: currentX,
                y: this.GROUND_Y,
                width: platformWidth,
                height: 32
            });

            currentX += platformWidth;

            // Create a gap (but not at the end)
            if (currentX < this.LEVEL_WIDTH - 400) {
                // Random gap size, but never larger than MAX_GAP_SIZE
                const gapSize = this.randomInt(64, this.MAX_GAP_SIZE);
                currentX += gapSize;
            }
        }

        // Ensure there's solid ground at the end
        if (currentX < this.LEVEL_WIDTH) {
            config.grounds.push({
                x: currentX,
                y: this.GROUND_Y,
                width: this.LEVEL_WIDTH - currentX,
                height: 32
            });
        }
    }

    generateFloatingPlatforms(config) {
        // Add floating platforms above gaps
        for (let i = 0; i < config.grounds.length - 1; i++) {
            const ground1 = config.grounds[i];
            const ground2 = config.grounds[i + 1];
            const gapStart = ground1.x + ground1.width;
            const gapEnd = ground2.x;
            const gapSize = gapEnd - gapStart;

            // If gap is significant, add floating platforms
            if (gapSize > 96) {
                const numPlatforms = this.randomInt(1, 3);

                for (let j = 0; j < numPlatforms; j++) {
                    let attempts = 0;
                    let placed = false;

                    while (attempts < 5 && !placed) {
                        const platformY = this.randomInt(350, 450);
                        const platformX = gapStart + (gapSize / (numPlatforms + 1)) * (j + 1) - 64;
                        const platformWidth = this.randomInt(96, 160);

                        if (this.isPositionClear(config, Math.floor(platformX), platformY, platformWidth, 32)) {
                            config.grounds.push({
                                x: Math.floor(platformX),
                                y: platformY,
                                width: platformWidth,
                                height: 32
                            });
                            placed = true;
                        }
                        attempts++;
                    }
                }
            }
        }

        // Add some random floating platforms throughout the level
        const numExtraPlatforms = this.randomInt(2, 4);
        for (let i = 0; i < numExtraPlatforms; i++) {
            let attempts = 0;
            let placed = false;

            while (attempts < 10 && !placed) {
                const x = this.randomInt(300, this.LEVEL_WIDTH - 500);
                const y = this.randomInt(300, 450);
                const width = this.randomInt(96, 160);

                if (this.isPositionClear(config, x, y, width, 32)) {
                    config.grounds.push({
                        x: x,
                        y: y,
                        width: width,
                        height: 32
                    });
                    placed = true;
                }
                attempts++;
            }
        }
    }

    generateBricks(config) {
        // Generate brick formations at random positions
        const numFormations = this.randomInt(3, 5); // Reduced from 4-8 to 3-5

        for (let i = 0; i < numFormations; i++) {
            let attempts = 0;
            let placed = false;

            while (attempts < 10 && !placed) {
                const x = this.randomInt(200, this.LEVEL_WIDTH - 400);
                const y = this.randomInt(300, 450);

                // Random formation type
                const formationType = this.randomInt(0, 2);
                const bricksToAdd = [];

                if (formationType === 0) {
                    // Horizontal line of bricks
                    const count = this.randomInt(2, 5);
                    for (let j = 0; j < count; j++) {
                        bricksToAdd.push({ x: x + j * 32, y: y });
                    }
                } else if (formationType === 1) {
                    // Pyramid of bricks
                    for (let row = 0; row < 3; row++) {
                        for (let col = 0; col <= row; col++) {
                            bricksToAdd.push({
                                x: x + col * 32,
                                y: y - row * 32
                            });
                        }
                    }
                } else {
                    // Single brick
                    bricksToAdd.push({ x: x, y: y });
                }

                // Check if all bricks in the formation can be placed
                let allClear = true;
                for (const brick of bricksToAdd) {
                    if (!this.isPositionClear(config, brick.x, brick.y, 32, 32)) {
                        allClear = false;
                        break;
                    }
                }

                if (allClear) {
                    config.bricks.push(...bricksToAdd);
                    placed = true;
                }
                attempts++;
            }
        }
    }

    generateQuestionBlocks(config) {
        // Generate question blocks with power-ups and coins
        const numBlocks = this.randomInt(3, 5); // Reduced from 4-8 to 3-5

        for (let i = 0; i < numBlocks; i++) {
            let attempts = 0;
            let placed = false;

            while (attempts < 10 && !placed) {
                const x = this.randomInt(200, this.LEVEL_WIDTH - 400);
                const y = this.randomInt(300, 450);

                if (this.isPositionClear(config, x, y, 32, 32)) {
                    // 30% chance of mushroom, 70% chance of coin
                    const contains = this.randomBool(0.3) ? 'mushroom' : 'coin';
                    config.questions.push({ x: x, y: y, contains: contains });
                    placed = true;
                }
                attempts++;
            }
        }
    }

    generateCoins(config) {
        // Generate coin formations
        const numFormations = this.randomInt(4, 7); // Reduced from 5-10 to 4-7

        for (let i = 0; i < numFormations; i++) {
            let attempts = 0;
            let placed = false;

            while (attempts < 10 && !placed) {
                const x = this.randomInt(200, this.LEVEL_WIDTH - 400);
                const y = this.randomInt(250, 400);

                // Random formation type
                const formationType = this.randomInt(0, 2);
                const coinsToAdd = [];

                if (formationType === 0) {
                    // Horizontal line of coins
                    const count = this.randomInt(3, 6);
                    for (let j = 0; j < count; j++) {
                        coinsToAdd.push({ x: x + j * 32, y: y });
                    }
                } else if (formationType === 1) {
                    // Arc of coins
                    const count = this.randomInt(4, 7);
                    for (let j = 0; j < count; j++) {
                        const arcX = x + j * 24;
                        const arcY = y - Math.abs((count / 2 - j)) * 16;
                        coinsToAdd.push({ x: arcX, y: arcY });
                    }
                } else {
                    // Single coin
                    coinsToAdd.push({ x: x, y: y });
                }

                // Check if all coins in the formation can be placed
                let allClear = true;
                for (const coin of coinsToAdd) {
                    if (!this.isPositionClear(config, coin.x, coin.y, 32, 32)) {
                        allClear = false;
                        break;
                    }
                }

                if (allClear) {
                    config.coins.push(...coinsToAdd);
                    placed = true;
                }
                attempts++;
            }
        }
    }

    generateEnemies(config) {
        // Generate enemies on ground platforms
        const numEnemies = this.randomInt(3, 5); // Reduced from 4-8 to 3-5

        for (let i = 0; i < numEnemies; i++) {
            let attempts = 0;
            let placed = false;

            while (attempts < 10 && !placed) {
                // Pick a random ground platform
                const groundIndex = this.randomInt(0, config.grounds.length - 1);
                const ground = config.grounds[groundIndex];

                // Only spawn on wide enough platforms
                if (ground.width > 200) {
                    const x = ground.x + this.randomInt(100, ground.width - 100);
                    const y = ground.y - 100; // Above ground

                    // Check if position is clear before placing enemy
                    if (this.isPositionClear(config, x, y, 32, 32)) {
                        config.enemies.push({ type: 'goomba', x: x, y: y });
                        placed = true;
                    }
                }
                attempts++;
            }
        }
    }

    generatePipes(config) {
        // Generate pipes at random positions
        const numPipes = this.randomInt(2, 4); // Reduced from 3-6 to 2-4

        for (let i = 0; i < numPipes; i++) {
            let attempts = 0;
            let placed = false;

            while (attempts < 10 && !placed) {
                // Find a ground platform to place the pipe on
                const groundIndex = this.randomInt(0, Math.min(3, config.grounds.length - 1));
                const ground = config.grounds[groundIndex];

                if (ground.width > 200) {
                    const x = ground.x + this.randomInt(100, ground.width - 100);
                    const height = this.randomBool(0.5) ? 64 : 96;

                    if (this.isPositionClear(config, x, ground.y - height, 64, height)) {
                        config.pipes.push({ x: x, y: ground.y - height, height: height });
                        placed = true;
                    }
                }
                attempts++;
            }
        }
    }
}
