class Coins extends Drawableobject{

    x = 200 + Math.random() * 500;// min = 200 max=700  
    y = 1 + Math.random() * 700;// min = 1 max=700  

    width = 45;
    height = 45;

    IMAGE = ['img/4. Marcadores/1. Coins/3.png']


    constructor(){
        super().loadImage('img/4. Marcadores/1. Coins/3.png')
    }

}