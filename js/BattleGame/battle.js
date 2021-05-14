let player = new Player(50,380,20);
let obstacles = [new Obstacle(200,200,300,20,1), new Obstacle(100,100, 100, 20,2), new Obstacle(50,300, 50, 50,3),
new Obstacle(600,200,300,20,4)];
let counter = 0;
console.log(player);


let playerX,playerY,velY, gravP, counterP, numBullets;

function setup() {
  let canvas = createCanvas(1000, 400);
  canvas.id('canvas');
  velY = createP('');
  playerX = createP('');
  playerY = createP('');
  gravP = createP('');
  counterP = createP('');
  numBullets = createP('');
}

// draw loop
function draw() {
  // info on player and obstacles
  playerX.html(`Player x-pos: ${player.x}`)
  playerY.html(`Player y-pos: ${player.y}`)
  velY.html(`Player y-velocity: ${player.yVel}`)
  gravP.html(`Gravity: ${player.gravity}`)
  counterP.html(`Counter: ${counter}`)
  numBullets.html(`Number of alive bullets: ${player.bullets.length}`)

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
  player.bullets = player.bullets.filter(item => item.alive); // remove any dead bullets
  for (let i=0; i<player.bullets.length; i++){
    let bullet = player.bullets[i];
    bullet.update();
    bullet.checkAlive();
    if (bullet.alive){
      circle(bullet.xPos,bullet.yPos,bullet.size);
    }
    
  }
  
  //update player position (could add this to the player class)
  player.changePos();
  rect(player.x,player.y,player.size,player.size);

  //allow player to fall off edge of obstacles


  //check for collisions with obstacles
  
  for (let i=0; i<obstacles.length; i++){
    obstacles[i].letPlayerFall(player);
    obstacles[i].killBullets(player);
    if (!player.onObstacle){
      obstacles[i].collision(player);
    }
  }
  
  

  //allow right and left keys to move plaer (add movePlyaer method to class)
  if (keyIsDown(RIGHT_ARROW)){
    player.update('right');
  } else if (keyIsDown(LEFT_ARROW)){
    player.update('left');
  }

  //fire bullets when mouse is pressed
  if (mouseIsPressed){
    counter ++;
    if (counter%(30-player.weapon.fireRate)==0){
      let gunDirection = createVector(mouseX-player.x, mouseY-player.y);
      player.bullets.push(new Bullet(player.x,player.y,gunDirection.x, gunDirection.y, player.weapon.bulletSize));
    }
  }
}
// end of draw loop

function keyPressed(){
  if (keyCode === UP_ARROW && !player.isJumping){
    player.isJumping = true;
    player.onObstacle = 0;
    player.yVel = -20;
    player.gravity = 1;
  }
}

// function mousePressed(){
//   let gunDirection = createVector(mouseX-player.x, mouseY-player.y);
//   playerBullets.push(new Bullet(player.x,player.y,gunDirection.x, gunDirection.y, player.weapon.bulletSize));
// }


  