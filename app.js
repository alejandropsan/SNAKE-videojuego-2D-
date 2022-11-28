'use strict'
// Activación del DOM y sus elementos
document.addEventListener('DOMContentLoaded', () => {
const squares =document.querySelectorAll('.grid div');
const scoreDisplay = document.querySelector('.game_stadistics');
const startBtn = document.querySelector('.start');

// Inicialización y declaración de variables
const width = 10;
let currentIndex = 0; // Primer div en el grid
let appleIndex = 0; // Primer div de la manzana en el grid
let currentSnake = [2,1,0]; // Matriz de la serpiente en el grid. 2 es la cabeza y 0 es la cola.
// Los 1 son el cuerpo.
let direction = 1;
let score = 0;
let speed = 0.9;
let intervalTime = 0;
let interval = 0;

// Start y restart del juego
function startGame(){
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
    clearInterval(interval);
    score = 0;
    randomApple();
    // Cuando crece la serpiente al puntuar
    direction = 1;
    scoreDisplay.innerText = score;
    intervalTime = 1000;
    currentSnake = [2,1,0];
    currentIndex = 0;
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    interval = setInterval(moveOutComes, intervalTime);
}

// función de movimientos no permitidos de la serpiente debido a bordes y colisiones con su cuerpo.
function moveOutComes(){

    if(
        (currentSnake[0] + width >= (width * width) && direction ==width) ||
        (currentSnake[0] % width == width -1 && direction == 1) ||
        (currentSnake[0] % width == 0 && direction == -1) ||
        (currentSnake[0] - width < 0 && direction == -width)
    ) {
        return clearInterval(interval);
    }

    // Cuando la cabeza quiere tocar la cola
    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake');
    currentSnake.unshift(currentSnake[0] + direction);

    // Cuando coge una manzana
    if(squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple');
        squares[tail].classList.add('snake');
        currentSnake.push(tail);
        randomApple();

    // Aparición de la manzana de forma random
    score++;
    scoreDisplay.textContent = score;
    clearInterval(interval);
    intervalTime = intervalTime * speed;
    interval = setInterval(moveOutComes, intervalTime);    
    }
    squares[currentSnake[0]].classList.add('snake');
}

// Generar nueva manzana cuando la snake se la come
function randomApple(){
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while
        (squares[appleIndex].classList.contains('snake')){
            squares[appleIndex].classList.add('apple');
        }   
}



// Funciones de keyCode
function control(event){
    squares[currentIndex].classList.remove('snake')

    if(event.keyCode == 39){  // derecha
        direction = 1;
    } else if(event.keyCode == 38){  // arriba
        direction = -width;
    } else if(event.keyCode == 37){  // izquierda
        direction = -1;
    } else if(event.keyCode == 40){  //abajo
        direction = +width;
    }
}

document.addEventListener('keyup', control);
startBtn.addEventListener('click', startGame);











});