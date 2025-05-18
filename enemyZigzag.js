class EnemyZigzag extends Enemy {
  constructor(x, y) {
    super(x, y);
    this.angle = 0;
    this.amplitude = 50;
    this.speed = 1.2;
    this.img = zigzagEnemyImg; // Imagen específica
    this.size = 35; // Puedes ajustar el tamaño
  }

  update() {
    this.angle += 0.05;
    this.x += sin(this.angle) * 2;
    this.y += this.speed;
  }

  show() {
    if (this.isAlive) {
      // Dibuja la imagen con rotación para el movimiento zigzag
      push();
      translate(this.x, this.y);
      rotate(sin(this.angle) * 0.5); // Pequeña inclinación según el movimiento
      image(this.img, -this.size/2, -this.size/2, this.size, this.size);
      pop();
    }
  }
}