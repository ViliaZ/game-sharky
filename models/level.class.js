class Level {
    enemies;
    backgroundObjects;
    canvas_end_x = 2*720; // end of the level

    constructor(enemies, backgroundObjects) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
    }
}