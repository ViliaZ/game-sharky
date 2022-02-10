class Endboss extends MoveableObject {

    x = 700;
    y = 0;
    height = 250;
    width = 340;
    lifeEnergy = 100;  // default with start  - minus 25 with every hurt
    speedGravity = 0.8;
    speedEscape = 4;
    accelerationEscape = 0.6;
    speedY = 0.4;
    acceleration = 1.5;


    introAnimationDone = false;  // intro animation should only play once
    isNearCharacter = false;  // is checked in world
    hurtAnimationPlays = false;


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

    constructor() {
        super().loadImage(this.IMAGES_INTRODUCE[0]);
        this.loadImages(this.IMAGES_INTRODUCE);
        this.loadImages(this.IMAGES_FLOATING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    animate() {
        let intervalEndbossAnimation = setInterval(() => {
            if (this.isDead() && this.objectIsAboveGround()) {
                this.hurtAnimationPlays = true;  // prevent hurt Animation from playing again
                this.applyGravity();
                this.playAnimation(this.IMAGES_DEAD);
                this.turnAndRun();
                setTimeout(showGameOver,2200,"sharkyWin");  // when calling a timout funtion with parameters, its written like this
            }
            else if (this.isHurt() && !this.isDead() && this.hurtAnimationPlays === false) {
                this.hurtAnimationPlays = true;
                this.playAnimation(this.IMAGES_HURT);
                this.startAttack();
            }
            // start Intro Animation (is running only ONCE)
            else if (this.isNearCharacter === true && this.introAnimationDone === false) {
                this.playIntro();
            }
            // start normal floating when Intro Animation was done
            else if (this.introAnimationDone === true) {
                this.playAnimation(this.IMAGES_FLOATING);
            }
        }, 1000 / 5);
        // allIntervals.push(intervalEndbossAnimation);
    }

    startAttack() {
        this.index = 0;
        let intervalAttack = setInterval(() => {
            this.playAnimationOnce(this.IMAGES_ATTACK, intervalAttack)
            this.x -= 8;
        }, 1000 / 10);
        setTimeout(() => { this.hurtAnimationPlays = false; }, 500);
        // allIntervals.push(intervalAttack);

    };

    playIntro() {
        this.index = 0; // index of image array where the animation starts
        let intervalEndboss = setInterval(() => {
            this.playAnimationOnce(this.IMAGES_INTRODUCE, intervalEndboss);
        }, 1000 / 10);
        this.introAnimationDone = true;
        // allIntervals.push(intervalEndboss);
    }

    // when endboss is defeated 
    turnAndRun() {
        // this.isDead = false;
        setTimeout(() => {
            this.otherDirection = true;
            let intervalEscape = setInterval(() => {
                this.playAnimation(this.IMAGES_FLOATING);
                this.x += this.speedEscape;
                this.speedEscape += this.accelerationEscape;
            }, 1000 / 8);
        }, 700)
        // allIntervals.push(intervalEscape);
    }
}