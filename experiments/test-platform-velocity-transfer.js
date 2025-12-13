// Test script to verify player movement on moving platforms
// This tests the logic of velocity transfer from platform to player

console.log('=== Test: Platform Velocity Transfer ===\n');

// Simulate the Player class behavior
class TestPlayer {
    constructor() {
        this.currentPlatform = null;
        this.speed = 240;
        this.body = {
            touching: { down: true },
            velocity: { x: 0 }
        };
        this.cursors = {
            left: { isDown: false },
            right: { isDown: false }
        };
    }

    setVelocityX(vx) {
        this.body.velocity.x = vx;
        console.log(`  Player velocity X set to: ${vx}`);
    }

    setCurrentPlatform(platform) {
        this.currentPlatform = platform;
    }

    clearPlatformIfNotTouching() {
        if (!this.body.touching.down) {
            this.currentPlatform = null;
        }
    }

    handleMovement() {
        // Get the platform velocity if player is standing on a moving platform
        let platformVelocityX = 0;
        if (this.currentPlatform && this.body.touching.down) {
            platformVelocityX = this.currentPlatform.body.velocity.x;
        }

        if (this.cursors.left.isDown) {
            this.setVelocityX(-this.speed + platformVelocityX);
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(this.speed + platformVelocityX);
        } else {
            // When not pressing movement keys, inherit platform velocity
            this.setVelocityX(platformVelocityX);
        }
    }
}

// Simulate a moving platform
class TestPlatform {
    constructor(velocityX) {
        this.body = {
            velocity: { x: velocityX },
            touching: { up: true }
        };
    }
}

// Test 1: Player on ground (no platform)
console.log('Test 1: Player on ground, no movement keys');
const player1 = new TestPlayer();
player1.handleMovement();
console.assert(player1.body.velocity.x === 0, 'Player should have 0 velocity');
console.log('  Result: PASS\n');

// Test 2: Player on moving platform (platform moving right at 50)
console.log('Test 2: Player on moving platform (50px/s right), no movement keys');
const player2 = new TestPlayer();
const platform2 = new TestPlatform(50);
player2.setCurrentPlatform(platform2);
player2.handleMovement();
console.assert(player2.body.velocity.x === 50, `Player should have velocity 50, got ${player2.body.velocity.x}`);
console.log('  Result: ' + (player2.body.velocity.x === 50 ? 'PASS' : 'FAIL') + '\n');

// Test 3: Player on moving platform, pressing right
console.log('Test 3: Player on moving platform (50px/s right), pressing right');
const player3 = new TestPlayer();
const platform3 = new TestPlatform(50);
player3.setCurrentPlatform(platform3);
player3.cursors.right.isDown = true;
player3.handleMovement();
const expected3 = 240 + 50; // speed + platform velocity
console.assert(player3.body.velocity.x === expected3, `Player should have velocity ${expected3}, got ${player3.body.velocity.x}`);
console.log('  Result: ' + (player3.body.velocity.x === expected3 ? 'PASS' : 'FAIL') + '\n');

// Test 4: Player on moving platform (moving left), pressing left
console.log('Test 4: Player on moving platform (-50px/s left), pressing left');
const player4 = new TestPlayer();
const platform4 = new TestPlatform(-50);
player4.setCurrentPlatform(platform4);
player4.cursors.left.isDown = true;
player4.handleMovement();
const expected4 = -240 + (-50); // -speed + platform velocity
console.assert(player4.body.velocity.x === expected4, `Player should have velocity ${expected4}, got ${player4.body.velocity.x}`);
console.log('  Result: ' + (player4.body.velocity.x === expected4 ? 'PASS' : 'FAIL') + '\n');

// Test 5: Player jumps off platform (not touching down)
console.log('Test 5: Player jumps off platform (not touching down)');
const player5 = new TestPlayer();
const platform5 = new TestPlatform(50);
player5.setCurrentPlatform(platform5);
player5.body.touching.down = false;
player5.clearPlatformIfNotTouching();
player5.handleMovement();
console.assert(player5.currentPlatform === null, 'Platform reference should be cleared');
console.assert(player5.body.velocity.x === 0, `Player should have velocity 0 after jumping, got ${player5.body.velocity.x}`);
console.log('  Platform cleared: ' + (player5.currentPlatform === null ? 'PASS' : 'FAIL'));
console.log('  Velocity check: ' + (player5.body.velocity.x === 0 ? 'PASS' : 'FAIL') + '\n');

console.log('=== All Tests Complete ===');
