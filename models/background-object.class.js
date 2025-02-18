/**
 * Represents a background object in the game, extending the MovableObject class.
 * The object is loaded from an image and positioned at a given horizontal position (x).
 * It has a fixed height and a width of 1080.
 */
class BackgroundObject extends MovableObject {
  width = 1080;
  height = 680;

  /**
   * Creates an instance of BackgroundObject, loads its image, and sets its position.
   *
   * @param {string} imagePath - The path to the image to be loaded for the background object.
   * @param {number} x - The horizontal position of the background object on the canvas.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 680 - this.height;
  }
}
