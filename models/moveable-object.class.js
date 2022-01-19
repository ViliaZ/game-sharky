class MoveableObject {
    x=0;
    y=50;
    width = 200;
    height = 150;
    img;                                // if object is animated, this img is changed consistantly to create the animation
    imageCache = [];                    //array as storage of images animation
    currentImage = 0;                   // start animation here
    speed = 0.20 + Math.random() * 0.5;   // pixels to move
    otherDirection = false;             // mirroring object e.g. character looking to left
    speedY = 0;
    acceleration = 2;

    applyGravity(){
        setInterval(() => {
            if(this.objectIsAboveGround()){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            };
        },1000 / 25)
    }

    objectIsAboveGround(){
        return this.y < 270;   // 270px are sea ground (measured for the character object), NOTE that this is differnet for all images/objects depending on the png size
    }



    loadImage(path) {
        this.img = new Image();         // new Image() is already a JS method!  (its the same as creating <img src="">)
        this.img.src = path;
    }
    // Filling up imageCache with all images for animation
    loadImages(array) {
        array.forEach((path) => {       //path is the parameter and referring to each element of the array
            let img = new Image();      // JS method for creating an HTML object <img>
            img.src = path;
            this.imageCache[path] = img;// push all images into imagesCache Array --> path is the key and img is the value
        });
    }

    playAnimation(imageArray) {
        let i = this.currentImage % imageArray.length  // creates permanent circle of numbers from 0 to arraylength
        let path = imageArray[i]    // path is the key to the variable in imageCache
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 10)
    };

    moveRight() {
        console.log('moving right')
    }
}