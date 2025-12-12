import Phaser from 'phaser';

export default class Goomba extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'goomba');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Scale down the sprite by 2x (from 64x80 to 32x40)
        this.setScale(0.5);

        this.setCollideWorldBounds(true);
        this.setBounce(0);
        this.setGravityY(0);

        // Play walk animation
        this.play('goomba-walk');

        // Movement properties
        this.speed = 50;
        this.direction = -1; // -1 for left, 1 for right

        this.setVelocityX(this.speed * this.direction);

        this.isDead = false;
    }

    update() {
        if (this.isDead) {
            return;
        }

        // Keep moving
        if (this.body.velocity.x === 0) {
            this.direction *= -1;
            this.setVelocityX(this.speed * this.direction);
        }
    }

    turnAround() {
        this.direction *= -1;
        this.setVelocityX(this.speed * this.direction);
    }

    stomped() {
        if (this.isDead) {
            return;
        }

        this.isDead = true;
        this.setVelocity(0, 0);
        this.setTint(0x555555);
        this.body.enable = false;

        // Flatten animation
        this.scene.tweens.add({
            targets: this,
            scaleY: 0.3,
            duration: 100,
            onComplete: () => {
                this.scene.time.delayedCall(500, () => {
                    this.destroy();
                });
            }
        });

        return 200; // Score points
    }

    kill() {
        if (this.isDead) {
            return;
        }

        this.isDead = true;
        this.setVelocity(100, -200);
        this.setTint(0x555555);
        this.body.enable = false;

        this.scene.time.delayedCall(1000, () => {
            this.destroy();
        });

        return 100; // Score points
    }
}
