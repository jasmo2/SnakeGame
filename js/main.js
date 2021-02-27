const boardBorder = 'black'
const boardBackground = 'white'
const snakeCol = 'lightblue'
const snakeBorder = 'darkblue'
const initialSnake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 },
  { x: 150, y: 200 },
  { x: 140, y: 200 },
  { x: 130, y: 200 },
  { x: 120, y: 200 },
]
let snake = Array.from(initialSnake)
const playAgainBtn = document.getElementById('play-again')

let reverseDirection = false

const SNAKE_SIZE = 10

// Speed
const SPEED = 10
let dx = SPEED
let dy = 0

const snakeboard = document.getElementById('snakeboard')
const snakeboardCtx = snakeboard.getContext('2d')

playAgainBtn.onclick = restartGame

// Start game
main()
document.addEventListener('keydown', changeDirection)

function restartGame() {
  playAgainBtn.style = 'display: none;'
  snake = Array.from(initialSnake)
  dx = SPEED
  dy = 0
  main()
}

function main() {
  if (endGame()) return
  reverseDirection = false
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
  snakeboardCtx.fillRect(snakeItem.x, snakeItem.y, SNAKE_SIZE, SNAKE_SIZE)
  snakeboardCtx.strokeRect(snakeItem.x, snakeItem.y, SNAKE_SIZE, SNAKE_SIZE)
}

function endGame() {
  // Snake contact itself
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      playAgainBtn.style = 'display: block;'
      return true
    }
  }
}

function moveSnake() {
  const { x, y } = snake[0]
  const head = { x: dx + x, y: dy + y }
  snake.unshift(head)
  snake.pop()
}

function changeDirection(event) {
  const LEFT_KEY = 37
  const RIGHT_KEY = 39
  const UP_KEY = 38
  const DOWN_KEY = 40

  if (reverseDirection) return
  reverseDirection = true

  const keyPressed = event.keyCode
  const goingUp = dy === -1 * SPEED
  const goingDown = dy === SPEED
  const goingRight = dx === SPEED
  const goingLeft = dx === -1 * SPEED

  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -1 * SPEED
    dy = 0
  } else if (keyPressed === UP_KEY && !goingDown) {
    dx = 0
    dy = -1 * SPEED
  } else if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = SPEED
    dy = 0
  } else if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0
    dy = SPEED
  }
}
