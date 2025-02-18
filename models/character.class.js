/**
 * Represents the main character in the game, extending `MovableObject`.
 * The character can walk, jump, be hurt, and interact with enemies and the environment.
 * It also handles sound effects for movement, jumping, and other actions.
 */
class Character extends MovableObject {
  width = 200;
  height = 400;
  y = 215;
  x = 10;
  speed = 15;
  lastMoveTime;
  world;
  soundManager;

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_STAY = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_STAY_LONG = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  /**
   * Creates a new character instance and loads all relevant images for different actions (walking, jumping, etc.).
   * It also initializes the gravity effect and starts the character's animation loop.
   */
  constructor(soundManager) {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_STAY);
    this.loadImages(this.IMAGES_STAY_LONG);
    this.animate();
    this.applyGravity();
    this.lastMoveTime = Date.now();
    this.soundManager = soundManager;
  }

  /**
   * Initializes the animation loop for the character.
   * This includes handling movement, jump, death, hurt, idle, and boss approach animations.
   */
  animate() {
    this.setStopableInterval(() => this.movementAnimations(), 1000 / 60);
    this.setStopableInterval(() => this.charachterDeadOrAlive(), 150);
    this.setStopableInterval(() => this.charachterJumpAnimation(), 150);
    this.setStopableInterval(() => this.characterIdleOrBossAproach(), 120);
    this.setStopableInterval(() => this.approachingBoss(), 200);
  }

  /**
   * Handles the character's movement animations.
   * Controls the walking and jumping actions based on user input.
   */
  movementAnimations() {
    this.soundsPause();

    this.charachterMoveRight();
    this.charachterMoveLeft();
    this.charachterJump();

    this.world.camera_x = -this.x + 300;
  }

  /**
   * Moves the character to the right if the right arrow key is pressed and the character is not at the level's end.
   */
  charachterMoveRight() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.soundManager.snore_sound.pause();
      this.moveRight();
      this.otherDirection = false;
      this.soundManager.walking_sound.play();
    }
  }

  /**
   * Moves the character to the left if the left arrow key is pressed and the character is not at the beginning of the level.
   */
  charachterMoveLeft() {
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.soundManager.snore_sound.pause();
      this.moveLeft();
      this.otherDirection = true;
      this.soundManager.walking_sound.play();
    }
  }

  /**
   * Makes the character jump if the up arrow key is pressed and the character is not already in the air.
   */
  charachterJump() {
    if (this.world.keyboard.UP && !this.isAboveGround()) {
      this.soundManager.hurt_sound.pause();
      this.soundManager.snore_sound.pause();
      this.jump();
      this.lastMoveTime = Date.now();
      this.soundManager.jumping_sound.play();
    }
  }

  /**
   * Controls the character's animation when the character is dead or hurt.
   */
  charachterDeadOrAlive() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
      this.soundManager.snore_sound.pause();
      this.soundManager.endScreenLostSound();
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
      this.soundManager.hurt_sound.play();
    }
  }

  /**
   * Plays the jumping animation when the character is in the air and not dead or hurt.
   */
  charachterJumpAnimation() {
    if (this.isAboveGround() && !this.isDead() && !this.isHurt()) {
      this.playAnimation(this.IMAGES_JUMPING);
    }
  }

  /**
   * Controls the idle or boss approach animations based on the character's state.
   */
  characterIdleOrBossAproach() {
    if (!this.isDead() && !this.isHurt() && !this.isAboveGround()) {
      this.characterWalkOrStayAnimation();
    }
  }

  /**
   * Plays the walking or idle animation based on whether the character is moving or staying still.
   * If the character stays still for more than 5 seconds, it plays the long idle animation and triggers a snoring sound.
   */
  characterWalkOrStayAnimation() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
      this.lastMoveTime = Date.now();
    } else {
      const timeSinceLastMove = Date.now() - this.lastMoveTime;
      if (timeSinceLastMove > 5000) {
        this.playAnimation(this.IMAGES_STAY_LONG);
        this.soundManager.snore_sound.play();
      } else {
        this.playAnimation(this.IMAGES_STAY);
      }
    }
  }

  /**
   * Checks for nearby enemies and wakes up the boss if the character is close enough.
   */
  approachingBoss() {
    if (!this.isDead()) {
      this.world.level.enemies.forEach((enemy) => {
        if (enemy instanceof Endboss) {
          if (Math.abs(this.x - enemy.x) < 1000) {
            enemy.wakeBoss();
          }
        }
      });
    }
  }

  /**
   * Pauses the walking sound when the character stops moving.
   */
  soundsPause() {
    this.soundManager.walking_sound.pause();
  }
}
