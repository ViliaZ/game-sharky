class Statusbar extends Drawableobject {

    IMAGES = [
        'img/4. Marcadores/green/Life/0_  copia 3.png',
        'img/4. Marcadores/green/Life/20_  copia 3.png',
        'img/4. Marcadores/green/Life/40_  copia 3.png',
        'img/4. Marcadores/green/Life/60_  copia 3.png',
        'img/4. Marcadores/green/Life/80_  copia 3.png',
        'img/4. Marcadores/green/Life/1000_  copia 3.png'
    ]

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 20;
        this.width = 200; 
        this.height = 60;
    }
}