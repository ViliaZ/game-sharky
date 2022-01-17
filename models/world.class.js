

class World {
    // these are variables. Syntax; variables dont need "let" because they are written inside the Class (normally its: let character = new Character();)
    character = new Character();
    enemies = [
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish()
    ]

    backgroundObjects = [
        new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 0, 0),   // Arguments: img, x, y 
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D.png', 0, 0),
        new BackgroundObject('img/3. Background/Layers/4.Fondo 2/L.png', 0, 0),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D.png', 0, 0),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 0, 0),
        new BackgroundObject('img/3. Background/Layers/1. Light/COMPLETO.png', 0, 0),
    ]

    canvas;     // variable declaring, needs to be here to be available also for draw()
    ctx;        // variable stands for "context" and is needed for drawing on canvas with "getContext('2d')
    keyboard;

    constructor(canvas, keyboard) {  // this is the id="canvas" div which is defined in game.js and the variable keyboard from game.js
        this.ctx = canvas.getContext('2d');  // create a new world and define the canvas  
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    // hand over complete world to character instance >> make everything in world accessable to character
    setWorld() {
        this.character.world = this;
    }

    draw() {
        //clear Canvas each time for redrawing with parameters of canvas.width und canvas.height
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        // calling drawing functions for each object (character) or array of objects (e.g. enemies, backgroundObjects ..)
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);

        // set draw() on repeat (frequency id depending on users GUI)
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

    // draw Images on context
    addToMap(moveableObject) {

        //check if character moves in otherDirection >> mirroring the context (context is where the objects are drawn to)
        if (moveableObject.otherDirection) {
            this.ctx.save();  // saves current (not mirrored) context to use it later for reverse mirrroring
            this.ctx.translate(moveableObject.width, 0);
            this.ctx.scale(-1, 1);  // mirroring on y-Scale
            moveableObject.x = moveableObject.x * -1; // because context is mirrored, the x coordinate starts at other side of canvas
        }
        // draw image on context - drawImage() is a JS method: ctx.drawImage(image, dx, dy, dWidth, dHeight);
        this.ctx.drawImage(moveableObject.img, moveableObject.x, moveableObject.y, moveableObject.width, moveableObject.height);

        // if we mirrored the context before drawing the image, reverse context to normal again after drawing
        if (moveableObject.otherDirection) {
            moveableObject.x = moveableObject.x * -1;
            this.ctx.restore();
        }
    };
}



    // draw Images on context
//     addToMap(moveableObject) {

//         //check if character moves in otherDirection >> mirroring the context (context is where the objects are drawn to)
//         if (moveableObject.otherDirection) {
//             this.ctx.save();  // saves current (not mirrored) context to use it later for reverse mirrroring
//             this.ctx.translate(moveableObject.width, 0);
//             this.ctx.scale(-1, 1);  // mirroring on y-Scale
//             moveableObject.x = moveableObject.x * -1; // because context is mirrored, the x coordinate starts at other side of canvas
//         }
//         // draw image on context - drawImage() is a JS method: ctx.drawImage(image, dx, dy, dWidth, dHeight);
//         this.ctx.drawImage(moveableObject.img, moveableObject.x, moveableObject.y, moveableObject.width, moveableObject.height);

//         // if we mirrored the context before drawing the image, reverse context to normal again after drawing
//         if (moveableObject) {
//             moveableObject.x = moveableObject * -1;
//             this.ctx.restore();
//         }
//     };
// }
