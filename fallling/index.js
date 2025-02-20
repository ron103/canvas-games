let canvas = document.getElementById('canvas')
canvas.width=400
canvas.height=400
let scoreTracker = document.getElementById('score')
let ctx = canvas.getContext('2d')
let balls=[]
let score=0
let lives = 3
let isGameOver=false
// blocks
// person
let personSize = 20
let person = {
    x:canvas.width / 2 - personSize / 2,
    y:canvas.height-personSize,
    w:personSize,
    h:personSize
}
let gravity=1
let ball={
    x:Math.floor(Math.random() * (canvas.width / 10)) * 10,
    y:0,
    w:10,
    h:10

}

window.addEventListener('keydown',movePerson)

function drawPerson(){
    ctx.fillStyle='red'
    ctx.fillRect(person.x,person.y,person.w,person.h)
}

function drawBall(){
    
    ctx.fillStyle='black'
    ctx.fillRect(ball.x,ball.y,ball.w,ball.h)

}

function movePerson(event){
    const key = event.key
    if (isGameOver && event.key === "Enter") restartGame();
    if (key==='ArrowLeft' && person.x-personSize>=0){
        person.x-=personSize
    }
    if (key==='ArrowRight' && person.x+personSize<=canvas.width-personSize){
        person.x+=personSize
    }

}
function ballFalling(){
    if (lives==0){
        isGameOver=true
        return
    }
    ball.y+=gravity
    if (ball.y>canvas.height){
        ball.y=0
        ball.x = Math.floor(Math.random()*(canvas.width/ball.w))*ball.w
        score+=1
        if (score%5===0 && gravity<10){
            gravity+=0.5
        }
        
        
        
    }
    if ((ball.x + ball.w>=person.x) && (ball.x<=person.x+person.w) && (ball.y+ball.h>=person.y)){
        lives-=1
        ball.y=0
        ball.x = Math.floor(Math.random()*(canvas.width/ball.w))*ball.w
    }
    scoreTracker.innerText='Score: '+score+' Lives: ' + lives

}

function gameOverScreen() {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Game Over!", canvas.width / 2 - 50, canvas.height / 2);
    ctx.fillText("Press Enter to Restart", canvas.width / 2 - 70, canvas.height / 2 + 30);
}

function gameLoop(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawPerson()
    drawBall()
    ballFalling()
    if (isGameOver) {
        gameOverScreen();
        return; 
    }
    requestAnimationFrame(gameLoop)
}
function restartGame() {
    score = 0;
    lives = 3;
    gravity = 1;
    isGameOver = false;
    person.x = canvas.width / 2 - personSize / 2; // Reset player position
    ball.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    ball.y = 0;
    gameLoop();
}

gameLoop()