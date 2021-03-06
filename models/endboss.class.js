class Endboss extends MoveableObject {

    x = 2 * 900;
    y = -250;                       // before introducing animation, it should be out of sight
    height = 340;
    width = 340;
    lifeEnergy = 100;               // default with start  - minus 25 with every hurt
    speedGravity = 0.8;
    speedEscape = 4;
    accelerationEscape = 0.6;
    speedY = 0.4;
    acceleration = 1.5;
    introAnimationDone = false;     // intro animation should only play once
    isNearCharacter = false;        // is checked in world
    moveUp = false;                 // is checked in world
    wasHurt = false;                // if true, the endboss got already hurt once, triggers forward motion

    IMAGES_INTRODUCE = [
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/10.png'
    ]

    IMAGES_FLOATING = [
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/2.Enemy/3 Final Enemy/2.floating/13.png'
    ]

    IMAGES_HURT = [
        'img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/2.Enemy/3 Final Enemy/Hurt/4.png',
    ]

    IMAGES_ATTACK = [
        'img/2.Enemy/3 Final Enemy/Attack/1.png',
        'img/2.Enemy/3 Final Enemy/Attack/2.png',
        'img/2.Enemy/3 Final Enemy/Attack/3.png',
        'img/2.Enemy/3 Final Enemy/Attack/4.png',
        'img/2.Enemy/3 Final Enemy/Attack/5.png',
        'img/2.Enemy/3 Final Enemy/Attack/6.png',
    ]

    IMAGES_DEAD = [
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png'
    ]


    /**
     * Create new Instance of Endboss
     * load all images into cache with loadImages() --> in drawableObjects
     * start animation after initializing
     */
    constructor() {
        super().loadImage(this.IMAGES_INTRODUCE[0]);
        this.loadImages(this.IMAGES_INTRODUCE);
        this.loadImages(this.IMAGES_FLOATING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }


    /**
     * Basic Animations for Endboss
     * Intro-Animation (only played once)
     * Floating-Animation (starts after Intro)
     * Hurt-Animation (after bubble collision)
     * Dead-Animation
     */
    animate() {
        let intervalEndbossAnimation = setInterval(() => {
            if(this.wasHurt){
                this.x -=6;
            }
            if (this.isDead() && this.objectIsAboveGround()) {
                clearInterval(intervalEndbossAnimation); // when calling a timout funtion with parameters, its written like this
                this.hurtAnimationPlays = true;  // prevent hurt Animation from playing again
                this.turnAndRun();
            }
            else if (this.isHurt() && !this.isDead() && this.hurtAnimationPlays === false) {
                this.wasHurt = true; // checks if already hurt once
                this.hurtAnimationPlays = true;
                this.playAnimation(this.IMAGES_HURT);
                this.startAttack();
                if (this.introAnimationDone == false) {
                    this.introAnimationDone = true;
                }
            }
            else if (this.isNearCharacter == true && this.introAnimationDone === false) {
                this.playIntro();
            }
            else if (this.introAnimationDone === true) {       // start normal floating when Intro Animation was done
                this.playAnimation(this.IMAGES_FLOATING);
            }
        }, 1000 / 5);
        allIntervals.push(intervalEndbossAnimation);
    }


    /**
     * Animation Introduction Movement, playing once
     * before Intro, Endboss is placed outside of view
     * Intro Audio is initialized
     */
     playIntro() {
        this.y = 60;
        this.index = 0; // index of image array where the animation starts
        let intervalEndboss = setInterval(() => {
            this.playAnimationOnce(this.IMAGES_INTRODUCE, intervalEndboss);
        }, 1000 / 10);
        console.log('endbossAudio');
        this.introAnimationDone = true;
        allIntervals.push(intervalEndboss);
        playAudio(AUDIOS.nearEndboss, 1);
    }


    /**
     * Animation for Starting Attack against Character
     * Implements AttackAnimation 
     * Implements up/ down - movement (attackMovement()) in direction of character
     * while attacking plays, disable hurtanimation
     */
    startAttack() {
        this.index = 0;
        let intervalAttack = setInterval(() => {
            this.playAnimationOnce(this.IMAGES_ATTACK, intervalAttack)
            this.attackMovement();
        }, 1000 / 10);
        this.toggleDirectionOfAttacks();
        setTimeout(() => { this.hurtAnimationPlays = false; }, 500);
        allIntervals.push(intervalAttack);
    };


    /**
     * Setting Direction (up or down movement) for Attacks against Character
     * the direction will be toggled: up and down
     * Note: sharky will be almost never beneath endboss (when bubbles are thrown they sharky needs
     * to be above midline to get bubbles to hurt sharky). 
     * To prevent Endboss to go endlessly up, the direction is toggled: 1 x up then 1 x down
     */
    attackMovement(){
        this.x -= 12;
        if (this.moveUp) { 
            this.y += 8;
        }
        else {
            this.y -= 8;
        }
    }


    /**
     * Toggle Direction of Attack-Movement
     * 2 Variations: Up-Movement / Down-Movement, alternating
     */
    toggleDirectionOfAttacks() {
        if (!this.moveUp) {
            this.moveUp = true;
        }
        else {
            this.moveUp = false;
        }
    }


    /**
     * Animation when Endboss is defeated by bubbles
     * Endobss sinkes downwards with dead-animation playing
     * before reaching ground, sinking stopped, final Escape Animation triggered (he turns direction and swims away out of viewport)
     */
    turnAndRun() {
        let sinkingAnimation = setInterval(() => {
            this.applyGravity();
            this.playAnimation(this.IMAGES_DEAD);
        }, 1000 / 5)
        setTimeout(() => {
            clearInterval(sinkingAnimation);
            this.otherDirection = true;
            this.finalEscape();
        }, 1000);
    }


    /**
     * Part of turn and Run animation sequence at defeat
     * Endobss turns direction and moves in opposite direction with increased speed
     * triggers Game Status: SharkyWins
     * @returns Status "sharkyWin" for showGameOver() --> game.js with endcard animation triggered
     */
    finalEscape() {
        let intervalEscape = setInterval(() => {
            this.playAnimation(this.IMAGES_FLOATING);
            this.x += this.speedEscape;
            this.speedEscape += this.accelerationEscape;
        }, 1000 / 24);
        setTimeout(() => {
            clearInterval(intervalEscape);
            showGameOver("sharkyWin")    // when calling a timout funtion with parameters, its written like this
        }, 1200)
    }
}