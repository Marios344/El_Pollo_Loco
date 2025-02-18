/**
 * Represents the end screen in the game.
 * Inherits from the DrawableObject class to handle the image rendering.
 */
class Endscreen extends DrawableObject {
  x = 0;
  y = 0;
  height = 680;
  width = 1080;

  VICTORY_IMAGE = "img/9_intro_outro_screens/win/win_2.png";

  DEFEAT_IMAGE = "img/9_intro_outro_screens/game_over/game over.png";

  /**
   * Creates an instance of the Win class.
   * @param {boolean} isVictory - Determines whether to show the win or defeat screen.
   */
  constructor(isVictory) {
    super();
    this.loadImage(isVictory ? this.VICTORY_IMAGE : this.DEFEAT_IMAGE);
  }
}
