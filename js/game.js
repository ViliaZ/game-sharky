let canvas;
let world;
let gameOver = false;
let fullscreenmode = false; 
let soundsMuted = false;  // doesnt include bgMusic (this is HTML tag "audio")
let swimmingSound = false;
let keyboard = new Keyboard();
let touchevents = new Touchevents();  // for mobile use
let pressedKey = false;  // either undefined (no key pressed) or definied with the pressed key code 
let touchedButton = false; // on mobile: either undefined (no button touched) or definied with the pressed key code 


/**
 * Initialize Enter Animation for Game screen
 */
function animationEnterScreen() {
    let instructionsPanel = document.getElementById('game-instructions');
    instructionsPanel.classList.add('animationSlideFromButtom');
    canvas = document.getElementById('canvas');
    canvas.classList.add('canvasEnter');
    startGame();
}


/**
 * Initialize New World Class
 */
function startGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, touchevents);  // transfer the two variables to world class, >> make them accessable there
    document.getElementById('background-music').volume = 0.07;  // for BG music only info: to insert volume attribute in HTML TAG directly did not work, 
    addToucheventListenerStart();
    addToucheventListenerStop();
}


/**
 * EventHandler Click on Audio Settings (Desktop)
 * remove Focus from Audio Settings back to game
 */
function removeFocus() {
    document.getElementById('background-music').blur(); // desktop HTML 
}


/**
 * EventHandler Click on Audio Settings (Mobile)
 * remove Focus from Audio Settings back to game
 */
function removeFocusMobile() {
    document.getElementById('musicToggle').blur(); // mobile HTLM
}
 

/**
 * Show Hint on Screen - how to use bubbles
 * Trigger: Click SPACE-key before user collected any coins (bubbling is only enabled when coins are collected)
 */
function showGameTipp() {
    let tipContainer = document.getElementById('tip');
    tipContainer.classList.remove('d-none');
    setTimeout(() => {
        tipContainer.classList.add('d-none');
    }, 8000);
}


/**
 * EventHandler Touchevents (mobile only)
 * Trigger: touch starts
 */
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

    });
}


/**
 * EventHandler Touchevents (mobile only)
 * Trigger: touch stops
 */
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


/**
 * EventHandler FullscreenToggle 
 * Sets Fullscreen when toggle is activated
 * Resets toggle automatically after 1sec (without leaving fullscreenmode)
 */
function checkFullscreen() {
    let fullscreenToggle = document.getElementById('fullscreenToggle');
    if (fullscreenToggle.checked == true || fullscreenmode == false) {
        setTimeout(() => { canvas.requestFullscreen() }, 200);
        fullscreenmode = true;
        setTimeout(() => { fullscreenToggle.checked = false }, 1000); // uncheck toggle (is a checkbox)
    }
}


/**
 * EventHandler Mute-Toggle 
 * Sets Sounds and Background Audio to mute
 */
function checkAudioMuting() {
    let audioToggle = document.getElementById('musicToggle');
    if (audioToggle.checked || soundsMuted == false) {
        stopAllAudio();
        soundsMuted = true; // global variable
    }
    else if (soundsMuted == true) {
        let bgMusicHTML = document.getElementById('background-music');
        bgMusicHTML.muted = false;  // activates bgMusic in HTML Tag
        soundsMuted = false; // global variable
    }
}


/**
 * Initializes Audio Sounds;
 * @param {string} from AUDIOS
 * @param {number} as volume (0 - 1)
 * Throttle Swim Sound (if triggert permanently, it echoes)
 * Array for all active Sounds is found in index.html !! as global defined to make it accessable right from start 
 */
function playAudio(soundData, volume) {
    if (soundData == AUDIOS.characterSwim) {
        throttleAudio(soundData, volume);
    }    

    else {
        let sound = new Audio(soundData);
        sound.volume = volume;
        sound.play();
    }
    allAudioPlaying.push(soundData);  // array allAudioPlaying is initialized in head (script) in index.html
}


/**
 * Throttle Audio: Needed for swimming sound to fix audio quality
 * @param {string} from AUDIOS
 * @param {number} as volume (0 - 1)
 */
function throttleAudio(soundData, volume) {
    if (swimmingSound == true) return  // is globally per default: false
    swimmingSound = true;

    let sound = new Audio(soundData);
    sound.volume = volume;

    setTimeout(() => {
        sound.play();
        swimmingSound = false;
    }, 1000);
}


/**
 * Pause Audio
 * @param {string} from AUDIOS
 */
function pauseAudio(soundData) {
    let newAudio = new Audio(soundData);
    newAudio.pause();
}


/**
 * Handle Game Over: Win and Loose of Character Sharky
 * @param {string} sharkyWin or
 * @param {string} sharkyLoose
 * Initializes End szenario: Audio, Endscreen View
 * Initializes Game Restart (startGameAgain) after 2sec of animation Endscreen
 */
function showGameOver(sharkyStatus) {
    stopAllIntervals();
    document.getElementById('background-music').pause();
    document.getElementById('m-instructions-wrapper').classList.add('d-none');
    document.getElementById('canvas').classList.add('d-none');

        if (sharkyStatus === "sharkyWin") {
            playAudio(AUDIOS.characterWin, 1);
            document.getElementById('winScreen').classList.remove('d-none');
        }
        else {
            document.getElementById('looseScreen').classList.remove('d-none');
            playAudio(AUDIOS.characterLoose, 1);
        }
    setTimeout(startGameAgain, 2900);
}


/**
 * Restart Game after Endscreen (starts automatically after showGameOver())
 * Redirect to Welcome Screen in same Browser Tab
 */
function startGameAgain() {
    window.location.replace("welcome.html");
}


/**
 * Stop all Intervals in Interval Array ( for End of Game)
 */
function stopAllIntervals() {
    allIntervals.forEach(interval => {
        clearInterval(interval);
        allIntervals.shift();
    });
}


/**
 * Handle Key Press Events for all relevant Game Keys
 * @param {string} as key code
 * @param {Event} for Keypress event
 * toggles key variables to true
 */
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


/**
 * Handle Key UP Events for all relevant Game Keys
 * @param {string} as key code
 * @param {Event} for Keypress event
 * toggles key variables to false when key is released
 */
window.addEventListener('keyup', event => {
    pressedKey = event.code;

    if (pressedKey === 'Space') {
        keyboard.SPACE = false;
        pressedKey = false; 
    }
    if (pressedKey === 'ArrowUp') {
        keyboard.UP = false;
        pressedKey = false; 
    }
    if (pressedKey === 'ArrowDown') {
        keyboard.DOWN = false;
        pressedKey = false; 
    }
    if (pressedKey === 'ArrowLeft') {
        keyboard.LEFT = false;
        pressedKey = false; 
    }
    if (pressedKey === 'ArrowRight') {
        keyboard.RIGHT = false;
        pressedKey = false; 
    }
    if (pressedKey === 'KeyD') {
        keyboard.KEYD = false;
        pressedKey = false; 
    }
})
