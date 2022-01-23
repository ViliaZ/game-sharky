// this class contains MoveableObject

class Drawableobject {
    
    x = 0;
    y = 50;
    width = 200;
    height = 150;
    img;                                // if object is animated, this img is changed consistantly to create the animation
    imageCache = [];                    //array as storage of images animation
    currentImage = 0;                   // start animation here

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

    // draw on context
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);  // drawImage() is a API Browser Function: ctx.drawImage(image, dx, dy, dWidth, dHeight)
    }

    // Green rectangle around each object >> helping programming collisions
    drawFrames(ctx) {
        if (this instanceof Character || this instanceof Endboss || this instanceof Pufferfish) {  // exclude backgroundObjects from frames
            ctx.beginPath();
            ctx.lineWidth = '4';
            ctx.strokeStyle = 'orange';
            //rect() is a JS function with 4 Paramters: x, y, width, height
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

}