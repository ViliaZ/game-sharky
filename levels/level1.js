// creating a new instance of Level and filling it with all objects content --> currently 4 Arrays: coins, enemies-array, jellyfish, backgroundObjects-array

const level1 = new Level(
    [
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
    ],
    [
        // new Pufferfish(),
        // new Pufferfish(),
        // new Pufferfish(),
        new Endboss()
    ],
    [
        new Jellyfish(),        
        new Jellyfish(),
        new Jellyfish()
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
    ],
);