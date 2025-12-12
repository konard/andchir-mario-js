import RandomLevelGenerator from '../src/utils/RandomLevelGenerator.js';

// Test with specific seed to reproduce issue
const generator = new RandomLevelGenerator(0.5);
const config = generator.generate();

console.log('=== Analyzing Level Generation ===\n');

// Collect all non-ground objects with their bounds
const objects = [];

// Bricks (32x32)
config.bricks.forEach(b => {
    objects.push({ type: 'brick', x: b.x, y: b.y, width: 32, height: 32 });
});

// Questions (32x32)
config.questions.forEach(q => {
    objects.push({ type: 'question', x: q.x, y: q.y, width: 32, height: 32 });
});

// Floating platforms (not main ground at y=568)
config.grounds.forEach(g => {
    if (g.y !== 568) {
        // Platforms span multiple tiles
        objects.push({ type: 'platform', x: g.x, y: g.y, width: g.width, height: 32 });
    }
});

// Coins (smaller, 32x32 for simplicity)
config.coins.forEach(c => {
    objects.push({ type: 'coin', x: c.x, y: c.y, width: 32, height: 32 });
});

// Pipes
config.pipes.forEach(p => {
    objects.push({ type: 'pipe', x: p.x, y: p.y, width: 64, height: p.height });
});

console.log(`Total objects to check: ${objects.length}\n`);

// Check for overlaps using rectangle intersection
function rectanglesOverlap(r1, r2) {
    return !(r1.x + r1.width <= r2.x ||
             r2.x + r2.width <= r1.x ||
             r1.y + r1.height <= r2.y ||
             r2.y + r2.height <= r1.y);
}

const overlaps = [];
for (let i = 0; i < objects.length; i++) {
    for (let j = i + 1; j < objects.length; j++) {
        if (rectanglesOverlap(objects[i], objects[j])) {
            overlaps.push({
                obj1: objects[i],
                obj2: objects[j]
            });
        }
    }
}

console.log(`Found ${overlaps.length} overlapping pairs\n`);

if (overlaps.length > 0) {
    console.log('Sample overlaps:');
    overlaps.slice(0, 10).forEach((o, idx) => {
        console.log(`${idx + 1}. ${o.obj1.type} at (${o.obj1.x},${o.obj1.y}) ` +
                    `overlaps ${o.obj2.type} at (${o.obj2.x},${o.obj2.y})`);
    });
}

// Test with different seeds
console.log('\n=== Testing Multiple Seeds ===\n');
for (let seed = 0; seed < 5; seed++) {
    const gen = new RandomLevelGenerator(seed / 10);
    const cfg = gen.generate();

    const objs = [];
    cfg.bricks.forEach(b => objs.push({ type: 'brick', x: b.x, y: b.y, width: 32, height: 32 }));
    cfg.questions.forEach(q => objs.push({ type: 'question', x: q.x, y: q.y, width: 32, height: 32 }));
    cfg.grounds.forEach(g => {
        if (g.y !== 568) {
            objs.push({ type: 'platform', x: g.x, y: g.y, width: g.width, height: 32 });
        }
    });
    cfg.pipes.forEach(p => objs.push({ type: 'pipe', x: p.x, y: p.y, width: 64, height: p.height }));

    let overlapCount = 0;
    for (let i = 0; i < objs.length; i++) {
        for (let j = i + 1; j < objs.length; j++) {
            if (rectanglesOverlap(objs[i], objs[j])) {
                overlapCount++;
            }
        }
    }

    console.log(`Seed ${seed / 10}: ${overlapCount} overlaps found`);
}
