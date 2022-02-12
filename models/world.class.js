
// this class contains most of the game logic (e.g. collision detection)

class World {
    // these are variables. Syntax; variables dont need "let" because they are written inside the Class (normally its: let character = new Character();)
    character = new Character();
    statusbar = new Statusbar();
    statusbarCoins = new StatusbarCoins();
    throwableObjects = [];
    jellyfishes = level1.jellyfish;
    level = level1;         // level1 is a constante in extra js file  --> level 1 contains enemies and backgroundobjects
    coins = level1.coins;
    enemies = level1.enemies;
    endboss = level1.enemies[level1.enemies.length - 1];
    gameOver = false;

    backgroundObjects = level1.backgroundObjects;


    canvas;                 // variable declaring, needs to be here to be available also for draw()
    ctx;                    // variable stands for "context" and is needed for drawing on canvas with "getContext('2d')
    camera_x = 0;           // moves world (context) on x axis
    keyboard;

    constructor(canvas, keyboard) {  // this is the id="canvas" div which is defined in game.js and the variable keyboard from game.js
        this.ctx = canvas.getContext('2d');  // create a new world and define the canvas  
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.runChecks();  // regualarly check collisions etc. 
    }

    // hand over complete world to character instance >> make everything in world accessable to character
    setWorld() {
        this.character.world = this;
    }

    // calling the addtoMap() draw any object onto context
    draw() {
        //clear Canvas each time for redrawing with parameters of canvas.width und canvas.height
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        // move context on x axis (when character is moving) >> all following elements are now drawn e.g. 100px to right >> after drawing the context be put on original position
        this.ctx.translate(this.camera_x, 0);
        // drawing functions for each object (character) or array of objects (e.g. enemies, backgroundObjects ..)
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.jellyfishes);
        this.addObjectsToMap(this.coins);
        //*********** */
        this.ctx.translate(-this.camera_x, 0);  // move ctx back to insert static elements 
        // ---- you can ADD FURTHER STATIC  (non moveable) objects here  -----
        this.addToMap(this.statusbar);
        this.addToMap(this.statusbarCoins);
        this.ctx.translate(this.camera_x, 0);  // move ctx forward again 
        //*********** */
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);  // throwableObject is an array >> therefore use addObjectstoMap insted addtoMap
        // move context to original position again
        this.ctx.translate(- this.camera_x, 0);
        // requestAnimationFrame() is a API Browser Function. NOTE: uses NO "THIS" to call this function!! its specific for this function! 
        let self = this;  // need to bind "this" to another variable so i can use it inside a nested function (otherwise "this" is not functioning)
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    checkGameOver() {
        if (gameOver) {  // defined in Game.js
            showGameOver(win);  
        }
    }

    // Check Collisions with any moveableObject that is an enemy  // check this multiple times each second for each enemy
    runChecks() {
        let runCheckInterval = setInterval(() => {
            this.checkCollisionsEnemies();  // character gets hurt
            this.checkCollisionJellyfish(); // jellyfish changes animation, but nothing happens. just for fun
            this.checkCollisionsCoins();    // statusbar coins increases
            this.checkThrowing();
            this.checkDistanceToEndboss();
            this.checkGameOver();

        }, 1000 / 20);
        allIntervals.push(runCheckInterval);
    }

    checkDistanceToEndboss() {
        let distanceEndboss = this.endboss.x - this.character.x;
        if (distanceEndboss < 450) {
            this.endboss.isNearCharacter = true;
        }
        else {
            this.endboss.isNearCharacter = false;
        }
    }

    checkThrowing() {
        // only throw Bubble if Coins are available
        if (this.keyboard.KEYD && this.statusbarCoins.percentage > 0) {
            let bubble = new ThrowableObject(this.character.x + 240, this.character.y + 130);
            this.throwableObjects.push(bubble);
            let checkThrowingInterval = setInterval(() => {
                this.checkIfEnemyHurt(bubble);
            }, 1000 / 20);
            allIntervals.push(checkThrowingInterval);
        }
        else { return }
    }

    // Collision Enemy and Bubble  >> bubble remove and hurt-animation Enemy initiated
    checkIfEnemyHurt(bubble) {
        this.enemies.forEach((enemy) => {
            if (bubble.isCollidingEnemy(enemy) && enemy instanceof Endboss) {
                enemy.hit();  // in moveableObjects, >> energy decrease 
                this.bubblesDissappear(bubble);
            }
        })
    }

    bubblesDissappear(bubble) {
        // bubbles dissappear after colliding enemy (for visual efficiacy, short Timeout, that bubbles dont disappear on enemy image border)
        let indexBubble = this.throwableObjects.indexOf(bubble);
        setTimeout(() => { this.throwableObjects.splice(indexBubble, 1) }, 10)
    }

    // character hurt via collision enemy
    checkCollisionsEnemies() {
        this.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();                                   // decrease energy
                this.statusbar.setPercentage(this.character.energy)     // this.character.energy is the number that we need to set our percentage of the statusbar
            }
        });
    }

    checkCollisionsCoins() {
        this.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                let indexCurrentCoin = this.coins.indexOf(coin);  // get index of the coin that was hit
                this.coins.splice(indexCurrentCoin, 1);  // splice coin from array of coins
                this.statusbarCoins.increaseStatusbarCoins();  // this.character.energy is the number that we need to set our percentage of the statusbar
                playAudio(AUDIOS.collectCoin);

            };
        });
    }

    checkCollisionJellyfish() {
        this.jellyfishes.forEach((jellyfish) => {
            if (this.character.isColliding(jellyfish) && this.keyboard.KEYF) {
                jellyfish.playAnimation(jellyfish.IMAGES_HURT);
                jellyfish.escape = true;
                playAudio(AUDIOS.hitJellyfish);
            };
        });
    }

    addObjectsToMap(objectsArray) {
        objectsArray.forEach(o => {
            this.addToMap(o)
        })
    }

    // draw Images on context - function is called inside of draw()
    addToMap(moveableObject) {
        //check if character moves in otherDirection >> mirroring the context (context is where the objects are drawn to)
        if (moveableObject.otherDirection) {
            this.flipImage(moveableObject);
        }
        moveableObject.draw(this.ctx);  // draw mirrored image on context
        moveableObject.drawFrames(this.ctx); // draw frames around each object for helping programming the collision effects
        // if we mirrored the context before drawing the image, reverse context to normal again after drawing
        if (moveableObject.otherDirection) {
            this.flipImageBack(moveableObject);
        }
    };

    flipImage(moveableObject) {
        this.ctx.save();  // saves current (not mirrored) context to use it later for reverse mirrroring
        this.ctx.translate(moveableObject.width, 0);
        this.ctx.scale(-1, 1);  // mirroring on y-Scale
        moveableObject.x = moveableObject.x * -1; // because context is mirrored, the x coordinate starts at other side of canvas
    }


    flipImageBack(moveableObject) {
        moveableObject.x = moveableObject.x * -1;
        this.ctx.restore();
    }
}
