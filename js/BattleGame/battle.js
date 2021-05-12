let player = new Player(50,380,20);
let speed = 5;
let gravity = 1;
let playerBullets = [];
let obstacles = [new Obstacle(200,200,300,20), new Obstacle(100,100, 100, 20)];
obstacles[0].distanceToPlayer(player);

let isJumping = false;
let dist1,dist2,playerX,playerY,velY;

function setup() {
  let canvas = createCanvas(1000, 400);
  canvas.id('canvas');
  dist1 = createP('');
  dist2 = createP('');
  velY = createP('');
  playerX = createP('');
  playerY = createP('');
}

// draw loop
function draw() {
  dist1.html(`Distance to obstacle 1: ${obstacles[0].distanceToPlayer(player)}`)
  dist2.html(`Distance to obstacle 2: ${obstacles[1].distanceToPlayer(player)}`)
  playerX.html(`Player x-pos: ${player.x}`)
  playerY.html(`Player y-pos: ${player.y}`)
  velY.html(`Player y-velocity: ${player.yVel}`)

  
  
  background(220);
  fill('black');
  for (let i=0; i<obstacles.length; i++){
    let ob = obstacles[i];
    rect(ob.x, ob.y, ob.width, ob.height)
  }
  
  fill('red');
  for (let i=0; i<playerBullets.length; i++){
    let bullet = playerBullets[i];
    updateBullet(bullet);
    circle(bullet.xPos,bullet.yPos,5);
  }
  
  rect(player.x,player.y,player.size,player.size);
  player.y += player.yVel;
  player.yVel += gravity;
  if (player.y >= height-player.size){
    isJumping=false;
    player.yVel = 0;
    player.y = height-player.size;
  }

  //check for collisions with obstacles
  for (let i=0; i<obstacles.length; i++){
    let ob = obstacles[i];
    if (ob.distanceToPlayer(player)<10 && ob.isAbove(player)){
      player.y = ob.top-player.size-1;
      player.yVel = 0;
      gravity = 0 ;
      isJumping = false;
    }
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
    player.yVel = -25;
    gravity = 1;
  }
}

function updatePlayer(move){
  switch(move){
    case 'right':
      if (player.x < width-player.size){
        player.x +=speed;
      }
      break;
      
    case 'left':
      if (player.x > 0){
        player.x -=speed;
      }
      break;  
  }
}

function updateBullet(bullet){
  bullet.xPos += bullet.xVel/100;
  bullet.yPos += bullet.yVel/100;
}
  
function mouseClicked(){
  let gunDirection = createVector(mouseX-player.x, mouseY-player.y);
  playerBullets.push(new Bullet(player.x,player.y,gunDirection.x, gunDirection.y));
}
  