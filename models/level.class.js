class Level {
    coins;
    enemies;
    jellyfish;
    backgroundObjects;
    canvas_end_x = 4*720; // end of the level
    

    constructor(coins, enemies, jellyfish, backgroundObjects) { 
        this.coins = coins;
        this.enemies = enemies;
        this.jellyfish = jellyfish;
        this.backgroundObjects = backgroundObjects;
    }
}