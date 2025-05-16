// Enemigo con movimiento en zigzag
class EnemyZigzag extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.angle = 0;
    this.amplitude = 50;
    this.speed = 1.5;
  }

  update() {
    this.angle += 0.05;
    this.x += sin(this.angle) * 2;
    this.y += this.speed;
  }
}
