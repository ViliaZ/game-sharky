

class StatusbarCoins extends Drawableobject {

    x = 10;
    y = 40;
    width = 175;
    height = 50;
    percentage = 0;       // default by game start - each coin is worth 10%

    IMAGES = [
        'img/4. Marcadores/green/Coin/0_  copia 4.png',  // 0
        'img/4. Marcadores/green/Coin/20_  copia 2.png',
        'img/4. Marcadores/green/Coin/40_  copia 4.png',
        'img/4. Marcadores/green/Coin/60_  copia 4.png',
        'img/4. Marcadores/green/Coin/80_  copia 4.png',
        'img/4. Marcadores/green/Coin/100_ copia 4.png'  // 5
    ]


    constructor() {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
    }




    // Trigger: when collision with a coin was detected, call this function (class world)
    increaseStatusbarCoins() {
        this.percentage += 20;  // each coin is worth 20% 
        this.resolvePercentage();
        this.setPercentage();
    }

    // Trigger: 
    decreaseStatusbarCoins() {
        console.log('remove Coin from statusbarCoins')
        this.percentage -= 20;  // each coin is worth 20% 
        this.resolvePercentage();
        this.setPercentage();
    }

    resolvePercentage() {
        if (this.percentage === 100) {
            return 5;
        } if (this.percentage === 80) {
            return 4;
        } if (this.percentage === 60) {
            return 3;
        } if (this.percentage === 40) {
            return 2;
        } if (this.percentage === 20) {
            return 1;
        } else {
            return 0;
        }
    }

    setPercentage(){
        let path = this.IMAGES[this.resolvePercentage()]    // path is the key to the variable in imageCache
        this.img = this.imageCache[path];
    }






}