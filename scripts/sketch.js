var player;
var enemy;
var sound;
var backdrop;
var backdropx = 0;
var obstacle;
var obstacleArray = [];
var coinArray = [];
var starArray = [];
var starArray2 = [];
var coinRate = 50;
var coinCounter = 0;
var currentCoin = 0;
var powerCounter = 0;
var mid, lowMid, highMid;
var fft, peakDetect;
var scoreGlobal, oldScoreGlobal;
var currentObstacle = 0;
var targetObstacle = 2;

var obstacleCounter = 0;
var songLength;
var highestValue = 400;
var lowestValue = 100;
var globalValue = [];
var globalCount = 0;

var starSpeed;

//make 4 payable songs with predetermined high lows
//MAKE HOMESCREEN
//MAKE HUD
///* Animations
//alien bouncing
//alien hit
//collision explosion
//meteor fire
//coin spin*/
//make coins bounce in sine wave


var gameState = 0;

var button;

function preload() {
     sound = loadSound("/songs/d.mp3");
    songLength = sound.duration();
}
   
    

function setup() {
    //768
    var cnv =createCanvas(1920, 500);
    cnv.position(0, 200);
   p5.disableFriendlyErrors = true;

    fft = new p5.FFT();
     player = new Player();
     enemy = new Enemy();
     powerup = new Powerup();
     loadImages();
    
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
     playSong()
    
//   button = createButton('submit');
//   button.position(width - 20, height - 20);
//   button.mousePressed(playSong);
//   
 
   
}

function draw() {
   //console.log(getFrameRate());

   mainGame();
}

function playSong(){
    sound.play();
}


 function mainGame(){
  
    cycleBG();
   analyzeSound();
    coinSpawner()
    starSpawner();
    powerupSpawner()
    obstacleUpdater()
    enemy.fly();
   
 
    
   
    player.update();
    powerup.update();
   
 
   
 // var waveform = fft.waveform();
//  
//  noFill();
//  beginShape();
//  stroke(255,255,255, 50); // waveform is red
//  strokeWeight(1);
//  for (var i = 0; i< waveform.length; i++){
//    var x = map(i, 0, waveform.length, 0, width);
//    var y = map( waveform[i], -1, 1, 0, height);
//    vertex(x,y);
//  }
//  endShape();

    
    }


function loadImages() {
    
    backdrop = loadImage("images/background2.png");

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
   
   mid = fft.getEnergy("mid");
   lowMid = fft.getEnergy("lowMid");
   highMid = fft.getEnergy("highMid");
  scoreGlobal = (lowMid * 0.66) + (0.8 * mid) + highMid;
 
  
    
}

function starSpawner(){
      //white stars
 var size = map(scoreGlobal, 200, highestValue, 0, 7);   
 
    if (scoreGlobal > highestValue -20) {
      starSpeed = 5;}
    else {
        starSpeed=2;
    }
      
  for(var i = 0; i < starArray.length; i++) {
      
    starArray[i].show(size);
        starArray[i].update(starSpeed);

  }
     for(var j = 0; j < starArray2.length; j++) {
      
        starArray2[j].show(3);
        starArray2[j].update(3);

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

