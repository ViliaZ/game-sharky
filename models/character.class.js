// "extends" states that class chicken is part of MovableObject >> gets all variables of Moveableobjects
// constructor is a crucial part of Classes and run first, whenever a new character is created

class Character extends MoveableObject {

    width = 300;
    height = 210;
    speed = 3;
    jellyfish = level1.jellyfish;


    // call character.world to access variables of the world class ( e.g. keyboard)
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

    IMAGES_THROWING_BUBBLE = [
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png'
    ]

    IMAGES_FINSLAP = [
        'img/1.Sharkie/4.Attack/Fin slap/1.png',
        'img/1.Sharkie/4.Attack/Fin slap/2.png',
        'img/1.Sharkie/4.Attack/Fin slap/3.png',
        'img/1.Sharkie/4.Attack/Fin slap/4.png',
        'img/1.Sharkie/4.Attack/Fin slap/5.png',
        'img/1.Sharkie/4.Attack/Fin slap/6.png',
        'img/1.Sharkie/4.Attack/Fin slap/7.png',
        'img/1.Sharkie/4.Attack/Fin slap/8.png'
    ]

    IMAGES_SLEEPING = [
        'img/1.Sharkie/2.Long_IDLE/i1.png',
        'img/1.Sharkie/2.Long_IDLE/I2.png',
        'img/1.Sharkie/2.Long_IDLE/i3.png',
        'img/1.Sharkie/2.Long_IDLE/i4.png',
        'img/1.Sharkie/2.Long_IDLE/i5.png',
        'img/1.Sharkie/2.Long_IDLE/i6.png',
        'img/1.Sharkie/2.Long_IDLE/i7.png',
        'img/1.Sharkie/2.Long_IDLE/i8.png',
        'img/1.Sharkie/2.Long_IDLE/i9.png',
        'img/1.Sharkie/2.Long_IDLE/i10.png',
        'img/1.Sharkie/2.Long_IDLE/i11.png',
        'img/1.Sharkie/2.Long_IDLE/i12.png',
        'img/1.Sharkie/2.Long_IDLE/i13.png',
        'img/1.Sharkie/2.Long_IDLE/i14.png'
    ]

    IMAGES_HURT = [
        'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/5.png',
    ]

    IMAGES_DEAD = [
        'img/1.Sharkie/6.dead/2.Electro_shock/1.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/2.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/3.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/4.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/5.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/6.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/7.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/8.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/9.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/10.png'
    ]

    constructor() {
        super().loadImage('img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.IMAGES_IDLE);   // method defined in moveable objects (cannot use super() because Parameter is an array)
        this.loadImages(this.IMAGES_THROWING_BUBBLE);   // method defined in moveable objects (cannot use super() because Parameter is an array)
        this.loadImages(this.IMAGES_HURT);   // method defined in moveable objects (cannot use super() because Parameter is an array)
        this.loadImages(this.IMAGES_DEAD);   // method defined in moveable objects (cannot use super() because Parameter is an array)
        this.loadImages(this.IMAGES_FINSLAP);   // method defined in moveable objects (cannot use super() because Parameter is an array)
        this.animate();
    }

   animate() {    
        // Idle Animation per default
        let intervalSharky1 = setInterval(() => {
            this.playAnimation(this.IMAGES_IDLE);
        }, 250);

        let intervalSharky2 = setInterval( () => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                setTimeout(showGameOver,800,"sharkyLoose");  // when calling a timout funtion with parameters, its written like this
            }
            else if (this.isColliding(this.jellyfish)) {
                this.playAnimation(this.IMAGES_HURT)
            }
            else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT)
            }
            if (this.world.keyboard.RIGHT && this.x < world.level.canvas_end_x) {  // if moving right and end of map reached
                this.moveRight();
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.x > -50) {  // if moving left AND x>0 (left borer isnt reached)
                this.moveLeft();
                this.otherDirection = true;     // mirroring img of character
            }
            if (this.world.keyboard.UP) {
                this.y -= this.speed;           // speed is a variable of MoveableObjects
            }
            if (this.world.keyboard.DOWN) {
                this.y += this.speed;           // speed is a variable of MoveableObjects
            }
            if (this.world.keyboard.KEYF) {
                this.playAnimation(this.IMAGES_FINSLAP)           // speed is a variable of MoveableObjects
            }
            // attach camera-movement to character-movement
            this.world.camera_x = -this.x + 50;  // 100px so that character does not attach too close to left border
        }, 1000 / 60)
        allIntervals.push(intervalSharky1);
        allIntervals.push(intervalSharky2);
    }
}