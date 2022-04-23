class Character extends MoveableObject {
    x = 100;
    y = 100;
    width = 300;
    height = 270;
    speed = 3;
    world;
    finslapping = false;

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

    IMAGES_SWIM = [
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ]

    IMAGES_THROWING = [
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png'
    ]

    IMAGES_FINSLAP = [
        // 'img/1.Sharkie/4.Attack/Fin slap/1.png',
        'img/1.Sharkie/4.Attack/Fin slap/2.png',
        // 'img/1.Sharkie/4.Attack/Fin slap/3.png',
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

    /**
     * Create new Instance of Character
     * load all images into cache with loadImages() --> in drawableObjects
     * start animations after initializing
     */
    constructor() {
        super().loadImage('img/1.Sharkie/1.IDLE/1.png');
        this.loadImages(this.IMAGES_IDLE); // method defined in moveable objects (cannot use super() because Parameter is an array)
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_THROWING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_FINSLAP);
        this.animateBasic();
        this.animateConditions();
    }

    /**
     * Animations for idle and swim to right side
     * One of these animations will always play, if no other animation of sharky is active
     */
    animateBasic() {
        let intervalSharky1 = setInterval(() => { // Swim Animation per default
            if (pressedKey == false) { // no key is pressed
                this.playAnimation(this.IMAGES_IDLE);
            } else {
                this.playAnimation(this.IMAGES_SWIM);
            }
        }, 1000 / 5);
        allIntervals.push(intervalSharky1);
    }

    /**
     * Animations for different states of sharky: dead, hurt 
     * Animations for different directions: change directeion to left (attach camera-movement to character-movement), swim up, swim down
     * Animations for Attacks: bubbles throwing, finslap
     */
    animateConditions() {
        let intervalSharky2 = setInterval(() => {
            if (this.isDead()) {
                clearInterval(intervalSharky2)
                pauseAudio(AUDIOS.characterHurt);
                this.deadAnimation();
            } else if (this.isHurt() && !this.isDead()) {
                this.playAnimation(this.IMAGES_HURT);
                playAudio(AUDIOS.characterHurt, 0.1);
            }
            if ((this.world.keyboard.RIGHT || this.world.touchevents.touchRIGHT == true) && this.x < world.level.canvas_end_x) { // if moving right and end of map reached
                this.moveRight();
                this.otherDirection = false;
                playAudio(AUDIOS.characterSwim, 0.1)
            }
            if ((this.world.keyboard.LEFT || this.world.touchevents.touchLEFT == true) && this.x > 0) { // 50px marks the left )
                this.moveLeft();
                this.otherDirection = true; // mirroring img of character
                playAudio(AUDIOS.characterSwim, 0.1)
            }
            if (this.insideUpperView() && (this.world.keyboard.UP || this.world.touchevents.touchUP == true)) {
                this.y -= this.speed;

            }
            if (this.isAboveGround() && (this.world.keyboard.DOWN || this.world.touchevents.touchDOWN == true)) {
                this.y += this.speed;
            } 
            else if (this.finslapping == false && (this.world.keyboard.KEYD || this.world.touchevents.touchFINSLAP == true)) {
                this.playAnimation(this.IMAGES_FINSLAP)
                playAudio(AUDIOS.finslap, 0.1)
                this.finslapping = true;
                setTimeout(() => {
                    this.finslapping = false;
                }, 125);
            } 
            else if (this.world.bubbleRequested() && this.world.bubbleCreating == false) {
                this.playAnimation(this.IMAGES_THROWING)
                setTimeout(() => {
                    this.world.bubbleCreating = false;
                }, 1000);
            }
            // attach camera-movement to character-movement
            this.world.camera_x = -this.x + 50; // 100px so that character does not attach too close to left border
        }, 1000 / 60)
        allIntervals.push(intervalSharky2);
    }


    /**
     * Check if upper viewport reached
     * @returns {boolean} 
     * if true --> disable upward movement
     */
    insideUpperView() {
        if (this.y < -150) {
            return false
        } else {
            return true
        }
    }


    /**
     * Check if bottom viewport reached
     * @returns {boolean} 
     * if true --> disable downward movement
     */
    isAboveGround() {
        if (this.y > 290) {
            return false
        } else {
            return true
        }
    }


    /**
     * Animation for dead state
     * Dead Status triggers Status "sharkyLoose" --> will trigger Endscreen in Game.js 
     */
    deadAnimation() {
        let deadAnimationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 1000 / 60)
        setTimeout(() => {
            clearInterval(deadAnimationInterval);
            showGameOver("sharkyLoose")
        }, 1200) // when calling a timout funtion with parameters, its written like this

    }
}