const boardBorder = 'black'
const boardBackground = 'white'
const snakeCol = 'lightblue'
const snakeBorder = 'darkblue'
const initialSnake = [
  { x: 200, y: 200 },
  { x: 184, y: 200 },
  { x: 168, y: 200 },
  { x: 152, y: 200 },
  { x: 136, y: 200 },
  { x: 120, y: 200 },
  { x: 104, y: 200 },
]
let snake = Array.from(initialSnake)
const playAgainBtn = document.getElementById('play-again')

let reverseDirection = false
let snakeHitWall = false

const SNAKE_SIZE = 16
const FOOD_SIZE = SNAKE_SIZE

// Speed
const SPEED = SNAKE_SIZE
let dx = SPEED
let dy = 0

let foodX
let foodY

const snakeboard = document.getElementById('snakeboard')
const snakeboardCtx = snakeboard.getContext('2d')

playAgainBtn.onclick = restartGame

// Start game
main()
createFood()
document.addEventListener('keydown', changeDirection)

function restartGame() {
  playAgainBtn.style = 'display: none;'
  snake = Array.from(initialSnake)
  snakeboard.width = 800
  snakeboard.height = 800
  dx = SPEED
  dy = 0
  main()
}

function main() {
  if (endGame()) return
  reverseDirection = false
  setTimeout(() => {
    clearCanvas()
    drawFood()
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

function hitWall() {
  const hitLeftWall = snake[0].x < 0
  const hitRightWall = snake[0].x > snakeboard.width - 2 * SNAKE_SIZE
  const hitToptWall = snake[0].y < 0
  const hitBottomWall = snake[0].y > snakeboard.height - SNAKE_SIZE

  if (hitLeftWall || hitToptWall) {
    //reverse logic below
    dx = -1 * dx
    dy = -1 * dy
    snakeHitWall = true
    snakeboard.width = snakeboard.width < 116 ? snakeboard.width : snakeboard.width - 116
    snakeboard.height = snakeboard.height < 116 ? snakeboard.height : snakeboard.height - 116
  }
}

function endGame() {
  // Snake contact itself
  for (let i = initialSnake.length; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      playAgainBtn.style = 'display: block;'
      return true
    }
  }
  hitWall()
}

function moveSnake() {
  const { x, y } = snake[0]
  const head = { x: dx + x, y: dy + y }
  snake.unshift(head)
  const hasEatenFood = x === foodX && y === foodY
  if (hasEatenFood) {
    score += 1
    // document.getElementById('score').innerHTML = score
    createFood()
  } else {
    snake.pop()
  }
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

function random(min, max, limit = 10) {
  return Math.round(Math.random() * (max - min) + min) * limit
}

function createFood() {
  foodX = random(0, snakeboard.width - FOOD_SIZE)
  foodY = random(0, snakeboard.height - FOOD_SIZE)
  snake.forEach((part) => {
    const hasEatenFood = part.x == foodX && part.y == foodY
    if (hasEatenFood) createFood()
  })
}

function drawFood() {
  snakeboardCtx.fillStyle = 'lightgreen'
  snakeboardCtx.strokestyle = 'darkgreen'
  snakeboardCtx.fillRect(foodX, foodY, FOOD_SIZE, FOOD_SIZE)
  snakeboardCtx.strokeRect(foodX, foodY, FOOD_SIZE, FOOD_SIZE)
}
