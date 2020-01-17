class Clicker{

    constructor(x= 0, y = 0, width = 0, height = 0){
    
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height  
    
    }
    
    
    isClicked(){
      
      
     if(mouseIsPressed 
             && mouseX > this.x
             && mouseX < this.x + this.w
             && mouseY > this.y
             && mouseY < this.y + this.h
          ){
          
            return true ;
          
          }
    
    }
}