class Bullet{
    constructor(xPos,yPos, xVel, yVel, size){
      this.xPos=xPos;
      this.yPos=yPos;
      this.xVel=xVel;
      this.yVel=yVel;
      this.size = size;
      this.alive = true;
    }

    update(){
        this.xPos += this.xVel/100;
        this.yPos += this.yVel/100;
    }

    checkAlive(){
        if (this.xPos > width || this.yPos > height || this.xPos < 0 || this.yPos < 0){
            this.alive = false;
        }
    }
  }

class Weapon{
    constructor(name, fireRate, bulletSize, ammo){
        this.name = name;
        this.fireRate = fireRate;
        this.bulletSize = bulletSize;
        this.ammo = ammo;
    }
}
  
class Player{
    constructor(x,y,size){
      this.x = x;
      this.y = y;
      this.size = size;
      this.xVel = 0;
      this.yVel = 0;
      this.speed = 5;
      this.isJumping = false;
      this.gravity =1;
      this.onObstacle = 0;
      this.weapon = new Weapon('pistol', 1, 5, 20);
      this.weapons = [this.weapon]; 
      this.bullets = [];
      this.health = 5;
    }

    update(move){
        switch(move){
            case 'right':
              if (this.x < width-this.size){
                this.x +=this.speed;
              }
              break;
              
            case 'left':
              if (this.x > 0){
                this.x -=this.speed;
              }
              break;  
        }
    }

    changePos(){
        this.y += this.yVel;
        this.yVel += this.gravity;
        if (this.y >= height-this.size){
            this.isJumping=false;
            this.yVel = 0;
            this.y = height-this.size;
        }
    }
}

class Obstacle{
    constructor(x,y,width,height, id){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.id=id;
        this.left = this.x;
        this.right = this.x + this.width;
        this.top = this.y;
        this.bottom = this.y + this.height;
    }

    playerInXRange(player){
        if ((player.x+player.size) > this.left && player.x < this.right){
            return true
        }
        return false
    }

    playerInYRange(player){
        if ((player.y+player.size) > this.top && player.y < this.bottom){
            return true
        }
        return false
    }

    
    letPlayerFall(player){
        if (player.onObstacle == this.id && !this.playerInXRange(player)){
            player.gravity = 1;
            player.onObstacle = 0;
        }
    }


    collision(player){
        //top of player with bottom of obstacle
        let topPlayerBottomObstacle = player.y - this.bottom;
        if (topPlayerBottomObstacle>0 && topPlayerBottomObstacle<20 && this.playerInXRange(player)){
            player.yVel = 5;
        }
        //bottom of player with top of obstacle
        let bottomPlayerTopObstacle = this.top - (player.y+player.size);
        if (bottomPlayerTopObstacle>0 && bottomPlayerTopObstacle<20 && this.playerInXRange(player) && !player.onObstacle){
            player.yVel = 0;
            player.y = this.top - player.size - 1;
            player.gravity = 0;
            player.isJumping = false;
            player.onObstacle = this.id;
        }
        return false;
    }

    killBullets(player){
        for (let k=0; k<player.bullets.length; k++){
            let b = player.bullets[k];
            if (b.xPos > this.left && b.xPos < this.right && b.yPos > this.top && b.yPos < this.bottom){
                b.alive = false;
            }
        }
    }
}

class Ammo{
    constructor(x,y,amount){
        this.x = x;
        this.y = y; 
        this.amount = amount;
        this.alive = true;
    }

    remove(player){
        if (this.x > player.x && this.x < (player.x+player.size) && this.y > player.y && this.y < (player.y + player.size)){
            this.alive = false;
            player.weapon.ammo += this.amount // add the ammo to player
            console.log('ammo added');
        }
    }
}

