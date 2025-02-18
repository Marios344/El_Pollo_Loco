/**
 * Represents the Endboss character in the game.
 * The Endboss is a large boss enemy with various animations for different states such as alert, walking, attacking, hurt, and death.
 * The Endboss has energy, can attack, and reacts to being hurt or defeated.
 * @extends MovableObject
 */
class Endboss extends MovableObject {
  width = 360;
  height = 470;
  speed = 3;
  energy = 200;
  awake;
  attack;
  wakingSoundPlayed = false;
  defeatedSoundPlayed = false;
  hurtBossSoundPlayed = false;
  soundManager;

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_WALK = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Creates a new Endboss instance and initializes its properties and animations.
   */
  constructor(soundManager) {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_ATTACK);
    this.x = 3500;
    this.y = 140;
    this.awake = false;
    this.attack = false;
    this.animate();
    this.soundManager = soundManager;
  }

  /**
   * Starts the animations for the Endboss.
   * - Checks if the boss is dead or hurt.
   * - Controls the Endboss's movements.
   */
  animate() {
    this.setStopableInterval(() => this.checkIfBossDeadOrHurt(), 200);
    this.setStopableInterval(() => this.bossMovements(), 150);
  }

  /**
   * Checks if the Endboss is dead or hurt, and updates its state accordingly.
   */
  checkIfBossDeadOrHurt() {
    if (this.isDead()) {
      this.killingBossSound();
      this.playAnimation(this.IMAGES_DEAD);
      this.soundManager.victoryScreenSound();
    } else if (this.bossIsHurt() && !this.isDead()) {
      this.bossIsHurtSound();
      this.playAnimation(this.IMAGES_HURT);
    }
  }

  /**
   * Controls the Endboss's movements and state transitions (e.g., attack, alert, awake).
   */
  bossMovements() {
    if (!this.isDead() && !this.bossIsHurt()) {
      if (this.attack) {
        this.playAnimation(this.IMAGES_ATTACK);
        this.moveLeft();
      } else if (this.awake) {
        this.wakeUpBossAndScream();
      } else {
        this.playAnimation(this.IMAGES_ALERT);
      }
    }
  }

  /**
   * Plays the sound when the Endboss is defeated.
   */
  killingBossSound() {
    if (!this.defeatedSoundPlayed) {
      this.hurtBossSoundPlayed = true;
      this.soundManager.defeatedSound.play();
      this.defeatedSoundPlayed = false;
    }
  }

  /**
   * Plays the sound when the Endboss is hurt.
   */
  bossIsHurtSound() {
    if (!this.hurtBossSoundPlayed) {
      this.soundManager.hurtBossSound.play();
    }
  }

  /**
   * Handles the behavior when the Endboss wakes up and starts moving.
   */
  wakeUpBossAndScream() {
    if (!this.wakingSoundPlayed) {
      this.wakeUpSound();
    }
    this.playAnimation(this.IMAGES_WALK);
    this.moveLeft();
  }

  /**
   * Plays the sound when the Endboss wakes up.
   */
  wakeUpSound() {
    this.soundManager.wakingSound.play();
    this.wakingSoundPlayed = true;
  }

  /**
   * Awakens the Endboss and starts its waking behavior.
   */
  wakeBoss() {
    this.awake = true;
  }

  /**
   * Marks the Endboss as ready to attack.
   */
  bossReadyToAttack() {
    this.attack = true;
  }

  /**
   * Stops the Endboss's attack.
   */
  bossStopAttack() {
    this.attack = false;
  }
}
