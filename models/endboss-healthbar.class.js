/**
 * Represents the health bar for the end boss in the game.
 * The bar visually represents the percentage of health remaining for the end boss.
 * @extends DrawableObject
 */
class EndbossBar extends DrawableObject {
  percentage = 0;
  renderer;

  IMAGES = [
    "img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
  ];

  /**
   * Creates a new EndbossBar instance and initializes its position and health percentage.
   * @param {Object} renderer - The game world to which this health bar belongs.
   */
  constructor(renderer) {
    super();
    this.renderer = renderer;
    this.loadImages(this.IMAGES);
    this.x = 850;
    this.y = 10;
    this.height = 60;
    this.width = 200;
    this.setPercentage(200);
  }

  /**
   * Sets the health percentage and updates the image based on the percentage.
   * @param {number} percentage - The health percentage (from 0 to 100) to set for the end boss.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the image index based on the current health percentage.
   * @returns {number} The index of the image corresponding to the current health percentage.
   */
  resolveImageIndex() {
    if (this.percentage > 160) {
      return 5;
    } else if (this.percentage > 120) {
      return 4;
    } else if (this.percentage > 80) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 0) {
      return 1;
    } else {
      return 0;
    }
  }

  /**
   * Draws the health bar image on the canvas with the appropriate flipped orientation.
   * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
   */
  draw(ctx) {
    this.renderer.flipImage(this);
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    this.renderer.flipImageBack(this);
  }
}
