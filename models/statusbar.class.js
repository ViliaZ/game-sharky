class Statusbar extends Drawableobject {

    x = 0;
    y = 0;
    width = 200;
    height = 60;
    percentage = 100;  // initially 100% life energy


    IMAGES = [
        'img/4. Marcadores/green/Life/0_  copia 3.png',  // 0
        'img/4. Marcadores/green/Life/20_ copia 4.png',
        'img/4. Marcadores/green/Life/40_  copia 3.png',
        'img/4. Marcadores/green/Life/60_  copia 3.png',
        'img/4. Marcadores/green/Life/80_  copia 3.png',
        'img/4. Marcadores/green/Life/100_  copia 2.png'  // 6
    ]

    constructor() {
        super()                             // initialize all mehtods and variable from overarching class
        this.loadImages(this.IMAGES);       // load images to imageCache
        this.showStatusbarPercentage(100);  // initially load img with 100 percent life energy
    }


    showStatusbarPercentage(percentage){
        this.percentage = percentage;  // applies argument to local variable (this.percentage)
        let path = this.IMGAGES[this.resolvePercentage()]    // path is the key to the variable in imageCache
        this.img = this.imageCache[path];
    }


    // will return a number >> used as index for Images Array
    resolvePercentage() {   
        if (percentage == 100) {
            return 5    
        }
        else if (percentage > 80) {
            return 4
        } 
        else if (percentage > 60) {
            return 3
        } 
        else if (percentage > 40) {
            return 2
        } 
        else if (percentage > 20) {
            return 1
        } 
        else
            return 0
    }


}