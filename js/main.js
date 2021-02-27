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

const snakeboard = document.getElementById('snakeboard')
const snakeboardCtx = snakeboard.getContext('2d')
// Start game
main()

function main() {
  clearCanvas()
  drawSnake()
}

function clearCanvas() {
  snakeboardCtx.fillStyle = boardBackground
  snakeboardCtx.strokestyle = boardBorder
  snakeboardCtx.fillRect(0, 0, snakeboard.width, snakeboard.height)
  snakeboardCtx.strokeRect(0, 0, snakeboard.width, snakeboard.height)
}

function drawSnake() {
  snake.forEach(drawSnakePart)
}

function drawSnakePart(snakePart) {
  snakeboardCtx.fillStyle = snakeCol
  snakeboardCtx.strokestyle = snakeBorder
  snakeboardCtx.fillRect(snakePart.x, snakePart.y, 10, 10)
  snakeboardCtx.strokeRect(snakePart.x, snakePart.y, 10, 10)
}
