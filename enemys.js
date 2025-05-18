class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 30;
    this.speed = 1;
    this.isAlive = true;
    this.img = enemyImg; // Asignamos la imagen
  }

  update() {
    this.y += this.speed;
  }

  show() {
    if (this.isAlive) {
      // Dibuja la imagen en lugar de la elipse
      image(this.img, this.x - this.size/2, this.y - this.size/2, this.size, this.size);
    }
  }

  hits(bullet) {
    let d = dist(this.x, this.y, bullet.x, bullet.y);
    if (d < this.size / 2) {
      this.isAlive = false;
      return true;
    }
    return false;
  }
}