class Collider 
{
 
  constructor(x = 0, y = 0, w = 50, h = 50)
  {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y - h;
    
  }
  
  
  hitbox()
  {
    return {
      
      w: this.width,
      h: this.height,
      y: this.y,
      x: this.x,
    }
  }
  
  isCollide(collider){
    
    const boxA = this.hitbox();
    const boxB = collider.hitbox();
    
    //rect(boxA.x,boxA.y,boxA.w,boxA.h);
    //rect(boxB.x,boxB.y,boxB.w,boxB.h);
    if (boxA.x + boxA.w > boxB.x + 4 &&
        boxA.x < boxB.x + boxB.w &&
        boxA.y + boxA.h > boxB.y  &&
        boxA.y < boxB.y + boxB.h) {
      return true;
    }
  }

}