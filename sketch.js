    var monkey,monkey_running;
    var banana,obstacle,obstacleImage;
    var foodGroup,obstacleGroup;
    var score = 0;
    var ground,invisibleG;
    var survivalTime = 0;
    var GameState;
    var PLAY,END;
    var end;

    function preload(){
      monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

     bananaImage = loadImage("banana.png") 
     obstacleImage = loadImage("obstacle.png") 
    }

    function setup(){
    createCanvas(525,500);
      PLAY = 1;
      GameState = PLAY;
      END = 0;

      FoodGroup = new Group();
      obstacleGroup = new Group();

      monkey = createSprite(70,372,50,50);
      monkey.addAnimation("monkey",monkey_running)
      monkey.scale=0.1;

      ground = createSprite(250,405,1000,10);
      ground.x = ground.width / 2;

       invisibleG = createSprite(250,405,1000,10);
      invisibleG.x = ground.width / 2;





    }
    function draw(){
      background("white")
      if(GameState === PLAY){

        if(ground.x < 0){
        ground.x = ground.width / 2;
        }

        if(invisibleG.x < 0){
        invisibleG.x = ground.width / 2;
        }
         invisibleG.velocityx = -5;

        if(keyDown("space")){
          monkey.velocityY = -20;
        }
      score = Math.round(frameCount / 3)
      survivalTime = Math.ceil(frameCount / frameRate())
      ground.velocityX = -(5 + 2 * score / 100)

      if(monkey.isTouching(foodGroup)){
        foodGroup.destroyEach();
      }

    Food();
    Obstacle();

      if(monkey.isTouching(obstacleGroup)){
        GameState = END;
      }
      }

     else if(GameState === END){
       invisibleG.velocityX = 0;
       obstacleGroup.setVelocityXEach(0);
       foodGroup.setVelocityXEach(0);

       obstacleGroup.setLifetimeEach(-1);
       foodGroup.setLifetimeEach(-1);
     } 
      monkey.velocityY = monkey.velocityY + 1.0

      monkey.collide(invisibleG)

      stroke("black");
      textSize(20)
      fill("red");
      text("score:" + score,400,50);

      stroke("black");
      textSize(20)
      fill("black");
      text("suvivalTime:" + suvivalTime,100,50);


    drawSprites();
    }
    function Food(){

     if(framCount % 80 === 0){
      var banana = createSprite(500,10,10,20)
       banana.addImage("banana",bananaImage)
       banana.velocityX = -(5 + 2 * score / 100);
       banana.y = Math.round(random(120,200))
       banana.scale = 0.1;
       foodGroup.add(banana);
       foodGroup.setLifetimeEach(100)
       banana.setCollider("rectangle",0,0,400,400);
        } 
    }
function Obstacle(){
 if(framCount % 300 === 0){
      var obstacle= createSprite(500,10,10,20)
       obstacle.addImage(" obstacle", obstacleImage)
       obstacle.velocityX = -(5 + 2 * score / 100);       
       obstacle.scale = 0.2;
       obstacleGroup.add( obstacle);
       obstacleGroup.setLifetimeEach(100)
       obstacle.setCollider("circle",0,0,200);
        } 
}