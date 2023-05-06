const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set the size of each segment of the snake and food
const segmentSize = 10;

// Set the initial position and velocity of the snake
let snake = [{ x: 10, y: 10 }];
let dx = segmentSize;
let dy = 0;

// Set the initial position of the food
let food = { x: 250, y: 250 };

// Set the initial score
let score = 0;

// Set the initial position of the obstacles
let obstacles = [];
for (let i = 0; i < 5; i++) {
    obstacles.push({
        x: Math.floor(Math.random() * canvas.width / segmentSize) * segmentSize,
        y: Math.floor(Math.random() * canvas.height / segmentSize) * segmentSize
    });
}

// Handle keyboard input to change the direction of the snake
document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft" && dx === 0) {
        dx = -segmentSize;
        dy = 0;
    } else if (event.code === "ArrowRight" && dx === 0) {
        dx = segmentSize;
        dy = 0;
    } else if (event.code === "ArrowUp" && dy === 0) {
        dx = 0;
        dy = -segmentSize;
    } else if (event.code === "ArrowDown" && dy === 0) {
        dx = 0;
        dy = segmentSize;
    }
});

// Set the size of the canvas based on the size of the device's screen
function setCanvasSize() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    canvas.width = Math.floor(screenWidth / segmentSize) * segmentSize;
    canvas.height = Math.floor(screenHeight / segmentSize) * segmentSize;
}

// Main game loop
function gameLoop() {
    // Move the snake
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Check if the snake has collided with the walls, itself, or an obstacle
    if (head.x < 0) {
        head.x = canvas.width - segmentSize;
    } else if (head.x >= canvas.width) {
        head.x = 0;
    } else if (head.y < 0) {
        head.y = canvas.height - segmentSize;
    } else if (head.y >= canvas.height) {
        head.y = 0;
    } else if (snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        alert(`Game over! Your score is ${score}`);
        location.reload();
    } else if (obstacles.some(obstacle => obstacle.x === head.x && obstacle.y === head.y)) {
        alert(`Game over! Your score is ${score}`);
        location.reload();
    }

    // Check if the snake has eaten the food
    if (head.x === food.x && head.y === food.y) {
        // Generate a new food position
        food.x = Math.floor(Math.random() * canvas.width / segmentSize) * segmentSize;
        food.y = Math.floor(Math.random() * canvas.height / segmentSize) * segmentSize;

        // Increase the score
        score++;
    } else {
        // Remove the tail segment
        snake.pop();
    }

    // Draw the game board
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#4CAF50"; // green color for snake
    snake.forEach((segment) => {
        ctx.fillRect(segment.x, segment.y, segmentSize, segmentSize);
    });
    ctx.fillStyle = "#f44336"; // red color for food
    ctx.fillRect(food.x, food.y, segmentSize, segmentSize);
    ctx.fillStyle = "#9E9E9E"; // gray color for obstacles
    obstacles.forEach((obstacle) => {
        ctx.fillRect(obstacle.x, obstacle.y, segmentSize, segmentSize);
    });

    // Update the score
    document.getElementById("score").textContent = `Score: ${score}`;

    // Call the game loop again
    setTimeout(gameLoop, 100);
}

// Set the size of the canvas when the page loads and when the window is resized
setCanvasSize();
window.addEventListener("resize", setCanvasSize);

// Start the game loop
gameLoop();
