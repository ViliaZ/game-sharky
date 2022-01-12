// "extends" states that class chicken is part of MovableObject >> gets all variables of Moveableobjects


class Pufferfish extends MoveableObject {

    constructor() {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png')
        this.x = 200 + Math.random() * 500;// min = 200 max=700  
    }

}