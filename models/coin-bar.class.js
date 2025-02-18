/**
 * Represents a coin status bar, used to display the progress of coins collected in the game.
 * @extends DrawableObject
 */
class CoinBar extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];

  percentage = 0;

  /**
   * Creates a new CoinBar instance.
   * The CoinBar is initialized with images, position, and size.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 10;
    this.y = 45;
    this.height = 60;
    this.width = 200;
    this.setPercentage(0);
  }

  /**
   * Sets the percentage of the coin bar and updates the displayed image based on the percentage.
   * @param {number} percentage The percentage to set (0 - 100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the image index based on the current percentage of the coin bar.
   * The higher the percentage, the more filled the bar will be.
   * @returns {number} The index of the image corresponding to the current percentage.
   */
  resolveImageIndex() {
    if (this.percentage > 80) {
      return 5;
    } else if (this.percentage > 60) {
      return 4;
    } else if (this.percentage > 40) {
      return 3;
    } else if (this.percentage > 20) {
      return 2;
    } else if (this.percentage > 0) {
      return 1;
    } else {
      return 0;
    }
  }
}
