// 🎯 Get the Canvas and Context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

// 🎯 Game Variables
let score = 0;
let timeLeft = 30; // 30-second timer
let targets = []; // Array to store multiple targets

// 🎯 Target Class
class Target {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = "red";
        this.timeout = setTimeout(() => this.remove(), 1000 + Math.random() * 2000); // Remove in 1-3 sec
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    remove() {
        targets = targets.filter(target => target !== this);
    }
}

// 🎯 Function to Spawn Targets
function spawnTarget() {
    let x = Math.random() * (canvas.width - 40) + 20;
    let y = Math.random() * (canvas.height - 40) + 20;
    let target = new Target(x, y, 20);
    targets.push(target);
}

// 🎯 Handle Mouse Click on Targets
canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    for (let i = targets.length - 1; i >= 0; i--) {
        let target = targets[i];
        let dx = mouseX - target.x;
        let dy = mouseY - target.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < target.radius) {
            score++;
            document.getElementById("score").innerText = "Score: " + score;
            clearTimeout(target.timeout);
            targets.splice(i, 1);
            break;
        }
    }
});

// 🎯 Update and Draw Game Loop
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    targets.forEach(target => target.draw());
    if (timeLeft > 0) {
        requestAnimationFrame(updateGame);
    }
}

// 🎯 Timer Countdown
function startTimer() {
    let timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = "Time Left: " + timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// 🎯 End the Game
function endGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over!", canvas.width / 2 - 80, canvas.height / 2 - 20);
    ctx.fillText(`Final Score: ${score}`, canvas.width / 2 - 90, canvas.height / 2 + 20);
}

// 🎯 Start the Game
function startGame() {
    score = 0;
    timeLeft = 30;
    document.getElementById("score").innerText = "Score: 0";
    document.getElementById("timer").innerText = "Time Left: 30";
    targets = [];

    setInterval(spawnTarget, 1000); // Spawn target every 1 second
    startTimer();
    updateGame();
}

// 🎯 Run the game on page load
startGame();