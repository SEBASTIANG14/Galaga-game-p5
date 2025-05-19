class EnemyZigzag extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.angle = 0;
    this.amplitude = 50;
    this.speed = 1.2;
    this.img = zigzagEnemyImg;
    this.size = 35;
  }

  update() {
    this.angle += 0.05;
    this.x += sin(this.angle) * 2;
    this.y += this.speed;
  }

  show() {
    if (this.isAlive) {
      push();
      imageMode(CENTER);
      translate(this.x, this.y);
      rotate(sin(this.angle) * 0.5);
      image(this.img, 0, 0, this.size, this.size);
      pop();
    }
  }
}