import Phaser from 'phaser';
import Player from '../entities/Player.js';
import Goomba from '../entities/Goomba.js';
import MovingPlatform from '../entities/MovingPlatform.js';
import Level1Config from '../config/Level1Config.js';

export default class Level1Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Level1Scene' });
        // Debug flag for pit death detection - set to false in production
        this.debugPitDeath = false;
    }

    create() {
        this.levelConfig = Level1Config;

        // Set level name in registry for UI
        this.registry.set('levelName', this.levelConfig.name);

        // Set world bounds
        this.physics.world.setBounds(0, 0, this.levelConfig.width, this.levelConfig.height);

        // Create groups
        this.groundGroup = this.physics.add.staticGroup();
        this.brickGroup = this.physics.add.staticGroup();
        this.questionGroup = this.physics.add.staticGroup();
        this.coinGroup = this.physics.add.group();
        this.enemyGroup = this.physics.add.group();
        this.pipeGroup = this.physics.add.staticGroup();
        this.powerUpGroup = this.physics.add.group();
        this.movingPlatforms = []; // Simple array instead of group

        // Build level
        this.createGround();
        this.createBricks();
        this.createQuestions();
        this.createCoins();
        this.createEnemies();
        this.createPipes();
        this.createMovingPlatforms();
        this.createHouse();

        // Create player
        this.player = new Player(
            this,
            this.levelConfig.playerStart.x,
            this.levelConfig.playerStart.y
        );

        // Setup camera
        this.cameras.main.setBounds(0, 0, this.levelConfig.width, this.levelConfig.height);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

        // Setup collisions
        this.setupCollisions();

        // Timer
        this.timeLeft = 300;
        this.timerEvent = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

        // Store reference for UI
        this.registry.set('player', this.player);
        this.registry.set('timeLeft', this.timeLeft);
    }

    createGround() {
        this.levelConfig.grounds.forEach(ground => {
            for (let x = ground.x; x < ground.x + ground.width; x += 32) {
                const tile = this.groundGroup.create(x, ground.y, 'ground');
                tile.setOrigin(0, 0);
                tile.refreshBody();
            }
        });
    }

    createBricks() {
        this.levelConfig.bricks.forEach(brick => {
            const tile = this.brickGroup.create(brick.x, brick.y, 'brick');
            tile.setOrigin(0, 0);
            tile.refreshBody();
            tile.canBreak = true;
        });
    }

    createQuestions() {
        this.levelConfig.questions.forEach(question => {
            const block = this.questionGroup.create(question.x, question.y, 'question');
            block.setOrigin(0, 0);
            block.refreshBody();
            block.contains = question.contains;
            block.isUsed = false;
        });
    }

    createCoins() {
        this.levelConfig.coins.forEach(coin => {
            const coinSprite = this.coinGroup.create(coin.x, coin.y, 'coin');
            coinSprite.setOrigin(0.5);
            coinSprite.body.setAllowGravity(false);

            // Floating animation
            this.tweens.add({
                targets: coinSprite,
                y: coin.y - 10,
                duration: 1000,
                ease: 'Sine.easeInOut',
                yoyo: true,
                repeat: -1
            });

            // Rotation
            this.tweens.add({
                targets: coinSprite,
                angle: 360,
                duration: 2000,
                repeat: -1
            });
        });
    }

    createEnemies() {
        this.levelConfig.enemies.forEach(enemy => {
            if (enemy.type === 'goomba') {
                const goomba = new Goomba(this, enemy.x, enemy.y);
                this.enemyGroup.add(goomba);
            }
        });
    }

    createPipes() {
        this.levelConfig.pipes.forEach(pipe => {
            const pipeSprite = this.pipeGroup.create(pipe.x, pipe.y, 'pipe');
            pipeSprite.setOrigin(0, 0);
            pipeSprite.setDisplaySize(64, pipe.height);
            pipeSprite.refreshBody();
        });
    }

    createHouse() {
        this.house = this.add.sprite(this.levelConfig.house.x, this.levelConfig.house.y, 'house');
        this.house.setOrigin(0, 0);
        this.physics.add.existing(this.house, true);
        this.house.body.setSize(64, 96);
    }

    createMovingPlatforms() {
        if (this.levelConfig.movingPlatforms) {
            this.levelConfig.movingPlatforms.forEach((platform, index) => {
                const movingPlatform = new MovingPlatform(
                    this,
                    platform.x,
                    platform.y,
                    platform.width
                );
                this.movingPlatforms.push(movingPlatform);
            });
        }
    }

    setupCollisions() {
        // Player collisions with world
        this.physics.add.collider(this.player, this.groundGroup);
        this.physics.add.collider(this.player, this.brickGroup, this.hitBrick, null, this);
        this.physics.add.collider(this.player, this.questionGroup, this.hitQuestion, null, this);
        this.physics.add.collider(this.player, this.pipeGroup);
        // Add collision for each moving platform individually
        this.movingPlatforms.forEach(platform => {
            this.physics.add.collider(this.player, platform);
        });

        // Enemy collisions
        this.physics.add.collider(this.enemyGroup, this.groundGroup);
        this.physics.add.collider(this.enemyGroup, this.brickGroup, this.enemyHitWall, null, this);
        this.physics.add.collider(this.enemyGroup, this.questionGroup, this.enemyHitWall, null, this);
        this.physics.add.collider(this.enemyGroup, this.pipeGroup, this.enemyHitWall, null, this);
        this.physics.add.collider(this.enemyGroup, this.enemyGroup, this.enemyHitEnemy, null, this);

        // Player vs enemies
        this.physics.add.overlap(this.player, this.enemyGroup, this.playerHitEnemy, null, this);

        // Player collectibles
        this.physics.add.overlap(this.player, this.coinGroup, this.collectCoin, null, this);
        this.physics.add.overlap(this.player, this.powerUpGroup, this.collectPowerUp, null, this);

        // House (level transition)
        this.physics.add.overlap(this.player, this.house, this.enterHouse, null, this);
    }

    hitBrick(player, brick) {
        if (player.body.touching.up && brick.body.touching.down) {
            if (player.isPoweredUp && brick.canBreak) {
                // Break brick
                brick.destroy();
                player.addScore(50);

                // Particle effect
                this.createBreakEffect(brick.x + 16, brick.y + 16);
            } else {
                // Bump animation
                this.bumpBlock(brick);
            }
        }
    }

    hitQuestion(player, block) {
        if (player.body.touching.up && block.body.touching.down && !block.isUsed) {
            block.isUsed = true;
            block.setTexture('ground');

            this.bumpBlock(block);

            if (block.contains === 'coin') {
                this.spawnCoinFromBlock(block.x + 16, block.y);
            } else if (block.contains === 'mushroom') {
                this.spawnMushroom(block.x + 16, block.y);
            }
        }
    }

    bumpBlock(block) {
        this.tweens.add({
            targets: block,
            y: block.y - 10,
            duration: 100,
            yoyo: true,
            ease: 'Linear'
        });
    }

    spawnCoinFromBlock(x, y) {
        const coin = this.add.sprite(x, y, 'coin');

        this.tweens.add({
            targets: coin,
            y: y - 50,
            alpha: 0,
            duration: 500,
            ease: 'Cubic.easeOut',
            onComplete: () => {
                coin.destroy();
            }
        });

        this.player.collectCoin();
    }

    spawnMushroom(x, y) {
        const mushroom = this.powerUpGroup.create(x, y - 32, 'mushroom');
        mushroom.setOrigin(0.5);
        mushroom.setVelocityX(100);
        mushroom.setBounce(0);
        mushroom.powerType = 'mushroom';

        this.physics.add.collider(mushroom, this.groundGroup);
        this.physics.add.collider(mushroom, this.brickGroup);
        this.physics.add.collider(mushroom, this.pipeGroup);
    }

    collectCoin(player, coin) {
        coin.destroy();
        player.collectCoin();
    }

    collectPowerUp(player, powerUp) {
        powerUp.destroy();
        if (powerUp.powerType === 'mushroom') {
            player.collectMushroom();
        }
    }

    playerHitEnemy(player, enemy) {
        if (!enemy.isDead) {
            if (player.body.touching.down && enemy.body.touching.up) {
                // Stomp enemy
                const points = enemy.stomped();
                player.addScore(points);
                player.setVelocityY(-200); // Bounce
            } else {
                // Take damage
                player.takeDamage();
            }
        }
    }

    enemyHitWall(enemy, wall) {
        if (enemy.turnAround) {
            enemy.turnAround();
        }
    }

    enemyHitEnemy(enemy1, enemy2) {
        if (enemy1.turnAround) {
            enemy1.turnAround();
        }
        if (enemy2.turnAround) {
            enemy2.turnAround();
        }
    }

    enterHouse(player, house) {
        // Prevent multiple triggers
        if (this.isEnteringHouse) {
            return;
        }
        this.isEnteringHouse = true;

        this.timerEvent.remove();

        // Stop player movement
        player.setVelocity(0, 0);
        this.physics.world.disable(player);

        // Move player into house
        this.tweens.add({
            targets: player,
            x: house.x + 32,
            alpha: 0,
            duration: 500,
            ease: 'Linear',
            onComplete: () => {
                this.transitionToLevel2();
            }
        });
    }

    transitionToLevel2() {
        // Calculate time bonus
        const bonus = this.timeLeft * 50;
        this.player.addScore(bonus);

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const transitionText = this.add.text(
            this.cameras.main.scrollX + width / 2,
            this.cameras.main.scrollY + height / 2,
            'ENTERING LEVEL 2...\n\nTime Bonus: ' + bonus,
            {
                fontSize: '32px',
                fontFamily: 'Arial',
                fill: '#ffffff',
                align: 'center',
                stroke: '#000000',
                strokeThickness: 6
            }
        );
        transitionText.setOrigin(0.5);

        // Store player data for next level
        this.registry.set('playerScore', this.player.score);
        this.registry.set('playerLives', this.player.lives);
        this.registry.set('playerCoins', this.player.coins);
        this.registry.set('playerIsPoweredUp', this.player.isPoweredUp);

        this.time.delayedCall(2000, () => {
            this.scene.start('Level2Scene');
        });
    }

    createBreakEffect(x, y) {
        for (let i = 0; i < 4; i++) {
            const piece = this.add.rectangle(x, y, 8, 8, 0xd2691e);
            this.physics.add.existing(piece);
            piece.body.setVelocity(
                Phaser.Math.Between(-100, 100),
                Phaser.Math.Between(-200, -100)
            );
            piece.body.setGravityY(500);

            this.time.delayedCall(1000, () => {
                piece.destroy();
            });
        }
    }

    updateTimer() {
        this.timeLeft--;
        this.registry.set('timeLeft', this.timeLeft);

        if (this.timeLeft <= 0) {
            this.player.die();
        }
    }

    update() {
        if (this.player) {
            this.player.update();

            // Check if player fell into a pit
            if (this.player.y > this.levelConfig.height) {
                if (this.debugPitDeath) {
                    console.log(`[PIT DEATH] Player fell into pit at y=${this.player.y} (threshold=${this.levelConfig.height})`);
                }
                this.player.die();
            }

            // Debug logging for tracking player position near pit threshold
            if (this.debugPitDeath && this.player.y > this.levelConfig.height - 100) {
                console.log(`[PIT DEBUG] Player Y: ${this.player.y}, Velocity Y: ${this.player.body.velocity.y}, Threshold: ${this.levelConfig.height}`);
            }
        }

        this.enemyGroup.getChildren().forEach(enemy => {
            if (enemy.update) {
                enemy.update();
            }
        });

        // Update moving platforms
        this.movingPlatforms.forEach(platform => {
            if (platform.update) {
                platform.update();
            }
        });
    }
}
