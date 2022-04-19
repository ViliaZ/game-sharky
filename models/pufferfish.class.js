class Pufferfish extends MoveableObject {
    width = 65;
    height = 55;
    changedColor = false; // color change when hurt with bubble

    // normal
    IMAGES_GREEN = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
    ]

    // when hurt
    IMAGES_TRANSITION_RED = [
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png'
    ]

    // after hurt
    IMAGES_SWIM_RED = [
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition5.png'
    ]


    /**
     * Create new Instance of Pufferfish
     * Each image is loaded/drawn in Drawableobject Class
     * Random Placement according to x and y Coordinates
     * Initiate Animation 
     */
    constructor() {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png')
        this.loadImages(this.IMAGES_GREEN)
        this.loadImages(this.IMAGES_SWIM_RED)
        this.loadImages(this.IMAGES_TRANSITION_RED)
        this.x = 400 + Math.random() * (3*500);// min = 400 max=700  
        this.y = 1 + Math.random() * 700;// min = 1 max=700  
        this.animate();
    }

    /**
     * Pufferfish Animation 
     * Animation: Swim Left, Change Color and increase speed when hurt by bubble
     * Animation: Escape Up when hurt by Finslap
     */
    animate() {
        let pufferfishInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_GREEN);
            this.moveLeft(1);

            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_TRANSITION_RED);
                this.changedColor = true;
                this.moveLeft(2);
            }
            else if (this.changedColor == true) {
                this.playAnimation(this.IMAGES_SWIM_RED);
                this.moveLeft(2);
            }
        }, 150);
        allIntervals.push(pufferfishInterval);
    }
}