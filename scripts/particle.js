class Particle {
  
    
    constructor(){
    this.x;
    this.y;

    this.color;
   
    
    }
   
    update(imageX,imageWidth,imageY, imageHeight) {
        
        this.x= random(imageX, imageWidth);
        this.y = random(imageY, imageHeight);

        var colors = [color('#FF4141'), color('#FF4141'),color('#FFAF04'), color('F3FF00')];
        this.color = colors[floor(random(colors.length))];
         
        noStroke();
        fill(this.color);
//        fill(255,255,0);
        ellipse(this.x, this.y, 3);
    }
}