import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        // Load Mario sprite sheet (16x16 frames, will be scaled to 32x40 display size)
        this.load.spritesheet('mario', 'src/media/sprite_mario.png', {
            frameWidth: 16,
            frameHeight: 16
        });

        // Create other assets using Graphics API
        this.createAssets();
    }

    createAssets() {
        // Ground tiles
        this.createGroundTile();

        // Brick tile
        this.createBrickTile();

        // Question block
        this.createQuestionBlock();

        // Coin
        this.createCoin();

        // Goomba enemy
        this.createGoomba();

        // Mushroom power-up
        this.createMushroom();

        // Pipe
        this.createPipe();

        // Flag
        this.createFlag();
    }

    createGroundTile() {
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0xd2691e);
        graphics.fillRect(0, 0, 32, 32);
        graphics.fillStyle(0xa0522d);
        graphics.fillRect(2, 2, 28, 28);
        graphics.fillStyle(0x8b4513);
        graphics.fillRect(4, 4, 24, 24);
        graphics.generateTexture('ground', 32, 32);
        graphics.destroy();
    }

    createBrickTile() {
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0xcd853f);
        graphics.fillRect(0, 0, 32, 32);
        graphics.lineStyle(2, 0x8b4513);
        graphics.strokeRect(1, 1, 30, 14);
        graphics.strokeRect(1, 17, 30, 14);
        graphics.generateTexture('brick', 32, 32);
        graphics.destroy();
    }

    createQuestionBlock() {
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0xffa500);
        graphics.fillRect(0, 0, 32, 32);
        graphics.fillStyle(0xff8c00);
        graphics.fillRect(2, 2, 28, 28);
        graphics.fillStyle(0xffff00);
        graphics.fillRect(12, 8, 8, 16);
        graphics.fillRect(8, 12, 16, 8);
        graphics.generateTexture('question', 32, 32);
        graphics.destroy();
    }

    createCoin() {
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0xffd700);
        graphics.fillCircle(8, 8, 7);
        graphics.fillStyle(0xffff00);
        graphics.fillCircle(8, 8, 5);
        graphics.generateTexture('coin', 16, 16);
        graphics.destroy();
    }

    createGoomba() {
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0x8b4513);
        graphics.fillRect(2, 0, 12, 6);
        graphics.fillRect(0, 6, 16, 10);
        graphics.fillStyle(0x000000);
        graphics.fillRect(4, 8, 2, 2);
        graphics.fillRect(10, 8, 2, 2);
        graphics.generateTexture('goomba', 16, 16);
        graphics.destroy();
    }

    createMushroom() {
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0xff0000);
        graphics.fillCircle(8, 6, 6);
        graphics.fillStyle(0xffffff);
        graphics.fillCircle(5, 4, 2);
        graphics.fillCircle(11, 4, 2);
        graphics.fillStyle(0xffebcd);
        graphics.fillRect(5, 8, 6, 8);
        graphics.generateTexture('mushroom', 16, 16);
        graphics.destroy();
    }

    createPipe() {
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0x00ff00);
        graphics.fillRect(0, 0, 64, 64);
        graphics.fillStyle(0x008000);
        graphics.fillRect(4, 4, 56, 56);
        graphics.fillStyle(0x00ff00);
        graphics.fillRect(0, 0, 64, 8);
        graphics.generateTexture('pipe', 64, 64);
        graphics.destroy();
    }

    createFlag() {
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.lineStyle(3, 0x000000);
        graphics.lineBetween(2, 0, 2, 64);
        graphics.fillStyle(0xff0000);
        graphics.fillTriangle(2, 0, 2, 20, 32, 10);
        graphics.generateTexture('flag', 32, 64);
        graphics.destroy();
    }

    create() {
        // Create Mario animations
        this.createMarioAnimations();

        this.scene.start('MenuScene');
    }

    createMarioAnimations() {
        // Small Mario idle (frame 0)
        this.anims.create({
            key: 'mario-idle',
            frames: [{ key: 'mario', frame: 0 }],
            frameRate: 10
        });

        // Small Mario walk (frames 1, 2, 3)
        this.anims.create({
            key: 'mario-walk',
            frames: this.anims.generateFrameNumbers('mario', { start: 1, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        // Small Mario jump (frame 5)
        this.anims.create({
            key: 'mario-jump',
            frames: [{ key: 'mario', frame: 5 }],
            frameRate: 10
        });

        // Small Mario skid (frame 4)
        this.anims.create({
            key: 'mario-skid',
            frames: [{ key: 'mario', frame: 4 }],
            frameRate: 10
        });
    }
}
