// bubbles

class ThrowableObject extends MoveableObject{
x=50
y=30;
width = 50;
height = 50; 
speedX = 30;
speedY = 30;

IMAGE = 'img/1.Sharkie/4.Attack/Bubble trap/Bubble.png';

constructor(){
    super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
}

throw(characterX,characterY){  // when method is called, its giben the x and y of character as parameters
    this.x = characterX+200;
    this.y = characterY;


    setInterval(()=> {
        this.x += 8;
    },1000 / 40);
    this.applyGravity();
}

}