/**
 * Test script to verify that RandomLevelGenerator generates moving platforms
 * Run with: node experiments/test-moving-platforms-random.js
 */

// Simple implementation of RandomLevelGenerator for testing
class TestRandomLevelGenerator {
    constructor(seed = null) {
        this.MAX_GAP_SIZE = 160;
        this.TILE_SIZE = 32;
        this.LEVEL_WIDTH = 4000;
        this.LEVEL_HEIGHT = 600;
        this.GROUND_Y = 568;
        this.seed = seed || Math.random();
        this.random = this.seededRandom(this.seed);
    }

    seededRandom(seed) {
        let value = seed;
        return () => {
            value = (value * 9301 + 49297) % 233280;
            return value / 233280;
        };
    }

    randomInt(min, max) {
        return Math.floor(this.random() * (max - min + 1)) + min;
    }

    randomBool(probability = 0.5) {
        return this.random() < probability;
    }

    rectanglesOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
        return !(x1 + w1 <= x2 || x2 + w2 <= x1 || y1 + h1 <= y2 || y2 + h2 <= y1);
    }

    isPositionClear(config, x, y, width = 32, height = 32) {
        for (const ground of config.grounds) {
            if (ground.y !== this.GROUND_Y) {
                if (this.rectanglesOverlap(x, y, width, height, ground.x, ground.y, ground.width, 32)) {
                    return false;
                }
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
            playerStart: { x: 100, y: this.GROUND_Y - 32 },
            grounds: [],
            bricks: [],
            questions: [],
            coins: [],
            enemies: [],
            pipes: [],
            movingPlatforms: [],
            house: { x: this.LEVEL_WIDTH - 200, y: 462 }
        };

        this.generateGroundPlatforms(config);
        this.generateMovingPlatforms(config);
        return config;
    }

    generateGroundPlatforms(config) {
        let currentX = 0;

        while (currentX < this.LEVEL_WIDTH) {
            const platformWidth = this.randomInt(400, 1000);
            config.grounds.push({
                x: currentX,
                y: this.GROUND_Y,
                width: platformWidth,
                height: 32
            });
            currentX += platformWidth;

            if (currentX < this.LEVEL_WIDTH - 400) {
                const gapSize = this.randomInt(64, this.MAX_GAP_SIZE);
                currentX += gapSize;
            }
        }

        if (currentX < this.LEVEL_WIDTH) {
            config.grounds.push({
                x: currentX,
                y: this.GROUND_Y,
                width: this.LEVEL_WIDTH - currentX,
                height: 32
            });
        }
    }

    generateMovingPlatforms(config) {
        const groundPlatformsAtGroundLevel = config.grounds.filter(g => g.y === this.GROUND_Y);
        groundPlatformsAtGroundLevel.sort((a, b) => a.x - b.x);

        for (let i = 0; i < groundPlatformsAtGroundLevel.length - 1; i++) {
            const ground1 = groundPlatformsAtGroundLevel[i];
            const ground2 = groundPlatformsAtGroundLevel[i + 1];
            const gapStart = ground1.x + ground1.width;
            const gapEnd = ground2.x;
            const gapSize = gapEnd - gapStart;

            if (gapSize > 100 && this.randomBool(0.5)) {
                const numPlatforms = gapSize > 150 ? this.randomInt(1, 2) : 1;

                for (let j = 0; j < numPlatforms; j++) {
                    const platformWidth = this.randomInt(64, 96);
                    const platformSpeed = this.randomInt(40, 70);
                    const platformY = this.randomInt(480, 520);
                    const platformX = gapStart + (gapSize / (numPlatforms + 1)) * (j + 1) - platformWidth / 2;

                    config.movingPlatforms.push({
                        x: Math.floor(platformX),
                        y: platformY,
                        width: platformWidth,
                        speed: platformSpeed
                    });
                }
            }
        }

        const numExtraMovingPlatforms = this.randomInt(1, 3);
        for (let i = 0; i < numExtraMovingPlatforms; i++) {
            let attempts = 0;
            let placed = false;

            while (attempts < 10 && !placed) {
                const x = this.randomInt(500, this.LEVEL_WIDTH - 700);
                const y = this.randomInt(350, 450);
                const width = this.randomInt(64, 96);
                const speed = this.randomInt(40, 70);

                if (this.isPositionClear(config, x, y, width + 100, 32)) {
                    config.movingPlatforms.push({
                        x: x,
                        y: y,
                        width: width,
                        speed: speed
                    });
                    placed = true;
                }
                attempts++;
            }
        }
    }
}

// Test with multiple seeds
console.log("Testing RandomLevelGenerator with moving platforms...\n");

const testSeeds = [0.1, 0.5, 0.9, Math.random(), Math.random()];
let totalPlatforms = 0;
let levelsWithPlatforms = 0;

for (const seed of testSeeds) {
    const generator = new TestRandomLevelGenerator(seed);
    const config = generator.generate();

    console.log(`Seed: ${seed.toFixed(4)}`);
    console.log(`  Ground platforms: ${config.grounds.length}`);
    console.log(`  Moving platforms: ${config.movingPlatforms.length}`);

    if (config.movingPlatforms.length > 0) {
        levelsWithPlatforms++;
        totalPlatforms += config.movingPlatforms.length;

        config.movingPlatforms.forEach((platform, index) => {
            console.log(`    Platform ${index + 1}: x=${platform.x}, y=${platform.y}, width=${platform.width}, speed=${platform.speed}`);
        });
    }
    console.log("");
}

console.log("=== Summary ===");
console.log(`Levels tested: ${testSeeds.length}`);
console.log(`Levels with moving platforms: ${levelsWithPlatforms}`);
console.log(`Total moving platforms generated: ${totalPlatforms}`);
console.log(`Average platforms per level: ${(totalPlatforms / testSeeds.length).toFixed(2)}`);

// Validate platform properties
console.log("\n=== Validation ===");
let allValid = true;
for (const seed of testSeeds) {
    const generator = new TestRandomLevelGenerator(seed);
    const config = generator.generate();

    for (const platform of config.movingPlatforms) {
        if (platform.width < 64 || platform.width > 96) {
            console.log(`ERROR: Invalid platform width: ${platform.width}`);
            allValid = false;
        }
        if (platform.speed < 40 || platform.speed > 70) {
            console.log(`ERROR: Invalid platform speed: ${platform.speed}`);
            allValid = false;
        }
        if (platform.y < 350 || platform.y > 520) {
            console.log(`ERROR: Invalid platform y position: ${platform.y}`);
            allValid = false;
        }
    }
}

if (allValid) {
    console.log("All platform properties are valid!");
}

console.log("\nTest completed.");
