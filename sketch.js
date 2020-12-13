var towerImage;

var ghostStand;
var ghostJumping

var door, doorGroup,climbersGroup,invisiblesGroup;

var climber;

var PLAY=1
var END=0

var invisbileBlock

var gameState=PLAY;
function preload(){
towerImage= loadImage("tower.png");
ghostImage=loadImage("ghost-standing.png");
doorImage=loadImage("door.png");
climberImage=loadImage("climber.png");
}


function setup(){
createCanvas(600,600);

tower=createSprite(300,300,0,0);
tower.addImage(towerImage);
 tower.y = tower.height/2;
 
ghost=createSprite(300,300,5,5);
ghost.addImage(ghostImage);
ghost.scale=0.4;
  
climbersGroup=new Group();
invisiblesGroup=new Group();
doorGroup=new Group();
}


function draw(){
background(0);
if(gameState===PLAY){
 tower.velocityY=1;
 if (tower.y > 400){
tower.y = 300;}
  
if(keyDown("space")){
ghost.velocityY=-5; 
}
ghost.velocityY=ghost.velocityY+0.8;

if(keyDown("left_Arrow")){
ghost.x= ghost.x-2;
}
  
if(keyDown("right_Arrow")){
ghost.x= ghost.x+2;
}
if(climbersGroup.isTouching(ghost)){
ghost.velocityY=0;  
}
 
if(invisiblesGroup.isTouching(ghost)||ghost.y>600) {
ghost.destroy();
  gameState=END;}

spawndoors();


drawSprites();
  
} 
if(gameState===END){
textSize(24);
stroke("Yellow");
fill("Yellow");
text("GAME OVER",250,300);
}
}

function spawndoors(){
if(frameCount % 280===0){
door=createSprite(200,-50)
door.addImage(doorImage);
door.x= Math.round(random(120,400));
door.velocityY=1;

ghost.depth=door.depth+1;
  
  
climber=createSprite(200,10)
climber.addImage(climberImage);
climber.x= door.x
climber.velocityY=1;
  
invisibleBlock=createSprite(200,15);
invisibleBlock.width=climber.width;
invisibleBlock.height=2;
invisibleBlock.x=door.x;
invisibleBlock.debug=true;
invisibleBlock.velocityY=1;

doorGroup.add(door);
climbersGroup.add(climber);
invisiblesGroup.add(invisibleBlock);
  
door.lifetime=800;
climber.lifetime=800;
invisibleBlock.lifetime=800;
}
  
}