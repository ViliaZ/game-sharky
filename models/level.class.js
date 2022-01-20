class Level {
    enemies;
    backgroundObjects;
    canvas_end_x = 2*720; // end of the level

    constructor(enemies, backgroundObjects) {  // 2 array are given by creating a new instance --> in level1.js
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
    }
}