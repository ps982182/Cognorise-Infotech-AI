const gameCanvas = document.getElementById('gameCanvas');
const playerPaddle = document.getElementById('playerPaddle');
const aiPaddle = document.getElementById('aiPaddle');
const ball = document.getElementById('ball');
const playerScoreElement = document.getElementById('playerScore');
const aiScoreElement = document.getElementById('aiScore');

const canvasWidth = gameCanvas.clientWidth;
const canvasHeight = gameCanvas.clientHeight;
const paddleHeight = playerPaddle.clientHeight;
const ballDiameter = ball.clientWidth;

let ballX = canvasWidth / 2 - ballDiameter / 2;
let ballY = canvasHeight / 2 - ballDiameter / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;
let playerPaddleY = canvasHeight / 2 - paddleHeight / 2;
let aiPaddleY = canvasHeight / 2 - paddleHeight / 2;
const paddleSpeed = 5;
let playerScore = 0;
let aiScore = 0;

function movePlayerPaddle(event) {
    playerPaddleY = event.clientY - gameCanvas.offsetTop - paddleHeight / 2;
    playerPaddleY = Math.max(0, Math.min(canvasHeight - paddleHeight, playerPaddleY));
}

function moveAiPaddle() {
    const paddleCenter = aiPaddleY + paddleHeight / 2;
    if (paddleCenter < ballY) {
        aiPaddleY += paddleSpeed;
    } else if (paddleCenter > ballY) {
        aiPaddleY -= paddleSpeed;
    }
    aiPaddleY = Math.max(0, Math.min(canvasHeight - paddleHeight, aiPaddleY));
}

function updateBallPosition() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY >= canvasHeight - ballDiameter) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX <= 0) {
        if (ballY >= playerPaddleY && ballY <= playerPaddleY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            aiScore++;
            aiScoreElement.textContent = aiScore;
            resetBall();
        }
    }

    if (ballX >= canvasWidth - ballDiameter) {
        if (ballY >= aiPaddleY && ballY <= aiPaddleY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            playerScore++;
            playerScoreElement.textContent = playerScore;
            resetBall();
        }
    }
}

function resetBall() {
    ballX = canvasWidth / 2 - ballDiameter / 2;
    ballY = canvasHeight / 2 - ballDiameter / 2;
    ballSpeedX = -ballSpeedX;
}

function draw() {
    playerPaddle.style.top = playerPaddleY + 'px';
    aiPaddle.style.top = aiPaddleY + 'px';
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
}

function gameLoop() {
    moveAiPaddle();
    updateBallPosition();
    draw();
    requestAnimationFrame(gameLoop);
}

gameCanvas.addEventListener('mousemove', movePlayerPaddle);
requestAnimationFrame(gameLoop);
