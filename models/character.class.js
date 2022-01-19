// "extends" states that class chicken is part of MovableObject >> gets all variables of Moveableobjects
// constructor is a crucial part of Classes and run first, whenever a new character is created

class Character extends MoveableObject {

    width = 300;
    height = 210;
    speed = 3;

    // call world.character.world to access variables of the world class ( e.g. keyboard)
    world;

    // Sharky, when chilling
    IMAGES_IDLE = [
        'img/1.Sharkie/1.IDLE/2.png',
        'img/1.Sharkie/1.IDLE/3.png',
        'img/1.Sharkie/1.IDLE/4.png',
        'img/1.Sharkie/1.IDLE/5.png',
        'img/1.Sharkie/1.IDLE/6.png',
        'img/1.Sharkie/1.IDLE/7.png',
        'img/1.Sharkie/1.IDLE/8.png',
        'img/1.Sharkie/1.IDLE/9.png',
        'img/1.Sharkie/1.IDLE/10.png',
        'img/1.Sharkie/1.IDLE/11.png',
        'img/1.Sharkie/1.IDLE/12.png',
        'img/1.Sharkie/1.IDLE/13.png',
        'img/1.Sharkie/1.IDLE/14.png',
        'img/1.Sharkie/1.IDLE/15.png',
        'img/1.Sharkie/1.IDLE/16.png',
        'img/1.Sharkie/1.IDLE/17.png',
        'img/1.Sharkie/1.IDLE/18.png'
    ]

    constructor() {
        super().loadImage('img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.IMAGES_IDLE);   // method defined in moveable objects (cannot use super() because Parameter is an array)
        this.animate();
        this.applyGravity();
    }

    // run through IMAGES_IDLE one by one to show each image as character img (variable img declared in MoveableObjects) 
    // Goal: quickly go through each image in IDLE Array and only change img to current array image



    animate() {
        // MOVING ANIMATIONS
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < world.level.canvas_end_x) {  // if moving right and end of map reached
                this.x += this.speed;           // speed is a variable of MoveableObjects
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.x > -50) {  // if moving left AND x>0 (left borer isnt reached)
                this.x -= this.speed;           // speed is a variable of MoveableObjects
                this.otherDirection = true;     // mirroring img of character
            }
            if (this.world.keyboard.UP) {
                this.y -= this.speed;           // speed is a variable of MoveableObjects
            }
            if (this.world.keyboard.DOWN) {
                this.y += this.speed;           // speed is a variable of MoveableObjects
            }
            // attach camera-movement to character-movement
            this.world.camera_x = -this.x + 50;  // 100px so that character does not attach too close to left border
        }, 1000 / 60)                           // 60 times per second


        // IDLE ANIMATION
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_IDLE.length  // i is increasing ++ by every interval circle creates permanent circle of 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, ....)
            let path = this.IMAGES_IDLE[i]    // getting the key for laoding the image from imageCache >> path is the key to the variable in imageCache
            this.img = this.imageCache[path];  // loading the correct image from imageCache with the key of "path"
            this.currentImage++;
        }, 250);

    }

}