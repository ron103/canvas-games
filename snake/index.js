let board = document.getElementById('board')
board.width=400
board.height=400

let ctx = board.getContext('2d')

let snake = [{x:board.width/2,y:board.height/2}]
let food = { x: 100, y: 100}
let direction = 'RIGHT'
let blocksize=20
let score=0
let time=0
let game

window.addEventListener('keydown',changeDirection)

function changeDirection(event){
    const key = event.key
    if (key==='ArrowUp' && direction!=='DOWN') direction='UP'
    if (key==='ArrowDown' && direction!=='UP') direction='DOWN'
    if (key==='ArrowLeft' && direction!=='RIGHT') direction='LEFT'
    if (key==='ArrowRight' && direction!=='LEFT') direction='RIGHT'
}

function generateFood(){
    food.x=Math.floor(Math.random()*(board.width/blocksize))*blocksize
    food.y=Math.floor(Math.random()*(board.height/blocksize))*blocksize

    

}

function checkCollision(head){
    for (let i=1;i<snake.length;i++){
        if (snake[i].x===head.x && snake[i].y===head.y){
            return true
        }
    }
    return false
}

function moveSnake(){
    let head = {...snake[0]}

    if (direction==='UP') head.y-=blocksize
    if (direction==='DOWN') head.y+=blocksize
    if (direction==='LEFT') head.x-=blocksize
    if (direction==='RIGHT') head.x+=blocksize

    if (head.x<0 || head.y<0 || head.x>=board.width || head.y>=board.height || checkCollision(head)){
        alert("GAME OVER")
        reset()
        return
    }

    if (head.x===food.x && head.y===food.y)
    {
        score++
        generateFood()
    } else {
        snake.pop()
    }
    
    snake.unshift(head)

}

function drawGame(){
    ctx.clearRect(0,0,board.width,board.height)

    ctx.fillStyle='red'
    ctx.fillRect(food.x,food.y, blocksize,blocksize)

    snake.forEach(part=>{
        ctx.fillStyle='green'
        ctx.fillRect(part.x,part.y, blocksize,blocksize)
    })
}

function gameLoop(timestamp){
    moveSnake()
    drawGame()

}

function reset() {
    clearInterval(game); // Stop previous game loop

    // 🔥 Update the global variables correctly
    snake = [{ x: board.width / 2, y: board.height / 2 }];
    direction = 'RIGHT';
    score = 0;

    generateFood();

    // 🔄 Restart game loop
    game = setInterval(gameLoop, 200);
}

// 🚀 Start the game
generateFood();
game = setInterval(gameLoop, 200);