// bubbles

class ThrowableObject extends MoveableObject {
    x;
    y;
    width = 18;
    height = 18;



    IMAGE = 'img/1.Sharkie/4.Attack/Bubble trap/Bubble.png';

    constructor(x, y) {  // input is coordinates of character (bit adjusted)
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x;
        this.y = y;
        this.throw();
    }

    throw() {  // when method is called, its giben the x and y of character as parameters
        setInterval(() => {
            this.x += 2;
        }, 1000 / 80);
        this.applyGravity();
    }

    // detects IF character is colliding with any object > boolean
    isCollidingEnemy(enemy) {
        return this.x + this.width > enemy.x 
        // &&
        //     this.y + this.height > enemy.y &&
        //     this.x < enemy.x &&
        //     this.y < enemy.y + enemy.height
    }



}