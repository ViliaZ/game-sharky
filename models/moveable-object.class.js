class MoveableObject {
    x = 0;
    y = 0;
    width = 200;
    height = 150;
    img;   // if object is animated, this img is changed consistantly to create the animation
    imageCache = []; //array as storage of images animation
    currentImage = 0;  // start animation here
    speed = 0.20 + Math.random()*0.5;  // pixels to move

    loadImage(path) {
        this.img = new Image();  // new Image() is already a JS method!  (its the same as creating <img src="">)
        this.img.src = path;
    }
    // Filling up imageCache with all images for animation
    loadImages(array) {
        array.forEach((path) => {                //path is the parameter and referring to each element of the array
            let img = new Image();               // JS method for creating an HTML object <img>
            img.src = path;
            this.imageCache[path] = img;         // push all images into imagesCache Array --> path is the key and img is the value
        });
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