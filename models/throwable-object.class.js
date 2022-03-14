// bubbles

class ThrowableObject extends MoveableObject {
    x;
    y;
    width = 24;
    height = 24;
    speedGravity = 0.4;
    acceleration = 10;
    moveBubbles = () => { this.x += 4 };  // default when character looks to right side, moves the bubble plus 4px each time
    collidedEnemy = false // used in world to prevent multipleCollissions

    IMAGE = 'img/1.Sharkie/4.Attack/Bubble trap/Bubble.png';

    constructor(x, y) {  // input is coordinates of character (bit adjusted)
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x - 10;
        this.y = y + 45; // to adjust bubble position to sharkys mouth
        this.throw();
    }

    throw() {  // when method is called, its given the x and y of character as parameters
        if (world.character.otherDirection === true) {  //character is looking to left side
            this.x -= 200;  // offset pixel 200 to shoot out of sharkys mouth and not in the middle of sharky
            this.moveBubbles = () => { this.x -= 4 };  // redefine to other shooting direction  (minus 4 instead of plus 4)
        }
        let throwInterval = setInterval(() => {
            this.moveBubbles();
        }, 1000 / 50);
        allIntervals.push(throwInterval);
        super.applyGravity();
    }

    // check collision with enemy
    isCollidingEnemy(enemy) {
        return this.x + this.width > enemy.x &&
            this.y + this.height > enemy.y &&
            this.x < enemy.x &&
            this.y < enemy.y + enemy.height
    }

}