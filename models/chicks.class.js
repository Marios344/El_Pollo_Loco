/**
 * Represents a small chicken enemy in the game that moves left and can be defeated.
 * @extends MovableObject
 */
class Chicks extends MovableObject {
  height = 90;
  width = 85;
  energy;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];
  
  screamPlayed = false;

  /**
   * Creates a new Chick instance, sets its position, speed, energy, and starts the chick animation.
   * @param {number} x - The initial horizontal position of the chick.
   */
  constructor(x, soundManager) {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);

    this.y = 500;
    this.x = x;
    this.speed = 0.25 + Math.random() * 0.7;
    this.energy = 100;
    this.soundManager = soundManager;

    this.animate();
  }

  /**
   * Starts the chick's movement animation and handles the death animation with sound.
   * The chick moves left and switches between walking and dead animations.
   */
  animate() {
    this.setStopableInterval(() => this.moveLeft(), 1000 / 60);
    this.setStopableInterval(
      () => this.playAnimation(this.IMAGES_WALKING),
      200
    );
    this.setStopableInterval(() => {
      if (this.isDead() && !this.screamPlayed) {
        this.playAnimation(this.IMAGES_DEAD);
        this.soundManager.chickScreams.play();
        this.screamPlayed = true;
      }
    }, 200);
  }
}
