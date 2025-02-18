/**
 * Represents a health bar in the game.
 * Inherits from `DrawableObject` and updates its image based on the current percentage.
 */
class StatusBar extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  percentage = 100;

  /**
   * Creates an instance of the StatusBar class and initializes its properties.
   * Loads the images for the status bar and sets its initial position and size.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 10;
    this.y = 0;
    this.height = 60;
    this.width = 200;
    this.setPercentage(100);
  }

  /**
   * Updates the status bar's percentage and adjusts the image accordingly.
   *
   * @param {number} percentage - The new percentage value (0-100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the correct image index based on the current percentage.
   * This determines which image in the IMAGES array should be displayed.
   *
   * @returns {number} The index of the appropriate image for the current percentage.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
