class World {
  character;
  level = level1;
  ctx;
  canvas;
  keyboard;
  soundManager;
  camera_x = 0;
  statusBar = new StatusBar();
  coinBar = new CoinBar();
  bottleBar = new BottleBar();
  endBossBar;
  throwableObjects = [];
  bottleAmmount = [];
  bottlesUsed = 0;
  coinAmmount = [];
  coinsUsed = 0;
  totalPoints = 0;
  lost = new Endscreen(false);
  win = new Endscreen(true);
  worldIntervalIds = [];
  characterPassedBoss = false;

  /**
   * Creates an instance of the World class.
   * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
   * @param {Keyboard} keyboard - The keyboard object to handle player input.
   */
  constructor(canvas, keyboard, soundManager) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.soundManager = soundManager;
    this.enemies = [];
    this.renderer = new WorldRenderer(this);
    this.endBossBar = new EndbossBar(this.renderer);
    this.character = new Character(soundManager);
    this.renderer.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Sets the world reference for the character and enemies.
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.world = this;
      }
    });
  }

  /**
   * Starts the game loops (collisions, bottle collection, coins, etc.).
   */
  run() {
    this.setWorldStopableInterval(() => this.checkCollisions(), 100);
    this.setWorldStopableInterval(() => this.bottlesCollected(), 100);
    this.setWorldStopableInterval(() => this.coinsCollected(), 100);
    this.setWorldStopableInterval(() => this.checkThrowableObjects(), 100);
    this.setWorldStopableInterval(() => this.checkIfBossHit(), 100);
    this.setWorldStopableInterval(() => this.checkBossProximity(), 100);
    this.setWorldStopableInterval(() => this.useCoins(), 100);
    this.setWorldStopableInterval(
      () => this.checkCharactersLoseConditions(),
      100
    );
  }

  /**
   * Checks for collisions between the character and enemies.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.isDroppingOnEnemy(enemy)) {
        this.handleEnemyDrop(enemy, index);
      } else if (
        this.character.isColliding(enemy) &&
        !enemy.isDead() &&
        this.character.isFalling()
      ) {
        this.handleCharacterHit();
      } else if (
        this.character.isColliding(enemy) &&
        !enemy.isDead() &&
        enemy instanceof Endboss
      ) {
        this.handleCharacterHit();
      }
    });
  }

  /**
   * Checks if a throwable object hits the boss.
   */
  checkIfBossHit() {
    this.throwableObjects.forEach((bottle, index) => {
      this.level.enemies.forEach((enemy) => {
        if (enemy instanceof Endboss && bottle.isColliding(enemy)) {
          this.soundManager.crashBottleSound.play();
          bottle.shootBoss(enemy);
          enemy.bossIsHurt();
          this.removeUsedBottle(index);
          this.endBossBar.setPercentage(enemy.energy);
          this.totalPoints += 250;
        }
      });
    });
  }

  /**
   * Removes a used bottle from the throwable objects array.
   * @param {number} index - The index of the bottle to remove.
   */
  removeUsedBottle(index) {
    setTimeout(() => {
      this.throwableObjects.splice(index, 1);
    }, 200);
  }

  /**
   * Checks the proximity of the boss to the character and adjusts its behavior.
   */
  checkBossProximity() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        const distance = Math.abs(this.character.x - enemy.x);
        if (distance < 300) {
          enemy.bossReadyToAttack();
          enemy.speed = 15;
        } else {
          enemy.bossStopAttack();
          enemy.speed = 3;
        }
      }
    });
  }

  /**
   * Checks if the character collects a bottle.
   */
  bottlesCollected() {
    this.level.bottleGround.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.soundManager.colected.play();
        this.bottleAmmount.push(bottle);
        this.level.bottleGround.splice(index, 1);
        this.updateBar(this.bottleBar, this.bottleAmmount, 5);
        this.totalPoints += 50;
      }
    });
  }

  /**
   * Checks if the character collects a coin.
   */
  coinsCollected() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isCollected(coin)) {
        this.soundManager.coinSound.play();
        this.coinAmmount.push(coin);
        this.level.coins.splice(index, 1);
        this.updateBar(this.coinBar, this.coinAmmount, 5);
        this.totalPoints += 50;
      }
    });
  }

  /**
   * Uses coins to collect bottles.
   * @param {ThrowableObject} bottle - The bottle to add to the inventory.
   * @param {number} index - The index of the coin to remove from the inventory.
   */
  useCoins(bottle, index) {
    if (this.keyboard.DOWN && this.bottleAmmount.length < 5 && this.coinAmmount.length >= 1) {
      this.soundManager.useCoinSound.play();
      this.bottleAmmount.push(bottle);
      this.coinAmmount.splice(index, 1);
      this.updateBar(this.bottleBar, this.bottleAmmount, 5);
      this.updateBar(this.coinBar, this.coinAmmount, 5);
      this.totalPoints += 25;
      this.coinsUsed += 1;
    }
  }

  /**
   * Checks if the character loses under certain conditions.
   * Calls functions to check if the boss has escaped or if the character is out of bottles.
   */
  checkCharactersLoseConditions() {
    this.bossEscapedCondition();
    this.characterIsOutOfBottles();
  }

  /**
   * Checks if the character has passed the Endboss.
   * If the character moves too far beyond the boss, they automatically lose.
   */
  bossEscapedCondition() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        if (this.character.x > enemy.x + 300) {
          this.characterPassedBoss = true;
          this.character.energy = 0;
        }
      }
    });
  }

  /**
   * Checks if the character runs out of bottles and coins while fighting the Endboss.
   * If all bottles and coins are used up and the boss still has more than 20 energy, the character loses.
   */
  characterIsOutOfBottles() {
    this.level.enemies.forEach((enemy) => {
      if ( enemy instanceof Endboss && !enemy.isDead() && this.coinsUsed === 5 && this.bottlesUsed === 10) {
        if (this.bottleAmmount.length === 0 && this.coinAmmount.length === 0) {
          if (enemy.energy > 20 ){
            this.character.energy = 0;
          }
        }
      }
    });
  }

  /**
   * Checks if the endboss is awake.
   * @returns {boolean} - True if the endboss is awake, false otherwise.
   */
  isEndbossAwake() {
    return this.level.enemies.some(
      (enemy) => enemy instanceof Endboss && enemy.awake
    );
  }

  /**
   * Updates the progress bar to reflect the current percentage of collected items.
   *
   * @param {Object} bar - The progress bar object, expected to have a `setPercentage` method.
   * @param {Array} items - The array of collected items.
   * @param {number} maxItems - The total number of items required to reach 100%.
   */
  updateBar(bar, items, maxItems) {
    let percentage = (items.length / maxItems) * 100;
    bar.setPercentage(Math.min(percentage, 100));
  }

  /**
   * Checks if the character is dropping onto an enemy.
   * @param {Enemy} enemy - The enemy to check for collision.
   * @returns {boolean} - True if the character is dropping on the enemy, false otherwise.
   */
  isDroppingOnEnemy(enemy) {
    return this.character.isDroppingOnTop(enemy) && this.character.isFalling();
  }

  /**
   * Handles the event when the character drops on an enemy.
   * @param {Enemy} enemy - The enemy being dropped on.
   * @param {number} index - The index of the enemy in the array.
   */
  handleEnemyDrop(enemy, index) {
    if (enemy instanceof Chicken || enemy instanceof Chicks) {
      this.character.killEnemy(enemy);
      this.character.jump();
      this.character.lastMoveTime = Date.now();
      this.totalPoints += 100;
      if (enemy.energy == 0) {
        this.removeDeadEnemy(index);
      }
    }
  }

  /**
   * Handles the event when the character is hit by an enemy.
   */
  handleCharacterHit() {
    this.character.hit();
    this.statusBar.setPercentage(this.character.energy);
    this.totalPoints -= 15;
  }

  /**
   * Removes a dead enemy from the level.
   * @param {number} index - The index of the enemy to remove.
   */
  removeDeadEnemy(index) {
    setTimeout(() => {
      this.level.enemies.splice(index, 1);
    }, 200);
  }

  /**
   * Checks if the character is trying to throw a bottle.
   */
  checkThrowableObjects() {
    if (this.keyboard.SPACE && this.bottleAmmount.length > 0) {
      if (!this.character.otherDirection) {
        let bottle = new ThrowableObject(
          this.character.x + 100,
          this.character.y + 10
        );
        this.soundManager.throwBottleSound.play();
        this.throwableObjects.push(bottle);
        this.bottleAmmount.pop();
        this.updateBar(this.bottleBar, this.bottleAmmount, 5);
        this.character.lastMoveTime = Date.now();
        this.bottlesUsed += 1;
      }
    }
  }

  /**
   * Stops all running game intervals.
   */
  stopGame() {
    this.worldIntervalIds.forEach(clearInterval);
    this.worldIntervalIds = [];
    this.character.clearAllIntervals();
    this.levelStopableInterval();

    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.clearAllIntervals();
      }
    });
  }

  /**
   * Sets an interval that can be stopped later.
   */
  levelStopableInterval() {
    this.level.enemies.forEach((enemy) => {
      enemy.clearAllIntervals();
    });

    this.level.bottleGround.forEach((bottle) => {
      bottle.clearAllIntervals();
    });

    this.level.coins.forEach((coin) => {
      coin.clearAllIntervals();
    });

    this.level.clouds.forEach((cloud) => {
      cloud.clearAllIntervals();
    });
  }

  /**
   * Sets an interval that can be stopped later.
   * @param {Function} fn - The function to run on the interval.
   * @param {number} time - The time in milliseconds between each interval.
   */
  setWorldStopableInterval(fn, time) {
    let id = setInterval(fn, time);
    this.worldIntervalIds.push(id);
  }
}
