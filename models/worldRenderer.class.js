/**
 * Class for rendering the content of the world.
 */
class WorldRenderer {
  constructor(world) {
    this.world = world;
    this.ctx = world.ctx;
  }

  /**
   * Draws the game world on the canvas.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.world.canvas.width, this.world.canvas.height);
    this.ctx.translate(this.world.camera_x, 0);
    this.drawBackgroundObjects();
    this.drawMovingObjects();
    this.ctx.translate(-this.world.camera_x, 0);
    this.drawStatusBars();
    this.drawEndscreen();

    requestAnimationFrame(() => this.draw());
  }

  /**
   * Draws background objects (clouds, bottles, coins, etc.).
   */
  drawBackgroundObjects() {
    this.addObjectsToMap(this.world.level.backgroundObject);
    this.addObjectsToMap(this.world.level.clouds);
    this.addObjectsToMap(this.world.level.bottleGround);
    this.addObjectsToMap(this.world.level.coins);
  }

  /**
   * Draws all the moving objects (character, enemies, throwable objects, etc.).
   */
  drawMovingObjects() {
    this.addToMap(this.world.character);
    this.addObjectsToMap(this.world.level.enemies);
    this.addObjectsToMap(this.world.throwableObjects);
  }

  /**
   * Draws all the status bars on the screen.
   */
  drawStatusBars() {
    this.addToMap(this.world.statusBar);
    this.addToMap(this.world.coinBar);
    this.addToMap(this.world.bottleBar);
    if (this.world.isEndbossAwake()) {
      this.addToMap(this.world.endBossBar);
    }
  }

  /**
   * Draws the end screen based on the game state (win/lose).
   */
  drawEndscreen() {
    let boss = this.world.level.enemies.find(
      (enemy) => enemy instanceof Endboss
    );
    if (this.world.character.isDead() && boss && !boss.isDead()) {
      this.lostScreen();
    } else if (!this.world.character.isDead() && boss && boss.isDead()) {
      this.victoryScreen();
    }
  }

  /**
   * Displays the lost screen and stops the game after a delay.
   */
  lostScreen() {
    this.addToMap(this.world.lost);
    this.drawScore();
    setTimeout(() => {
      this.world.stopGame();
    }, 500);
  }

  /**
   * Displays the victory screen and stops the game after a delay.
   */
  victoryScreen() {
    this.addToMap(this.world.win);
    this.drawScore();
    setTimeout(() => {
      this.world.stopGame();
    }, 1000);
  }

/**
 * Draws outlined text with a black border.
 */
drawOutlinedText(text, x, y) {
  this.ctx.font = "30px Arial";
  this.ctx.lineWidth = 4; 
  this.ctx.strokeStyle = "Black"; 
  this.ctx.fillStyle = "Gold"; 
  this.ctx.strokeText(text, x, y); 
  this.ctx.fillText(text, x, y); 
}

/**
* Draws the current score on the screen.
*/
drawScore() {
  let bottleAmmount = this.world.bottleAmmount.length;

  this.drawOutlinedText("Your Score: " + this.world.totalPoints + " Points", 420, 560);
  
  if (this.world.characterPassedBoss) {
      this.drawOutlinedText("El Pollo Loco Escaped!!!", 420, 600);
  } else {
      this.drawOutlinedText(`You have ${bottleAmmount} bottles left!`, 420, 600);
  }
}

  /**
   * Adds an object to the map and flips it if needed.
   * @param {Object} mo - The object to draw.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    // mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Adds an array of objects to the map.
   * @param {Array<Object>} object - The array of objects to add to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((obj) => this.addToMap(obj));
  }

  /**
   * Flips an image horizontally.
   * @param {Object} mo - The object to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x *= -1;
  }

  /**
   * Flips the image back to the original orientation.
   * @param {Object} mo - The object to flip back.
   */
  flipImageBack(mo) {
    mo.x *= -1;
    this.ctx.restore();
  }
}
