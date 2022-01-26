let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);  // transfer the two variables to world class, >> make them accessable there
}


window.addEventListener('keydown', event => {
    // Eventlistener is returning a JSON (console.log(event) >> the key "code" defines the key that was pressed)
let pressedKey = event.code;
console.log(event);

if (pressedKey === 'Space') {
    keyboard.SPACE = true;
}
if (pressedKey === 'ArrowUp') {
    keyboard.UP = true;
}
if (pressedKey === 'ArrowDown') {
    keyboard.DOWN = true;
}
if (pressedKey === 'ArrowLeft') {
    keyboard.LEFT = true;
}
if (pressedKey === 'ArrowRight') {
    keyboard.RIGHT = true;
}
if (pressedKey === 'KeyD') {
    keyboard.KEYD = true;
}
})


// Returning variables to false after keyup
window.addEventListener('keyup', event => {

    let pressedKey = event.code;

    if (pressedKey === 'Space') {
        keyboard.SPACE = false;
    }
    if (pressedKey === 'ArrowUp') {
        keyboard.UP = false;
    }
    if (pressedKey === 'ArrowDown') {
        keyboard.DOWN = false;
    }
    if (pressedKey === 'ArrowLeft') {
        keyboard.LEFT = false;
    }
    if (pressedKey === 'ArrowRight') {
        keyboard.RIGHT = false;
    }    
    if (pressedKey === 'KeyD') {
        keyboard.KEYD = false;
    }
})

function showSuccessPage(){
    console.log('you have successfully suvived - SUCESS PAGE')
}

function showLoosingPage(){
    console.log('try again - YOU LOST PAGE');
}

