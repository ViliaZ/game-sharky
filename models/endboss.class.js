class Endboss extends MoveableObject {

    x = 700;
    y = 0;
    height = 250;
    width = 340;
    lifeEnergy = 100;  // default with start  - minus 25 with every hurt
    speedEscape = 3;
    accelerationEscape = 1;
    speedY = 0.4;
    acceleration = 1.5;

    introAnimationDone = false;  // intro animation should only play once
    isNearCharacter = false;  // is checked in world



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
        setInterval(() => {
            if (this.isDead() && this.objectIsAboveGround()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.applyGravity();
                this.turnAndRun();
            }
            else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
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
    }

    playIntro() {
        let intervalEndboss = setInterval(() => {
            this.playAnimationOnce(this.IMAGES_INTRODUCE, intervalEndboss);
        }, 1000 / 5);
        this.introAnimationDone = true;
    }

    // when endboss is defeated 
    turnAndRun() {
        // this.isDead = false;
        setTimeout(() => {
            this.otherDirection = true;
            setInterval(() => {
                this.playAnimation(this.IMAGES_FLOATING);
                this.x += this.speedEscape;
                this.speed += this.accelerationEscape;
            }, 1000 / 40);
        }, 700)
    }
}