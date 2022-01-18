class Level {
    enemies;
    backgroundObjects;
    endboss;
    canvas_end_x = 2*720; // end of the level

    constructor(enemies, backgroundObjects, endboss) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.endboss = endboss;
    }
}