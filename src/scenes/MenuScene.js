import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Title
        const title = this.add.text(width / 2, height / 2 - 100, 'SUPER MARIO', {
            fontSize: '48px',
            fontFamily: 'Arial',
            fontStyle: 'bold',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        });
        title.setOrigin(0.5);

        // Start instruction
        const startText = this.add.text(width / 2, height / 2, 'Press SPACE to Start', {
            fontSize: '24px',
            fontFamily: 'Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        });
        startText.setOrigin(0.5);

        // Controls instruction
        const controlsText = this.add.text(width / 2, height / 2 + 60,
            'Arrow Keys: Move\nSpace: Jump', {
            fontSize: '18px',
            fontFamily: 'Arial',
            fill: '#ffff00',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 3
        });
        controlsText.setOrigin(0.5);

        // Blinking effect for start text
        this.tweens.add({
            targets: startText,
            alpha: 0,
            duration: 800,
            ease: 'Linear',
            yoyo: true,
            repeat: -1
        });

        // Listen for space key
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('Level1Scene');
            this.scene.launch('UIScene');
        });
    }
}
