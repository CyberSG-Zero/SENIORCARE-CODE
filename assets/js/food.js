// Game state
let foodLevel = 0; // 0 = small, 1 = medium, 2 = large
let correctLevel = Math.floor(Math.random() * 3); // Randomly determine correct level
let dogMoods = [
    // Sad mood (hungry) - needs large portion
    "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxlbGxpcHNlIGN4PSIxMDAiIGN5PSIxNDAiIHJ4PSI2MCIgcnk9IjQwIiBmaWxsPSIjRkY5OTgwIi8+CiAgICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSI4MCIgcj0iNDAiIGZpbGw9IiNGRjk5ODAiLz4KICAgIDxjaXJjbGUgY3g9IjgwIiBjeT0iNzAiIHI9IjE1IiBmaWxsPSIjOEIwMDAwIi8+CiAgICA8Y2lyY2xlIGN4PSIxMjAiIGN5PSI3MCIgcj0iMTUiIGZpbGw9IiM4QjAwMDAiLz4KICAgIDxlbGxpcHNlIGN4PSIxMDAiIGN5PSI5MCIgcng9IjEwIiByeT0iNSIgZmlsbD0iYmxhY2siLz4KICAgIDxwYXRoIGQ9Ik0xMzUgMTYwIFEgMTAwIDE0MCAsIDY1IDE2MCIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIzIiBmaWxsPSJub25lIi8+CiAgICA8Y2lyY2xlIGN4PSIxNTAiIGN5PSIxMjAiIHI9IjEwIiBmaWxsPSIjOEIwMDAwIi8+Cjwvc3ZnPg==",
    // Normal mood - needs medium portion
    "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxlbGxpcHNlIGN4PSIxMDAiIGN5PSIxNDAiIHJ4PSI2MCIgcnk9IjQwIiBmaWxsPSIjRkY5OTgwIi8+CiAgICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSI4MCIgcj0iNDAiIGZpbGw9IiNGRjk5ODAiLz4KICAgIDxjaXJjbGUgY3g9IjgwIiBjeT0iNzAiIHI9IjE1IiBmaWxsPSIjOEIwMDAwIi8+CiAgICA8Y2lyY2xlIGN4PSIxMjAiIGN5PSI3MCIgcj0iMTUiIGZpbGw9IiM4QjAwMDAiLz4KICAgIDxlbGxpcHNlIGN4PSIxMDAiIGN5PSI5MCIgcng9IjEwIiByeT0iNSIgZmlsbD0iYmxhY2siLz4KICAgIDxwYXRoIGQ9Ik02NSAxNjAgTCAxMzUgMTYwIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9Im5vbmUiLz4KICAgIDxjaXJjbGUgY3g9IjE1MCIgY3k9IjEyMCIgcj0iMTAiIGZpbGw9IiM4QjAwMDAiLz4KPC9zdmc+",
    // Happy mood - needs small portion
    "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxlbGxpcHNlIGN4PSIxMDAiIGN5PSIxNDAiIHJ4PSI2MCIgcnk9IjQwIiBmaWxsPSIjRkY5OTgwIi8+CiAgICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSI4MCIgcj0iNDAiIGZpbGw9IiNGRjk5ODAiLz4KICAgIDxjaXJjbGUgY3g9IjgwIiBjeT0iNzAiIHI9IjE1IiBmaWxsPSIjOEIwMDAwIi8+CiAgICA8Y2lyY2xlIGN4PSIxMjAiIGN5PSI3MCIgcj0iMTUiIGZpbGw9IiM4QjAwMDAiLz4KICAgIDxlbGxpcHNlIGN4PSIxMDAiIGN5PSI5MCIgcng9IjEwIiByeT0iNSIgZmlsbD0iYmxhY2siLz4KICAgIDxwYXRoIGQ9Ik0xMzUgMTQwIFEgMTAwIDE2MCAsIDY1IDE0MCIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIzIiBmaWxsPSJub25lIi8+CiAgICA8Y2lyY2xlIGN4PSIxNTAiIGN5PSIxMjAiIHI9IjEwIiBmaWxsPSIjOEIwMDAwIi8+Cjwvc3ZnPg=="
];

// Reverse the logic - if dog is sad (index 0), it needs more food (level 2)
// If dog is happy (index 2), it needs less food (level 0)
correctLevel = 2 - correctLevel;

// Element references
const instructionScreen = document.getElementById('instruction-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const minusBtn = document.getElementById('minus-btn');
const plusBtn = document.getElementById('plus-btn');
const feedBtn = document.getElementById('feed-btn');
const retryBtn = document.getElementById('retry-btn');
const nextBtn = document.getElementById('next-btn');
const dogMood = document.getElementById('dog-mood');
const foodElement = document.getElementById('food');
const dots = [
    document.getElementById('dot1'),
    document.getElementById('dot2'),
    document.getElementById('dot3')
];
const resultMessage = document.getElementById('result-message');

// Initialize the game
function initGame() {
    // Set dog mood based on correct level
    dogMood.src = dogMoods[correctLevel];
    
    // Reset food level
    setFoodLevel(0);
}

// Update the food level visually
function setFoodLevel(level) {
    foodLevel = level;
    
    // Update food height in bowl
    const heights = [10, 25, 40]; // Small, medium, large in px
    foodElement.style.height = heights[level] + 'px';
    
    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i <= level);
    });
}

// Show screen by ID and hide others
function showScreen(screenId) {
    instructionScreen.classList.toggle('hidden', screenId !== 'instruction-screen');
    gameScreen.classList.toggle('hidden', screenId !== 'game-screen');
    resultScreen.classList.toggle('hidden', screenId !== 'result-screen');
}

// Evaluate the player's choice
function evaluateChoice() {
    let resultText = '';
    let accuracy = '';
    
    if (foodLevel === correctLevel) {
        resultText = "¡Lo hiciste perfecto!<br>Tu mascota está feliz con la cantidad de comida que le diste. Has demostrado que conoces bien a tu perro.";
        accuracy = "perfecta";
    } else if (Math.abs(foodLevel - correctLevel) === 1) {
        resultText = "Lo hiciste bien, pero...<br>Tu mascota comió toda la porción, pero podría ser mejor. A veces, cuando quieres satisfacer a tu mascota, es importante observar su comportamiento cuidadosamente.";
        accuracy = "cerca";
    } else {
        resultText = "¡Ups!<br>Tu mascota no está contenta con la cantidad de comida. Es importante observar su estado de ánimo para determinar cuánta comida necesita.";
        accuracy = "incorrecta";
    }
    
    resultMessage.innerHTML = resultText;
    return accuracy;
}

// Event Listeners
startBtn.addEventListener('click', () => {
    showScreen('game-screen');
    initGame();
});

minusBtn.addEventListener('click', () => {
    if (foodLevel > 0) {
        setFoodLevel(foodLevel - 1);
    }
});

plusBtn.addEventListener('click', () => {
    if (foodLevel < 2) {
        setFoodLevel(foodLevel + 1);
    }
});

feedBtn.addEventListener('click', () => {
    evaluateChoice();
    showScreen('result-screen');
});

retryBtn.addEventListener('click', () => {
    correctLevel = 2 - Math.floor(Math.random() * 3);
    showScreen('game-screen');
    initGame();
});

nextBtn.addEventListener('click', () => {
    correctLevel = 2 - Math.floor(Math.random() * 3);
    showScreen('game-screen');
    initGame();
});

// Initialize the game when the page loads
window.onload = function() {
    showScreen('instruction-screen');
};