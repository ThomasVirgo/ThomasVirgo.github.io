
let speed = 5;
let playerBullets = [];
let player1 = new Player(50,50,20)


function setup() {
  let canvas = createCanvas(600, 600);
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
  if (keyIsDown(RIGHT_ARROW)){
    updatePlayer('right');
  } else if (keyIsDown(LEFT_ARROW)){
    updatePlayer('left');
  }
  else if (keyIsDown(UP_ARROW)){
    updatePlayer('up');
  }
  else if (keyIsDown(DOWN_ARROW)){
    updatePlayer('down');
  }
  
}

function updatePlayer(move){
  switch(move){
    case 'right':
      player1.x +=speed;
      break;
      
    case 'left':
      player1.x -=speed;
      break;
      
    case 'up':
      player1.y -=speed;
      break;
    
    case 'down':
      player1.y +=speed;
      break   
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
  