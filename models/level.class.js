class Level {
    coins;
    enemies;
    jellyfish;
    backgroundObjects;
    canvas_end_x = 2*720; // end of the level
    

    constructor(coins, enemies,jellyfish, backgroundObjects) {  // 2 array are given by creating a new instance --> in level1.js
        this.coins = coins;
        this.enemies = enemies;
        this.jellyfish = jellyfish;
        this.backgroundObjects = backgroundObjects;
    }
}