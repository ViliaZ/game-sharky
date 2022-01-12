

class BackgroundObject extends MoveableObject{

    // y = 0;
    // width = 720;
    // width = 720;
    // height = 480; 


constructor(imagePath){
    super().loadImage(imagePath);
    this.x = Math.random() * 500;// min = 0 max=700  
}

}