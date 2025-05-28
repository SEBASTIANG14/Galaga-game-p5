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
        for (let star of this.stars) {
            star.move();
            star.show();
        }

        textAlign(CENTER);
        fill(255);
        textSize(48);
        text("GALAGA", width / 2, height / 4);

        textSize(24);
        text("Presiona 'I' para Iniciar", width / 2, height / 2 - 40);
        text("Presiona 'H' para Cómo Jugar", width / 2, height / 2);
        text("Presiona 'C' para Créditos", width / 2, height / 2 + 40);
        text("Presiona 'P' para Puntuaciones", width / 2, height / 2 + 80);
    }

    showHighscores() {
        background(0);
        
        for (let star of this.stars) {
            star.move();
            star.show();
        }

        textAlign(CENTER);
        fill(255);
        textSize(32);
        text("TOP 10 PUNTUACIONES", width / 2, 80);

        textSize(20);
        
        const currentHighscores = scoreManager.getHighscores(); 
        
        // Ordena las puntuaciones de mayor a menor (aunque scoreManager ya las ordena, es buena práctica aquí)
        const sortedScores = [...currentHighscores].sort((a, b) => b.score - a.score);
        
        const topScores = sortedScores.slice(0, 10); 
        
        if (topScores.length === 0) {
            text("No hay puntuaciones aún", width / 2, height / 2);
        } else {
            let yPos = 120;
            topScores.forEach((record, index) => {
                text(`${index + 1}. ${record.name}: ${record.score}`, width / 2, yPos);
                yPos += 30;
            });
        }

        textSize(16);
        text("Presiona 'M' para volver al menú", width / 2, height - 40);
    }
}