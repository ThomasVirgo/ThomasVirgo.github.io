class Bullet{
    constructor(xPos,yPos, xVel, yVel){
      this.xPos=xPos;
      this.yPos=yPos;
      this.xVel=xVel;
      this.yVel=yVel;
    }
  }
  
class Player{
    constructor(x,y,size){
      this.x = x;
      this.y = y;
      this.size = size;
      this.xVel = 0;
      this.yVel = 0;
    }
}

class Weapon{
    constructor(fireRate, bulletSize, ammo){
        this.fireRate = fireRate;
        this.bulletSize = bulletSize;
        this.ammo = ammo;
    }
}