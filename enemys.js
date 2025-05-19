class Enemy {
  constructor(x, y) {
    this.x = x;  // Centro X del enemigo
    this.y = y;  // Centro Y del enemigo
    this.size = 30; // Diámetro del círculo de colisión
    this.speed = 1;
    this.isAlive = true;
    this.img = enemyImg;
  }

  update() {
    this.y += this.speed;
  }

  show() {
    if (this.isAlive) {
      // Dibuja la imagen centrada en (x,y)
      imageMode(CENTER);
      image(this.img, this.x, this.y, this.size, this.size);
    }
  }

  hits(bullet) {
    // Colisión circular simple (como en tu original)
    let d = dist(this.x, this.y, bullet.x, bullet.y);
    if (d < this.size / 2) {
      this.isAlive = false;
      return true;
    }
    return false;
  }
}