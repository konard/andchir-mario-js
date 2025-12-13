// Debug script to trace moving platform creation
import Level1Config from '../src/config/Level1Config.js';

console.log('=== Moving Platform Configuration Debug ===\n');

console.log('1. Config check:');
console.log('   movingPlatforms exists:', !!Level1Config.movingPlatforms);
console.log('   Number of platforms:', Level1Config.movingPlatforms?.length || 0);

if (Level1Config.movingPlatforms) {
    console.log('\n2. Platform details:');
    Level1Config.movingPlatforms.forEach((platform, index) => {
        console.log(`   Platform ${index}:`, platform);
    });

    console.log('\n3. Gap analysis:');
    const grounds = Level1Config.grounds;
    const gapStart = grounds.find(g => g.x === 0).x + grounds.find(g => g.x === 0).width;
    const gapEnd = grounds.find(g => g.x === 3400).x;
    console.log(`   Gap: x=${gapStart} to x=${gapEnd} (width: ${gapEnd - gapStart}px)`);

    console.log('\n4. Platform positions relative to gap:');
    Level1Config.movingPlatforms.forEach((platform, index) => {
        const inGap = platform.x >= gapStart && platform.x <= gapEnd;
        console.log(`   Platform ${index}: x=${platform.x}, y=${platform.y}, in gap: ${inGap}`);
    });
}

console.log('\n=== End Debug ===');
