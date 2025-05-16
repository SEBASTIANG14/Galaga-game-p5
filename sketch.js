let player;
let playerImg;
let bullets = [];
let gameState = 'menu'; // 'menu', 'playing', 'help', 'credits'
let menu;

function preload() {
  playerImg = loadImage('assets/playerShip.png');
}

function setup() {
  createCanvas(600, 600);
  player = new Player();
  menu = new Menu();
}

function draw() {
  if (gameState === 'menu') {
    menu.display();
  } else if (gameState === 'playing') {
    background(0);
    player.move();
    player.show();

    // Mover y mostrar balas
    for (let i = bullets.length - 1; i >= 0; i--) {
      bullets[i].update();
      bullets[i].show();
      if (bullets[i].offScreen()) {
        bullets.splice(i, 1);
      }
    }
  } else if (gameState === 'help') {
    showHelp();
  } else if (gameState === 'credits') {
    showCredits();
  }
}

function keyPressed() {
  if (gameState === 'menu') {
    if (key === 'I' || key === 'i') {
      gameState = 'playing';
    } else if (key === 'H' || key === 'h') {
      gameState = 'help';
    } else if (key === 'C' || key === 'c') {
      gameState = 'credits';
    }
  } else if (gameState === 'playing') {
    if (!player) return;
    if (key === ' ') {
      let bullet = new Bullet(player.x, player.y - 20);
      bullets.push(bullet);
    }
  } else if (key === 'M' || key === 'm') {
    gameState = 'menu';
  }
}

function showHelp() {
  background(0);
  fill(255);
  textAlign(CENTER);
  textSize(24);
  text("Cómo Jugar", width / 2, 100);
  textSize(16);
  text("Mueve la nave con ← y →\nDispara con ESPACIO\nEvita colisiones y destruye enemigos", width / 2, 180);
  text("Presiona 'M' para volver al menú", width / 2, height - 40);
}

function showCredits() {
  background(0);
  fill(255);
  textAlign(CENTER);
  textSize(24);
  text("Créditos", width / 2, 100);
  textSize(16);
  text("Desarrollado por [Tu Nombre Aquí]\nProyecto escolar - Galaga con p5.js", width / 2, 180);
  text("Presiona 'M' para volver al menú", width / 2, height - 40);
}
