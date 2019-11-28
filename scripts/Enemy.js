class Enemy {
    
    constructor(){
        
        this.enemyXPosition = 100;
        this.enemyYPosition = 150;
        this.enemyImage = createSprite(this.enemyXPosition, this.enemyYPosition);
        this.enemyImage.depth = 0;
        this.enemyImage.scale =1.5;
        this.flyAnimation = this.enemyImage.addAnimation('flyAnimation', "images/fly/Fly1.png","images/fly/Fly5.png");
        this.flyAnimation.frameDelay = 7;
        this.eatAnimation = this.enemyImage.addAnimation('eatAnimation',"images/eat/eat1.png", "images/eat/eat3.png");
        this.enemyImage.setCollider('circle', 50, 110, 70);
        this.eatAnimation.frameDelay = 10;
  
        this.enemyImage.maxSpeed = 2;
        this.returnToFly = false;
        this.eating = false;
    }
    
    fly() {
        
        if(player.shipPosition == 0 && !player.immunity) {
            player.disablePlayerControls = true;
            this.eating = true;
            player.shipYPosition =  player.shipImage.position.y;
           
            
        }
        if (this.eating){
            this.eat();
        }
        if (this.returnToFly){
            this.returnFly();
        }
        drawSprites();
        
       
    }
    
    eat() {
         if(this.enemyImage.overlapPoint(parseInt(player.shipImage.position.x), parseInt(player.shipImage.position.y))){
          console.log("OVERLAP");
          
            this.eating = false;
            player.playerDead = true;
            this.returnToFly = true;
           
           }
        this.enemyImage.changeAnimation('eatAnimation');
       
         if(parseInt(this.enemyImage.position.x) != parseInt(player.shipImage.position.x)) {
            this.enemyImage.position.x +=5;
             //  console.log(this.enemyImage.position.y);
           
               
        }
        this.enemyImage.rotation = (atan2(player.shipImage.position.y-this.enemyImage.position.y,player.shipImage.position.x-this.enemyImage.position.x));
        if(parseInt(this.enemyImage.position.y +50 ) != parseInt(player.shipImage.position.y)) {
            
            if(parseInt(this.enemyImage.position.y +50) < parseInt(player.shipImage.position.y)){
            this.enemyImage.position.y +=2;
            }
            
            if(parseInt(this.enemyImage.position.y + 50) > parseInt(player.shipImage.position.y)){
            this.enemyImage.position.y -=1;
            }
               
        }
//        
       
        
  
//    player.shipImage.position.x = player.shipXCurrentPosition;
    }
    
    returnFly() {
         this.enemyImage.attractionPoint(0, width,height/2);
        this.enemyImage.changeAnimation('flyAnimation');
        if(parseInt(this.enemyImage.position.x) > this.enemyXPosition) {
            this.enemyImage.position.x -=5;
        }
        if(this.enemyImage.position.x == this.enemyXPosition){
            
            this.returnToFly = false;
        }
        if(this.enemyImage.position.x < this.enemyXPosition){
            
            this.enemyImage.position.x = this.enemyXPosition;
        }
         if(parseInt(this.enemyImage.position.y) < parseInt(this.enemyYPosition)){
            this.enemyImage.position.y +=5;
            }
            
            if(parseInt(this.enemyImage.position.y) > parseInt(this.enemyYPosition)){
            this.enemyImage.position.y -=5;
            }
        
    }
    // when ship is in position 0, monster travels to its Y position, bites and explosion
}