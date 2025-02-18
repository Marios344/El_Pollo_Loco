class SoundManager {
  bgMusic = new Audio("audio/bgMusic.mp3");
  coinSound = new Audio("audio/coinSound.mp3");
  colected = new Audio("audio/pickup.mp3");
  throwBottleSound = new Audio("audio/bottle.mp3");
  crashBottleSound = new Audio("audio/glass.mp3");
  useCoinSound = new Audio("audio/useCoin.mp3");
  winSound = new Audio("audio/win.mp3");
  defeatSound = new Audio("audio/defeat.mp3");
  walking_sound = new Audio("audio/running.mp3");
  jumping_sound = new Audio("audio/jump.mp3");
  hurt_sound = new Audio("audio/characterHurt.mp3");
  snore_sound = new Audio("audio/snoring.mp3");
  defeatedSound = new Audio("audio/boss.mp3");
  wakingSound = new Audio("audio/bossAwake.mp3");
  hurtBossSound = new Audio("audio/bossHurt.mp3");
  chickenScreams = new Audio("audio/bigChicken.mp3");
  chickScreams = new Audio("./audio/chicken.mp3");
  endSound;
  isMuted = false;
  bgMusicTimer = 0;

  constructor() {
    this.endSound = false;
    this.bgMusic.loop = true;
  }

  bgMusicPlay() {
    if (!this.isMuted) {
      this.bgMusic.play();
    } else {
      this.bgMusic.pause();
    }
  }

  /**
   * Plays the victory screen sound if conditions are met.
   */
  victoryScreenSound() {
    if (!this.endSound && !this.isMuted) {
      this.stopAllSounds();
      this.winSound.play();
      this.endSound = true;
    }
  }

  /**
   * Plays the lost screen sound if conditions are met.
   */
  endScreenLostSound() {
    if (!this.endSound && !this.isMuted) {
      this.stopAllSounds();
      this.defeatSound.play();
      this.endSound = true;
    }
  }

  /**
   * Mutes or unmutes all sounds in the game, including background music.
   */
  toggleMute() {
    this.isMuted = !this.isMuted;

    const soundsToMute = [
      this.bgMusic,
      this.coinSound,
      this.colected,
      this.throwBottleSound,
      this.crashBottleSound,
      this.useCoinSound,
      this.winSound,
      this.defeatSound,
      this.walking_sound,
      this.jumping_sound,
      this.hurt_sound,
      this.snore_sound,
      this.defeatedSound,
      this.wakingSound,
      this.hurtBossSound,
      this.chickenScreams,
      this.chickScreams,
    ];

    soundsToMute.forEach((sound) => (sound.muted = this.isMuted));

    if (this.isMuted) {
      this.bgMusicTimer = this.bgMusic.currentTime;
      this.bgMusic.pause();
    } else {
      this.bgMusic.currentTime = this.bgMusicTimer || 0;
      this.bgMusic.play();
    }
  }

  /**
   * Stops all sounds and resets playback time.
   */
  stopAllSounds() {
    const allSounds = [
      this.bgMusic,
      this.coinSound,
      this.colected,
      this.throwBottleSound,
      this.crashBottleSound,
      this.useCoinSound,
      this.winSound,
      this.defeatSound,
      this.walking_sound,
      this.jumping_sound,
      this.hurt_sound,
      this.snore_sound,
      this.defeatedSound,
      this.wakingSound,
      this.hurtBossSound,
      this.chickenScreams,
      this.chickScreams,
    ];

    allSounds.forEach((sound) => {
      sound.pause();
      sound.currentTime = 0;
    });
  }

  /**
   * Resets the sound manager for a new game session.
   */
  resetSoundManager() {
    this.endSound = false;
    this.stopAllSounds();
  }
}
