// Test script to verify enhanced Level 1 platform configuration
// This validates the changes made for issue #76

import Level1Config from '../src/config/Level1Config.js';

console.log('=== Level 1 Enhanced Platform Configuration Test ===\n');

// Test gap size
const grounds = Level1Config.grounds;
const mainGround = grounds[0];
const postGapGround = grounds[1];
const gapSize = postGapGround.x - (mainGround.x + mainGround.width);

console.log('1. Gap Size Test:');
console.log(`   Main ground ends at: x=${mainGround.x + mainGround.width}`);
console.log(`   Post-gap ground starts at: x=${postGapGround.x}`);
console.log(`   Gap size: ${gapSize} pixels`);
console.log(`   Expected: 600 pixels`);
console.log(`   Status: ${gapSize === 600 ? '✓ PASS' : '✗ FAIL'}\n`);

// Test moving platforms configuration
const platforms = Level1Config.movingPlatforms;

console.log('2. Moving Platforms Configuration:');
platforms.forEach((platform, index) => {
    console.log(`   Platform ${index + 1}:`);
    console.log(`     Position: x=${platform.x}, y=${platform.y}`);
    console.log(`     Width: ${platform.width}px`);
    console.log(`     Speed: ${platform.speed} px/s`);
});

// Test horizontal spacing
console.log('\n3. Horizontal Spacing Test:');
for (let i = 0; i < platforms.length - 1; i++) {
    const spacing = platforms[i + 1].x - platforms[i].x;
    console.log(`   Platform ${i + 1} to ${i + 2}: ${spacing} pixels`);
}
const avgHorizontalSpacing = (platforms[platforms.length - 1].x - platforms[0].x) / (platforms.length - 1);
console.log(`   Average horizontal spacing: ${avgHorizontalSpacing} pixels`);
console.log(`   Expected: ~200 pixels`);
console.log(`   Status: ${avgHorizontalSpacing >= 180 ? '✓ PASS' : '✗ FAIL'}\n`);

// Test vertical spacing
console.log('4. Vertical Spacing Test:');
const yPositions = platforms.map(p => p.y);
const minY = Math.min(...yPositions);
const maxY = Math.max(...yPositions);
const verticalRange = maxY - minY;
console.log(`   Y positions: ${yPositions.join(', ')}`);
console.log(`   Min Y: ${minY}, Max Y: ${maxY}`);
console.log(`   Vertical range: ${verticalRange} pixels`);
console.log(`   Expected: ≥40 pixels`);
console.log(`   Status: ${verticalRange >= 40 ? '✓ PASS' : '✗ FAIL'}\n`);

// Test speed variation
console.log('5. Speed Variation Test:');
const speeds = platforms.map(p => p.speed);
const minSpeed = Math.min(...speeds);
const maxSpeed = Math.max(...speeds);
const speedRange = maxSpeed - minSpeed;
console.log(`   Speeds: ${speeds.join(', ')} px/s`);
console.log(`   Speed range: ${speedRange} px/s`);
console.log(`   Status: ${speedRange >= 5 ? '✓ PASS' : '✗ FAIL'}\n`);

// Test that platforms are within the gap
console.log('6. Platform Positioning Test:');
const gapStart = mainGround.x + mainGround.width;
const gapEnd = postGapGround.x;
let allPlatformsInGap = true;
platforms.forEach((platform, index) => {
    const inGap = platform.x >= gapStart && (platform.x + platform.width) <= gapEnd;
    console.log(`   Platform ${index + 1}: ${inGap ? '✓ Within gap' : '✗ Outside gap'}`);
    if (!inGap) allPlatformsInGap = false;
});
console.log(`   Overall: ${allPlatformsInGap ? '✓ PASS' : '✗ FAIL'}\n`);

// Summary
console.log('=== Summary ===');
console.log('Changes from previous configuration (PR #75):');
console.log('  - Gap size: 400px → 600px (+50% increase)');
console.log('  - Horizontal spacing: ~120px → ~200px (+67% increase)');
console.log('  - Vertical spacing: 20px → 50px (+150% increase)');
console.log('  - Speed range: 10 px/s → 10 px/s (maintained variation)');
console.log('\nDifficulty enhancements:');
console.log('  ✓ Wider gap requires more precise platform navigation');
console.log('  ✓ Increased horizontal spacing requires better jump timing');
console.log('  ✓ Greater vertical variation adds platforming complexity');
console.log('  ✓ Speed differences create dynamic timing challenges');
