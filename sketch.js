let player;
let playerImg; // Variable global para la imagen

// Esta función se ejecuta antes de setup()
// Sirve para cargar la imagen antes de que comience el juego
function preload() {
  playerImg = loadImage('assets/ship.png');
}

function setup() {
  createCanvas(600, 600);
  player = new Player(); // Ya puede usar la imagen
}

function draw() {
  background(0);
  player.move();
  player.show();
}
