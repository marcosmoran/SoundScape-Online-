class Powerup {
    
    constructor() {
        this.powerXPosition = width + 20;
        this.powerYPosition = random(50, 400);
        this.powerSprite = createSprite(this.powerXPosition, this.powerYPosition);
        this.powerSprite.addImage('boost', loadImage("images/powerups/boost.png"));
        this.powerSprite.addImage('luck', loadImage("images/powerups/luck.png"));
        this.powerSprite.addImage('star', loadImage("images/powerups/star.png"));
        this.powerSprite.addImage('shield', loadImage("images/powerups/shield.png"));
        this.shieldOnSprite = createSprite();
        this.shieldOnSprite.addImage('shield', loadImage("images/powerups/shieldOn.png"));
        this.shieldOnSprite.visible = false;
        this.shieldOff = true;
        this.powerSprite.depth = 4;
        this.powerSprite.scale = 0.25;
        this.boostFlag = false;
        this.luckFlag = false;
        this.starFlag = false;
        this.shieldFlag = false;
        this.trigger = false;
        this.activated = false;
        this.active = false;
        this.select = false;
        this.seed;
        this.currentMillis;
        this.startTime;
        this.endTime = 10000;
        this.currentPosition;
        this.boostX;
    }
    
    update(){
        
        if(this.select === true) {
            this.select = false;
            this.selector();
            this.changeSprite();
            this.trigger = true;
            
        }
        
        if(this.trigger){
            this.travel();
        }
        
        if(this.boostFlag){
            this.boost();
        }
        
        if(this.luckFlag) {
            this.luck();
        }
        
        if(this.starFlag) {
            this.star();
        }
        
        if(this.shieldFlag) {
            this.shield();
        }
        this.currentMillis = millis();
         drawSprites();
        
    }
    
    travel(){
         this.powerSprite.position.x = this.powerXPosition;
            this.powerSprite.position.y = this.powerYPosition;
            this.powerXPosition -= 3;
            this.collide();
            
        
        if(this.powerSprite.position.x < 0){
            this.reInitialize();
            this.boostFlag = false;
            this.luckFlag = false;
            this.starFlag = false;
            this.shieldFlag = false;
            
            
            
            
        }
       
    }
    
    selector(){
        this.seed = random(0,9);
        this.currentPosition = player.shipPosition;
        switch(this.currentPosition) {
                
            case 1:
                if(this.seed < 6) {
                    this.boostFlag = true;
                    break
                }
                if (this.seed > 6) {
                    this.starFlag = true;
                    break;
                }
                
            
            case 2:
                   if(this.seed < 4) {
                    this.boostFlag = true;
                       break;
                }
                if (this.seed > 4 && this.seed < 8) {
                    this.starFlag = true;
                    break;
                }
                
                if (this.seed > 8) {
                    this.shieldFlag = true;
                    break;
                }
                
                
                
           case 3:
                   if(this.seed < 2) {
                    this.boostFlag = true;
                    break;
                }
                if (this.seed > 2 && this.seed < 7) {
                    this.starFlag = true;
                    break;
                }
                
                if (this.seed > 7) {
                    this.shieldFlag = true;
                    break;
                }
                
                
                
            case 4:
                if(this.seed < 6) {
                    this.shieldFlag = true;
                    break;
                }
                if (this.seed > 6) {
                    this.luckFlag = true;
                    break;
                }
             
                
        }
        
    }
    
    changeSprite() {
        
        if(this.boostFlag) {
            this.powerSprite.changeImage('boost');
            console.log("BOOST");
        }
          if(this.luckFlag) {
            this.powerSprite.changeImage('luck');
               console.log("LUCK");
        }
          if(this.shieldFlag) {
            this.powerSprite.changeImage('shield');
               console.log("SHIELD");
        }
          if(this.starFlag) {
            this.powerSprite.changeImage('star');
               console.log("STAR");
        }
        
        
    }
    collide(){
        
        if(this.powerSprite.overlap(player.shipImage)){
            
            this.activated = true;
            this.reInitialize();
            }}
    
    
    
    reInitialize() {
        
        this.powerXPosition = 1500;
        this.powerYPosition = random(50, 400);
        this.powerSprite.position.x = this.powerXPosition;
        this.powerSprite.position.y = this.powerYPosition;
        this.trigger = false;
    }
    
    boost(){
        
        if(this.activated) {
        this.boostX = player.shipXPosition + 200;
        this.active = true;
        this.activated = false;
        
        player.immunity = true;
        }
        
        if(this.active){
            if(player.shipXPosition < this.boostX){
            player.shipXPosition += 5;
            }
        if(player.shipXPosition == this.boostX) {
            player.shipPosition++;
            player.immunity = false;
            this.active = false;
            this.boostFlag = false;
        }
        }
    }
    luck(){
         if (this.activated) {
              coinCounter = 0;
        this.startTime = millis();
        this.activated = false;
        this.active = true;
             
         }
        
        if (this.active){
           
            coinRate = 10;
            
        if(this.currentMillis - this.startTime > this.endTime) {
            this.active = false;
            coinRate = 50;
            this.luckFlag = false;
        }
    }}
    star(){
        
         if (this.activated) {
             this.startTime = millis();
             this.activated = false;
             this.active = true;
         }
        
         if(this.active) {
            
           
            player.immunity = true;
            if(this.currentMillis - this.startTime > this.endTime) {
                 this.active = false;
                 player.immunity = false;
                this.starFlag = false;
                
             }}}
    
    shield(){
         if (this.activated) {
               this.shieldOnSprite.visible = true;
               this.shieldOnSprite.position.x = player.shipImage.position.x;
               this.shieldOnSprite.position.y = player.shipImage.position.y;
               player.immunity = true;  
              this.shieldOff = false;
               this.activated = false;
               this.active = true; 
             drawSprites();
         }
        if (this.active) {
            
             this.shieldOnSprite.position.x = player.shipImage.position.x;
            this.shieldOnSprite.position.y = player.shipImage.position.y;
             drawSprites();
            if(this.shieldOff) {
                this.shieldOnSprite.visible = false;
                player.immunity = false;
                this.active = false;
                this.shieldFlag = false;
                
            }
            
            
        }
    }
    }