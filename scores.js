class Score {

    constructor(){
    
        this.highScore = 0;
        this.previousScore = 0;
        this.newScore = 0;
    
    }
      
    currentScore(state){
    
        strokeWeight(2);
        textAlign(LEFT);
        noStroke();
        textSize(22);
        fill(100);
        textFont('Comic Sans MS')
        text('SCORE: ' + this.newScore , 10 , 120);
      
        if (state != 'RUNNING'){
        
        this.previousScore = millis() / 1000;
          
        }
        if (state === 'RUNNING'){
          this.newScore = Math.round(millis()/1000 - this.previousScore);
        
    
        }  
       return ( this.newScore )
        }
    
    difficulty(){
    return (this.newScore)
    
    }
    
    highS(state){
      
      strokeWeight(2);
      fill(100);
      textSize(22);
      textFont('Comic Sans MS')
      text('Highscore : ' + this.highScore , 420, 30);
      
      if( state != 'RUNNING'
          && this.newScore > this.highScore){
      
        this.highScore = this.newScore;
        
      }
      
    }
    }