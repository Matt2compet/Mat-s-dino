class GameManager {


  constructor(fps) {
      
      this.boxW = 30;
      this.boxH = 30;
      this.maxBoxes = 3;
      this.lastAddedBox = 0;

      this.fireballY = 75;
      this.fireballW = 40;
      this.fireballH = 25;
      this.maxFireballs = 3;
      this.lastAddedFireball = 0;
      
      this.speed = 300;
      this.fps = fps;
      
      frameRate(this.fps)
      createCanvas(600, 400);

      this.bgR = 50;
      this.bgG = 200;
      this.bgB = 250;


      this.dino = new Dino();
      
      this.ground = new Ground();
      this.startButton = new StartButton();
      this.score = new Score();

      this.boxes = [];
      this.fireballs = [];

      this.restartButton = new RestartButton();
      
      
      this.state = 'STOPPED';
      this.groundPosition = 0;
      
  }
  
    showInfo() {
      
      noStroke();
      textSize(16);
      fill(255);
      text('Ground position: ' + this.groundPosition, 10, 20);
      text('Boxes: ' + this.boxes.length, 10, 40);
      text('Fireballs: ' + this.fireballs.length, 100, 40);
      text('this.Z: ' + this.Z, 190, 40);
      text('this.X: ' + this.X, 190, 60);
      text('STATE: ' + this.state, 10 , 80);
      text(' width: ' + this.boxW, 10 , 100);
      text(' height: ' + this.boxH, 100 , 100);
      text('speed: ' + this.speed , 10 , 140);
     
  }
  
    draw(groundPosition, showInfo, fps) {
    
      this.dinoBody = new Body(this.dino.hitbox());
      this.dinoHead = new Head(this.dino.hitbox());

      this.fps = fps;
      frameRate(this.fps)
  
      this.groundPosition = 200 + groundPosition;
       
      background(this.bgR,this.bgG,this.bgB);
      if (showInfo) {
        this.showInfo();
      }
      
      this.ground.display(this.groundPosition);
      this.dino.display(this.groundPosition , this.speed, this.bgR, this.bgG,this.bgB);
     
      if (this.state === 'STOPPED'){
      this.startButton.display();
      this.dino.stop();
      if ( this.startButton.isClicked() === true) {
         
        this.start();

      }
    }
      
      if (this.state == 'RUNNING') {
        this.run();
        
      } else if (this.state === 'GAMEOVER') {
        this.gameOver();
      }
      this.score.currentScore(this.state);
      this.score.highS(this.state);
      
       
  }
  
    
    
    run() {
      
      
      
     
      this.addBoxes();
      
      this.addFireballs();
      
      for (let i = 0; i < this.fireballs.length; i++) {
        this.fireballs[i].display(this.speed);      
      }

      for (let i = 0; i < this.boxes.length; i++) {
        this.boxes[i].display(this.groundPosition, this.speed);
      }
      
      this.colision();
      this.difficulty();
      
    }
  
    addBoxes() {
  
      //Delete unused boxes
      for (let i = this.boxes.length - 1; i > -1; i--) {
        if (this.boxes[i].isOut()) {
          this.boxes.splice(i, 1);
        }
      }
  
      //Return if there is less than 300 milisecond since 
      // the last call
      if (millis() - this.lastAddedBox < 700) {
        return;
      }
  
      // Check if there is already max box in the array
      let currentCount = this.boxes.length;
      if (currentCount > (this.maxBoxes - 1)) {
        return;
      }
  
      //Add a box 30% of time
      this.X = random(0, 10);
      if (this.X > 6) {
        this.boxW = Math.round(random(25 , 70));
        this.boxes.push(new Box(this.boxW, this.boxH));
      }
  
      // Save the time 
      this.lastAddedBox = millis();
  
  }

    start() {
        this.dino.reset();
        this.boxes = [];
        this.fireballs = [];
        this.bgR = 50;
        this.bgG = 200;
        this.bgB = 250;
        this.state = 'RUNNING';
        this.previousScore = millis() / 1000
      
    }
    addFireballs(){
    
    
      //Delete unused fireballs
      for (let i = this.fireballs.length - 1; i > -1; i--) {
          if (this.fireballs[i].isOut()) {
            this.fireballs.splice(i, 1);
          }
        }
      
        
          //Return if there is less than 600 milisecond since 
        // the last call
        if (millis() - this.lastAddedFireball < 600) {
          return;
        }
    
        // Check if there is already max fireballs in the array
        let currentBallCount = this.fireballs.length;
        if (currentBallCount > (this.maxFireballs - 1)) {
          return;
        }
    
        //Add a fireball 30% of the time
        this.Z = random(0, 10);
        if (this.Z > 7 && this.boxes.length === 0) {
        
          this.fireballs.push(new Fireball(this.groundPosition, this.fireballY,this.fireballW, this.fireballH));
        }
        
        // Save the time 
        this.lastAddedFireball = millis();
    
    }
      
    
    colision() {
    
      for(let i = 0; i < this.boxes.length; i++) { 
        if (this.dinoBody.isCollide(this.boxes[i])) {
          this.state = 'GAMEOVER';
          break;  
        }
        
      }
      for(let i = 0; i < this.fireballs.length; i++) { 
        if (this.dinoBody.isCollide(this.fireballs [i])) {
          this.state = 'GAMEOVER';
          break;  
        }else if (this.dinoHead.isCollide(this.fireballs [i])){
          this.state = 'GAMEOVER';
          break;
        }
      }  
  }
  
    
    keyPressed(keyCode) {
      
      if (keyCode === 32
          && this.state != 'RUNNING'){
          this.start();
        
      }else if(keyCode === 32){
      this.dino.jump();
      
    }
    
      if (keyCode === DOWN_ARROW) {
        this.state = 'GAMEOVER';
      }
      
    }

    difficulty(){
    
      let newScore = this.score.difficulty();
      this.speed = 300 * (1 + (newScore / 100));
      this.boxH = 30 * (1 + (newScore / 100));
      
        if( this.boxH > 50){
        this.boxH = 50;
      }
        

        if(newScore > 40 && newScore < 100){
          this.bgR = 0;
          this.bgG = 0;
          this.bgB = 150;

        }
        if(newScore > 100 && newScore < 150){
          this.bgR = 120;
          this.bgG = 0;
          this.bgB = 0;
        }
        if(newScore > 150 && newScore < 200){
          this.bgR = 0;
          this.bgG = 75;
          this.bgB = 0;
        }

        if(newScore > 200){
         
          this.bgR = 15;
          this.bgG = 0;
          this.bgB = 0;
        }
      }
    
    
    gameOver() { 

      this.boxW = 30;
      this.boxH = 30;
      this.speed = 300;
      this.boxes = [];
      this.fireball = [];
      this.restartButton.display();
      
      this.dino.gameOver();
      
      if(this.newScore > this.previousScore){
       this.highScore = this.newScore;
       
      }
      if ( this.restartButton.isClicked() === true) {
        
        this.start();
    }
    
      fill(255);
      textFont('Comic Sans MS');
      textSize(30);
      textAlign(CENTER);
      text("GAME OVER :(", width/2, height/3); 
    
    }
}
      
