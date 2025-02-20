// 🎯 Get the Canvas and Context
let board = document.getElementById("board");
let scoreBoard = document.getElementById("score");
board.width = 800;
board.height = 500;
let ctx = board.getContext('2d');
let score=0
let chances=3
// 🎯 Game Variables
let paddleHeight = 80, paddleWidth = 10;
let ball = {
    x: board.width / 2,
    y: board.height / 2,
    radius: 10,
    dx: 4, // Ball movement speed (X-axis)
    dy: 4  // Ball movement speed (Y-axis)
};

// 🎯 Paddle Positions
let leftPaddleY = board.height / 2 - paddleHeight / 2;
let rightPaddleY = board.height / 2 - paddleHeight / 2;

// 🎯 Draw Ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

// 🎯 Draw Paddles
function drawPaddles() {
    ctx.fillStyle = "white";
    ctx.fillRect(5, leftPaddleY, paddleWidth, paddleHeight); // Left paddle
    ctx.fillRect(board.width - 15, rightPaddleY, paddleWidth, paddleHeight); // Right paddle
}

// 🎯 Move the Ball
function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball Collision with Top & Bottom Walls
    if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= board.height) {
        ball.dy *= -1;
    }

    // Ball Collision with Left Paddle
    if (ball.x - ball.radius <= 15 && ball.y >= leftPaddleY && ball.y <= leftPaddleY + paddleHeight) {
        ball.dx *= -1;
        ball.x = 15 + ball.radius; // Avoid stuck ball
        score+=1
    }

    // Ball Collision with Right Paddle
    if (ball.x + ball.radius >= board.width - 15 && ball.y >= rightPaddleY && ball.y <= rightPaddleY + paddleHeight) {
        ball.dx *= -1;
        ball.x = board.width - 15 - ball.radius; // Avoid stuck ball
        score+=1
    }

    // Ball Out of Bounds (Reset Game)
    if (ball.x < 0 || ball.x > board.width) {
        ball.x = board.width / 2;
        ball.y = board.height / 2;
        ball.dx *= -1; // Change direction after reset
        chances-=1
        
    }
    
}

// 🎯 Handle Mouse Movement for Paddles
board.addEventListener("mousemove", (event) => {
    let rect = board.getBoundingClientRect();
    let mouseY = event.clientY - rect.top;
    
    leftPaddleY = mouseY - paddleHeight / 2;
    rightPaddleY = mouseY - paddleHeight / 2;

    // Prevent paddles from going outside the board
    if (leftPaddleY < 0) leftPaddleY = 0;
    if (leftPaddleY + paddleHeight > board.height) leftPaddleY = board.height - paddleHeight;

    if (rightPaddleY < 0) rightPaddleY = 0;
    if (rightPaddleY + paddleHeight > board.height) rightPaddleY = board.height - paddleHeight;
});

// 🎯 Update Game Loop
function updateGame() {
    ctx.clearRect(0, 0, board.width, board.height); // Clear canvas
    drawPaddles();
    drawBall();
    updateBall();
    console.log(chances)
    if (chances==0){
        return
    }
    scoreBoard.textContent= "Score: "+score
    requestAnimationFrame(updateGame);
}

// 🎯 Start the Game
updateGame();