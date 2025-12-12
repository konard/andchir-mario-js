import RandomLevelGenerator from '../src/utils/RandomLevelGenerator.js';

// Test multiple level generations
for (let i = 0; i < 5; i++) {
    const generator = new RandomLevelGenerator();
    const config = generator.generate();

    console.log(`\n=== Level ${i + 1} ===`);
    console.log(`Player Start: x=${config.playerStart.x}, y=${config.playerStart.y}`);
    console.log(`Ground Y: ${config.grounds[0]?.y}`);
    console.log(`Number of ground platforms: ${config.grounds.length}`);
    console.log(`Number of bricks: ${config.bricks.length}`);
    console.log(`Number of questions: ${config.questions.length}`);
    console.log(`Number of coins: ${config.coins.length}`);

    // Check if player start is on ground
    const playerOnGround = config.grounds.some(g =>
        config.playerStart.x >= g.x &&
        config.playerStart.x <= g.x + g.width &&
        config.playerStart.y === g.y - 32 // Player should be 32 pixels above ground
    );
    console.log(`Player on ground: ${playerOnGround}`);

    // Check for overlapping objects
    const allObjects = [];

    // Add floating platforms (excluding main ground platforms at y=568)
    config.grounds.forEach(g => {
        if (g.y !== 568) {
            for (let x = g.x; x < g.x + g.width; x += 32) {
                allObjects.push({ type: 'platform', x, y: g.y });
            }
        }
    });

    config.bricks.forEach(b => allObjects.push({ type: 'brick', x: b.x, y: b.y }));
    config.questions.forEach(q => allObjects.push({ type: 'question', x: q.x, y: q.y }));

    // Check for overlaps (objects at same x,y)
    const overlaps = [];
    for (let i = 0; i < allObjects.length; i++) {
        for (let j = i + 1; j < allObjects.length; j++) {
            if (allObjects[i].x === allObjects[j].x && allObjects[i].y === allObjects[j].y) {
                overlaps.push({
                    obj1: allObjects[i],
                    obj2: allObjects[j]
                });
            }
        }
    }

    if (overlaps.length > 0) {
        console.log(`WARNING: Found ${overlaps.length} overlapping objects:`);
        overlaps.slice(0, 3).forEach(o => {
            console.log(`  - ${o.obj1.type} and ${o.obj2.type} at (${o.obj1.x}, ${o.obj1.y})`);
        });
    } else {
        console.log(`No overlaps detected`);
    }
}
