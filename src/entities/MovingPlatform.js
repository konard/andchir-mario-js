export default class MovingPlatform extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, width = 96) {
        super(scene, x, y, 'movingPlatform');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Set platform properties
        this.setOrigin(0, 0);
        this.setDisplaySize(width, 16); // Ensure sprite displays at correct size
        this.body.setSize(width, 16); // Set physics body size to match display
        this.setImmovable(true);
        this.body.allowGravity = false;

        // Make sure the sprite is visible
        this.setVisible(true);
        this.setAlpha(1);
        this.setDepth(10);

        // Movement properties
        this.speed = 50; // pixels per second
        this.startX = x;
        this.travelDistance = width; // Move distance approximately equal to platform width
        this.direction = 1; // 1 for right, -1 for left

        // Set initial velocity
        this.setVelocityX(this.speed * this.direction);
    }

    update() {
        // Check if platform has reached movement boundaries
        if (this.direction === 1 && this.x >= this.startX + this.travelDistance) {
            // Reached right boundary, reverse direction
            this.direction = -1;
            this.setVelocityX(this.speed * this.direction);
            this.x = this.startX + this.travelDistance; // Clamp position
        } else if (this.direction === -1 && this.x <= this.startX) {
            // Reached left boundary, reverse direction
            this.direction = 1;
            this.setVelocityX(this.speed * this.direction);
            this.x = this.startX; // Clamp position
        }
    }
}
