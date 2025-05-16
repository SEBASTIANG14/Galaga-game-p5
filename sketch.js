let player;
let playerImg;
let bullets = [];
let enemies = [];
let menu;
let score = 0;
let lives = 3;
let level = 1;
let gameState = 'menu';
let gameOver = false;
let enemyBullets = [];

function preload() {
  playerImg = loadImage('assets/playerShip.png');
}

function setup() {
  createCanvas(600, 600);
  player = new Player();
  menu = new Menu();
  initLevel1();
}

function draw() {
  if (gameState === 'menu') {
    menu.display();

  } else if (gameState === 'playing') {
    background(0);

    player.move();
    player.show();

    for (let i = bullets.length - 1; i >= 0; i--) {
      bullets[i].update();
      bullets[i].show();
      if (bullets[i].offScreen()) {
        bullets.splice(i, 1);
      }
    }

    for (let enemy of enemies) {
      enemy.update();
      enemy.show();
    }

    for (let i = enemies.length - 1; i >= 0; i--) {
      for (let j = bullets.length - 1; j >= 0; j--) {
        if (enemies[i].isAlive && enemies[i].hits(bullets[j])) {
          let wasKilled = !enemies[i].isAlive;
          bullets.splice(j, 1);
          if (wasKilled) {
            score += (enemies[i] instanceof StrongEnemy) ? 3 : 1;
          }
          break;
        }
      }
    }

    for (let i = enemies.length - 1; i >= 0; i--) {
      let enemy = enemies[i];
      if (!enemy.isAlive) continue;

      let d = dist(enemy.x, enemy.y, player.x, player.y);
      if (d < enemy.size / 2 + player.width / 2) {
        enemy.isAlive = false;
        lives--;
      }

      if (enemy.y > height) {
        enemy.isAlive = false;
        lives--;
      }
    }

    fill(255);
    textSize(16);
    text(`Puntaje: ${score}`, 10, 20);
    text(`Nivel: ${level}`, 10, 40);
    text(`Vidas: ${lives}`, 10, 60);

    if (lives <= 0) {
      gameOver = true;
      gameState = 'gameover';
    }

    if (enemies.every(e => !e.isAlive)) {
      gameState = 'levelComplete';
    }

    for (let i = enemyBullets.length - 1; i >= 0; i--) {
      enemyBullets[i].update();
      enemyBullets[i].show();

      if (enemyBullets[i].offScreen()) {
        enemyBullets.splice(i, 1);
      }

      let d = dist(enemyBullets[i].x, enemyBullets[i].y, player.x, player.y);
      if (d < player.width / 2) {
        lives--;
        enemyBullets.splice(i, 1);
      }
    }

  } else if (gameState === 'help') {
    showHelp();

  } else if (gameState === 'credits') {
    showCredits();

  } else if (gameState === 'gameover') {
    background(0);
    fill(255, 0, 0);
    textAlign(CENTER);
    textSize(32);
    text("GAME OVER", width / 2, height / 2 - 40);
    textSize(16);
    text(`Puntaje final: ${score}`, width / 2, height / 2);
    text("Presiona 'M' para volver al menú", width / 2, height / 2 + 40);

  } else if (gameState === 'levelComplete') {
    background(0);
    fill(0, 255, 0);
    textAlign(CENTER);
    textSize(24);
    text("¡Nivel superado!", width / 2, height / 2 - 20);
    textSize(16);
    text("Presiona ENTER para continuar", width / 2, height / 2 + 20);
  }
}

function initLevel1() {
  enemies = [];
  for (let i = 0; i < 20; i++) {
    let x = random(50, width - 50);
    let y = random(-500, -50);
    enemies.push(new Enemy(x, y));
  }
}

function initLevel2() {
  enemies = [];
  for (let i = 0; i < 8; i++) {
    let x = random(50, width - 50);
    let y = random(-500, -50);
    enemies.push(new EnemyZigzag(x, y));
  }
  let strongX = random(100, width - 100);
  let strongY = random(-600, -400);
  enemies.push(new StrongEnemy(strongX, strongY));
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
  } else if (gameState === 'levelComplete') {
    if (keyCode === ENTER) {
      level++;
      if (level === 2) {
        initLevel2();
      } else {
        initLevel1();
      }
      gameState = 'playing';
    }
  }

  if (key === 'M' || key === 'm') {
    resetGame();
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
  text("Mueve la nave con ← y →\nDispara con ESPACIO\nDestruye enemigos y evita colisiones", width / 2, 180);
  text("Presiona 'M' para volver al menú", width / 2, height - 40);
}

function showCredits() {
  background(0);
  fill(255);
  textAlign(CENTER);
  textSize(24);
  text("Créditos", width / 2, 100);
  textSize(16);
  text("Desarrollado por [Tu Nombre Aquí]\nProyecto Galaga - p5.js", width / 2, 180);
  text("Presiona 'M' para volver al menú", width / 2, height - 40);
}

function resetGame() {
  lives = 3;
  level = 1;
  score = 0;
  bullets = [];
  player = new Player();
  initLevel1();
  gameOver = false;
}