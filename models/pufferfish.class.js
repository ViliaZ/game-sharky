// "extends" states that class chicken is part of MovableObject >> gets all variables of Moveableobjects


class Pufferfish extends MoveableObject {
    width = 65;
    height = 55;

    IMAGES_SWIMMING = [
   'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
   'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
   'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
   'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
   'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
   'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png',
   'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png',
   'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png',
   'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png',
   'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png',
   'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png',
   'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png',
   'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png',
   'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png',
   'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png'
    ]

    constructor() {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png')
        this.loadImages(this.IMAGES_SWIMMING)
        this.x = 200 + Math.random() * 500;// min = 200 max=700  
        this.y = 1 + Math.random() * 700;// min = 1 max=700  
        this.animate();
        this.moveLeft();
    }

    animate() {
        // change img (defined in MoveableObjects every 1000 ms)
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_SWIMMING.length  // creates permanent circle of 0 to 15
            let path = this.IMAGES_SWIMMING[i]    // path is the key to the variable in imageCache
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 150);
    }


}