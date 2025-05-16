// Clase que representa un disparo del jugador
class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 7;
    this.radius = 4;
  }

  // Dibuja la bala
  show() {
    fill(255, 255, 0); // Amarillo
    noStroke();
    ellipse(this.x, this.y, this.radius * 2);
  }

  // Mueve la bala hacia arriba
  update() {
    this.y -= this.speed;
  }

  // Verifica si la bala salió de la pantalla
  offScreen() {
    return this.y < 0;
  }
}
