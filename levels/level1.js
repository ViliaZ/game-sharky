const level1 = new Level(
    [
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
    [ // Arguments: img, x, y
        new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', -720, 0),    
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

        new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 2*720, 0),    
        new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 2*720, 0),
        new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 2*720, 0),
        new BackgroundObject('img/3. Background/Layers/1. Light/COMPLETO.png', 2*720, 0),
    ], 
);