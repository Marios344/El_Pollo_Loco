/**
 * Represents a coin object that can be collected by the character in the game.
 * @extends MovableObject
 */
class Coins extends MovableObject {
  height = 150;
  width = 150;
  y;

  IMAGES_COIN = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  /**
   * Creates a new coin object at a specified x-coordinate.
   * The y-coordinate is assigned a random value within a specific range.
   * @param {number} x The x-coordinate of the coin object.
   */
  constructor(x) {
    super();
    this.x = x;
    this.loadImage("img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_COIN);
    this.y = 200 + Math.random() * 250;
    this.animate();
  }

  /**
   * Starts an animation for the coin by alternating between coin images.
   * This method sets a stopable interval to play the coin animation every 1000 milliseconds.
   */
  animate() {
    this.setStopableInterval(() => this.playAnimation(this.IMAGES_COIN), 1000);
  }
}
