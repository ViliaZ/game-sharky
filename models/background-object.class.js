class BackgroundObject extends MoveableObject{
    width = 720;
    height = 480; 

constructor(imagePath, x){   // data for img path, x and y are given in world when creating new BackgroundObject
    super().loadImage(imagePath);
    this.x = x;  
    this.y = 480-this.height;  // this.height is height of the image - could also be hardcoded as "0" in this instance
}
}