const gameCanvas = document.getElementById('game');

const NUM_TILES = 20;
let currentPos = [[getRandomPos(NUM_TILES), getRandomPos(NUM_TILES)]];
let foodPos = [getRandomPos(NUM_TILES), getRandomPos(NUM_TILES)];
const CANV_WIDTH = 500;
const TILE_LEN = CANV_WIDTH / NUM_TILES;
const CANV_HEIGHT = 500;
const SNAKE_COLOR = 'rgba(255,0,0,0.8)';
const BACKGROUND_COLOR = 'rgba(0,0,0,0.9)';
const FOOD_COLOR = 'rgba(255,255,0,0.9)';
const GAME_SPEED = 100;

vx = 0;
vy = 0;

function getRandomPos(high) {
  return Math.floor(Math.random() * high);
}

const getCoordPos = (x, y) => {
  return [TILE_LEN * x, TILE_LEN * y];
};

const checkSamePos = (a, b) => {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

const updateCurrentPos = () => {
  let cur = currentPos[0].slice();
  cur[0] += vx;
  cur[1] += vy;
  if (checkSamePos(cur, foodPos)) {
    currentPos = currentPos.slice();
    // change food position
    foodPos = [
      Math.ceil(Math.random() * NUM_TILES),
      Math.ceil(Math.random() * NUM_TILES),
    ];
  } else {
    currentPos = currentPos.slice(0, -1);
  }
  currentPos.splice(0, 0, cur);
};
const changeDirection = (e) => {
  switch (e.key) {
    case 'w':
      vx = 0;
      vy = -1;
      break;
    case 's':
      vx = 0;
      vy = 1;
      break;
    case 'a':
      vx = -1;
      vy = 0;
      break;
    case 'd':
      vx = 1;
      vy = 0;
      break;
  }
};

const initGame = () => {
  const ctx = gameCanvas.getContext('2d');
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, CANV_WIDTH, CANV_HEIGHT);

  document.addEventListener('keydown', changeDirection);
};

const renderSnake = () => {
  const ctx = gameCanvas.getContext('2d');
  updateCurrentPos();
  ctx.clearRect(0, 0, CANV_WIDTH, CANV_HEIGHT);

  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, CANV_WIDTH, CANV_HEIGHT);

  currentPos.forEach((e) => {
    ctx.fillStyle = SNAKE_COLOR;
    ctx.fillRect(...getCoordPos(...e), TILE_LEN - 2, TILE_LEN - 2);
  });

  ctx.fillStyle = FOOD_COLOR;
  ctx.fillRect(...getCoordPos(...foodPos), TILE_LEN - 2, TILE_LEN - 2);
};

initGame();
setInterval(renderSnake, GAME_SPEED);
