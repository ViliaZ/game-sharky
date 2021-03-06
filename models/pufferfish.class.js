class Pufferfish extends MoveableObject {
    width = 80;
    height = 70;
    changedColor = false; // color change when hurt with bubble
    gotHurtbyBubble = false; // toggle to true, after beeing hurt, irreversible
    swimUp = false; // toggle between up and down movement if making zigzagMove after hurt
    gotHurtbyFinslap = false;
    pufferfishInterval;
    speedGravity = 3;
    acceleration = 2;
    speedY = 2;


    // normal
    IMAGES_GREEN = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
    ]

    // when hurt
    IMAGES_TRANSITION_RED = [
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png'
    ]

    // after hurt
    IMAGES_SWIM_RED = [
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition5.png'
    ]

    // DYING hurt
    IMAGES_DYING = [
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png',
    ]


    /**
     * Create new Instance of Pufferfish
     * Each image is loaded/drawn in Drawableobject Class
     * Random Placement according to x and y Coordinates
     * Initiate Animation 
     */
    constructor() {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png')
        this.loadImages(this.IMAGES_GREEN)
        this.loadImages(this.IMAGES_SWIM_RED)
        this.loadImages(this.IMAGES_TRANSITION_RED)
        this.loadImages(this.IMAGES_DYING)
        this.x = 300 + Math.random() * (3 * 500); // min = 400 max=700  
        this.y = 1 + Math.random() * 430; // min = 1 max=700  
        this.animate();
    }

    /**
     * Pufferfish Animation 
     * Animation: Swim Left, Change Color and increase speed when hurt by bubble
     * Animation: Escape Up when hurt by Finslap
     * isHUrt() returns from world checkIfEnemyHurt(bubble)
     */
    animate() {
        this.pufferfishInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_GREEN);
            this.moveLeft(1);
            if (this.gotHurtbyFinslap == true) {
                this.letFishDie();
            }
            if (this.gotHurtbyBubble == true) {
                this.swimZigZag();
            }
            if (this.isHurt()) {
                this.growBigger();
                this.gotHurtbyBubble = true;
                this.changedColor = true;
            } 
            if (this.changedColor == true) {
                this.playAnimation(this.IMAGES_SWIM_RED);
                this.moveLeft(2);
            }
        }, 150);
        allIntervals.push(this.pufferfishInterval);
    }

    /**
     * Pufferfish Animation  
     * Increase Width and height after beeing hurt first time
     * Not triggered when hurt multiple times
     */
    growBigger() {
        if (!this.gotHurtbyBubble) {
            this.width += 12;
            this.height += 12;
        }
    }

    /**
     * Pufferfish Animation 
     * Swim Zig Zag Movement after beeing hurt
     */
    swimZigZag() {
        if (this.swimUp) {
            this.y = this.y + 1 + Math.random() * 4;
            setTimeout(() => {
                this.swimUp = false
            }, 700)
        }
        if (!this.swimUp) {
            this.y = this.y - (1 + Math.random() * 3);
            setTimeout(() => {
                this.swimUp = true
            }, 700)
        }
    }

     /**
     * Pufferfish Dying after Finslap 
     * Swim Zig Zag Movement after beeing hurt
     */
    letFishDie() {
        clearInterval(this.pufferfishInterval);
        let groundingInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_DYING)
            this.moveLeft(12);
            this.y += this.speedY;
            this.speedY += this.acceleration;
        }, 1000 / 50);
        allIntervals.push(groundingInterval);
    }
}