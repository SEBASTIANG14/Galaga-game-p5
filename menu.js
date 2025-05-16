class Star {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(1, 3);
    this.speed = random(0.5, 2);
  }

  move() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = 0;
      this.x = random(width);
    }
  }

  show() {
    fill(255);
    noStroke();
    circle(this.x, this.y, this.size);
  }
}

class Menu {
  constructor() {
    this.stars = Array.from({ length: 100 }, () => new Star());
  }

  display() {
    background(0);

    // Mueve y dibuja las estrellas
    for (let star of this.stars) {
      star.move();
      star.show();
    }

    textAlign(CENTER);
    fill(255);
    textSize(48);
    text("GALAGA", width / 2, height / 3);

    textSize(24);
    text("Presiona 'I' para Iniciar", width / 2, height / 2);
    text("Presiona 'H' para Cómo Jugar", width / 2, height / 2 + 40);
    text("Presiona 'C' para Créditos", width / 2, height / 2 + 80);
  }
}
