/**
 * Represents a cloud in the game that moves from right to left.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
  y = 10;
  height = 300;
  width = 700;

  /**
   * Creates a new Cloud instance, initializes its image and position, and starts the cloud animation.
   */
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");

    this.x = Math.random() * 3000;
    this.animate();
  }

  /**
   * Starts the cloud movement animation by moving the cloud from right to left.
   * The cloud is moved by updating its position at regular intervals.
   */
  animate() {
    this.setStopableInterval(() => this.moveLeft(), 1000 / 60);
  }
}
