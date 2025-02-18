/**
 * Represents the first background layer in the game.
 * Inherits from the MovableObject class to allow for movement functionality.
 */
class first extends MovableObject{
    x = 0;
    y = 100
    width = 1080;
    height = 600;

 /**
   * Creates an instance of the first class.
   * Initializes the background layer image and sets the initial position and size.
   */
    constructor(){
        super().loadImage('img/5_background/layers/1_first_layer/full.png');
    }
}