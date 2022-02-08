class MoveableObject extends Drawableobject {

    speed = 0.20 + Math.random() * 0.5;     // pixels to move
    otherDirection = false;                 // mirroring object e.g. character looking to left
    speedY;                                 // throwableObj. and Endboss have their own values
    acceleration;                           // throwableObj. and Endboss have their own values
    energy = 100;                           // for character and endboss
    lastHit = 0;                            // time when character is last hit

    // for bubbles out of sharkys mouth
    applyGravity() {
        setInterval(() => {
            if (this.objectIsAboveGround()) {
                this.y += this.speedY;
                this.speedY += this.acceleration;  // speedY number changes with every Interval
            };
        }, 1000 / 25)
    }

    // decrease Energy
    hit() {   // is called in world on collision detection 
        this.energy -= 5;
        console.log(world.character.energy)
        // prevent from getting negative energy values
        if (this.energy < 0) {
            this.energy = 0
        }
        else {
            this.lastHit = new Date().getTime();  // saves timepoint (in milliseconds since 1.1.1970)
        }
    }

    // returns boolean: true or false
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit  // timepassed since last hurt in milliseconds
        timepassed = timepassed / 1000; // timepassed in seconds
        return timepassed < 1;    //  true or fals >> duration of hurt-animation >> as long as "timepassed" is <1sec 
    }

    isDead() {
        return this.energy == 0;  // if this condition is true, then isDead() returnes true
    }

    objectIsAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;   // always true bc. bubbles should not stop at ground
        }
        else {
            return this.y < 200;   // 270px are sea ground (measured for the character object), NOTE that this is differnet for all images/objects depending on the png size
        }
    }

    playAnimation(imageArray) {
        let i = this.currentImage % imageArray.length   // creates permanent circle of numbers from 0 to arraylength
        let path = imageArray[i];                       // path is the key to the variable in imageCache
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    index = 0;
    playAnimationOnce(imageArray, intervalEndboss) {

        // setInterval(()=>{
            let path = imageArray[this.index];     
            this.img = this.imageCache[path];
            this.index++;

            if (this.index === 10){
                clearInterval(intervalEndboss);
            }
        // }, 1000/30)
 

        // setInterval(() => {
        //     for (let i = 0; i < 9; i++) {
        //         this.img.src = imageArray[i];
        //     }
        // }, 1000 / 5)

    }

    moveLeft() {
        this.x -= this.speed;
    };

    moveRight() {
        this.x += this.speed;
    }



    // detects IF character is colliding with any object > boolean
    isColliding(object) {
        return this.x + this.width > object.x &&
            this.y + this.height > object.y &&
            this.x < object.x &&
            this.y < object.y + object.height
    }
}