/**
 * Represents the sky background in the game.
 * This object is a movable background element that is used to simulate the sky in the game world.
 * @extends MovableObject
 */
class Sky extends MovableObject {
  x = 0;
  y = 0;
  width = 1080;
  height = 680;

  /**
   * Creates a new Sky instance and loads the sky image.
   */
  constructor() {
    super().loadImage("img/5_background/layers/air.png");
  }
}
