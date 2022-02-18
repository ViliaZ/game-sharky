let canvas;
let world;
let keyboard = new Keyboard();
let gameOver = false;
let fullscreenmode = false;
let pressedKey = false;  // either undefined(no key pressed) or definied with the pressed key code (see functions below)


function startGame() {
    document.getElementById('welcomeScreen').classList.add('d-none');
    document.getElementById('fullscreenBtn').classList.remove('d-none');
    // document.getElementById('background-music').play();
    // document.getElementById('togglesContainer').classList.remove('d-none');
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);  // transfer the two variables to world class, >> make them accessable there

    // playAudio(AUDIOS.background);
}

function fullscreen() {
    if (fullscreenmode === true) {
        canvas.exitFullscreen();
        fullscreenmode === false;
    }
    else {
        canvas.requestFullscreen()
        fullscreenmode === true;
    }
}

function playAudio(soundData) {
    let sound = new Audio(soundData);
    sound.play();
    allAudioPlaying.push(sound);
}

// function pauseAudio(soundData){
//     let newAudio = new Audio (soundData);
//     newAudio.pause();
// }

// function stopAllAudio() {
//     allAudioPlaying.forEach(sound => {
//         sound.pause();
//     });
//     allAudioPlaying = [];
// }

async function showGameOver(sharkyStatus) {
    document.getElementById('background-music').pause();

    await stopAllIntervals();
    // await stopAllAudio();
    let endScreen = document.getElementById('endScreen');
    endScreen.classList.remove('d-none');
    document.getElementById('headline').classList.add('d-none');
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('fullscreenBtn').classList.add('d-none');
    endScreen.innerHTML = '';
    if (
        sharkyStatus === "sharkyLoose") {
        endScreen.innerHTML = generateLooseScreen();
    }
    else {
        endScreen.innerHTML = generateWinScreen();
    }
}

function generateWinScreen() {
    endScreen.innerHTML = '';
    return `<img id="winImage" src="img/6.Botones/Tittles/You win/Mesa de trabajo 1.png">
    <img class="btn-startAgain" onclick="startGameAgain()" src="img/6.Botones/Try again/Recurso 15.png">`
}

function generateLooseScreen() {
    endScreen.innerHTML = '';
    return `<img id="looseImage" src="img/6.Botones/Tittles/Game Over/Recurso 10.png">
    <img class="btn-startAgain" onclick="startGameAgain()" src="img/6.Botones/Try again/Recurso 18.png">`
}

function startGameAgain() {
    // let endScreen = document.getElementById('endScreen');
    // let canvas = document.getElementById('canvas');
    // canvas.classList.remove('d-none');
    // endScreen.innerHTML = '';
    // endScreen.classList.add('d-none');
    // document.getElementById('headline').classList.remove('d-none');
    // sharkyStatus = null;
    window.location.reload();
}

function stopAllIntervals() {
    allIntervals.forEach(interval => {
        clearInterval(interval);
        allIntervals.shift();
    });
}

window.addEventListener('keydown', event => {
    // Eventlistener is returning a JSON (console.log(event) >> the key "code" defines the key that was pressed)
    pressedKey = event.code;

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

    pressedKey = event.code;

    if (pressedKey === 'Space') {
        keyboard.SPACE = false;
        pressedKey = false; // sets variable to false so the idle animation of sharky will play
    }
    if (pressedKey === 'ArrowUp') {
        keyboard.UP = false;
        pressedKey = false; // sets variable to false so the idle animation of sharky will play
    }
    if (pressedKey === 'ArrowDown') {
        keyboard.DOWN = false;
        pressedKey = false; // sets variable to false so the idle animation of sharky will play

    }
    if (pressedKey === 'ArrowLeft') {
        keyboard.LEFT = false;
        pressedKey = false; // sets variable to false so the idle animation of sharky will play

    }
    if (pressedKey === 'ArrowRight') {
        keyboard.RIGHT = false;
        pressedKey = false; // sets variable to false so the idle animation of sharky will play

    }
    if (pressedKey === 'KeyD') {
        keyboard.KEYD = false;
        pressedKey = false; // sets variable to false so the idle animation of sharky will play

    }
})
