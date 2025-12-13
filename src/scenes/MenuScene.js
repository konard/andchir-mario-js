import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
        this.selectedMode = 0; // 0 = Normal game, 1 = Random levels
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Add background image
        const background = this.add.image(width / 2, height / 2, 'menuBackground');
        // Scale to fit height exactly while maintaining aspect ratio
        const scaleY = height / background.height;
        background.setScale(scaleY);

        // Add semi-transparent background for menu area
        // const menuBg = this.add.rectangle(width / 2, height / 2 + 100, 300, 300, 0x000000, 0.5);

        // Menu title
        const menuTitle = this.add.text(width / 2, height / 2, 'SELECT GAME MODE', {
            fontSize: '24px',
            fontFamily: 'Arial',
            fill: '#ffff00',
            stroke: '#000000',
            strokeThickness: 4
        });
        menuTitle.setOrigin(0.5);

        // Menu options
        this.normalGameText = this.add.text(width / 2, height / 2 + 70, 'Normal game', {
            fontSize: '28px',
            fontFamily: 'Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        });
        this.normalGameText.setOrigin(0.5);

        this.randomLevelsText = this.add.text(width / 2, height / 2 + 110, 'Random levels', {
            fontSize: '28px',
            fontFamily: 'Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        });
        this.randomLevelsText.setOrigin(0.5);

        // Store menu options in array for easy access
        this.menuOptions = [this.normalGameText, this.randomLevelsText];

        // Controls instruction
        const controlsText = this.add.text(width / 2, height / 2 + 185,
            'UP/DOWN: Select Mode\nSPACE: Start Game\n\nArrow Keys: Move\nSpace: Jump', {
            fontSize: '12px',
            fontFamily: 'Arial',
            fill: '#ffffff',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 3
        });
        controlsText.setOrigin(0.5);

        // Update selection highlight
        this.updateMenuSelection();

        // Listen for arrow keys
        this.input.keyboard.on('keydown-UP', () => {
            this.selectedMode = (this.selectedMode - 1 + 2) % 2;
            this.updateMenuSelection();
        });

        this.input.keyboard.on('keydown-DOWN', () => {
            this.selectedMode = (this.selectedMode + 1) % 2;
            this.updateMenuSelection();
        });

        // Listen for space key to start
        this.input.keyboard.on('keydown-SPACE', () => {
            this.startGame();
        });
    }

    updateMenuSelection() {
        // Reset all options to default style
        this.menuOptions.forEach(option => {
            option.setStyle({
                fontSize: '28px',
                fill: '#ffffff',
                stroke: '#000000',
                strokeThickness: 4
            });
        });

        // Highlight selected option
        this.menuOptions[this.selectedMode].setStyle({
            fontSize: '32px',
            fill: '#ffff00',
            stroke: '#000000',
            strokeThickness: 5
        });
    }

    startGame() {
        // Store game mode in registry
        this.registry.set('gameMode', this.selectedMode === 0 ? 'normal' : 'random');

        if (this.selectedMode === 0) {
            // Normal game - start Level 1
            this.scene.start('Level1Scene');
            this.scene.launch('UIScene');
        } else {
            // Random levels mode - reset level number for new session
            this.registry.set('currentLevelNumber', 1);
            this.scene.start('RandomLevelScene');
            this.scene.launch('UIScene');
        }
    }
}
