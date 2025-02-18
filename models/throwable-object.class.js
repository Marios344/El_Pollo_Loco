/**
 * Represents a throwable object (bottle) in the game.
 * Inherits from the MovableObject class to handle movement and physics.
 */
class ThrowableObject extends MovableObject {
  BOTTLE_ROTATION_IMAGE = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  BOTTLE_SPLASH_IMAGE = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Creates an instance of the ThrowableObject class.
   * Loads the initial bottle rotation image and its animation images.
   * Sets the position, dimensions, and starts the throwing process.
   *
   * @param {number} x - The initial x-coordinate of the bottle.
   * @param {number} y - The initial y-coordinate of the bottle.
   */
  constructor(x, y) {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.loadImages(this.BOTTLE_ROTATION_IMAGE);
    this.loadImages(this.BOTTLE_SPLASH_IMAGE);
    this.x = x;
    this.y = y;
    this.height = 90;
    this.width = 70;
    this.animate();
    this.throw(x, y);
  }

  /**
   * Starts the throwing process for the bottle by applying gravity
   * and updating its position at regular intervals.
   *
   * @param {number} x - The starting x-coordinate of the bottle.
   * @param {number} y - The starting y-coordinate of the bottle.
   */
  throw(x, y) {
    this.x = x;
    this.y = y;
    this.speedY = 20;
    this.applyGravity();
    this.setStopableInterval(() => {
      if (!this.hasHit) {
        this.x += 13;
      }
    }, 25);
  }

  /**
   * Animates the bottle by alternating between the rotation and splash animations.
   * It uses the `playAnimation` method to update the image.
   */
  animate() {
    this.setStopableInterval(() => {
      if (this.hasHit) {
        this.playAnimation(this.BOTTLE_SPLASH_IMAGE);
      } else {
        this.playAnimation(this.BOTTLE_ROTATION_IMAGE);
      }
    }, 50);
  }
}
