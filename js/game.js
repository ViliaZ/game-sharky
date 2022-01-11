let canvas;
let world;
let character = new Character();
let enemyfish = new Enemyfish();



function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);


    console.log('my character is', character)


}

