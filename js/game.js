let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);  // the characters are created in world class
}


window.addEventListener('keydown', event => {
    console.log(event);

   let pressedKey = event.code;

   if (pressedKey === 'Space'){
   keyboard.SPACE = true; 
   console.log(keyboard.SPACE);}


})