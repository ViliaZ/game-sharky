// bubbles

class ThrowableObject extends MoveableObject {
    x;
    y;
    width = 24;
    height = 24;
    speedY = 0.3;
    acceleration = 0.1;
    direction = () => { this.x += 4 };  // default when character looks to right side

    IMAGE = 'img/1.Sharkie/4.Attack/Bubble trap/Bubble.png';

    constructor(x, y) {  // input is coordinates of character (bit adjusted)
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x;
        this.y = y;
        this.throw();
    }

    throw() {  // when method is called, its given the x and y of character as parameters
        if (world.character.otherDirection === true) {  //character is looking to left side
            this.x -= 200;  // to shoot out of sharkys mouth
            this.direction = () => { this.x -= 4 };  // redefine to other shooting direction  (minus 4 instead of plus 4)
        }
            let throwInterval = setInterval(() => {
                this.direction();
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