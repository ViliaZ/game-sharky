class Level {
    coins;
    enemies;
    jellyfish;
    backgroundObjects;
    canvas_end_x = 3*660; // end of the level
    
    /**
     * @param {object} Coins 
     * @param {object} Enemies 
     * @param {object} Jellyfish 
     * @param {object} BackgroundObject 
     * defines a Level with containing objects
     * defines where canvas ends on x axis 
     */
    constructor(coins, enemies, jellyfish, backgroundObjects) { 
        this.coins = coins;
        this.enemies = enemies;
        this.jellyfish = jellyfish;
        this.backgroundObjects = backgroundObjects;
    }
}