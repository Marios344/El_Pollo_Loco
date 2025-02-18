function initializeLevel1() {
  return (level1 = new Level(
    [
      new Chicken(400, soundManager),
      new Chicken(580, soundManager),
      new Chicken(1000, soundManager),
      new Chicken(1400, soundManager),
      new Chicken(1600, soundManager),
      new Chicken(2200, soundManager),
      new Chicken(2400, soundManager),
      new Chicken(2600, soundManager),
      new Chicken(3000, soundManager),
      new Chicken(3200, soundManager),
      new Chicks(480, soundManager),
      new Chicks(700, soundManager),
      new Chicks(850, soundManager),
      new Chicks(1200, soundManager),
      new Chicks(1700, soundManager),
      new Chicks(2000, soundManager),
      new Chicks(2800, soundManager),
      new Chicks(3100, soundManager),
      new Endboss(soundManager),
    ],
    [
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
      new Cloud(),
    ],
    [
      new BackgroundObject("img/5_background/layers/air.png", -1079),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        -1079
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        -1079
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        -1079
      ),

      new BackgroundObject("img/5_background/layers/air.png", 0),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),

      new BackgroundObject("img/5_background/layers/air.png", 1079),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 1079),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        1079
      ),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 1079),

      new BackgroundObject("img/5_background/layers/air.png", 1079 * 2),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        1079 * 2
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        1079 * 2
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        1079 * 2
      ),

      new BackgroundObject("img/5_background/layers/air.png", 1079 * 3),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        1079 * 3
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        1079 * 3
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        1079 * 3
      ),
    ],
    [
      new BottleGround(600),
      new BottleGround(600 * 2),
      new BottleGround(600 * 3),
      new BottleGround(600 * 4),
      new BottleGround(2800),
    ],
    [
      new Coins(430),
      new Coins(430 * 2),
      new Coins(430 * 3),
      new Coins(430 * 4),
      new Coins(430 * 5),
    ]
  ));
}