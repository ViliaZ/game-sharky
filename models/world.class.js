// this class contains most of the game logic (e.g. collision detection)
class World {
    character = new Character();
    statusbar = new Statusbar();
    statusbarCoins = new StatusbarCoins();
    jellyfishes = level1.jellyfish;
    level = level1; // is a constant defined in level.js file, contains objects like coins, enemies and backgroundobjects
    coins = level1.coins;
    enemies = level1.enemies;
    endboss = level1.enemies[level1.enemies.length - 1];
    gameOver = false;

    throwableObjects = [];
    timeBubbleCreated = 0;
    timeSinceLastBubble;
    firstBubbleThrown = false;
    bubbleCreating = false;
    backgroundObjects = level1.backgroundObjects;
    throwYES = false;
    enemyhurt = false; // enemy hurt with bubble? boolean

    canvas; // variable declaring, needs to be here to be available also for draw()
    ctx; // variable stands for "context" and is needed for drawing on canvas with "getContext('2d')
    camera_x = 0; // moves world (context) on x axis
    keyboard;
    touchevents;


    /**
     * Creates new World
     * @param {object} canvas
     * @param {object} keyboard
     * @param {object} touchevents
     * defines context (HTML Canvas element <canvas>)
     * initializes: draw(), setWorld(), runChecks()
     */
    constructor(canvas, keyboard, touchevents) { // this is the id="canvas" div which is defined in game.js
        this.ctx = canvas.getContext('2d'); // create a new world and define the canvas  
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.touchevents = touchevents;
        this.draw();
        this.setWorld();
        this.runChecks(); // regualarly check collisions etc. 
    }


    /**
     * Hand over complete world to character instance 
     * makes every variable in world accessable to character class
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * Draw objects to Canvas
     * calling addtoMap() and addObjectsToMay() to draw any object onto context
     * Clear Canvas each time for redrawing elements with parameters of canvas.width and canvas.height
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height) //clear Canvas each time for redrawing 
        this.ctx.translate(this.camera_x, 0); // move context on x axis (when character is moving) >> all following elements are now drawn e.g. 100px to right >> after drawing the context be put on original position
        // drawing functions for each object (character) or array of objects (e.g. enemies, backgroundObjects ..)
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.jellyfishes);
        this.addObjectsToMap(this.coins);

        //*********** */
        this.ctx.translate(-this.camera_x, 0); // move ctx back to insert static elements 
        // ---- you can ADD FURTHER STATIC  (non moveable) objects here  -----
        this.addToMap(this.statusbar);
        this.addToMap(this.statusbarCoins);
        this.ctx.translate(this.camera_x, 0); // move ctx forward again 
        //*********** */

        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.throwableObjects); // throwableObject is an array >> therefore use addObjectstoMap insted addtoMap
        this.ctx.translate(-this.camera_x, 0); // move context to original position again

        let self = this; // need to bind "this" to another variable so i can use it inside a nested function (otherwise "this" is not functioning)
        requestAnimationFrame(function () { // requestAnimationFrame() is a API Browser Function. NOTE: uses NO "THIS" to call this function!! its specific for this function! 
            self.draw();
        });
    }


    /**
     * Run Checking Functions every few miliseconds
     */
    runChecks() {
        let runCheckInterval = setInterval(() => {
            this.checkCollisionsEnemies(); // character gets hurt
            this.checkFinslapJellyfish(); // jellyfish changes animation, but nothing happens. just for fun
            this.checkCollectCoins(); // statusbar coins increases
            this.checkThrowing();
            this.checkDistanceToEndboss();
            this.checkCharacterPosition();
            this.checkGameOver();
        }, 1000 / 20);
        allIntervals.push(runCheckInterval);
    }


    /**
     * Checking Function: Detect GameOver (defined in game.js)
     * Call showGameOver() with correct win status
     */
    checkGameOver() {
        if (gameOver) {
            showGameOver(win);
        }
    }


    /**
     * Checking Function: Detect Distance Character to Endboss 
     * sets  variable endboss.isNearCharacter (Boolean)
     */
    checkDistanceToEndboss() {
        let distanceEndboss = this.endboss.x - this.character.x;
        if (distanceEndboss < 450) {
            this.endboss.isNearCharacter = true;
        } else {
            this.endboss.isNearCharacter = false;
        }
    }


    /**
     * Checking Function: Detect Character Position below or above Endboss 
     * Triggers Endboss Attack Animation to point up or down (in relation to character position)
     * sets  variable endboss.isBelowCharacter (Boolean)
     */
    checkCharacterPosition() { //important for attack of endboss, if character is above or below endboss
        if (this.character.y > 240) {
            this.endboss.isBelowCharacter = true;
        }
    }


    /**
     * Checking Function: If Bubble is thrown
     * Throwing a bubble is only triggert if Coins are available (at least one coin got collected)
     * Throttle bubble throwing to 400ms
     * Initialize Bubble Throwing when > 400ms since last one 
     * Set Audio for bubble throwing
     * Trigger Hint (a div is shown on canvas) when no bubble can be thrown 
     */
    checkThrowing() {
        if (this.bubbleRequested()) {
            this.timeSinceLastBubble = new Date().getTime() - this.timeBubbleCreated;
            if (this.firstBubbleThrown == false) {
                this.firstBubbleThrown = true;
                playAudio(AUDIOS.throwBubble, 0.4);
                this.createBubble();
            } else if (this.firstBubbleThrown == true && this.timeSinceLastBubble > 400) { // only allow next throw after 500ms
                this.createBubble();
                playAudio(AUDIOS.throwBubble, 0.4);
            } else {
                return;
            }
        } else if (this.bubbleRequestInvalid()) { // if SPACE KEY pressed, but no coins were collected yet, display Hint on canvas 
            showGameTipp(); // see game.js
        }
    }


    /**
     * Checking Function: If Bubble is thrown
     * Throwing a bubble is only triggert if Coins are available (at least one coin got collected)
     * Throttle bubble throwing to 400ms
     * Initialize Bubble Throwing when > 400ms since last one 
     * Set Audio for bubble throwing
     * Trigger Hint (a div is shown on canvas) when no bubble can be thrown 
     */
    bubbleRequested() { // returns true for throwing animation of character
        return this.keyboard.SPACE && this.statusbarCoins.percentage > 0;
    }


    /**
     * Check if Bubble can be thrown 
     * Statusbar Coins must be >0 and SPACE key must be pressed
     * @returns {boolean}
     */
    bubbleRequestInvalid() {
        return this.keyboard.SPACE && this.statusbarCoins.percentage == 0;
    }


    /**
     * Create Bubble 
     * Trigger: checkThrowing() validation ok
     * initiates new instance of bubble
     * push new bubble into throwableObjects array for all bubbles
     * Checks Enemy hurt with bubble
     * Throwing a bubble is only triggert if Coins are available (at least one coin got collected)
     */
    createBubble() {
        let bubble = new ThrowableObject(this.character.x + 240, this.character.y + 130);
        this.timeBubbleCreated = new Date().getTime(); // saves current timepoint
        this.throwableObjects.push(bubble);
        this.bubbleCreating = true; // for bubble animation character
        let checkThrowingInterval = setInterval(() => {
            this.checkEnemyBubbleDamage(bubble);
            this.checkJellyfishBubbleDamage(bubble);    
        }, 1000 / 20);
        allIntervals.push(checkThrowingInterval);
    }


    /**
     * Checking Function: If Enemy is hurt with bubble
     * @param {object} bubble
     * If Enemy Hurt: bubble removed from BubbleArray
     * If Enemy Hurt: trigger hit() for enemy
     * If Endboss got hurt: Audio hitEndboss triggered
     */
    checkEnemyBubbleDamage(bubble){
        this.enemies.forEach((enemy) => {
            if (bubble.isCollidingEnemy(enemy) && !bubble.collidedEnemy) { // bubble has not been collided before
                bubble.collidedEnemy = true;
                enemy.hit(20);
                this.bubblesDissappear(bubble);

                if (enemy instanceof Endboss) {
                    playAudio(AUDIOS.hitEndboss, 1);
                }
            }
        })
    }

    /**
     * Checking Function: If Jellyfishes are hurt with bubble
     * @param {object} bubble
     * hit() in movableObjects triggers isHurt() to be true --> start animation in jellyfish class
     * bubble removed after collision
     */
    checkJellyfishBubbleDamage(bubble){
        this.jellyfishes.forEach((jellyfish) => {
            if (bubble.isCollidingEnemy(jellyfish) && !bubble.collidedEnemy) { // bubble has not been collided before
                bubble.collidedEnemy = true;
                jellyfish.hit(0);  // here: trigger a timestamp and isHurt() to toggle to true
                this.bubblesDissappear(bubble);
            }
        })
    }



    /**
     * Trigger: Bubble collision with enemy
     * @param {object} bubble
     * Remove: bubble from throwableObjects-Array
     * for visual effect: setTimeout, so that bubbles dont disappear on enemy image border directly
     */
    bubblesDissappear(bubble) {
        let indexBubble = this.throwableObjects.indexOf(bubble);
        setTimeout(() => {
            this.throwableObjects.splice(indexBubble, 1);
        }, 200)
    }


    /**
     * Checking Function:  Character collision with enemy
     * Triggers character.hit()
     * Triggers statusbar and energy level update for character
     */
    checkCollisionsEnemies() {
        this.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit(2); // decrease energy
                this.statusbar.setPercentage(this.character.energy) // this.character.energy is the number that we need to set our percentage of the statusbar
            }
        });
    }


    /**
     * Checking Function:  Character collision with coins
     * Triggers coin removal from canvas
     * Triggers statusbar update for coin statusbar
     * Triggers audio when colliding
     */
    checkCollectCoins() {
        this.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                let indexCurrentCoin = this.coins.indexOf(coin); // get index of the coin that was hit
                this.coins.splice(indexCurrentCoin, 1); // splice coin from array of coins
                this.statusbarCoins.increaseStatusbarCoins(); // this.character.energy is the number that we need to set our percentage of the statusbar
                playAudio(AUDIOS.collectCoin, 1);
            };
        });
    }


    /**
     * Checking Function:  Finslap hit Jellyfish
     * Triggers hurt animation for jellyfish
     * Triggers escape animation for jellyfish
     * Sets audio hitJellyfish 
     */
    checkFinslapJellyfish() {
        this.jellyfishes.forEach((jellyfish) => {
            if (this.character.isColliding(jellyfish) && this.keyboard.KEYD) {
                jellyfish.playAnimation(jellyfish.IMAGES_HURT);
                jellyfish.escape = true;
                playAudio(AUDIOS.hitJellyfish, 0.4);
            };
        });
    }


    /**
     * Draw Multiple Objects on canvas (array)
     * Execution inside of draw()
     * @param {object array} MoveableObjects
     */
    addObjectsToMap(objectsArray) {
        objectsArray.forEach(o => {
            this.addToMap(o)
        })
    }


    /**
     * Draw Single Object on canvas
     * Execution inside of draw()
     * @param {object} MoveableObject
     * Detection of Object Direction to trigger mirroring the context
     */
    addToMap(moveableObject) {
        if (moveableObject.otherDirection) {
            this.flipImage(moveableObject);
        }
        moveableObject.draw(this.ctx); // draw mirrored image on context
        moveableObject.drawFrames(this.ctx); // draw frames around each object for helping programming the collision effects
        // if we mirrored the context before drawing the image, reverse context to normal again after drawing
        if (moveableObject.otherDirection) {
            this.flipImageBack(moveableObject);
        }
    };


    /**
     * Flip image Direction
     * @param {object} MoveableObject
     */
    flipImage(moveableObject) {
        this.ctx.save(); // saves current (not mirrored) context to use it later for reverse mirrroring
        this.ctx.translate(moveableObject.width, 0);
        this.ctx.scale(-1, 1); // mirroring on y-Scale
        moveableObject.x = moveableObject.x * -1; // because context is mirrored, the x coordinate starts at other side of canvas
    }


    /**
     * Return image Direction
     * @param {object} MoveableObject
     */
    flipImageBack(moveableObject) {
        moveableObject.x = moveableObject.x * -1;
        this.ctx.restore();
    }
}