const boardBorder = 'black'
const boardBackground = 'white'
const snakeCol = 'lightblue'
const snakeBorder = 'darkblue'
const initialSnake = [
  { x: 192, y: 192 },
  { x: 176, y: 192 },
  { x: 160, y: 192 },
  { x: 144, y: 192 },
]
let snake = Array.from(initialSnake)
const playAgainBtn = document.getElementById('play-again')
const scoreEl = document.getElementById('score')

let reverseDirection = false
let highestScore = 0
let score = 0
let eatenFood = 0

const SNAKE_SIZE = 16
const FOOD_SIZE = SNAKE_SIZE

// Speed
const SPEED = SNAKE_SIZE
let dx = SPEED
let dy = 0

let foodX
let foodY

let hitLeftWall
let hitRightWall
let hitToptWall
let hitBottomWall

const snakeboard = document.getElementById('snakeboard')
const snakeboardCtx = snakeboard.getContext('2d')

playAgainBtn.onclick = restartGame

// Start game
main()
createFood()
document.addEventListener('keydown', changeDirection)

function restartGame() {
  playAgainBtn.style = 'display: none;'
  scoreEl.style.color = ''
  snake = Array.from(initialSnake)
  snakeboard.width = 800
  snakeboard.height = 800
  dx = SPEED
  dy = 0
  score = 0
  scoreEl.innerHTML = `Score: ${score}`
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

function hitAnyWall() {
  return hitLeftWall || hitToptWall || hitRightWall || hitBottomWall
}

function clearCanvas() {
  snakeboardCtx.fillStyle = boardBackground
  snakeboardCtx.strokestyle = boardBorder

  if (hitAnyWall()) {
    hitLeftWall = hitRightWall = hitToptWall = hitBottomWall = false
    snakeboard.width = snakeboard.width < SNAKE_SIZE ? snakeboard.width : snakeboard.width - SNAKE_SIZE
    snakeboard.height = snakeboard.height < SNAKE_SIZE ? snakeboard.height : snakeboard.height - SNAKE_SIZE
  }
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
  hitLeftWall = snake[0].x < 0
  hitRightWall = snake[0].x > snakeboard.width - SNAKE_SIZE
  hitToptWall = snake[0].y < 0
  hitBottomWall = snake[0].y > snakeboard.height - SNAKE_SIZE

  if (hitAnyWall()) {
    dx = -1 * dx
    dy = -1 * dy
    createFood()
    moveSnake()
  }
}

function endGame() {
  // Snake contact itself

  const l = initialSnake.length
  for (let i = l; i < snake.length; i++) {
    if (hitAnyWall()) {
      break
    }
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      playAgainBtn.style = 'display: block;'
      return true
    }
  }
  hitWall()
}

function moveSnake(revert = false) {
  if (revert) {
    snake.reverse()
  }
  const { x, y } = snake[0]
  const head = { x: dx + x, y: dy + y }
  snake.unshift(head)
  const hasEatenFood = x === foodX && y === foodY
  if (hasEatenFood) {
    score += 1
    eatenFood += 1
    scoreEl.innerHTML = `Score: ${score}`
    if (highestScore < score) {
      highestScore = score
      scoreEl.style.color = 'red'
    }
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

function random(min, max, limit = 16, ratio = 1) {
  return Math.round((Math.random() * (max - min) + min) / ratio) * limit
}

function createFood() {
  foodX = random(0, snakeboard.width - FOOD_SIZE, 16, 16)
  foodY = random(0, snakeboard.height - FOOD_SIZE, 16, 16)
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
