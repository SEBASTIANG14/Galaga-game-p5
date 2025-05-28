let player;
let playerImg;
let bossImg;
let bullets = [];
let enemies = [];
let menu;
let score = 0;
let lives = 3;
let level = 1;
let gameState = 'menu';
let gameOver = false;
let enemyBullets = [];
let levelCompleted = false;
let bossDefeated = false;
let bossSpawned = false;
let highscoresState = false;
let playerName = '';
let nameInputActive = false;
let scoreManager;
let showingNameInput = false;
let playerNameInput = '';

function preload() {
  playerImg = loadImage('assets/playerShip.png');
  bossImg = loadImage('assets/boss.png');
  enemyImg = loadImage('assets/normalEnemy.png');
  strongEnemyImg = loadImage('assets/miniBoss.png');
  zigzagEnemyImg = loadImage('assets/normalEnemy.png');
}

function setup() {
  createCanvas(600, 600);
  player = new Player();
  menu = new Menu();
  scoreManager = new ScoreManager();
  initLevel1();
}

function draw() {
   if (gameState === 'menu') {
    if (highscoresState) {
      menu.showHighscores();
    } else {
      menu.display();
    }
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
      if (enemy.isAlive) {
        enemy.update();
        enemy.show();
        if (enemy.canShoot && random(1) < 0.01) {
          enemyBullets.push(new Bullet(enemy.x, enemy.y, true));
        }
      }
    }

    // Colisiones bala-enemigo
    for (let i = enemies.length - 1; i >= 0; i--) {
      for (let j = bullets.length - 1; j >= 0; j--) {
        if (enemies[i].isAlive && enemies[i].hits(bullets[j])) {
          bullets.splice(j, 1);
          if (!enemies[i].isAlive) {
            if (enemies[i] instanceof BossEnemy) {
              score += 10;
              bossDefeated = true;
            } else if (enemies[i] instanceof StrongEnemy) {
              score += 3;
            } else {
              score += 1;
            }
          }
          break;
        }
      }
    }

    // Colisiones enemigo-jugador
    for (let enemy of enemies) {
      if (!enemy.isAlive) continue;

      let d = dist(enemy.x, enemy.y, player.x, player.y);
      if (d < enemy.size / 2 + player.width / 2 || enemy.y > height) {
        enemy.isAlive = false;
        lives--;
      }
    }

    // Colisiones balas enemigas
    for (let i = enemyBullets.length - 1; i >= 0; i--) {
      enemyBullets[i].update();
      enemyBullets[i].show();

      if (enemyBullets[i].offScreen()) {
        enemyBullets.splice(i, 1);
        continue;
      }

      let d = dist(enemyBullets[i].x, enemyBullets[i].y, player.x, player.y);
      if (d < player.width / 2) {
        lives--;
        enemyBullets.splice(i, 1);
      }
    }

    // Verificar si debe aparecer el jefe (nivel 3)
    if (level === 3 && enemies.every(e => !e.isAlive || e instanceof BossEnemy)) {
      if (!bossSpawned && !enemies.some(e => e instanceof BossEnemy)) {
        enemies.push(new BossEnemy(width / 2, -100));
        bossSpawned = true;
      }
    }

    // HUD
    fill(255);
    textSize(16);
    text(`Puntaje: ${score}`, 10, 20);
    text(`Nivel: ${level}`, 10, 40);
    text(`Vidas: ${lives}`, 10, 60);

    // Verificar Game Over
    if (lives <= 0) {
      gameState = 'gameover';
    }

    // ¿Nivel completado?
    if (enemies.every(e => !e.isAlive)) {
      if (level === 3 && bossDefeated) {
        gameState = 'victory';
      } else if (level < 3) {
        gameState = 'levelComplete';
      }
    }

  } else if (gameState === 'levelComplete') {
    showLevelComplete(level);
  } else if (gameState === 'help') {
    showHelp();
  } else if (gameState === 'credits') {
    showCredits();
 } else if (gameState === 'gameover' || gameState === 'victory') {
    background(0);
    fill(gameState === 'victory' ? 0 : 255, 255, 0); // Amarillo para victoria, blanco para game over
    textAlign(CENTER);
    textSize(32);
    text(gameState === 'victory' ? "¡VICTORIA!" : "GAME OVER", width / 2, height / 2 - 80);

    textSize(24);
    text(`Puntaje: ${score}`, width / 2, height / 2 - 30);

    // Lógica para mostrar la entrada del nombre
    if (score > 0 && !showingNameInput && (scoreManager.isHighscore(score) || scoreManager.getHighscores().length < scoreManager.maxScores)) {
      // Solo muestra el input si la puntuación es válida para ser un highscore
      showingNameInput = true;
    }

    if (showingNameInput) {
      fill(255);
      textSize(20);
      text("Ingresa tu nombre (5 letras):", width / 2, height / 2 + 20);
      text(playerNameInput + (frameCount % 60 < 30 ? "_" : ""), width / 2, height / 2 + 60);
      textSize(16);
      text("Presiona ENTER para guardar", width / 2, height / 2 + 100);
    } else {
      textSize(18);
      text("Presiona R para reiniciar", width / 2, height / 2 + 40);
      text("Presiona M para menú", width / 2, height / 2 + 80);
    }
  }
}

function keyPressed() {
    if (showingNameInput) {
        if (keyCode === ENTER) {
            if (playerNameInput.length > 0) {
                scoreManager.addScore(playerNameInput, score);
                showingNameInput = false; // Desactiva la entrada de nombre
                playerNameInput = ''; // Limpia el input
                gameState = 'menu'; //Regresar al menú.
                score = 0; 
                resetGame(); 
            }
        } else if (keyCode === BACKSPACE) {
            playerNameInput = playerNameInput.slice(0, -1);
        } else if (/^[a-zA-Z]$/.test(key) && playerNameInput.length < 5) {
            playerNameInput += key.toUpperCase();
        }
        return;
    }
  if (gameState === 'menu') {
    if (key === 'I' || key === 'i') {
      gameState = 'playing';
      score = 0; 
    } else if (key === 'H' || key === 'h') {
      gameState = 'help';
    } else if (key === 'C' || key === 'c') {
      gameState = 'credits';
    } else if (key === 'P' || key === 'p') {
      highscoresState = !highscoresState;
    } else if (key === 'M' || key === 'm') {
      highscoresState = false;
    }
  } else if (gameState === 'playing') {
    if (key === ' ') {
      bullets.push(new Bullet(player.x, player.y - 20));
    }
  } else if (gameState === 'levelComplete') {
    if (keyCode === ENTER) {
      level++;
      if (level === 2) {
        initLevel2();
      } else if (level === 3) {
        initLevel3();
      }
      gameState = 'playing';
    }
  } else if (gameState === 'victory') {
    if (key === 'R' || key === 'r') {
      resetGame();
      gameState = 'playing';
    } else if (key === 'M' || key === 'm') {
      score = 0; 
      resetGame();
      gameState = 'menu';
    }
  } else if ((gameState === 'gameover' || gameState === 'victory') && nameInputActive) {
    if (keyCode === ENTER && playerName.trim() !== '') {
      menu.addHighscore(playerName, score);
      nameInputActive = false;
      score = 0; 
    } else if (keyCode === BACKSPACE) {
      playerName = playerName.slice(0, -1);
    } else if (key.length === 1 && playerName.length < 10 && /[a-zA-Z0-9]/.test(key)) {
      playerName += key;
    }
    } else if (gameState === 'victory' || gameState === 'gameover') { // Unifica el manejo para ambas pantallas finales
      if (key === 'R' || key === 'r') {
          resetGame();
          gameState = 'playing';
      } else if (key === 'M' || key === 'm') {
          score = 0; 
          resetGame();
          gameState = 'menu';
      }
  } else if (key === 'M' || key === 'm') {
    score = 0;
    resetGame();
    gameState = 'menu';
    highscoresState = false;
  }
}
function showHelp() {
  background(0);
  fill(255);
  textAlign(CENTER);
  textSize(24);
  text("Cómo Jugar", width / 2, 100);
  textSize(16);
  text("← y → para moverte\nESPACIO para disparar\nEvita colisiones y destruye enemigos", width / 2, 180);
  text("Presiona 'M' para volver al menú", width / 2, height - 40);
}

function showCredits() {
  background(0);
  fill(255);
  textAlign(CENTER);
  textSize(24);
  text("Créditos", width / 2, 100);
  textSize(16);
  text("Desarrollado por [Tu Nombre Aquí]\nJuego tipo Galaga en p5.js", width / 2, 180);
  text("Presiona 'M' para volver al menú", width / 2, height - 40);
}

function showLevelComplete(levelNumber) {
  background(0);
  fill(255);
  textAlign(CENTER);
  textSize(32);
  text(`¡Nivel ${levelNumber} completado!`, width / 2, height / 2 - 40);
  textSize(20);
  text("Presiona ENTER para continuar", width / 2, height / 2 + 20);
}

function resetGame() {
    lives = 3;
    level = 1;
    score = 0;
    bullets = [];
    enemies = [];
    enemyBullets = [];
    player = new Player();
    initLevel1();
    bossDefeated = false;
    bossSpawned = false; // Asegurarse de resetear el boss para el nivel 3

    //Reinicia el estado de la entrada de nombre
    showingNameInput = false; 
    playerNameInput = '';
}

function initLevel1() {
  // Limpia balas existentes
  bullets = [];
  enemyBullets = [];
  
  enemies = [];
  for (let i = 0; i < 10; i++) {
    let x = random(50, width - 50);
    let y = random(-500, -50);
    enemies.push(new Enemy(x, y));
  }
}

function initLevel2() {
  // Limpia balas existentes
  bullets = [];
  enemyBullets = [];
  
  enemies = [];
  for (let i = 0; i < 5; i++) {
    let x = random(50, width - 50);
    let y = random(-500, -50);
    let e = new EnemyZigzag(x, y);
    e.canShoot = i % 2 === 0;
    enemies.push(e);
  }
  enemies.push(new StrongEnemy(random(50, width - 50), random(-400, -200)));
}

function initLevel3() {
  // Limpia balas existentes
  bullets = [];
  enemyBullets = [];
  
  enemies = [];
  bossSpawned = false;
  bossDefeated = false;

  // Enemigos zigzag que disparan
  for (let i = 0; i < 5; i++) {
    let e = new EnemyZigzag(random(50, width - 50), random(-500, -50), 3);
    e.canShoot = true;
    enemies.push(e);
  }

  // Enemigos resistentes
  enemies.push(new StrongEnemy(random(100, 200), random(-400, -200), 3));
  enemies.push(new StrongEnemy(random(300, 500), random(-400, -200), 3));
}