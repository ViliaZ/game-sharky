class MoveableObject extends Drawableobject {


    speed = 0.20 + Math.random() * 0.5;   // pixels to move
    otherDirection = false;               // mirroring object e.g. character looking to left
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;                         // time when character is last hit



    applyGravity() {
        setInterval(() => {
            if (this.objectIsAboveGround()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;  // speedY number changes with every Interval
            };
        }, 1000 / 25)
    }

    hit() {   // is called in world
        this.energy -= 5;
        // prevent from getting negative energy values
        if (this.energy < 0) {
            this.energy = 0
        }
        else {
            this.lastHit = new Date().getTime();  // saves timepoint (in milliseconds since 1.1.1970)
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit  // timepassed since last hurt in milliseconds
        timepassed = timepassed / 1000; // timepassed in seconds
        return timepassed < 1;    // duration of hurt-animation  >> as long as "timepassed" is < 1second, the function isHurt() returns true
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
        let i = this.currentImage % imageArray.length  // creates permanent circle of numbers from 0 to arraylength
        let path = imageArray[i]    // path is the key to the variable in imageCache
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveLeft() {
        this.x -= this.speed;
    };

    moveRight() {
        this.x += this.speed;
    }

    // detects IF character is colliding with any moveableObject > boolean
    isColliding(moveableObject) {
        return this.x + this.width > moveableObject.x &&
            this.y + this.height > moveableObject.y &&
            this.x < moveableObject.x &&
            this.y < moveableObject.y + moveableObject.height
    }
}