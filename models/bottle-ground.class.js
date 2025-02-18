/**
 * Represents a bottle on the ground that can animate between two images.
 * Inherits from the `MovableObject` class.
 */
class BottleGround extends MovableObject {
  y = 500;
  height = 100;
  width = 80;

  IMAGES_BOTTLE = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  /**
   * Creates an instance of the BottleGround class and initializes its position and animation.
   *
   * @param {number} x - The x-coordinate of the bottle on the ground.
   */
  constructor(x) {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.x = x;
    this.loadImages(this.IMAGES_BOTTLE);
    this.animate();
  }

  /**
   * Starts the animation for the bottle, alternating between two images.
   * The animation is set to run every second.
   */
  animate() {
    this.setStopableInterval(
      () => this.playAnimation(this.IMAGES_BOTTLE),
      1000
    );
  }
}
