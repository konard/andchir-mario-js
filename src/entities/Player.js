import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'mario');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Player properties
        this.setCollideWorldBounds(true);
        this.setBounce(0);
        this.setGravityY(0);

        // Movement properties
        this.speed = 200;
        this.jumpVelocity = -450;
        this.isJumping = false;
        this.facingRight = true;

        // Power-up state
        this.isPoweredUp = false;
        this.isInvincible = false;

        // Player stats
        this.lives = 3;
        this.coins = 0;
        this.score = 0;

        // Input
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        this.handleMovement();
        this.handleJump();
        this.updateAnimation();
    }

    handleMovement() {
        if (this.cursors.left.isDown) {
            this.setVelocityX(-this.speed);
            this.facingRight = false;
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(this.speed);
            this.facingRight = true;
        } else {
            this.setVelocityX(0);
        }
    }

    handleJump() {
        const onGround = this.body.touching.down;

        if (onGround) {
            this.isJumping = false;
        }

        const jumpPressed = Phaser.Input.Keyboard.JustDown(this.spaceKey) ||
                          Phaser.Input.Keyboard.JustDown(this.cursors.up);

        if (jumpPressed && onGround) {
            this.setVelocityY(this.jumpVelocity);
            this.isJumping = true;
        }
    }

    updateAnimation() {
        // Flip sprite based on direction
        this.setFlipX(!this.facingRight);

        // Play appropriate animation based on state
        if (!this.body.touching.down) {
            // In air - jump animation
            this.anims.play('mario-jump', true);
        } else if (this.body.velocity.x !== 0) {
            // Moving - walk animation
            this.anims.play('mario-walk', true);
        } else {
            // Standing still - idle animation
            this.anims.play('mario-idle', true);
        }
    }

    collectCoin() {
        this.coins++;
        this.score += 100;

        if (this.coins >= 100) {
            this.coins -= 100;
            this.gainLife();
        }
    }

    collectMushroom() {
        if (!this.isPoweredUp) {
            this.isPoweredUp = true;
            // Adjust Y position to prevent sinking into ground when growing
            const currentY = this.y;
            this.setScale(1.5);
            // Move up by half the height difference to keep feet at same level
            this.y = currentY - (this.displayHeight * 0.25);
            this.score += 1000;
        }
    }

    takeDamage() {
        if (this.isInvincible) {
            return;
        }

        if (this.isPoweredUp) {
            this.isPoweredUp = false;
            this.setScale(1);
            this.becomeInvincible();
        } else {
            this.die();
        }
    }

    die() {
        this.lives--;
        this.setVelocity(0, -300);
        this.setTint(0xff0000);
        this.scene.physics.world.disable(this);

        this.scene.time.delayedCall(1000, () => {
            if (this.lives > 0) {
                this.respawn();
            } else {
                this.gameOver();
            }
        });
    }

    respawn() {
        this.setPosition(100, 100);
        this.setTint(0xffffff);
        this.setScale(1);
        this.isPoweredUp = false;
        this.scene.physics.world.enable(this);
        this.becomeInvincible();
    }

    becomeInvincible() {
        this.isInvincible = true;

        // Blinking effect
        this.scene.tweens.add({
            targets: this,
            alpha: 0.3,
            duration: 100,
            ease: 'Linear',
            yoyo: true,
            repeat: 20,
            onComplete: () => {
                this.isInvincible = false;
                this.alpha = 1;
            }
        });
    }

    gainLife() {
        this.lives++;
        this.score += 1000;
    }

    gameOver() {
        this.scene.scene.start('MenuScene');
        this.scene.scene.stop('UIScene');
    }

    addScore(points) {
        this.score += points;
    }
}
