
// Clase que representa la nave del jugador
class Player {
  constructor() {
    this.width = 40;
    this.height = 40;
    this.x = width / 2;
    this.y = height - 60;
    this.speed = 5;
  }

  show() {
    // Dibuja la imagen centrada en x, y
    imageMode(CENTER);
    image(playerImg, this.x, this.y, this.width, this.height);
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }

    this.x = constrain(this.x, this.width / 2, width - this.width / 2);
  }
}
