class BossEnemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 80;
    this.health = 15; // Más salud para mayor dificultad
    this.speed = 2;
    this.direction = 1;
    this.isAlive = true;
    this.shootCooldown = 0;
    this.canShoot = true;
  }

  update() {
    if (!this.isAlive) return;

    // Movimiento horizontal
    this.x += this.speed * this.direction;
    if (this.x > width - this.size/2 || this.x < this.size/2) {
      this.direction *= -1;
    }

    // Movimiento vertical gradual
    if (this.y < height/4) {
      this.y += 0.5;
    }

    // Disparo
    this.shootCooldown--;
    if (this.shootCooldown <= 0 && this.canShoot) {
      this.shoot();
      this.shootCooldown = 60; // Dispara cada segundo
    }
  }

  shoot() {
    // Dispara múltiples balas
    enemyBullets.push(new Bullet(this.x, this.y + this.size/2, true));
    enemyBullets.push(new Bullet(this.x - 20, this.y + this.size/2, true));
    enemyBullets.push(new Bullet(this.x + 20, this.y + this.size/2, true));
  }

  show() {
    if (!this.isAlive) return;
    image(bossImg, this.x - this.size/2, this.y - this.size/2, this.size, this.size);
    fill(255);
    textAlign(CENTER);
    textSize(12);
    text(this.health + " HP", this.x, this.y - this.size/2 - 5);
  }

  hits(bullet) {
    let d = dist(this.x, this.y, bullet.x, bullet.y);
    if (d < this.size/2) {
      this.health--;
      if (this.health <= 0) {
        this.isAlive = false;
      }
      return true;
    }
    return false;
  }
}