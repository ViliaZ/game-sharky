class ThrowableObject extends MoveableObject {  
    // throwableObjects are bubbles 

    x;
    y;
    width = 24;
    height = 24;
    speedGravity = 0.4;
    acceleration = 10;
    moveBubbles = () => { this.x += 4 };    // default when character looks to right side, moves the bubble plus 4px each time
    collidedEnemy = false                   // used in world to prevent multipleCollissions

    IMAGE = 'img/1.Sharkie/4.Attack/Bubble trap/Bubble.png';


    /**
     * Create new Instance of ThrowableObjects ( Bubbles )
     * @param {number} x coordinate - adjusted to position of characters mouth 
     * @param {number} y coordinate - adjusted to position of characters mouth 
     * initialize throw() immediately after creating a new bubble
     */
    constructor(x, y) {                     
        super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x - 10;
        this.y = y + 45;                 
        this.throw();
    }

    /**
     * Throw Animation for Bubble
     * throw to left or to right side, depending on character turn
     * apply Gravity for bubble movement
     */
    throw() {                               
        if (world.character.otherDirection === true) {  //character is looking to left side
            this.x -= 200;                              // offset pixel 200 to shoot out of sharkys mouth and not in the middle of sharky
            this.moveBubbles = () => { this.x -= 4 };  // redefine to other shooting direction  (minus 4 instead of plus 4)
        }
        let throwInterval = setInterval(() => {
            this.moveBubbles();
        }, 1000 / 50);
        allIntervals.push(throwInterval);
        super.applyGravity();
    }


    /**
     * Check Collision with enemies
     * @param {boolean} 
     */
    isCollidingEnemy(enemy) {
        return this.x + this.width > enemy.x &&
            this.y + this.height > enemy.y &&
            this.x < enemy.x &&
            this.y < enemy.y + enemy.height
    }
}