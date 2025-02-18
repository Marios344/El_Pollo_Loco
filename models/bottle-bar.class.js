/**
 * Represents a bottle bar status indicator in the game.
 * The bar displays the player's current bottle percentage and updates the image based on the percentage.
 * It inherits from the `DrawableObject` class.
 */
class BottleBar extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
  ];

  percentage = 0;

  /**
   * Creates an instance of the BottleBar class and initializes the position, size, and images.
   * Sets the initial percentage to 0.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 10;
    this.y = 95;
    this.height = 60;
    this.width = 200;
    this.setPercentage(0);
  }

  /**
   * Sets the bottle percentage and updates the corresponding image.
   *
   * @param {number} percentage - The new bottle percentage (0 to 100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the appropriate image index based on the current percentage.
   *
   * @returns {number} The index of the image corresponding to the current bottle percentage.
   */
  resolveImageIndex() {
    if (this.percentage > 80) {
      return 0;
    } else if (this.percentage > 60) {
      return 1;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 3;
    } else if (this.percentage > 0) {
      return 4;
    } else {
      return 5;
    }
  }
}
