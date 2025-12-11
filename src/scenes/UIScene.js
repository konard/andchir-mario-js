import Phaser from 'phaser';

export default class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene' });
    }

    create() {
        // UI is fixed to camera
        const cam = this.cameras.main;
        cam.setScroll(0, 0);

        // Score text
        this.scoreText = this.add.text(20, 20, 'SCORE: 0', {
            fontSize: '20px',
            fontFamily: 'Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        });
        this.scoreText.setScrollFactor(0);
        this.scoreText.setDepth(100);

        // Coins text
        this.coinsText = this.add.text(20, 50, 'COINS: 0', {
            fontSize: '20px',
            fontFamily: 'Arial',
            fill: '#ffd700',
            stroke: '#000000',
            strokeThickness: 4
        });
        this.coinsText.setScrollFactor(0);
        this.coinsText.setDepth(100);

        // Lives text
        this.livesText = this.add.text(20, 80, 'LIVES: 3', {
            fontSize: '20px',
            fontFamily: 'Arial',
            fill: '#ff0000',
            stroke: '#000000',
            strokeThickness: 4
        });
        this.livesText.setScrollFactor(0);
        this.livesText.setDepth(100);

        // Time text
        this.timeText = this.add.text(650, 20, 'TIME: 300', {
            fontSize: '20px',
            fontFamily: 'Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        });
        this.timeText.setScrollFactor(0);
        this.timeText.setDepth(100);

        // Level name
        this.levelText = this.add.text(400, 20, 'WORLD 1-1', {
            fontSize: '20px',
            fontFamily: 'Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        });
        this.levelText.setOrigin(0.5, 0);
        this.levelText.setScrollFactor(0);
        this.levelText.setDepth(100);
    }

    update() {
        const player = this.registry.get('player');
        const timeLeft = this.registry.get('timeLeft');
        const levelName = this.registry.get('levelName');

        if (player) {
            this.scoreText.setText('SCORE: ' + player.score);
            this.coinsText.setText('COINS: ' + player.coins);
            this.livesText.setText('LIVES: ' + player.lives);
        }

        if (timeLeft !== undefined) {
            this.timeText.setText('TIME: ' + timeLeft);

            // Warning color when time is low
            if (timeLeft <= 30) {
                this.timeText.setFill('#ff0000');
            } else {
                this.timeText.setFill('#ffffff');
            }
        }

        if (levelName !== undefined) {
            this.levelText.setText(levelName);
        }
    }
}
