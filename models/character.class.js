// "extends" states that class chicken is part of MovableObject >> gets all variables of Moveableobjects
// constructor is a crucial part of Classes and run first, whenever a new character is created

class Character extends MoveableObject{

    constructor(){
        super().loadImage('img/1.Sharkie/1.IDLE/1.png');
    }
jump(){

}
}