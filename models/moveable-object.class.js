class MoveableObject extends Drawableobject {

    speed = 0.20 + Math.random() * 0.5;     // pixels to move
    otherDirection = false;                 // mirroring object e.g. character looking to left
    speedGravity;
    speedY;                                 // throwableObj. and Endboss have their own values
    acceleration;                           // throwableObj. and Endboss have their own values
    energy = 100;                           // for character and endboss
    lastHit = 0;                            // time when character is last hit
    index = 0;                              // needed for playAnimationOnce function
    hurtAnimationPlays = false;
    


    /**
     * Apply visual gravity effect for Bubbles
     * acceleration adds speed to movement for more realistic look
     */
    applyGravity() {
        let gravityInterval = setInterval(() => {
            if (this.objectIsAboveGround()) {
                console.log('applyGravity');
                this.y += this.speedGravity;
                this.speedY += this.acceleration;  // speedY number changes with every Interval
            };
        }, 1000 / 45)
        allIntervals.push(gravityInterval);
    }


    /**
     * Loose Energy after hit 
     * Trigger: in world.js on collision detection
     * Timpoint saved to add immunity after being hit (to throttle hit animation)
     * @param {number} amount of energy to decrease with each hit
     * @result decrease energy of the hit object
     */
    hit(energyToLoose) {
        this.energy -= energyToLoose;
        if (this.energy < 0) {  // prevent from getting negative energy values
            this.energy = 0
        }
        this.lastHit = new Date().getTime();  // saves timepoint (in milliseconds since 1.1.1970)
    }


    /**
     * Throttle Hit Animation after beeing hurt: 500ms immunity after each hit
     * @returns {boolean}
     */
    isHurt() {
        if (this.isImmuneAfterFinslap) { return false; }
        else{
            let timepassed = new Date().getTime() - this.lastHit  // timepassed since last hurt in milliseconds
            return timepassed < 100;    //  true or false >> duration of hurt-animation >> as long as "timepassed" is <1sec 
        }
    }


    /**
    * Dead Detection: Energy of 0
    * @returns {boolean}
    */
    isDead() {
        return this.energy == 0;
    }

    
    /**
    * Placement detection for objects - bubbles should not stop at ground
    * 270px on y Axis is sea ground level (measured for character Object --> is different for all objects depending on png size )
    * @returns {boolean}
    */ 
    objectIsAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        }  
        else {
            return this.y < 200;
        }  
    }


    /**
    * Animation Function
    * @param {String Array} of images
    * creates permanent circle of numbers from 0 to arraylength
    * img-path as key in the array to find img in cache
    */
    playAnimation(imageArray) {
        let i = this.currentImage % imageArray.length  
        let path = imageArray[i];                       
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
    * Animation Function for Single Play Animations
    * @param {String Array} of images
    * @param {String} for interval variable (each interval is attached to a variable name)
    */
    playAnimationOnce(imageArray, interval) {
        let path = imageArray[this.index];     // index is 0 with start
        this.img = this.imageCache[path];
        this.index++;
        if (this.index === imageArray.length - 1) {
            clearInterval(interval);
        }
    }


    /**
    * Move object to left
    * @param {number} Speedfactor to give puffersish different speed
    * relevant for character, pufferfish and endboss
    */
    moveLeft(speedFactor) {
        if (this instanceof Pufferfish) {
            let speedPufferfish = 0.20 + Math.random() * 1.5;
            this.x -= speedPufferfish * speedFactor;
        }
        else {
            this.x -= this.speed;
        }
    };


    /**
    * Move object to Right
    */
    moveRight() {
        this.x += this.speed;
    }


    /**
    * Move object to left
    * @param {object} TypeOfObject 
    * @returns {boolean} if object is colliding with character
    * calculates crossing points with adjustments 
    * png images are much bigger than real visual objects --> collision coordinates are adjusted for CHARACTER
    */
    isColliding(object) {
        // give the corrdinates an offset to compensate for empty space around images
        return this.x + 50 + (this.width - 150) > object.x &&
            (this.y + 130) + (this.height - 180) > object.y &&
            (this.x + 50) < object.x &&
            (this.y + 130) < object.y + object.height
    }

    isCollidingWithFinslapCoordinates(object) {
        if(object instanceof Pufferfish) {
            return this.x + 20 + (this.width - 100) > (object.x -10) &&
            (this.y + 100) + (this.height - 150) > (object.y -10) &&
            (this.x + 10) < (object.x -10) &&
            (this.y + 100) < (object.y -10) + (object.height * 1.2)
        }
    }
}
