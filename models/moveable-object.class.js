class MoveableObject {
x=0;
y=0;
width=200;
height=150;
img;

loadImage(path){
    // assign a new path to the img variable in MoveableObject
    this.img = new Image();  // Image is already a JS given object!  (its the same as creating <img src="">)
    this.img.src = path;
}
moveLeft(){
    console.log('moving left')
};
moveRight(){
    console.log('moving right')}
}