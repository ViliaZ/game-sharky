class MoveableObject {
x=120;
y=220;
width=150;
height=100;
img;

loadImage(path){
    // assign a new path to the img variable in MoveableObject
    this.img = new Image();  // Image is already a JS given object!  (its the same as creating <img src="">)
    this.img.scr = path;
}
moveLeft(){
    console.log('moving left')
};
moveRight(){
    console.log('moving right')}
}