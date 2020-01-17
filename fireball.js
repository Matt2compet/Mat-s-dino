class Fireball extends Collider{

    constructor(groundPosition, fireballY,fireballW, fireballH){
    
    super(650, groundPosition - fireballY - fireballH , fireballW, fireballH);
    }
    
      
      
    display(speed){
    this.speed = speed;
        
        //image obstacle
        fill(180,50,50);
        noStroke();
        rect(this.x, this.y, this.width, this.height);
        this.x -= this.speed /frameRate() + 2;
    
    }
      
    isOut(){
    
     return this.x < -this.width;
    
    }
    }