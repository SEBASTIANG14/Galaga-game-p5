// Clase base de enemigo
class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 30;
    this.speed = 1;
    this.isAlive = true;
  }

  update() {
    this.y += this.speed;
  }

  show() {
    if (this.isAlive) {
      fill(255, 0, 0);
      ellipse(this.x, this.y, this.size);
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
