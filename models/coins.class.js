class Coins extends Drawableobject {  
// NOTE: only when coins are collected, its possible to throw bubbles

    x = 500 + Math.random() * (3 * 400);// min = 500 max=700  
    y = 1 + Math.random() * 420;// min = 1 max=700  
    //  
    width = 45;
    height = 45;

    IMAGE = ['img/4. Marcadores/1. Coins/3.png']

    /**
     * Create new Instance of Coins
     * Amount of Coins can be modified in level.js 
     * Each image is loaded/drawn in Drawableobject Class
     * Random Placement according to x and y Coordinates
     */
    constructor() {
        super().loadImage('img/4. Marcadores/1. Coins/3.png')
    }

}