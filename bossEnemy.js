class BossEnemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 80;
    this.health = 15;
    this.speed = 2;
    this.direction = 1;
    this.isAlive = true;
    this.shootCooldown = 0;
    this.canShoot = true;
    this.img = bossImg;
  }

  update() {
    if (!this.isAlive) return;

    this.x += this.speed * this.direction;
    if (this.x > width - this.size/2 || this.x < this.size/2) {
      this.direction *= -1;
    }

    if (this.y < height/4) {
      this.y += 0.5;
    }

    this.shootCooldown--;
    if (this.shootCooldown <= 0 && this.canShoot) {
      this.shoot();
      this.shootCooldown = 60;
    }
  }

  shoot() {
    enemyBullets.push(new Bullet(this.x, this.y + this.size/4, true));
    enemyBullets.push(new Bullet(this.x - 30, this.y, true));
    enemyBullets.push(new Bullet(this.x + 30, this.y, true));
  }

  show() {
    if (!this.isAlive) return;
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.size, this.size);
    
    // Barra de salud
    fill(255, 0, 0);
    rect(this.x - this.size/2, this.y - this.size/2 - 15, this.size, 5);
    fill(0, 255, 0);
    rect(this.x - this.size/2, this.y - this.size/2 - 15, 
         this.size * (this.health/15), 5);
  }

  hits(bullet) {
    let d = dist(this.x, this.y, bullet.x, bullet.y);
    if (d < this.size/2 * 0.8) { // Hitbox ligeramente más pequeña
      this.health--;
      if (this.health <= 0) {
        this.isAlive = false;
      }
      return true;
    }
    return false;
  }
}