class Box extends Collider {
  
    constructor(boxX, boxY) {
      super(650, 400, boxX, boxY); 
      this.bornAt = millis();
    }
    
    display(groundPosition, speed) { 
      
      this.speed = speed;
      this.y = groundPosition - this.height;
      //image obstacle
      fill(180,50,50);
      noStroke();
      rect(this.x, this.y, this.width, this.height);
      this.x -= this.speed /frameRate();
      
      
  
    }
    
    speed(){
     return ( this.speed ) 
    }
      
    isOut() {
       return this.x < -this.width; 
    }
  }
  