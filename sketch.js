var bg
var bgImg
var spaceship
var spaceshipImg
var lazer1
var lazer1Img
var lazer2
var lazer2Img
var lazerGroup
var aliens
var alienImage
var alienGroup
var score=0
var gamestate="play"
var gameOverSound
var shootingSound
function preload() {
bgImg=loadImage("space.png")
spaceshipImg=loadImage("spaceship.png")
lazer1Img=loadImage("lazer.png")
lazer2Img=loadImage("lazer2.png")
alienImage=loadImage("alien.png")
gameOverSound=loadSound("gameover.mp3")
shootingSound=loadSound("gunshot.mp3")
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  bg=createSprite(width/2, height/2, 50, 50);
  bg.addImage(bgImg)
  bg.scale=3
  bg.velocityY=5
spaceship=createSprite(width/2,height-100, 20, 30)
spaceship.addImage(spaceshipImg)
spaceship.scale=0.3
lazerGroup=new Group()
alienGroup=new Group()
}

function draw() {
  background(0);
  fill("white")
  textSize(20)
  text ("Score:"+score,20,50)
if (gamestate=="play") {


  if (bg.y>=height) {
    bg.y=height/2
  } 
  if (keyDown("left")){
    spaceship.x-=4
  }
  if (keyDown("right")){
    spaceship.x+=4
  }
  if (keyDown("space")) {
    lazer1=createSprite(spaceship.x-50,spaceship.y-50)
    lazer1.addImage(lazer1Img)
    lazer1.scale=0.3
    lazer1.velocityY=-5
    lazer2=createSprite(spaceship.x+50,spaceship.y-50)
    lazer2.addImage(lazer2Img)
    lazer2.scale=0.3
    lazer2.velocityY=-5
    lazerGroup.add(lazer1)
    lazerGroup.add(lazer2)
    shootingSound.play()

  }
  if (frameCount%100===0)
  spawnAliens()
  if (alienGroup.isTouching(lazerGroup)) {
    alienGroup.destroyEach()
    lazerGroup.destroyEach()
    score+=5
  }
  if (alienGroup.isTouching(spaceship)){
    spaceship.destroy()
    alienGroup.destroyEach()
    gamestate="end"
    gameOverSound.play()
  
  }
  drawSprites();
  fill("white")
  textSize(20)
  text ("Score:"+score,20,50)
} else if (gamestate==="end"){
  textSize(50)
  fill("Green")
  text ("Game Over!!", width/2-150, height/2)
  noFill()
  
}
  

}
function spawnAliens(){
  aliens=createSprite(Math.round(random(50,height-50)),0)
aliens.addImage(alienImage)
aliens.velocityY=5
aliens.scale=0.2
alienGroup.add(aliens)
}
