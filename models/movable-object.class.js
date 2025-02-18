/**
 * Represents a movable object in the game.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 1.8;
  energy = 100;
  lastHit = 0;
  lastHitOnBoss = 0;
  hasHit = false;
  lastMoveTime = Date.now();
  intervalIds = [];

  constructor() {  
    super();
    this.intervalIds = [];
  }  

  /**
   * Applies gravity to the object.
   * The object falls under gravity unless it is above the ground.
   * The speed of falling is affected by acceleration.
   * @returns {void}
   */
  applyGravity() {
    const groundLevel = 215;
    this.setStopableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;

        if (this instanceof Character) {
          if (this.y > groundLevel) {
            this.y = groundLevel;
            this.speedY = 0;
          }
        }
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above the ground.
   * @returns {boolean} True if the object is above ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 215;
    }
  }

  /**
   * Checks if the object is falling.
   * @returns {boolean} True if the object is falling, false otherwise.
   */
  isFalling() {
    if (this.speedY < 0 || !this.isAboveGround()) {
      return true;
    }
  }

  /**
   * Reduces the object's energy by 5 points and updates the last hit time.
   * @returns {void}
   */
  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Kills an enemy (e.g., Chicken or Chicks) by reducing its energy to zero.
   * @param {Enemy} enemy - The enemy object to be killed.
   * @returns {void}
   */
  killEnemy(enemy) {
    if (enemy instanceof Chicken || enemy instanceof Chicks) {
      enemy.energy -= 100;
      if (enemy.energy <= 0) {
        enemy.energy == 0;
        enemy.speed == 0;
      }
    }
  }

  /**
   * Shoots at the boss and reduces its energy.
   * Marks the bottle as having hit the boss.
   * @param {Endboss} enemy - The boss enemy object.
   * @returns {void}
   */
  shootBoss(enemy) {
    if (!this.hasHit && enemy instanceof Endboss) {
      enemy.energy -= 20;
      this.hasHit = true;

      if (enemy.energy <= 0) {
        enemy.energy = 0;
        enemy.speed = 0;
      } else {
        enemy.lastHitOnBoss = new Date().getTime();
      }
    }
  }

  /**
   * Checks if the object is dead (energy is zero).
   * @returns {boolean} True if the object is dead, false otherwise.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Checks if the object is hurt (was recently hit).
   * @returns {boolean} True if the object is hurt, false otherwise.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Checks if the boss is hurt.
   * @returns {boolean} True if the boss is hurt, false otherwise.
   */
  bossIsHurt() {
    let timepassed = new Date().getTime() - this.lastHitOnBoss;
    timepassed = timepassed / 1000;
    return timepassed < 0.8;
  }

  /**
   * Checks if the object is colliding with another object.
   * @param {MovableObject} mo - The object to check collision with.
   * @returns {boolean} True if the objects are colliding, false otherwise.
   */
  isColliding(mo) {
    if (this.hasHit) return false;

    const bufferWidth = 65;
    const bufferHight = 10;

    return (
      this.x + this.width - bufferWidth > mo.x &&
      this.y + this.height - bufferHight > mo.y &&
      this.x + bufferWidth < mo.x + mo.width &&
      this.y + bufferHight < mo.y + mo.height
    );
  }

  /**
   * Checks if the object is dropping on top of another object.
   * @param {MovableObject} mo - The object to check for collision with.
   * @returns {boolean} True if the object is dropping on top, false otherwise.
   */
  isDroppingOnTop(mo) {
    const bufferWidth = 45;

    return (
      this.x + this.width - bufferWidth > mo.x &&
      this.x + bufferWidth < mo.x + mo.width &&
      this.y + this.height >= mo.y &&
      this.y + this.height <= mo.y + mo.height
    );
  }

  /**
   * Checks if the object has been collected by another object.
   * @param {MovableObject} mo - The object to check for collection.
   * @returns {boolean} True if the object has been collected, false otherwise.
   */
  isCollected(mo) {
    const bufferWidth = 80;
    const bufferHeight = 50;

    return (
      this.x + this.width - bufferWidth > mo.x &&
      this.y + this.height - bufferHeight > mo.y &&
      this.x + bufferWidth < mo.x + mo.width &&
      this.y + bufferHeight < mo.y + mo.height
    );
  }

  /**
   * Moves the object to the right.
   * @returns {void}
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left.
   * @returns {void}
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump by setting its vertical speed.
   * @returns {void}
   */
  jump() {
    this.speedY = 27;
  }

  /**
   * Plays an animation by cycling through a set of images.
   * @param {string[]} images - Array of image paths for the animation.
   * @returns {void}
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Sets a stoppable interval to run a function repeatedly.
   * @param {Function} fn - The function to run in the interval.
   * @param {number} time - The interval time in milliseconds.
   * @returns {void}
   */
  setStopableInterval(fn, time) {
    let id = setInterval(fn, time);
    this.intervalIds.push(id);
  }

  /**
   * Clears all intervals stored in the intervalIds array.
   * @returns {void}
   */
  clearAllIntervals() {
    this.intervalIds.forEach(clearInterval);
    this.intervalIds = []; // Reset the array after clearing
  }
}
