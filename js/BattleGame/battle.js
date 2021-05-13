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
  // info on player and obstacles
  dist1.html(`Distance to obstacle 1: ${obstacles[0].distanceToPlayer(player)}`)
  dist2.html(`Distance to obstacle 2: ${obstacles[1].distanceToPlayer(player)}`)
  playerX.html(`Player x-pos: ${player.x}`)
  playerY.html(`Player y-pos: ${player.y}`)
  velY.html(`Player y-velocity: ${player.yVel}`)

  //set background
  background(220);

  //draw obstacles
  fill('black');
  for (let i=0; i<obstacles.length; i++){
    let ob = obstacles[i];
    rect(ob.x, ob.y, ob.width, ob.height)
  }
  
  //draw bullets
  fill('red');
  for (let i=0; i<playerBullets.length; i++){
    let bullet = playerBullets[i];
    bullet.update();
    circle(bullet.xPos,bullet.yPos,5);
  }
  
  //update player position (could add this to the player class)
  player.changePos();
  rect(player.x,player.y,player.size,player.size);

  //check for collisions with obstacles
  for (let i=0; i<obstacles.length; i++){
    let ob = obstacles[i];
    if (ob.distanceToPlayer(player)<10 && ob.isAbove(player)){
      player.y = ob.top-player.size-1;
      player.yVel = 0;
      player.gravity = 0 ;
      player.isJumping = false;
    }
  }

  //allow right and left keys to move plaer (add movePlyaer method to class)
  if (keyIsDown(RIGHT_ARROW)){
    player.update('right');
  } else if (keyIsDown(LEFT_ARROW)){
    player.update('left');
  }
}
// end of draw loop

function keyPressed(){
  if (keyCode === UP_ARROW && !player.isJumping){
    player.isJumping = true;
    player.yVel = -25;
    player.gravity = 1;
  }
}

  
function mouseClicked(){
  let gunDirection = createVector(mouseX-player.x, mouseY-player.y);
  playerBullets.push(new Bullet(player.x,player.y,gunDirection.x, gunDirection.y));
}
  