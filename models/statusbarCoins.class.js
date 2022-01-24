

class StatusbarCoins extends Drawableobject {

    x = 10;
    y = 40;
    width = 175;
    height = 50;


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

    increaseStatusbarCoins() {
        console.log('addCoin to statusbarCoins')
    }

    decreaseStatusbarCoins() {
        console.log('remove Coin from statusbarCoins')
    }



}