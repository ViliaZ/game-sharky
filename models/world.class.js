class World {
    
    character = new Character();   // these are variables. Syntax; variables dont need "let" because they are written inside the Class (normally its: let character = new Character();)
    enemies = [
        new Enemyfish(),
        new Enemyfish(),
        new Enemyfish()
    ]

    ctx;  // variable stands for "context" and is needed for drawing on canvas with "getContext('2d')
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');  // create a new world and define the canvas  
        this.draw();
    }

    // this is a Method (aka function): inside of a Class we dont need the word "function"; (normally its: function draw())
    // if using variables of the world object, we have to use "this" at the beginning
    // drawImage() is a JS Method: void ctx.drawImage(image, dx, dy, dWidth, dHeight);; >> https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage

    draw() {  

        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);

        // draw() is requested on repeat
        let self = this;  // need to bind "this" to another variable so i can use it inside a nested function (otherwise "this" is not functioning)
        requestAnimationFrame(function(){
            self.draw();
        });
    }
}