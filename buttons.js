class StartButton extends Clicker{

    constructor(){
      
        super(150, 145 , 300 , 30);
        
    }
    
    display(){
    strokeWeight(2);
    fill(150);
      rect(this.x, this.y, this.w, this.h, 5);
      fill(255);
      textSize(17);
      textFont('Comic Sans MS')
      textAlign(CENTER);
      text('Clic here or press space to START !', 300, 165);
    
    
    }
    
}
    
class RestartButton extends Clicker{
    
    constructor(){
        
        super( 240, 145, 120, 30)
      
    }
    
    
    
    display(){
      strokeWeight(2);
      fill(150);
      rect(this.x, this.y, this.w, this.h, 5);
      fill(255);
      textSize(17);
      textFont('Comic Sans MS')
      textAlign(CENTER);
      text('TRY AGAIN', 300,165);
    
    }
}