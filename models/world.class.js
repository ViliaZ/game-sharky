

class World {
    // these are variables. Syntax; variables dont need "let" because they are written inside the Class (normally its: let character = new Character();)
    character = new Character();
    enemies = [
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
    ]
    barriers = [
        new Barrier()
    ]
    backgroundObjects = [
        new BackgroundObject('img/3. Background/Dark/1.png')
    ]

    canvas; // variable declaring, needs to be here to be available also for draw()
    ctx;  // variable stands for "context" and is needed for drawing on canvas with "getContext('2d')

    constructor(canvas) {  // this is the id="canvas" div which is defined in game.js
        this.ctx = canvas.getContext('2d');  // create a new world and define the canvas  
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        //clear Canvas each time for redrawing with parameters of canvas.width und canvas.height
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        // calls the drawing function
        this.addToMap(this.character);

        this.enemies.forEach(enemy =>{
            this.addToMap(enemy);
        })

        this.barriers.forEach(barrier =>{
            this.addToMap(barrier);
        })


        // set draw() on repeat (frequency id depending on users GUI)
        let self = this;  // need to bind "this" to another variable so i can use it inside a nested function (otherwise "this" is not functioning)
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addToMap(moveableObject) {   //drawImage() is a JS method: ctx.drawImage(image, dx, dy, dWidth, dHeight);
        this.ctx.drawImage(moveableObject.img, moveableObject.x, moveableObject.y, moveableObject.width, moveableObject.height)
    };

}

