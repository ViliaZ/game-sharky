class StatusbarCoins extends Drawableobject {
    x = 10;
    y = 40;
    width = 175;
    height = 50;
    percentage = 0;       // default game start, max: 100

    IMAGES = [
        'img/4. Marcadores/green/Coin/0_  copia 4.png',  // 0
        'img/4. Marcadores/green/Coin/20_  copia 2.png',
        'img/4. Marcadores/green/Coin/40_  copia 4.png',
        'img/4. Marcadores/green/Coin/60_  copia 4.png',
        'img/4. Marcadores/green/Coin/80_  copia 4.png',
        'img/4. Marcadores/green/Coin/100_ copia 4.png'  // 5
    ]

    /**
     * Statusbar for collected Coins 
     * Load all images that show statusbar in different states from full to empty
     */
    constructor() {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
    }


    /**
     * Increase % of Coins after character collides with coin
     * Trigger:  collision with a coin, function for calling: in class world
     * each coin equals 20% 
     */
    increaseStatusbarCoins() {
        this.percentage += 20;      
        this.resolvePercentage();
        this.setPercentage();
    }


    /**
     * Not in use atm
     */
    // decreaseStatusbarCoins() {
    //     this.percentage -= 10;  
    //     this.resolvePercentage();
    //     this.setPercentage();
    // }


    /**
     * Updates Coin Status 
     * loads image with correct percentage view according to coin level
     */
    setPercentage(){
        let path = this.IMAGES[this.resolvePercentage()]    // path is the key to the variable in imageCache
        this.img = this.imageCache[path];
    }

    /** Resolves current Coin Level in %
     * @return {number} from 0 to 5 that is used as index for Images Array in setPercentage() to laod statusbar image
     */
    resolvePercentage() {
        if (this.percentage === 100) {
            return 5;
        } else if (this.percentage === 80) {
            return 4;
        } else if (this.percentage === 60) {
            return 3;
        } else if (this.percentage === 40) {
            return 2;
        } else if (this.percentage === 20) {
            return 1;
        } else {
            return 0;
        }
    }
}