// Enemigo que requiere 3 golpes para morir
class StrongEnemy extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.health = 3;
    this.size = 40;
  }

  hits(bullet) {
    let d = dist(this.x, this.y, bullet.x, bullet.y);
    if (d < this.size / 2) {
      this.health--;
      if (this.health <= 0) {
        this.isAlive = false;
      }
      return true;
    }
    return false;
  }

  show() {
    if (this.isAlive) {
      fill(255, 165, 0); // naranja
      ellipse(this.x, this.y, this.size);
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(12);
      text(this.health, this.x, this.y);
    }
  }
}
