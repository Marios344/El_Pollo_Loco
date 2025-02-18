/**
 * Represents an object that can be drawn on the canvas.
 * @abstract
 */
class DrawableObject {
  img;
  imageCache = [];
  currentImage = 0;
  x = 120;
  y = 355;
  height = 250;
  width = 100;

  /**
   * Loads an image from the given path and assigns it to the `img` property.
   * @param {string} path The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the image on the canvas at the object's current position.
   * @param {CanvasRenderingContext2D} ctx The rendering context of the canvas.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Loads an array of images and stores them in the `imageCache` by their source paths.
   * @param {string[]} arr An array of image paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws a blue frame around the object for debugging purposes.
   * This method is only called for objects that are instances of `Chicks`, `Character`, or `Chicken`.
   * @param {CanvasRenderingContext2D} ctx The rendering context of the canvas.
   */
  drawFrame(ctx) {
    if (this instanceof Chicks || this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }
}
