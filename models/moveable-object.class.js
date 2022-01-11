class MoveableObject {
x =120;
y=400;
img;

loadImage(path){
    // assign a new path to the img variable in MoveableObject
    this.img = new Image();  // Image is already a JS given object!  (its the same as creating <img src="">)
    this.img.scr = path;
}
moveLeft(){
    console.log('moving right')
};
moveRight(){
    console.log('moving right')}
}