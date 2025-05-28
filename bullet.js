class Bullet {
  constructor(x, y, isEnemy = false) {
    this.x = x;
    this.y = y;
    this.r = 5;
    this.speed = isEnemy ? 5 : -7;
    this.isEnemy = isEnemy;

    // Reproducir sonido de disparo del enemigo si es una bala enemiga
    if (this.isEnemy) {
        enemyShootSound.play(); // Reproducir el sonido
        enemyShootSound.setVolume(0.1); // Ajusta el volumen
    }
  }

  update() {
    this.y += this.speed;
  }

  show() {
    noStroke();
    if (this.isEnemy) {
      fill(255, 0, 0);
    } else {
      fill(0, 255, 0);
    }
    ellipse(this.x, this.y, this.r * 2);
  }

  offScreen() {
    return this.y < 0 || this.y > height;
  }
}
