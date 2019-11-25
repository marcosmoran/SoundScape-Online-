class Stars {
  
 

  constructor() {
     
     this.y = random(height);
     this.x = random(width);
     this.py = this.y;
     this.px = this.x;
  }

    
  
  
// this.update(float speed, float topSpeed, boolean lines) {
//    
//    if (theme.scoreGlobal > highest) {
//      x = x - topSpeed; 
//       }
//    else {
//    x = x - speed; 
//    }
//    y = y - 0.1;
//    py = y;
//    px = x;
//     
//      if (lines == true) {
//     
//     stroke(255,255, 255, 255);
//      line(px , py, x , y); 
//      }
//    if (x < 1) {
//      x = random(width, width * 2);
//      y = random(height + 20);
//  }
//}

  show(size) {
    strokeWeight(1);
    stroke(0);
    fill(255);
    this.x -= 2;
    
    ellipse(this.x, this.y, size, size);
    
      if(this.x < 0) {
    this.y = random(-20, height + 20);
     this.x = random(width, width * 1.5);
          
      }
   
    }
// 
//  void lines() {
//      if (theme.scoreGlobal > highest  && theme.oldScoreGlobal > highest ) {
//       stroke(255,255, 0, 200);
//      line(px, py, x, y); 
//      
//     
//       }
//    }
}