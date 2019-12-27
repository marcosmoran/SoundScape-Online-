class Obstacle {
    
    constructor() {
        
       this.obstacleTrigger;
        this.obstacleImage = createSprite();
        this.obstacleImage.addImage(loadImage("images/asteroid.png"));
        this.obstacleImage.position.x  = width + 50;
        this.obstacleImage.position.y = random(20, height - 20);
        this.obstacleImage.depth = 3;
     
        this.destroyed = false;
    }
    
    travel() {
        
        
        if  (this.obstacleTrigger === true) {
            this.obstacleImage.visible = true;
            this.obstacleImage.position.x  -= 10;
            this.collide();
           
           if(this.destroyed){
               this.reInitialize();
               this.destroyed = false;
           }
            if(this.obstacleImage.position.x < 0 ){
               this.reInitialize();
            }
    } 
       
    }
    
     reInitialize() {
         
         this.obstacleImage.position.x  = width + 20;
         this.obstacleImage.position.y = random(20, height - 20);
         this.obstacleTrigger = false;
         this.obstacleImage.visible = false;
        
    }
    collide(){
        if(powerup.active){
         if(this.obstacleImage.overlap(powerup.shieldOnSprite)){
            powerup.shieldOff = true;
             this.destroyed = true;
            }}
        if(player.immunity === false && player.shipPosition > 0){
       
            if(this.obstacleImage.overlap(player.shipImage)){
            this.destroyed = true;
           player.immunity = true;
           player.knockback = true;
          
          
        }
           
    }}
    
    die(){}
    
}