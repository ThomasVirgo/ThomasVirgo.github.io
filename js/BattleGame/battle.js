
let speed = 5;
let gravity = 1;
let playerBullets = [];
let player1 = new Player(50,580,20);
let isJumping = false;


function setup() {
  let canvas = createCanvas(1000, 600);
  canvas.id('canvas');
}

// draw loop
function draw() {
  background(220);
  fill('red');
  for (let i=0; i<playerBullets.length; i++){
    let bullet = playerBullets[i];
    updateBullet(bullet);
    circle(bullet.xPos,bullet.yPos,5);
  }
  
  rect(player1.x,player1.y,player1.size,player1.size);
  player1.y -= player1.yVel;
  player1.yVel -= gravity;
  if (player1.y >= height-player1.size){
    isJumping=false;
    player1.yVel = 0;
  }
  if (keyIsDown(RIGHT_ARROW)){
    updatePlayer('right');
  } else if (keyIsDown(LEFT_ARROW)){
    updatePlayer('left');
  }
}

function keyPressed(){
  if (keyCode === UP_ARROW && !isJumping){
    isJumping = true;
    player1.yVel = 20;
  }
}

function updatePlayer(move){
  switch(move){
    case 'right':
      if (player1.x < width-player1.size){
        player1.x +=speed;
      }
      break;
      
    case 'left':
      if (player1.x > 0){
        player1.x -=speed;
      }
      break;  
  }
}

function updateBullet(bullet){
  bullet.xPos += bullet.xVel/100;
  bullet.yPos += bullet.yVel/100;
}
  
function mouseClicked(){
  let gunDirection = createVector(mouseX-player1.x, mouseY-player1.y);
  playerBullets.push(new Bullet(player1.x,player1.y,gunDirection.x, gunDirection.y));
}
  