let canvas;
let world;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);  // the characters are created in world class
}

