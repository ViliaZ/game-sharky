let canvas;
let world;
let keyboard = new Keyboard();

let gameOver = false;

let allIntervals = [];


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
    if (pressedKey === 'KeyF') {
        keyboard.KEYF = true;
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
    if (pressedKey === 'KeyF') {
        keyboard.KEYF = false;
    }
})

function showGameOver(sharkyStatus) {
    stopAllIntervals();

    let endscreen = document.getElementById('endScreen');
    let canvas = document.getElementById('canvas');
    canvas.classList.add('d-none');
    endscreen.classList.remove('d-none');

    if (sharkyStatus === "sharkyWin") {
        endscreen.innerHTML = '';
        endscreen.innerHTML = `<img id="winImage" src="img/6.Botones/Tittles/You win/Mesa de trabajo 1.png">
        <img class="btn-startAgain" onclick = "startGameAgain(canvas, endscreen)" src="img/6.Botones/Try again/Recurso 15.png" alt="">
        `
    }
    else {
        endscreen.innerHTML = '';
        endscreen.innerHTML += `<img id="looseImage" src="img/6.Botones/Tittles/Game Over/Recurso 10.png">
        <img class="btn-startAgain" onclick = "startGameAgain(canvas, endscreen)" src="img/6.Botones/Try again/Recurso 15.png">
        `
    }
}

    function startGameAgain(canvas) {
        let endscreen = document.getElementById('endScreen');

        canvas.classList.remove('d-none');
        endscreen.classList.add('d-none');
    }

    function stopAllIntervals(){
        clearInterval(allIntervals);
    }

