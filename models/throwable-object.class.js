// bubbles

class ThrowableObject extends MoveableObject{

x;
y;
width = 50;
height = 50; 
speedX = 30;
speedY = 30;

IMAGE = 'img/1.Sharkie/4.Attack/Bubble trap/Bubble.png'

constructor(){
    super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
    x = this.character.x;
    y = this.character.y;
}

throw(){
    console.log('throw')
}

}