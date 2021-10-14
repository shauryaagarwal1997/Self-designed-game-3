var bg1,bg1I;
var bg2,bg3;
var bg2I,bg2II;
var animation;
var man;
var coinImg,obstacleImg;
var coinsGroup;
var score=0;
var life=3;
var gameState=0;

function preload(){
  bg1I=loadImage("bg1.jpg");
  animation=loadAnimation("1.png","2.png");
  bg2I=loadImage("black.jpg");
  obstacleImg=loadImage("rock.jpg");
}
  function setup() {
  createCanvas(windowWidth,windowHeight);
  bg1=createSprite(windowWidth/2, windowHeight/2, 50,50);
  bg1.addImage(bg1I);
  bg2=createSprite(bg1.x+windowWidth,windowHeight/2, 50,50);
  bg2.addImage(bg1I);
  bg1.velocityX=-5;
  bg2.velocityX=-5;
  coinsGroup=createGroup();
  obstaclesGroup=createGroup();
  man=createSprite(150,windowHeight/2+250,100,100);
  man.addAnimation("ani",animation);
}

function draw() {
  if(gameState===0){
  coins();
  obstacles();
  if(bg2.x===windowWidth/2){
    bg1.x=windowWidth/2;
    bg2.x=bg1.x+windowWidth;
    bg1.velocityX=-4;
    bg2.velocityX=-4;
  }
  for(var i=0 ; i<coinsGroup.length ; i++){
    coinImg.position(coinsGroup.get(i).x,coinsGroup.get(i).y);
  }
  if(coinsGroup.isTouching(man)){
    coinsGroup.destroyEach();
    score+=1;
  }
  if(obstaclesGroup.isTouching(man)){
    obstaclesGroup.destroyEach();
    life-=1;
  }  
  drawSprites();
}
 if(life===0){
    gameState=1;
  }
if(gameState===1){
  background(bg2I);
    obstaclesGroup.destroyEach();
    coinsGroup.destroyEach();

    textSize(70);
    fill("red");
    text("GAME OVER",width/2-200,height/2);

    for(var i=0 ; i<coinsGroup.length ; i++){
      coinImg.position(coinsGroup.get(i).x+10000000,coinsGroup.get(i).y+10000000);
    }
}

  textSize(50);
  fill("red");
  text("Score : "+score,width-300,100);
  text("Lives : "+life,width-300,150);


}
function coins(){
  var coinS,coinI;
  if(frameCount % 70 === 0){
    
  coinS=createSprite(width+30,random(height/2+100,height/2+300),100,100);
  coinS.velocityX=random(-13,-19);
  coinS.lifetime=width*2/coinS.velocityX;
  coinImg=loadAnimation("coin1.gif");
  coinImg.size(200,20);
  
  coinsGroup.add(coinS);
  }
}

function obstacles(){
  var obstacleS,obstacleI;
  if(frameCount % 90 === 0){
  obstacleS=createSprite(width+30,height/2+300,100,100);
  obstacleS.velocityX=random(-17,-21);
  obstacleS.lifetime=width*2/obstacleS.velocityX;

  obstacleS.addImage(obstacleImg);
  obstaclesGroup.add(obstacleS);
  }
}