let canvas;
let world;
let soundManager = new SoundManager();
let keyboard = new Keyboard();

/**
 * Starts the game by initializing components and playing background music if not muted.
 */
function start() {
  init();
  gameStyle();
  addMobileButtons();
  mobileOrDesktop();
}

/**
 * Initializes the game canvas, level, and world instance.
 */
function init() {
  canvas = document.getElementById("canvas");
  level1 = initializeLevel1();
  soundManager.level = level1;
  world = new World(canvas, keyboard, soundManager);
  soundManager.bgMusicPlay();
}

/**
 * Returns to the main menu by resetting intervals, styles, and game objects.
 */
function goBackToMenu() {
  clearWorldIntervals();
  world.stopGame();
  menuStyle();
  resetGameObjects();
  soundManager.resetSoundManager();
}

/**
 * Restarts the game by clearing intervals, resetting game objects, and reinitializing the world.
 */
function restartGame() {
  clearWorldIntervals();
  world.stopGame();
  clearCanvas();
  resetGameObjects();
  resetWorld();
  soundManager.level = level1;
  document.activeElement.blur();
  soundManager.bgMusicPlay();
}

/**
 * Reinitializes the world and level by clearing existing data.
 */
function resetWorld() {
  world = null;
  chickenPositions = [];
  level1 = initializeLevel1();
  world = new World(canvas, keyboard, soundManager);
  soundManager.resetSoundManager();
}

/**
 * Clears intervals specific to the world.
 */
function clearWorldIntervals() {
  if (world && world.worldIntervalIds) {
    world.worldIntervalIds.forEach(clearInterval);
    world.worldIntervalIds = [];
  }
}

/**
 * Toggles music and updates mute button styles.
 */
function stopMusic() {
  soundManager.toggleMute();
  mobileMuteStyleChange();
  desktopMuteStyleChange();
  document.activeElement.blur();
}

/**
 * Updates the mobile mute button style.
 */
function mobileMuteStyleChange() {
  let musicBtn = document.getElementById("muteBtn");

  if (musicBtn.src.includes("sound.png")) {
    musicBtn.src = "./img/action-btns/sound-stop.png";
  } else {
    musicBtn.src = "./img/action-btns/sound.png";
  }
}

/**
 * Updates the desktop mute button style.
 */
function desktopMuteStyleChange() {
  let musicBtn = document.getElementById("desktopMuteBtn");

  if (musicBtn.src.includes("sound.png")) {
    musicBtn.src = "./img/action-btns/sound-stop.png";
    world.isMuted = true;
  } else {
    musicBtn.src = "./img/action-btns/sound.png";
    world.isMuted = false;
  }
}

/**
 * Checks if the current device has a touch screen.
 * @returns {boolean} True if the device has touch capabilities, otherwise false.
 */
function isTouchScreen() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

/**
 * Applies different settings based on whether the device is a touchscreen or a desktop.
 */
function mobileOrDesktop(){
  if (isTouchScreen()) {
    mobileSettings();
  }else {
    desktopSettings();
  }
}

/**
 * Displays the mobile settings overlay.
 */
function mobileSettings(){
  let overlay = document.getElementById("overlay");
  overlay.style.display = "flex";
}

/**
 * Hides the mobile settings overlay.
 */
function hideMobileSettings(){
  let overlay = document.getElementById("overlay");
  overlay.style.display = "none";
}

/**
 * Applies desktop-specific settings by hiding the overlay and displaying game buttons.
 */
function desktopSettings(){
  let overlay = document.getElementById("overlay");
  let gameButtons = document.getElementById("gameButtons");

  overlay.style.display = "none";
  gameButtons.style.display = "flex";
}

/**
 * Updates styles for the game screen.
 */
function gameStyle() {
  let canvas = document.getElementById("canvas");
  let title = document.getElementById("title");
  let startContainer = document.getElementById("start-screen-layout");
  let footer = document.getElementById("footer");
  
  canvas.style.display = "block";
  title.style.display = "none";
  startContainer.style.display = "none";
  footer.style.display = "none";
}

/**
 * Restores styles to the original menu screen.
 */
function menuStyle() {
  let canvas = document.getElementById("canvas");
  let title = document.getElementById("title");
  let startContainer = document.getElementById("start-screen-layout");
  let footer = document.getElementById("footer");
  let gameButtons = document.getElementById("gameButtons");

  canvas.style.display = "none";
  title.style.display = "block";
  startContainer.style.display = "flex";
  footer.style.display = "flex";
  gameButtons.style.display = "none";
  hideMobileSettings();
}

/**
 * Clears the canvas content.
 */
function clearCanvas() {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Resets the game objects to their initial states.
 */
function resetGameObjects() {
  world.level.bottleGround = [
    new BottleGround(600),
    new BottleGround(1200),
    new BottleGround(1800),
    new BottleGround(2400),
    new BottleGround(2800),
  ];
  world.level.coins = [
    new Coins(430),
    new Coins(860),
    new Coins(1290),
    new Coins(1720),
    new Coins(2150),
  ];
  world.totalPoints = 0;
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 87) {
    keyboard.UP = true;
  }

  if (e.keyCode == 65) {
    keyboard.LEFT = true;
  }

  if (e.keyCode == 68) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode == 83) {
    keyboard.DOWN = true;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 87) {
    keyboard.UP = false;
  }

  if (e.keyCode == 65) {
    keyboard.LEFT = false;
  }

  if (e.keyCode == 68) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode == 83) {
    keyboard.DOWN = false;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
});

/**
 * Adds event listeners for mobile buttons to handle touch start events.
 */
function addMobileButtons() {
  addTouchStartButtons();
  addTouchEndButtons();
}

/**
 * Adds event listeners for mobile buttons to handle touch start actions.
 */
function addTouchStartButtons() {
  document.getElementById("leftBtn").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });

  document.getElementById("upBtn").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.UP = true;
  });

  document.getElementById("rightBtn").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });

  document.getElementById("buyBtn").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.DOWN = true;
  });

  document.getElementById("throwBtn").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });
}

/**
 * Adds event listeners for mobile buttons to handle touch end actions.
 */
function addTouchEndButtons() {
  document.getElementById("leftBtn").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });

  document.getElementById("upBtn").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.UP = false;
  });

  document.getElementById("rightBtn").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });

  document.getElementById("buyBtn").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.DOWN = false;
  });

  document.getElementById("throwBtn").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });
}
