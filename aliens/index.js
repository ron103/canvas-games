let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

// Game Variables
let score = 0;
let lives = 3;
let isGameOver = false;
let bullets = [];
let aliens = [];

// 🎮 Player (Spaceship)
class Player {
    constructor() {
        this.width = 50;
        this.height = 20;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 10;
        this.speed = 10;
    }

    move(dir) {
        if (dir === 'left' && this.x > 0) this.x -= this.speed;
        if (dir === 'right' && this.x + this.width < canvas.width) this.x += this.speed;
    }

    draw() {
        ctx.fillStyle = "cyan";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// 🔫 Bullet Class
class Bullet {
    constructor(x, y) {
        this.width = 5;
        this.height = 10;
        this.x = x;
        this.y = y;
        this.speed = 5;
    }

    move() {
        this.y -= this.speed;
    }

    draw() {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// 👾 Alien Class
class Alien {
    constructor() {
        this.width = 30;
        this.height = 20;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = 0;
        this.speed = 1 + Math.random() * 2;
    }

    move() {
        this.y += this.speed;
    }

    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// 🎮 Initialize Player
let player = new Player();

// 🚀 Handle Player Movement
window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") player.move("left");
    if (event.key === "ArrowRight") player.move("right");
    if (event.key === " " && !isGameOver) bullets.push(new Bullet(player.x + player.width / 2, player.y)); // Shoot Bullet
});

// 🛸 Spawn Aliens Every 2 Seconds
setInterval(() => {
    if (!isGameOver) aliens.push(new Alien());
}, 2000);

// 🎯 Check Bullet-Alien Collision
function checkCollisions() {
    bullets.forEach((bullet, bulletIndex) => {
        aliens.forEach((alien, alienIndex) => {
            if (
                bullet.y < alien.y + alien.height &&
                bullet.y + bullet.height > alien.y &&
                bullet.x + bullet.width > alien.x &&
                bullet.x < alien.x + alien.width
            ) {
                // Bullet Hits Alien
                score++;
                bullets.splice(bulletIndex, 1); // Remove bullet
                aliens.splice(alienIndex, 1); // Remove alien
            }
        });
    });
}

// 🛑 Check If Alien Reaches Bottom
function checkGameOver() {
    aliens.forEach((alien, index) => {
        if (alien.y + alien.height >= canvas.height) {
            lives--;
            aliens.splice(index, 1);
            if (lives <= 0) {
                isGameOver = true;
            }
        }
    });
}

// 🔄 Game Loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw game objects
    player.draw();
    bullets.forEach(bullet => {
        bullet.move();
        bullet.draw();
    });
    aliens.forEach(alien => {
        alien.move();
        alien.draw();
    });

    checkCollisions();
    checkGameOver();

    document.getElementById("score").innerText = `Score: ${score} | Lives: ${lives}`;

    if (!isGameOver) {
        requestAnimationFrame(gameLoop);
    } else {
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over! Press Enter to Restart", canvas.width / 2 - 150, canvas.height / 2);
    }
}

// 🔄 Restart Game
function restartGame() {
    score = 0;
    lives = 3;
    isGameOver = false;
    bullets = [];
    aliens = [];
    gameLoop();
}

// 🎮 Restart Game on Enter
window.addEventListener("keydown", (event) => {
    if (isGameOver && event.key === "Enter") restartGame();
});

// 🚀 Start Game
gameLoop();