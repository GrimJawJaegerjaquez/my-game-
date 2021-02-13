var bg,bgimg,coin,coina,coingroup,jet,jetImage,asteroid_1,asteroid_2,asteroid_3,asteroid_4,asteroid_5
//var edges=createEdgeSprites();
var asteroidGroup;
var score=0;
function preload(){
  bgimg=loadImage("bg.png")
  jetImage=loadImage("spaceship.png")
  asteroid1=loadImage("asteroid 1.png")
  asteroid2=loadImage("asteroid 2.png")
  asteroid3=loadImage("asteroid 3.png")
  asteroid4=loadImage("asteroid 4.png")
  asteroid5=loadImage("asteroid 5.png")
  coina=loadAnimation("coin1.png","coin2.png","coin3.png","coin4.png","coin5.png","coin6.png","coin7.png","coin8.png")
}
function setup() {
  createCanvas(400,600);
  bg=createSprite(200, 300, 400, 600);
  jet=createSprite(200,500,50,50);
  bg.addImage(bgimg)
  jet.addImage(jetImage)
  jet.scale=0.8
  bg.scale=2.2
  bg.y=bg.height/2
  coingroup=new Group()
  obstaclesGroup=new Group()

  jet.debug = true;
  jet.setCollider("rectangle",0,0,10,10);
}


function draw() {
  background(0);  
  bg.velocityY=2
  bg.y=bg.height/2
  //jet.collide(edges[1])
  //jet.collide(edges[2])
  //jet.collide(edges[3])
  //jet.collide(edges[0])
  if (keyDown(RIGHT_ARROW)){
    jet.x=jet.x+5
  }
  if (keyDown(LEFT_ARROW)){
    jet.x=jet.x-5
  }
  spawnCoins();
  spawnObstacles();


  if (coingroup.isTouching(jet)){
    for(var j=0;j<coingroup.length;j++){
      if (coingroup[j].istouching(jet)){
        score+=5;
        coingroup[j].destroy;
      }
    }
  }


  if (asteroidGroup.istouching(jet)){
    for(var i=0;i<asteroidGroup.length;i++){
      if (asteroidGroup[i].istouching(jet)){
        score=score-1;
        asteroidGroup[i].destroy;
      }
    }
  }


  drawSprites();
  fill("white")
  textSize(25)
  text ("score: "+score,300,50)
}

function spawnCoins() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var coin = createSprite(0,0,40,10);
    coin.x = Math.round(random(30,370));
    coin.addAnimation("coins",coina);
    coin.scale = 0.5;
    coin.velocityY = +3;
    
     //assign lifetime to the variable
    coin.lifetime = 200;

    //add each cloud to the group
    coingroup.add(coin);
  }
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(0,0,40,10);
    obstacle.x = Math.round(random(30,370));
    obstacle.velocityY = 6
    
    //generate random obstacles
   // var rand = Math.round(random(1,5));
    //obstacle.addImage("asteroid" + rand);
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: obstacle.addImage(asteroid1);
              break;
      case 2: obstacle.addImage(asteroid2);
              break;
      case 3: obstacle.addImage(asteroid3);
              break;
      case 4: obstacle.addImage(asteroid4);
              break;
      case 5: obstacle.addImage(asteroid5);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);

  }
}