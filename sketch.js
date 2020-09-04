var player,player_running,jungle,jungle_img,invisibleground,score,gameState,PLAY,END,player_collided,player2,restart,restart_img,jungle2,jungle3,jungle3_img;

var foods_img,foodGroup,stone_img,stoneGroup;


function preload(){
  
 player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
 jungle_img = loadImage("jungle.jpg");
  
 foods_img = loadImage("banana.png");
  
 stone_img = loadImage("stone.png");
  
  player_collided = loadImage("collided.jpg")
  
  jungle_end = loadImage("download.jpg");
  
  restart_img = loadImage("images.jpg");
  
  jungle3_img = loadImage("download1.jpg");
  
  
}


function setup() {
  createCanvas(400,400);
  
  
  
   
 jungle = createSprite(200,200,200,200);
  jungle.addImage(jungle_img);
  jungle.x = jungle.width/2;
  jungle.velocityX = -4;

   jungle2 = createSprite(200,200,200,200);
  jungle2.addImage(jungle_end);
  jungle2.visible = false;
 
   
  
  player = createSprite(60,360,20,20);
  player.addAnimation("running",player_running);
  player.scale = 0.1;
  
  
  invisibleground = createSprite(200,365,400,10);
  invisibleground.visible = false;
  
  
  player2 = createSprite(60,330,20,20);
  player2.addImage(player_collided);
  player2.visible = false;
  player2.scale = 0.2;
  
  restart = createSprite(330,200,20,20);
  restart.addImage(restart_img);
  restart.scale = 0.3;
  restart.visible = false;
  
  jungle3 = createSprite(200,200,200,200);
  jungle3.addImage(jungle3_img);
  jungle3.scale = 5;
  jungle3.visible = false;
  
  foodGroup = new Group();
  stoneGroup = new Group();
  
   score = 0;
  
  PLAY = 1;
  END = 2;
  gameState = PLAY;
  
}

function draw() {
  background(220);
  player.collide(invisibleground);
  drawSprites();
  



  
  
   if (gameState === PLAY){
     
     
     
   
  
  if (jungle.x<0){
    jungle.x = jungle.width/2; 
  }
    
  if (keyDown ("space")&&player.y >= 300){
    player.velocityY = - 19;
  }
    
 player.velocityY = player.velocityY + 1;
    
  if (player.isTouching(foodGroup)){
    foodGroup.destroyEach();
    score = score + 2;
    
  }
    
    jungle2.visible = false;
     jungle.velocityX = -4;
     
   if (player.isTouching(stoneGroup)&&player.scale === 0.1){
    gameState = END;
    
   }
     
     if (player.isTouching(stoneGroup)&&player.scale > 0.1){
    stoneGroup.destroyEach();
       player.scale = 0.1;
       score = score - 3;
       
    
   }
  
  food(); 
  stone();
  
 
 switch(score){
   case 10 : player.scale = 0.12;
     break;
      case 20 : player.scale = 0.14;
     break;
      case 30 : player.scale = 0.16;
     break;
      case 40 : player.scale = 0.18;
     break;
      case 50 : player.scale = 0.2;
     break;
      case 60 : player.scale = 0.22;
     break;
      case 70 : player.scale = 0.24;
     break;
      case 80 : player.scale = 0.26;
     break;
      case 90 : player.scale = 0.28;
     break;
    default : break;
     
 }
     
      
  
  stroke("white");
  textSize(30);
  fill("black");
  text("Score:"+score,150,80);
  text("you have to score 50",80,50);

  
   }





 
  
  if (gameState === END){
    player.velocityY = 0;
 jungle.velocityX = 0;
  stoneGroup.setVelocityXEach(0);
  foodGroup.setVelocityXEach(0);
  stoneGroup.setLifetimeEach(-1);
  foodGroup.setLifetimeEach(-1);
 player2.visible = true;
    player.visible = false;
    stoneGroup.destroyEach();
    foodGroup.destroyEach();
    jungle2.addImage(jungle_end);
    jungle2.scale = 2;
    restart.visible = true;
    jungle2.visible = true;

    
  
    
  
     
  }
  
  
  if (mousePressedOver(restart)){
    reset();
  }
  
  
  if (score === 50){
    jungle3.visible = true;
    player.visible = false;
    jungle.visible = false;
    stoneGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    stoneGroup.setVisibleEach(false);
    foodGroup.setVisibleEach(false);
    
  }
  
  
  console.log(gameState);
}
  


function food(){
  if (frameCount % 80 === 0){
    var foods = createSprite(400,320,20,20);
    foods.y = random(120,200);
    foods.velocityX = -(6+3*score/10); 
    foods.addImage(foods_img);
    foods.scale = 0.05;
    foods.setLifetime = 200;
    foodGroup.add(foods);
    
  }
}

function stone(){
  if (frameCount % 300 === 0){
    var stones = createSprite(400,340,20,20);
   stones.addImage(stone_img);
   stones.velocityX = -(6+3*score/10);
   stones.scale = 0.15;
   stones.lifetime = 200;
   stoneGroup.add(stones);
  }
}

function reset(){
  gameState = PLAY;
  restart.visible = false;
  player.visible = true;
  score = 0;
  player2.visible = false;
  
}
  

