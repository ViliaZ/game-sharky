class Jellyfish extends MoveableObject {

    x = 200 + Math.random() * (3 * 500); // min = 200 max=700  
    y = 1 + Math.random() * 700; // min = 1 max=700  

    width = 60;
    height = 80;
    swimUp = true;
    escape = false; //turns true if get hurt
    speedY = 3; // for escape
    acceleration = 2.5; // for escape
    world;
    isTrapped = false; // if true, the animation 

    IMAGES_IDLE = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png'
    ]

    IMAGES_HURT = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png',
    ]

    IMAGES_BUBBLETRAP = [
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png'
    ]

    /**
     * Create new Instance of Jellyfish
     * load all images into cache with loadImages() --> in drawableObjects
     * start animation after initializing
     */
    constructor() {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png'); // start image
        this.loadImages(this.IMAGES_IDLE); // method defined in moveable objects (cannot use super() because Parameter is an array)
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_BUBBLETRAP);
        this.animate();
    }

    /**
     * Jellyfish Animation 
     * Animation: Swim Up and down (restricted by viewport height, then turn direction)
     * Animation: Escape Up when hurt by Finslap
     */
    animate() {
        let intervalJellyfish = setInterval(() => {
            this.playAnimation(this.IMAGES_IDLE)
            if (this.escape === true) {
                this.speedEscaping();
            } else if (this.isHurt()) { // triggert in world.checkIfEnemyHurt(bubble)  --> hit() --> isHurt()
                this.exitInBubble();
            } else if (this.swimUp === true) {
                this.y -= 5; // move up
            } else if (this.swimUp === false) {
                this.y += 5; // move down
            }
            if (this.y <= 50) { // should not go over top screen border
                this.swimUp = false;
            }
            if (this.y >= 400) { // should not go beneath bottom screen border
                this.swimUp = true;
            }
        }, 450);
        allIntervals.push(intervalJellyfish);
    }

    /**
     * Escape Animation 
     * Increase speed, upwards movement
     * Trigger: Finslap by Sharky
     */
    speedEscaping() {
        clearInterval(this.intervalJellyfish);
        let escapeInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_IDLE)
            this.y -= this.speedY;
            this.speedY += this.acceleration;
        }, 1000 / 10);
        allIntervals.push(escapeInterval);
    }

    /**
     * Escape Animation 
     * Increase speed, upwards movement
     * Trigger: Finslap by Sharky
     */
    exitInBubble() {
        clearInterval(this.intervalJellyfish);
        let exitInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_BUBBLETRAP)
            this.y -= this.speedY*2;
            this.x -= 4;
            this.width -= 0.5;
            this.height -= 0.5;
        }, 1000 / 10);
        allIntervals.push(exitInterval);
    }

}