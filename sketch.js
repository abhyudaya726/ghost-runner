var tower,towerImg;
var door,doorImg,doorsGroup;
var climber,climberImg,climbersGroup;
var ghost,ghostImg;
var invisibleBlock,invisibleBlocksGroup;
var gameState = "play";
var spookySound;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  spookySound.loop();
  
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 2;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlocksGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
}

function draw(){
  background(0);
  
  if(gameState === "play"){
  if(tower.y>400){
    tower.y = 300;
  }
  
  if(keyDown("left_arrow")){
    ghost.x = ghost.x-3;
  }
  if(keyDown("right_arrow")){
    ghost.x = ghost.x+3;
  }
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  ghost.velocityY = ghost.velocityY+0.8;
  
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
 
    if(invisibleBlocksGroup.isTouching(ghost) || ghost.y>600){
      ghost.destroy();
      gameState = "end";
    }
  
    
    spawnDoor();
    drawSprites();
  }
  if(gameState === "end"){
    textSize(30);
    text("GameOver",230,250);
  }
}

function spawnDoor(){
  if(frameCount%120 === 0){
    door = createSprite(200,-50);
    climber = createSprite(200,10);
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    invisibeBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisible.height = 2;
    
    door.x = Math.round(random(120,400));
    door.velocityY = 2;
    
    climber.x = door.x;
    climber.velocityY = 2;
    
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 2;
    
    ghost.depth = door.depth;
    ghost.depth+=1;
    
    //add life time
    door.lifeTime = 300;
    climber.lifeTime = 300;
    
    //add each door to the group
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlock.debug = true;
    invisibleBlocksGroup.add(invisibleBlock);
  }
}