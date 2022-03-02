let canvas;
let world;
let gameOver = false;
let fullscreenmode = false;

let keyboard = new Keyboard();
let touchevents = new Touchevents();  // for mobile use
let pressedKey = false;  // either undefined (no key pressed) or definied with the pressed key code (see functions below)
let touchedButton = false; // on mobile: either undefined (no button touched) or definied with the pressed key code (see functions below)


function startGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, touchevents);  // transfer the two variables to world class, >> make them accessable there
    addToucheventListenerStart();
    addToucheventListenerStop();
    // playAudio(AUDIOS.background);
}

function addToucheventListenerStart() {  // for mobile usage
    document.getElementById('m-btn-bubble').addEventListener('touchstart', e => {
        touchevents.touchBUBBLE = true;
    });
    document.getElementById('m-btn-finslap').addEventListener('touchstart', e => {
        touchevents.touchFINSLAP = true;
    });
    document.getElementById('m-up').addEventListener('touchstart', e => {
        touchevents.touchUP = true;
    });
    document.getElementById('m-down').addEventListener('touchstart', e => {
        touchevents.touchDOWN = true;
    });
    document.getElementById('m-right').addEventListener('touchstart', e => {
        touchevents.touchRIGHT = true;
    });
    document.getElementById('m-left').addEventListener('touchstart', e => {
        touchevents.touchLEFT = true;
    });
    document.getElementById('musicToggle').addEventListener('touchstart', e => {
        touchevents.touchAUDIOOFF = true;
        // stop all Audio
        stopAllAudio();
    });
}

function addToucheventListenerStop() {  // for mobile usage
    document.getElementById('m-btn-bubble').addEventListener('touchend', e => {
        touchevents.touchBUBBLE = false;
    });
    document.getElementById('m-btn-finslap').addEventListener('touchend', e => {
        touchevents.touchFINSLAP = false;
    });
    document.getElementById('m-up').addEventListener('touchend', e => {
        touchevents.touchUP = false;
    });
    document.getElementById('m-down').addEventListener('touchend', e => {
        touchevents.touchDOWN = false;
    });
    document.getElementById('m-right').addEventListener('touchend', e => {
        touchevents.touchRIGHT = false;
    });
    document.getElementById('m-left').addEventListener('touchend', e => {
        touchevents.touchLEFT = false;
    });
    document.getElementById('musicToggle').addEventListener('touchend', e => {
        touchevents.touchAUDIOOFF = false;
        // start all Audio again;
    });
}


// must be adjusted!! fullscreenmode variable not making sense yet
function checkFullscreen() {
    let fullscreenToggle = document.getElementById('fullscreenToggle');
    let instructionPanel = document.getElementById('game-instructions');

    if (fullscreenToggle.checked || fullscreenmode == false) {
        canvas.requestFullscreen();
        console.log(instructionPanel)
        fullscreenmode = true;
    }
    else if (fullscreenmode == true) {
        canvas.exitFullscreen();
        fullscreenmode = false;
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
    restart = true;
    document.getElementById('background-music').pause();
    document.getElementById('m-instructions-wrapper').classList.add('d-none');

    await stopAllIntervals();
    // await stopAllAudio();
    let endScreen = document.getElementById('endScreen');
    endScreen.classList.remove('d-none');
    document.getElementById('canvas').classList.add('d-none');
    endScreen.innerHTML = '';
    if (
        sharkyStatus === "sharkyLoose") {
        endScreen.innerHTML = generateLooseScreen();
        setTimeout(startGameAgain, 2000);
    }
    else {
        endScreen.innerHTML = generateWinScreen();
        setTimeout(startGameAgain, 2000);
    }

}

function generateWinScreen() {
    endScreen.innerHTML = '';
    return `<img id="winImage" src="img/6.Botones/Tittles/You win/Mesa de trabajo 1.png">`
}

function generateLooseScreen() {
    endScreen.innerHTML = '';
    return `<img id="looseImage" src="img/6.Botones/Tittles/Game Over/Recurso 10.png">`
}

function startGameAgain() {
    window.location.href = 'welcome.html';
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
