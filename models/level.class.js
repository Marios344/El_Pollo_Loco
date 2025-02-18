/**
 * Represents a level in the game, containing enemies, clouds, background objects, and other elements.
 */ class Level {
  enemies;
  clouds;
  backgroundObject;
  bottleGround;
  level_end_x = 3320;
  coins;

  /**
   * Creates an instance of the Level class.
   * @param {Array} enemies - The array of enemies in the level.
   * @param {Array} clouds - The array of cloud objects in the level.
   * @param {Array} backgroundObject - The background objects in the level.
   * @param {Array} bottleGround - The ground objects for bottles in the level.
   * @param {Array} coins - The array of coins in the level.
   */
  constructor(enemies, clouds, backgroundObject, bottleGround, coins) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObject = backgroundObject;
    this.bottleGround = bottleGround;
    this.coins = coins;
  }
}
