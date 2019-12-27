class Player {
    
    constructor() {
        
        this.shipXSpawnPosition = 1200;
        this.shipXCurrentPosition;
        this.playerDead = false;
        this.playerRespawning =false;
        this.shipPosition = 4;
        this.shipImage = createSprite();
        this.shipImage.addImage(loadImage("images/alien1.png"));
        this.shipImage.depth = 1;
        this.flickerCounter = 0;
        this.immunity = false;
        this.coinsCollected = 0;
        this.disablePlayerControls = false;
        this.knockback = false;
        this.knockset = false;
        this.shipImage.visible = false;
    }

    
    
    update(){
      
          if(this.shipPosition == 4){
                this.shipXCurrentPosition = this.shipXSpawnPosition;
            }
            this.shipImage.position.x = this.shipXCurrentPosition;
        if (this.playerDead) {
            this.die();
        }
        if(this.playerRespawning){
           
            this.flicker();
            this.respawn();
        }
        if(!this.disablePlayerControls) {
       
            this.shipImage.position.y = mouseY;
           }
        if (this.knockback){
            if(this.knockset === false){
                this.knockset = true;
               
                this.shipPosition -=1;
                this.colx = this.shipXCurrentPosition;
                this.colTargetx = this.colx -200;
                
            }
            this.knockback1();
           

        }
                    if(this.shipPosition < 0){
                this.shipPosition = 0;
            }
        
   
    }
    die() {
        this.immunity = true;
        this.shipXCurrentPosition = 1200;
        this.playerDead = false;
        this.shipImage.position.y = -100;
        this.shipPosition = 4;
        this.playerRespawning = true; 
      
    }
    respawn(){
       
        if(this.shipImage.position.y < 200) {
            this.shipImage.position.y+= 4;
            }
        
        if(this.shipImage.position.y >= 200) {
             
            this.immunity = false;
            this.playerDead = false;
            this.shipImage.visible = true;
            this.playerRespawning = false;
            this.disablePlayerControls = false;
        }
        
    }
    knockback1() {
   
         if(this.shipXCurrentPosition < this.colTargetx) {
             this.shipXCurrentPosition = this.colTargetx 
         }
        if(this.shipXCurrentPosition == this.colTargetx) {
             this.shipImage.visible = true;
            this.immunity = false;
            this.knockback = false;
            this.knockset = false;
          
        } else {
          this.shipXCurrentPosition -=4;
            this.flicker();
            
        }
        
    }
   
    
    flicker(){
        this.flickerCounter++;
        if(this.flickerCounter < 3 ){
        this.shipImage.visible = false;
        }
          if(this.flickerCounter > 3 ){
        this.shipImage.visible = true;
        }
        
        if(this.flickerCounter == 6){
            this.flickerCounter = 0;
        }
    }
    
}