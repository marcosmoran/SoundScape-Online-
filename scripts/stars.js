class Stars {

  constructor() {
     
     this.y = random(height);
     this.x = random(width);
     this.py =this.x;
     this.px =this.y;
    
     
      this.lines = false;
  }
  
 
    
  
  
 update(speed) {

    stroke(255,255, 255, 255);
    
      
    this.x -= speed;
    
    this.y += 0.1;
    this.py = this.y;
    this.px = this.x;
     if (scoreGlobal > highestValue -20 ) {
       stroke(255,255, 0, 200);
line(this.px, this.py, this.x , this.y); 
     }}
           

  show(size) {
    strokeWeight(1);
    stroke(0);
    fill(255);
    
    ellipse(this.x, this.y, size, size);
    
      if(this.x < 0) {
    this.y = random(-20, height + 20);
     this.x = random(width, width * 1.5);
          
      }
   
    }
}
