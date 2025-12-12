import RandomLevelGenerator from '../src/utils/RandomLevelGenerator.js';

console.log('=== Final Verification Test ===\n');

// Test with 10 different seeds
let totalOverlaps = 0;
let totalLevels = 10;

for (let i = 0; i < totalLevels; i++) {
    const seed = Math.random();
    const generator = new RandomLevelGenerator(seed);
    const config = generator.generate();

    // Check player spawn
    const playerOnGround = config.playerStart.y === 536 && config.grounds[0].y === 568;

    // Collect all objects
    const objects = [];

    // Platforms (not main ground)
    config.grounds.forEach(g => {
        if (g.y !== 568) {
            objects.push({ type: 'platform', x: g.x, y: g.y, width: g.width, height: 32 });
        }
    });

    config.bricks.forEach(b => objects.push({ type: 'brick', x: b.x, y: b.y, width: 32, height: 32 }));
    config.questions.forEach(q => objects.push({ type: 'question', x: q.x, y: q.y, width: 32, height: 32 }));
    config.pipes.forEach(p => objects.push({ type: 'pipe', x: p.x, y: p.y, width: 64, height: p.height }));

    // Check for overlaps (excluding coins for now as they're decorative)
    function rectanglesOverlap(r1, r2) {
        return !(r1.x + r1.width <= r2.x ||
                 r2.x + r2.width <= r1.x ||
                 r1.y + r1.height <= r2.y ||
                 r2.y + r2.height <= r1.y);
    }

    let overlapCount = 0;
    for (let j = 0; j < objects.length; j++) {
        for (let k = j + 1; k < objects.length; k++) {
            if (rectanglesOverlap(objects[j], objects[k])) {
                overlapCount++;
            }
        }
    }

    totalOverlaps += overlapCount;

    console.log(`Level ${i + 1} (seed: ${seed.toFixed(6)})`);
    console.log(`  Player on ground: ${playerOnGround ? '✓' : '✗'}`);
    console.log(`  Objects: ${objects.length} (platforms: ${config.grounds.length - config.grounds.filter(g => g.y === 568).length}, bricks: ${config.bricks.length}, questions: ${config.questions.length}, pipes: ${config.pipes.length})`);
    console.log(`  Overlaps: ${overlapCount}`);
    console.log('');
}

console.log(`=== Summary ===`);
console.log(`Total levels tested: ${totalLevels}`);
console.log(`Total overlaps found: ${totalOverlaps}`);
console.log(`Average overlaps per level: ${(totalOverlaps / totalLevels).toFixed(2)}`);

if (totalOverlaps === 0) {
    console.log('\n✓ All tests passed! No overlaps detected.');
} else {
    console.log(`\n⚠ Found ${totalOverlaps} overlaps across ${totalLevels} levels.`);
}
