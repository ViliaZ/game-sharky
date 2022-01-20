
// this class contains most of the game logic (e.g. collision detection)

class World {
    // these are variables. Syntax; variables dont need "let" because they are written inside the Class (normally its: let character = new Character();)
    character = new Character();
    enemies = level1.enemies;
    level = level1;   // level1 is a constante in extra js file  --> level 1 contains enemies and backgroundobjects
    backgroundObjects = level1.backgroundObjects;

    canvas;             // variable declaring, needs to be here to be available also for draw()
    ctx;                // variable stands for "context" and is needed for drawing on canvas with "getContext('2d')
    camera_x = 0;       // moves world (context) on x axis
    keyboard;

    constructor(canvas, keyboard) {  // this is the id="canvas" div which is defined in game.js and the variable keyboard from game.js
        this.ctx = canvas.getContext('2d');  // create a new world and define the canvas  
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    // hand over complete world to character instance >> make everything in world accessable to character
    setWorld() {
        this.character.world = this;
    }

    draw() {
        //clear Canvas each time for redrawing with parameters of canvas.width und canvas.height
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        // move context on x axis (when character is moving) >> all following elements are now drawn e.g. 100px to right >> after drawing the context be put on original position
        this.ctx.translate(this.camera_x, 0);

        // drawing functions for each object (character) or array of objects (e.g. enemies, backgroundObjects ..)
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);

        // move context to original position again
        this.ctx.translate(- this.camera_x, 0);

        // requestAnimationFrame() is a API Browser Function. NOTE: uses NO "THIS" to call this function!! its specific for this function! 
        let self = this;  // need to bind "this" to another variable so i can use it inside a nested function (otherwise "this" is not functioning)
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objectsArray) {
        objectsArray.forEach(o => {
            this.addToMap(o)
        })
    }

    // Check Collisions with any moveableObject that is an enemy  // check this multiple times each second for each enemy
    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => 
            {
                if(this.character.isColliding(enemy)){
                    this.character.hit();  // decrease energy
                }
            });
            this.checkDeath();
        }, 1000);
    }

    checkDeath(){
if(this.character.energy <= 0)
console.log('character is dead');

    }

    // draw Images on context
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
