class Drawableobject {
    // each drawableobject has the following properties
    x;
    y;
    width;
    height;
    img;                                // if object is animated, this img is changed consistantly to create the animation
    imageCache = [];                    //array as storage of images animation
    currentImage = 0;                   // start animation here


    /**
     * Load a single Image
     * @param {string} imagePath is given in each class in constructor when creating a new object
     * creating a new Image in the DOM with new Image()
     * Fill image Tag with src attribute
     */
    loadImage(path) {
        this.img = new Image();         // new Image() is already a JS method!  (its the same as creating <img src="">)
        this.img.src = path;
    }

    /**
     * Load an image Array (multiple images) for Animation
     * @param {string array} containing image paths
     * Create a ImageCache with all images --> keys are the paths
     */
    loadImages(array) {
        array.forEach((path) => {       //path is the parameter and referring to each element of the array
            let img = new Image();      // JS method for creating an HTML object <img>
            img.src = path;
            this.imageCache[path] = img;// push all images into imagesCache Array --> path is the key and img is the value
        });
    }

    /**
     * Draw Object on Context
     * @param {string} img
     * @param {number} x    
     * @param {number} y   
     * @param {number} width   
     * @param {number} height 
     * drawImage() is a Browser API Function: ctx.drawImage(image, dx, dy, dWidth, dHeight)
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);  
    }

    /**
     * Helper Function for game development  
     * @param {ctx}
     * Draw colored rectangles around each object >> to see borders of each object
     * helps to programm collisions of objects
     * rect() is a JS function with 4 Paramters: x, y, width, height
     */
    drawFrames(ctx) {
        console.log('frames only active in development mode');
        // if (this instanceof Character || this instanceof Endboss || this instanceof Pufferfish ||this instanceof Jellyfish ) {  // exclude backgroundObjects from frames
        //     ctx.beginPath();
        //     ctx.lineWidth = '4';
        //     ctx.strokeStyle = 'orange';
        //     ctx.rect(this.x, this.y, this.width, this.height);
        //     ctx.stroke();
        // }
    }

}