class Dino {
    constructor() {
      
      //super(55, 0, 26, 26);
      this.reset();
    }
    
    reset() {
      this.state = 'running';
      this.jumpAngle = 0;
      this.jumpSpeed = 40;
      this.jumpHeight = 95;
      this.currentJumpY = 0;
      this.currentRunY = 0;
      this.runAngle = 0;
      this.runHeight = 4;
    }
    
    animate() {
      let jump = 0;
      if (this.state == 'jump') {
          this.jumpAngle += PI / this.jumpSpeed;
          jump = -sin(this.jumpAngle) * this.jumpHeight;
          if (jump >= 0) {
            this.run();
            jump = 0;
          }
      } 
       this.currentJumpY = jump;
    }
  
    display(groundPosition, speed, r, g, b){
      
      
        this.speed = speed;
      
    let runY = 0;
      if (this.state == 'running') {
          this.runAngle += speed/700;
          runY = cos(this.runAngle) * this.runHeight;
    
        }else if (this.state == 'stopped'){
        
        runY = 0;
        }
      this.currentRunY = runY
      
      
      
      this.animate();
      this.y = this.currentJumpY + groundPosition;
      
      
      fill(0,200,60)
      stroke(0,120,0)
      strokeWeight(2)
      
      
  
      //jambes
      rect(55, this.y + this.currentRunY - 27, 3, 23)
      rect(73, this.y - this.currentRunY - 27, 3, 23)
      
      //pieds
      rect(55, this.y + this.currentRunY - 4, 8, 3)
      rect(73, this.y - this.currentRunY - 4, 8, 3)
      //corps
      quad(40, this.y - 37,
           70, this.y -17,
           100, this.y - 57,
           65, this.y - 57); 
  
      //tete
      rect(74, this.y - 82, 40, 27, 5);
  
      
      stroke(0,150,0)
      
      //bras
      rect(74, this.y  - 45, 23, 3, 2);
      rect(97, this.y  - 45, 3, 8, 2);
      
      //bouche
      
       if (this.state != 'gameover'){
        
         stroke(r,g,b);
      fill(r,g,b);
      rect(98, this.y - 62, 20, 2, 5);
      
      }
      
      //oeil
      stroke(255);
      strokeWeight(11);
      point(84, this.y - 73, 200);
      strokeWeight(3);
      stroke(0);
        if (this.state === 'gameover'){
        point(84, this.y - 73, 200);
      
      }else{
      
      point(87, this.y - 73, 200);
      }
    }

    hitbox(){
      return (this.y)
    }
    
    jump() {
      this.state = 'jump';
    }
    
    run() {
      this.state = 'running'; 
      this.jumpAngle = 0;
    }
    
    stop(){
    this.state = 'stopped';
    
    }
    
    gameOver(){
    this.stop();
    this.state = 'gameover';
    
    
    }
    
  }
      
    