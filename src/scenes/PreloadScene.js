import Phaser from 'phaser';
import marioSpriteUrl from '../media/sprite_mario.png';

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        // Load Mario sprite sheet with correct dimensions (32x40 as specified in issue #3)
        this.load.spritesheet('mario', marioSpriteUrl, {
            frameWidth: 32,
            frameHeight: 40
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

        // House (for level transition)
        this.createHouse();
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

    createHouse() {
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });

        // House walls
        graphics.fillStyle(0xcd853f);
        graphics.fillRect(0, 32, 64, 64);

        // Door
        graphics.fillStyle(0x8b4513);
        graphics.fillRect(20, 56, 24, 40);

        // Roof
        graphics.fillStyle(0xff0000);
        graphics.fillTriangle(0, 32, 32, 0, 64, 32);

        // Roof outline
        graphics.lineStyle(2, 0x8b0000);
        graphics.lineBetween(0, 32, 32, 0);
        graphics.lineBetween(32, 0, 64, 32);

        // Window
        graphics.fillStyle(0x87ceeb);
        graphics.fillRect(10, 42, 12, 12);
        graphics.fillRect(42, 42, 12, 12);

        graphics.generateTexture('house', 64, 96);
        graphics.destroy();
    }

    create() {
        // Create Mario animations
        this.createMarioAnimations();

        this.scene.start('MenuScene');
    }

    createMarioAnimations() {
        // Small Mario idle (frame 0 - standing)
        this.anims.create({
            key: 'mario-idle',
            frames: [{ key: 'mario', frame: 0 }],
            frameRate: 10
        });

        // Small Mario walk (frame 1 - running)
        this.anims.create({
            key: 'mario-walk',
            frames: [
                { key: 'mario', frame: 0 },
                { key: 'mario', frame: 1 }
            ],
            frameRate: 10,
            repeat: -1
        });

        // Small Mario jump (frame 5 - jump)
        this.anims.create({
            key: 'mario-jump',
            frames: [{ key: 'mario', frame: 5 }],
            frameRate: 10
        });

        // Small Mario skid (frame 2 - turned)
        this.anims.create({
            key: 'mario-skid',
            frames: [{ key: 'mario', frame: 2 }],
            frameRate: 10
        });
    }
}
