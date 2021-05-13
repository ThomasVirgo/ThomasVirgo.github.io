class Bullet{
    constructor(xPos,yPos, xVel, yVel){
      this.xPos=xPos;
      this.yPos=yPos;
      this.xVel=xVel;
      this.yVel=yVel;
    }

    update(){
        this.xPos += this.xVel/100;
        this.yPos += this.yVel/100;
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
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
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

    distanceToPlayer = (player) =>{
        if (this.playerInXRange(player)){
            let belowDist = Math.abs(player.y - this.bottom);
            let aboveDist = Math.abs((this.top - (player.y+player.size)))
            return Math.min(belowDist, aboveDist);
        }
        if (this.playerInYRange(player)){
            let rightDist = Math.abs(player.x - this.right);
            let leftDist = Math.abs((this.left - (player.x+player.size)))
            return Math.min(leftDist, rightDist);
        }
        //otherwise not within obstacle co-ords
        return 500
    }

    isAbove(player){
        if (this.top - (player.y+player.size)>=0){
            return true;
        }
        return false;
    }


}

class Weapon{
    constructor(fireRate, bulletSize, ammo){
        this.fireRate = fireRate;
        this.bulletSize = bulletSize;
        this.ammo = ammo;
    }
}