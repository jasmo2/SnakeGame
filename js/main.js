const boardBorder = 'black'
const boardBackground = 'white'
const snakeCol = 'lightblue'
const snakeBorder = 'darkblue'

let snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 },
]
// Speed
const SPEED = 10

let dx = SPEED
let dy = 0

const snakeboard = document.getElementById('snakeboard')
const snakeboardCtx = snakeboard.getContext('2d')
document.addEventListener('keydown', changeDirection)
// Start game
main()

function main() {
  setTimeout(() => {
    clearCanvas()
    moveSnake()
    drawSnake()
    // Call main again
    main()
  }, 100)
}

function clearCanvas() {
  snakeboardCtx.fillStyle = boardBackground
  snakeboardCtx.strokestyle = boardBorder
  snakeboardCtx.fillRect(0, 0, snakeboard.width, snakeboard.height)
  snakeboardCtx.strokeRect(0, 0, snakeboard.width, snakeboard.height)
}

function drawSnake() {
  snake.forEach(drawSnakeItem)
}

function drawSnakeItem(snakeItem) {
  snakeboardCtx.fillStyle = snakeCol
  snakeboardCtx.strokestyle = snakeBorder
  snakeboardCtx.fillRect(snakeItem.x, snakeItem.y, 10, 10)
  snakeboardCtx.strokeRect(snakeItem.x, snakeItem.y, 10, 10)
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y }
  snake.unshift(head)
  snake.pop()
}
}
