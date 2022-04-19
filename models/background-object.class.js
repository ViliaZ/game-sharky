class BackgroundObject extends MoveableObject{
    width = 720; // canvas dimension
    height = 480;  // canvas dimension

/**
 * Create new Instance of BackgroundObject
 * @param {string} imagePath data for img path given in world Class when creating new BackgroundObject
 * @param {number} x-Coordinate given in world Class when creating new BackgroundObject
 */
constructor(imagePath, x){   // 
    super().loadImage(imagePath);
    this.x = x;  
    this.y = 480-this.height;  // this.height is height of the image - could also be hardcoded as "0" in this instance
}
}