let board = document.getElementById('board')

board.width=400
board.height=400
let i;
let j;
let ctx = board.getContext('2d')
let snake=[
    {
        x:100,
        y:100
    }
]
let boxSize=20
let snakeMove = {
    x:0,
    y:0,
    dx:1,
    dy:0
}
let box = {
    h:20,
    w:20
}

document.addEventListener('keydown',changeDirection)

function changeDirection(event){
    const key = event.key
    if (key==='ArrowUp' && direction !== 'DOWN') direction='UP'
    if (key==='ArrowDown' && direction !== 'UP') direction='DOWN'
    if (key==='ArrowLeft' && direction !== 'RIGHT') direction='LEFT'
    if (key==='ArrowRight' && direction !== 'LEFT') direction='RIGHT'
}

function drawBoxes(){
    box.h = Math.random()*400-20>=0 ? Math.random()*400 -20 : 0
    box.w = Math.random()*400-20>=0 ? Math.random()*400-20 : 0
}





function drawSnake(){
    let head = {...snake[0]}


    
}












drawBoxes()
drawSnake()