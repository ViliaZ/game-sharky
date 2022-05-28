
/**
 * Instance of Level  with all objects in that level (except character) and endboss
 * @param {objects} Coins  - multiple
 * @param {objects} Pufferfish  - multiple
 * @param {objects} Endboss  - single
 * @param {objects} Jellyfish - multiple
 * @param {objects} BackgroundObject - multiple
 */
const level1 = new Level(
    [
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins()
    ],
    [
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
        new Pufferfish(),
        new Endboss()
    ],
    [
        new Jellyfish(),        
        new Jellyfish(),
        new Jellyfish(),
        new Jellyfish(),        
        new Jellyfish(),
        new Jellyfish(),
        new Jellyfish(),        
        new Jellyfish(),     
    ],
    [
        new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', -720, 0), // Arguments: img, x, y
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', -720, 0),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', -720, 0),
        new BackgroundObject('img/3. Background/Layers/1. Light/COMPLETO.png', -720, 0),

        new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 0, 0),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 0, 0),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 0, 0),
        new BackgroundObject('img/3. Background/Layers/1. Light/COMPLETO.png', 0, 0),

        new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', 720, 0),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 720, 0),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 720, 0),
        new BackgroundObject('img/3. Background/Layers/1. Light/COMPLETO.png', 720, 0),

        new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 2 * 720, 0),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 2 * 720, 0),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 2 * 720, 0),
        new BackgroundObject('img/3. Background/Layers/1. Light/COMPLETO.png', 2 * 720, 0),

        new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', 3 * 720, 0),
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 3 * 720, 0),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 3 * 720, 0),
        new BackgroundObject('img/3. Background/Layers/1. Light/COMPLETO.png', 3 * 720, 0),
    ],
);