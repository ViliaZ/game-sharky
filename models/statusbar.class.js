class Statusbar extends Drawableobject {

    x = 20;
    y = 20;
    width = 200;
    height = 60;
    percentage;  // initially 100% life energy


    IMAGES = [
        'img/4. Marcadores/green/Life/0_  copia 3.png',  // 0
        'img/4. Marcadores/green/Life/20_ copia 4.png',
        'img/4. Marcadores/green/Life/40_  copia 3.png',
        'img/4. Marcadores/green/Coin/60_  copia 4.png',
        'img/4. Marcadores/green/Life/80_  copia 3.png',
        'img/4. Marcadores/green/Life/100_  copia 2.png'  // 5
    ]

    constructor() {
        super();                           // initialize all mehtods and variable from overarching class
        this.loadImages(this.IMAGES);       // load images to imageCache
        this.setPercentage(100);            // initially load img with 100 percent life energy
    }


    setPercentage(percentage){
        this.percentage = percentage;       // applies argument to local variable (this.percentage)
        let path = this.IMAGES[this.resolvePercentage()]    // path is the key to the variable in imageCache
        this.img = this.imageCache[path];
    }


    // will return a number >> used as index for Images Array
    resolvePercentage() {   
        if (this.percentage == 100) {
            return 5;    
        }
        else if (this.percentage > 80) {
            return 4;
        } 
        else if (this.percentage > 60) {
            return 3;
        } 
        else if (this.percentage > 40) {
            return 2;
        } 
        else if (this.percentage > 20) {
            return 1;
        } 
        else
            return 0;
    }
}