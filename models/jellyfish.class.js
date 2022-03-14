class Jellyfish extends MoveableObject {

    x = 400 + Math.random() * (2*500);// min = 200 max=700  
    y = 1 + Math.random() * 700;// min = 1 max=700  
    width = 50;
    height = 70;
    swimUp = true;
    escape = false; //turns true if get hurt
    speedY = 3;  // for escape
    acceleration = 2.5; // for escape
    world;

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

    constructor() {   // data for img path, x and y are given in world when creating new BackgroundObject
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
        this.loadImages(this.IMAGES_IDLE);   // method defined in moveable objects (cannot use super() because Parameter is an array)
        this.loadImages(this.IMAGES_HURT);
        this.animate();
    }

    animate() {
       let intervalJellyfish = setInterval(() => {
            this.playAnimation(this.IMAGES_IDLE)

            if (this.escape === true) {
                this.speedEscaping();   
            }
            else if (this.swimUp === true) {
                this.y -= 5;    // move up
            }
            else if(this.swimUp === false){
                this.y += 5;  // move down
            }
            if(this.y <=50){  // should not go over top screen border
                this.swimUp = false;
            }
            if(this.y >=400){  // should not go beneath bottom screen border
                this.swimUp = true;
            }
        }, 450);
        allIntervals.push(intervalJellyfish);
    }

    speedEscaping(){  // increase speed to escape
        clearInterval(this.intervalJellyfish);
        let escapeInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_IDLE)
            this.y -= this.speedY; 
            this.speedY += this.acceleration;
        },1000/10);
        allIntervals.push(escapeInterval);
    }

}