// "extends" states that class chicken is part of MovableObject >> gets all variables of Moveableobjects

class Pufferfish extends MoveableObject {
    width = 65;
    height = 55;


    // normal
    IMAGES_SWIMMING = [
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png'
    ]

    // when hurt
    IMAGES_SWIM_RED = [
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png'
    ]

    constructor() {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png')
        this.loadImages(this.IMAGES_SWIMMING)
        this.x = 400 + Math.random() * 500;// min = 400 max=700  
        this.y = 1 + Math.random() * 700;// min = 1 max=700  
        this.animate();
    }

    animate() {
        let pufferfishInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_SWIMMING);
            this.moveLeft('pufferfish')
        }, 150);
        allIntervals.push(pufferfishInterval);
    }
}