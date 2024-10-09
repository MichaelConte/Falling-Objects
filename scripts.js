const basket = document.querySelector('.basket');
const fallingObject = document.querySelector('.falling-object');
const scoreElement = document.getElementById('score');

let basketPosition = 160;  // Initial position of basket
let fallingObjectPosition = { top: 0, left: 185 };
let score = 0;
let isGameOver = false;
let basketSpeed = 10;  // Speed of basket movement

// To track whether the left or right arrow is held down
let isMovingLeft = false;
let isMovingRight = false;

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

function handleKeyDown(event) {
    if (isGameOver) return;

    if (event.key === 'ArrowLeft') {
        isMovingLeft = true;
    } else if (event.key === 'ArrowRight') {
        isMovingRight = true;
    }
}

function handleKeyUp(event) {
    if (event.key === 'ArrowLeft') {
        isMovingLeft = false;
    } else if (event.key === 'ArrowRight') {
        isMovingRight = false;
    }
}

function moveBasket() {
    if (isMovingLeft && basketPosition > 0) {
        basketPosition -= basketSpeed;
        basket.style.left = `${basketPosition}px`;
    } 
    if (isMovingRight && basketPosition < 320) {
        basketPosition += basketSpeed;
        basket.style.left = `${basketPosition}px`;
    }
}

function dropObject() {
    if (isGameOver) return;

    fallingObjectPosition.top += 5;
    fallingObject.style.top = `${fallingObjectPosition.top}px`;

    if (fallingObjectPosition.top > 580) {
        if (fallingObjectPosition.left > basketPosition && fallingObjectPosition.left < basketPosition + 80) {
            score++;
            scoreElement.textContent = score;
        } else {
            alert('Game Over! Final Score: ' + score);
            isGameOver = true;
            return;
        }
        resetObject();
    }
    requestAnimationFrame(dropObject);
}

function resetObject() {
    fallingObjectPosition.top = 0;
    fallingObjectPosition.left = Math.floor(Math.random() * 370);
    fallingObject.style.left = `${fallingObjectPosition.left}px`;
}

// Start the game loop for object drop and basket movement
function gameLoop() {
    moveBasket();
    requestAnimationFrame(gameLoop);
}

dropObject();
gameLoop();
