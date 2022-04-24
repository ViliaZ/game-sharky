class Touchevents {
    // for mobile use only
    touchUP = false;
    touchDOWN = false;
    touchLEFT = false;
    touchRIGHT = false;
    touchBUBBLE = false;
    touchFINSLAP = false;
    touchAUDIOOFF = false;

    constructor(){
        this.addToucheventListenerStop();
        this.addToucheventListenerStart();
    }

/**
 * EventHandler Touchevents (mobile only)
 * Trigger: touch starts
 */
addToucheventListenerStart() {  // for mobile usage
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
addToucheventListenerStop() {  // for mobile usage
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
}