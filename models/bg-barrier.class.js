// background-image barrier

class Barrier extends MoveableObject{

    y = 0;
    width = 720;
    width = 720;
    height = 480; 


constructor(){
    super().loadImage('img/3. Background/Barrier/1.png');
    this.x = Math.random() * 500;// min = 0 max=700  
}

}