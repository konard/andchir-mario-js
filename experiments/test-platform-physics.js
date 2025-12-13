// Test to understand the double physics addition issue
//
// HYPOTHESIS: The problem is that MovingPlatform calls both:
// 1. scene.physics.add.existing(this) in constructor
// 2. Then movingPlatformGroup.add(movingPlatform) in Level1Scene
//
// This might cause the body to be reset or gravity to be re-enabled!
//
// SOLUTION: Remove scene.physics.add.existing() from constructor
// since adding to a physics group already enables physics.

console.log('Testing MovingPlatform physics double-addition issue');
console.log('');
console.log('Current code flow:');
console.log('1. MovingPlatform constructor calls scene.add.existing(this)');
console.log('2. MovingPlatform constructor calls scene.physics.add.existing(this)');
console.log('3. MovingPlatform constructor sets body.allowGravity = false');
console.log('4. Level1Scene calls movingPlatformGroup.add(movingPlatform)');
console.log('');
console.log('PROBLEM: Step 4 might reset the physics body, re-enabling gravity!');
console.log('');
console.log('SOLUTION: Remove step 2, let the group handle physics initialization');
