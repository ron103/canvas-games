// 🎯 Get the Canvas and Context
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 400;

// 🎯 Game Variables
let paddleWidth = 80, paddleHeight = 10;
let ballSize = 10;
let ballX = canvas.width / 2, ballY = canvas.height - 30;
let ballSpeedX = 2, ballSpeedY = -2;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleSpeed = 6;
let rightPressed = false, leftPressed = false;
let score = 0;

// 🧱 Bricks Variables
let brickRowCount = 5, brickColumnCount = 7;
let brickWidth = 60, brickHeight = 20, brickPadding = 10, brickOffsetTop = 30, brickOffsetLeft = 30;
let bricks = [];

for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 }; // 1 means brick is visible
    }
}

// 🎮 Handle Keyboard Input
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(event) {
    if (event.key === "ArrowRight") rightPressed = true;
    if (event.key === "ArrowLeft") leftPressed = true;
}

function keyUpHandler(event) {
    if (event.key === "ArrowRight") rightPressed = false;
    if (event.key === "ArrowLeft") leftPressed = false;
}

// 🟢 Move Paddle
function movePaddle() {
    if (rightPressed && paddleX < canvas.width - paddleWidth) paddleX += paddleSpeed;
    if (leftPressed && paddleX > 0) paddleX -= paddleSpeed;
}

// 🎾 Move Ball
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Wall Collision
    if (ballX + ballSize > canvas.width || ballX < 0) ballSpeedX = -ballSpeedX;
    if (ballY < 0) ballSpeedY = -ballSpeedY;

    // Paddle Collision
    if (
        ballY + ballSize >= canvas.height - paddleHeight &&
        ballX > paddleX &&
        ballX < paddleX + paddleWidth
    ) {
        ballSpeedY = -ballSpeedY;
    }

    // Game Over Check
    if (ballY + ballSize > canvas.height) {
        alert("Game Over!");
        document.location.reload();
    }
}

// 🧱 Brick Collision Detection
function checkBrickCollision() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let brick = bricks[c][r];
            if (brick.status === 1) {
                if (
                    ballX > brick.x &&
                    ballX < brick.x + brickWidth &&
                    ballY > brick.y &&
                    ballY < brick.y + brickHeight
                ) {
                    ballSpeedY = -ballSpeedY; // Reverse ball direction
                    brick.status = 0; // Remove brick
                    score++;

                    if (score === brickRowCount * brickColumnCount) {
                        alert("You Win!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

// 🎨 Draw Bricks
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;

                ctx.fillStyle = "red";
                ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
            }
        }
    }
}

// 🎨 Draw Everything
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Bricks, Paddle, Ball
    drawBricks();
    ctx.fillStyle = "blue";
    ctx.fillRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    // Draw Score
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText("Score: " + score, 10, 20);
}

// 🔄 Game Loop
function gameLoop() {
    movePaddle();
    moveBall();
    checkBrickCollision();
    drawGame();
    requestAnimationFrame(gameLoop);
}

// 🚀 Start the Game
gameLoop();