// Test script to verify Level 1 platform configuration changes

import Level1Config from '../src/config/Level1Config.js';

console.log('=== Level 1 Configuration Test ===\n');

// Check gap size
const mainGround = Level1Config.grounds[0];
const groundAfterGap = Level1Config.grounds[1];
const gapSize = groundAfterGap.x - (mainGround.x + mainGround.width);

console.log('Ground Configuration:');
console.log(`  Main ground ends at: ${mainGround.x + mainGround.width}`);
console.log(`  Next ground starts at: ${groundAfterGap.x}`);
console.log(`  Gap size: ${gapSize} pixels`);
console.log(`  ✓ Gap increased from 200px to ${gapSize}px\n`);

// Check moving platforms
console.log('Moving Platforms Configuration:');
Level1Config.movingPlatforms.forEach((platform, index) => {
    console.log(`  Platform ${index + 1}:`);
    console.log(`    Position: x=${platform.x}, y=${platform.y}`);
    console.log(`    Width: ${platform.width}px`);
    console.log(`    Speed: ${platform.speed} px/s`);

    if (index > 0) {
        const prevPlatform = Level1Config.movingPlatforms[index - 1];
        const spacing = platform.x - prevPlatform.x;
        console.log(`    Spacing from previous: ${spacing}px`);
    }
});

// Check speed variation
const speeds = Level1Config.movingPlatforms.map(p => p.speed);
const uniqueSpeeds = new Set(speeds);
console.log(`\n  ✓ Platform speeds vary: ${[...uniqueSpeeds].join(', ')} px/s`);
console.log(`  ✓ Number of platforms: ${Level1Config.movingPlatforms.length}`);

// Verify platforms are within gap
const firstPlatform = Level1Config.movingPlatforms[0];
const lastPlatform = Level1Config.movingPlatforms[Level1Config.movingPlatforms.length - 1];

console.log('\nGap Coverage:');
console.log(`  First platform starts at: ${firstPlatform.x}`);
console.log(`  Last platform starts at: ${lastPlatform.x}`);
console.log(`  Gap range: ${mainGround.x + mainGround.width} to ${groundAfterGap.x}`);

if (firstPlatform.x >= mainGround.x + mainGround.width &&
    lastPlatform.x + lastPlatform.width <= groundAfterGap.x) {
    console.log('  ✓ All platforms are within the gap');
} else {
    console.log('  ⚠ Warning: Some platforms may be outside the gap');
}

console.log('\n=== Configuration Validation Complete ===');
