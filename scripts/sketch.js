var player, enemy;
var bicep, kay, dis, high;
var sound;
var backdrop;
var backdropx = 0;
var obstacle;
var obstacleArray = [];
var coinArray = [];
var starArray = [];
var starArray2 = [];
var particleArray = [];
var coinRate = 50;
var coinCounter = 0;
var currentCoin = 0;
var powerCounter = 0;
var mid, lowMid, highMid, bass, treble;
var fft, peakDetect;
var scoreGlobal, oldScoreGlobal;
var currentObstacle = 0;
var targetObstacle = 2;

var obstacleCounter = 0;
var songLength;
var highestValue = 500;
var lowestValue = 300;
var globalValue = [];
var globalCount = 0;
var logo, logoplanet,playButton;
var starSpeed;
var state = 0;

var bicepSong, disclosureSong, kaySong, highSong;
songPlaying = false;


//make 4 payable songs with predetermined high lows (High + bicep 200,400) kaytra Dis 450,250

//MAKE HUD
///* Animations
//alien bouncing
//alien hit
//collision explosion
//meteor fire
//coin spin*/
//make coins bounce in sine wave



var button;

function preload() {
     homesong = loadSound("/songs/homescreen.mp3");
     bicepSong = loadSound("songs/bicep.mp3");
    kaySong = loadSound("songs/kay.mp3");
    disSong = loadSound("songs/dis.mp3");
    highSong = loadSound("songs/high.mp3");
     loadImages();
}
   
    

function setup() {
 
    var cnv = createCanvas(1920, 500);
    cnv.position(0, 200);
     p5.disableFriendlyErrors = true;
     fft = new p5.FFT();
     player = new Player();
     enemy = new Enemy();
     powerup = new Powerup();
    for(var i = 0;  i < 100; i++){
        
       particleArray[i] = new Particle();
    }
    
    for(var i = 0;  i < 15; i++){
        
        obstacleArray[i] = new Obstacle();
    }
    
    for(var i = 0;  i < 10; i++){
        
        coinArray[i] = new Coin();
    }
    
      for(var i = 0;  i < 100; i++){
        
        starArray[i] = new Stars();
    }
       for(var i = 0;  i < 100; i++){
        
        starArray2[i] = new Stars();
    }
     homesong.play();
    }
    



function draw() {
 
    
    if (state ==0){
       homeScreen();  
    }
    if (state == 0.5){
       songScreen();  
    }
    
    if (state == 0.7){
        homesong.pause();
        bicep.visible = false;
        kay.visible = false;
        dis.visible = false;
        high.visible = false;
        cycleBG(); 
        analyzeSound();
        starSpawner();
        enemy.enemyImage.visible = true;
        
        player.shipImage.visible = true;
        player.shipImage.position.y = -10;
        player.playerRespawning = true;
        state = 0.8;
    }
    if (state == 0.8) {
        cycleBG();
        player.disablePlayerControls = true;
        starSpawner();
        player.respawn()
        player.update();
        drawSprites();
        if(player.playerRespawning == false) {
            state = 0.9;
        }
    }
    if (state == 0.9){
       
     
        analyzeSound();
         cycleBG();
        player.disablePlayerControls = false;
        starSpawner();
        player.respawn()
        player.update();
        drawSprites();
       
        state = 1;
        if(songPlaying === false){
            print("play");
            songPlaying = true;
                song.play();
           
        }
     
    }

   if (state== 1){
       smooth();
       mainGame();
   }
      
}



function homeScreen() {
    cycleBG();
    analyzeSound();
    starSpawner();
    imageMode(CENTER);
    image(logoplanet, width/2,600, 700, 600);
    image(logo, width/2,height/2);
    fill(255);
    textSize(40);
    text("Click To Begin", width/2 - 100, 400);
   
}


function songScreen(){
  
  cycleBG();
  analyzeSound();
  starSpawner();
  imageMode(CENTER);
  bicep.position.x = width/2;
  bicep.position.y = 120;
  kay.position.x = width/2;
  kay.position.y = 220;
  dis.position.x = width/2;
  dis.position.y = 320;
  high.position.x = width/2;
  high.position.y = 420;
    
    
    
    
     if(bicep.mouseIsOver){
    bicep.changeAnimation('selected');
      
    }else{
         bicep.changeAnimation('idle');
    }
        if(kay.mouseIsOver){
    kay.changeAnimation('selected');
      
    }else{
         kay.changeAnimation('idle');
    }
    
        if(dis.mouseIsOver){
    dis.changeAnimation('selected');
      
    }else{
         dis.changeAnimation('idle');
    }
        if(high.mouseIsOver){
    high.changeAnimation('selected');
      
    }else{
         high.changeAnimation('idle');
    }
    if (state == 0.5){
    if(bicep.mouseIsPressed){
        
        song = bicepSong;
        lowestValue = 200;
        highestValue = 400;
       state = 0.7;
        }
    
     if(kay.mouseIsPressed){
        
        song = kaySong;
        lowestValue = 250;
        highestValue = 450;
       state = 0.7;
        }
         if(dis.mouseIsPressed){
        
        song = disSong;
        lowestValue = 250;
        highestValue = 450;
       state = 0.7;
        }
    
         if(high.mouseIsPressed){
        
        song = highSong;
        lowestValue = 200;
        highestValue = 400;
       state = 0.7;
        }}
    bicep.mouseActive = true;
    kay.mouseActive = true;
    dis.mouseActive = true;
    high.mouseActive = true;
   drawSprites();
}


 function mainGame() {
  
    cycleBG();
    analyzeSound();
    coinSpawner();
    starSpawner();
    powerupSpawner();
    obstacleUpdater();
    enemy.fly();
    player.update();
    powerup.update();
    drawSprites();
     }


function loadImages() {
    logo = loadImage("/images/homescreen/logo.png");
    logoplanet = loadImage("/images/homescreen/planet6.png");
    backdrop = loadImage("images/background2.png");
    
    kay = createSprite(); 
    kay.addImage(loadImage("images/songSelection/kay/idle.png"));
    kay.addAnimation('idle',"images/songSelection/kay/idle.png")
    kay.addAnimation('selected',"images/songSelection/kay/kaytra00.png","images/songSelection/kay/kaytra14.png")
    kay.scale = 0.3;
    
    
    bicep = createSprite(); 
    bicep.addImage(loadImage("images/songSelection/Bicep/idle00.png"));
    bicep.addAnimation('idle',"images/songSelection/Bicep/idle00.png")
    bicep.addAnimation('selected',"images/songSelection/Bicep/bicep00.png","images/songSelection/Bicep/bicep14.png")
    bicep.scale = 0.3;
    
    
    
    high = createSprite(); 
    high.addImage(loadImage("images/songSelection/high/idle00.png"));
    high.addAnimation('idle',"images/songSelection/high/idle00.png");
    high.addAnimation('selected',"images/songSelection/high/high00.png","images/songSelection/high/high14.png");
    high.scale = 0.3;
   
    
    dis = createSprite(); 
    dis.addImage(loadImage("images/songSelection/dis/idle00.png"));
    dis.addAnimation('idle',"images/songSelection/dis/idle00.png");
    dis.addAnimation('selected',"images/songSelection/dis/dis00.png","images/songSelection//dis/dis14.png")
    dis.scale = 0.3;
  
 
}
function cycleBG(){
    background(0);

   
    
}
function coinSpawner(){
 
     for(var i = 0; i < coinArray.length; i++){
        coinArray[i].update();
 
            
    }
        coinCounter++;
    if(coinCounter == coinRate) {
        
        if(currentCoin == 10 ){
            currentCoin = 0;
        }
        coinArray[currentCoin].trigger = true;
        coinCounter = 0;
        currentCoin++;
         }
}

function analyzeSound(){

   fft.analyze();
   fft.smooth();
   bass = fft.getEnergy("bass");
   treble = fft.getEnergy("treble");    
   mid = fft.getEnergy("mid");
   lowMid = fft.getEnergy("lowMid");
   highMid = fft.getEnergy("highMid");
  scoreGlobal = (lowMid * 0.66) + (0.8 * mid) + highMid;
//     scoreGlobal = (highMid + treble);
 
  
    
}

function starSpawner(){
      //white stars
 var size = map(scoreGlobal, lowestValue, highestValue, 0, 8);   
 var colormap = map(scoreGlobal, lowestValue, highestValue, 0, 255);  
    var starcolor = color(255, colormap,colormap );
    if (scoreGlobal > highestValue -20) {
      starSpeed = 5;}
    else {
        starSpeed=2.5;
    }
      
  for(var i = 0; i < starArray.length; i++) {
      
    starArray[i].show(size,255);
        starArray[i].update(starSpeed);

  }
     for(var j = 0; j < starArray2.length; j++) {
      
        starArray2[j].show(2,starcolor);
        starArray2[j].update(1);

  }
}
function obstacleUpdater(){
    obstacleCounter++;
    for(var i = 0; i < obstacleArray.length; i++){
         obstacleArray[i].travel();
    }
    if (obstacleCounter > 60){
        obstacleCounter = 0;
        obstacleSpawner();
    }
}
function obstacleSpawner() {
    
   
    if(currentObstacle > 10){
       
        currentObstacle = 0;
        targetObstacle = 2;
    }
  
    while(currentObstacle != targetObstacle) {
    
//    if (i > currentObstacle) {
//    obstacleArray[i].obstacleYPosition = obstacleArray[i - 1].obstacleYPosition + 150;
//    }
//   
    obstacleArray[currentObstacle].obstacleTrigger = true;
    currentObstacle++;
 
    }
      
      
    targetObstacle = currentObstacle + 2;

    
}

function powerupSpawner() {
     if(!powerup.active){
         powerCounter++;
    }
    if(powerCounter === 1000) {
        
        powerup.select = true;
        
        powerCounter = 0;
    }
}
function mousePressed(){
    if (state== 0){
    state = 0.5;}
}

