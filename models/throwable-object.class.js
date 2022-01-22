// bubbles

class ThrowableObject extends MoveableObject{

    x=150;
    y=150;
width = 50;
height = 50; 
speedX = 30;
speedY = 30;

IMAGE = 'img/1.Sharkie/4.Attack/Bubble trap/Bubble.png';

constructor(){
    super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
    this.throw(30,30);
}

throw(characterX,characterY){  // when method is called, its giben the x and y of character as parameters
    // this.x = characterX;
    // this.y = characterY;


    setInterval(()=> {
        this.x += 10;
    },1000 / 25);
    this.applyGravity();
}

}