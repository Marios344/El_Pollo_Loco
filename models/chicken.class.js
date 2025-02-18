/**
 * Represents a chicken enemy in the game.
 * @extends MovableObject
 */
class Chicken extends MovableObject {
  height = 120;
  width = 90;
  energy;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  screamPlayed = false;

  /**
   * Creates an instance of a Chicken enemy.
   * @param {number} x The starting x-coordinate of the chicken.
   */
  constructor(x, soundManager) {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);

    this.y = 475;
    this.x = x;
    this.speed = 0.3 + Math.random() * 0.6;
    this.energy = 100;
    this.soundManager = soundManager;

    this.animate();
  }

  /**
   * Animates the chicken's movements and handles actions like walking and death.
   * @returns {void}
   */
  animate() {
    this.setStopableInterval(() => this.moveLeft(), 1000 / 60);
    this.setStopableInterval(
      () => this.playAnimation(this.IMAGES_WALKING),
      200
    );
    this.setStopableInterval(() => {
      if (this.isDead() && !this.screamPlayed) {
        this.soundManager.chickenScreams.play();
        this.screamPlayed = true;
        this.playAnimation(this.IMAGES_DEAD);
      }
    }, 200);
  }
}
