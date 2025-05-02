// Variables

const resultMessage = document.getElementById('result-message');

// Game state

const gameState = {
    currentLevel: 1,
    levels: {
        1: { foodState: 0, points: 0 },
        2: { foodState: 0, points: 0 },
        3: { foodState: 0, points: 0 }
    },
    totalPoints: 0
};

// Food states point values
const foodStatePoints = {
    0: 2.5,  // Comio poco
    1: 5,    // Comio bien
    2: 10    // Comio mucho
};


// ------------------------------------------------

// Initialize the game
function initGame() {
    // updateDogState(1);
    updateFoodLevel(1);
}

// Start the game from instructions screen
function startGame() {
    document.getElementById('instructions').classList.remove('active');
    document.getElementById('level1').classList.add('active');
}

// Update the dog's state based on food level
// function updateDogState(level) {
//     const dogSvg = document.querySelector(`#level${level} .dog-svg`);
//     const foodState = gameState.levels[level].foodState;
    
//     // Remove previous classes
//     dogSvg.classList.remove('dog-hungry', 'dog-satisfied', 'dog-full');
    
//     // Add new class based on food state
//     if (foodState === 0) {
//         dogSvg.classList.add('dog-hungry');
//     } else if (foodState === 1) {
//         dogSvg.classList.add('dog-satisfied');
//     } else {
//         dogSvg.classList.add('dog-full');
//     }
// }

// Update food level visualization
function updateFoodLevel(level) {
    const savedDogId = localStorage.getItem('selectedDogId');
    
    const foodContainer = document.getElementById(`foodLevel${level}`);
    const dogContainer = document.getElementById(`dogLevel${level}`);
    const foodState = gameState.levels[level].foodState;
    
    // Limpiar el contenedor antes de agregar la nueva imagen
    foodContainer.innerHTML = '';
    dogContainer.innerHTML = '';
    
    // Crear y agregar la imagen SVG según el estado
    const foodImage = document.createElement('img');
    const dogImage = document.createElement('img');
    
    
    if (foodState === 0) {
        foodImage.src = 
        `../../assets/svg/level_1/food_states/food-low.svg`;
        // SVG para poca comida
        foodImage.alt = 'Poca comida';

        dogImage.src = 
        `../../assets/svg/level_1/dog_states/${savedDogId}-dog-hungry.svg`;
        dogImage.alt = 'Perro hambiento';

    } else if (foodState === 1) {
        foodImage.src = 
        `../../assets/svg/level_1/food_states/food-mid.svg`; 
         // SVG para comida media
        foodImage.alt = 'Comida media';

        dogImage.src = 
        `../../assets/svg/level_1/dog_states/${savedDogId}-dog-hungry.svg`;
        dogImage.alt = 'Perro correcto';
    } else {
        foodImage.src = 
        `../../assets/svg/level_1/food_states/food-high.svg`; 
        // SVG para mucha comida
        foodImage.alt = 'Mucha comida';

        dogImage.src = 
        `../../assets/svg/level_1/dog_states/${savedDogId}-dog-hungry.svg`;
        dogImage.alt = 'Perro gordito';
    }
    
    // Estilo para la imagen (ajustar según necesites)
    foodImage.style.width = '550';
    foodImage.style.height = '550';
    dogImage.style.width = '550';
    dogImage.style.height = '550';
    
    // Agregar la imagen al contenedor
    foodContainer.appendChild(foodImage);
    dogContainer.appendChild(dogImage);
    
    // Actualizar los puntos (mantenemos esta funcionalidad igual)
    gameState.levels[level].points = foodStatePoints[foodState];
}

// Increase food level
function increaseFood(level) {
    if (gameState.levels[level].foodState < 2) {
        gameState.levels[level].foodState++;
        // updateDogState(level);
        updateFoodLevel(level);
        createFoodParticles(level);
    }
}

// Decrease food level
function decreaseFood(level) {
    if (gameState.levels[level].foodState > 0) {
        gameState.levels[level].foodState--;
        // updateDogState(level);
        updateFoodLevel(level);
    }
}

// Create food particles animation
function createFoodParticles(level) {
    const foodBowl = document.querySelector(`#level${level} .food-bowl`);
    const particlesContainer = document.createElement('div');
    particlesContainer.classList.add('food-particles');
    foodBowl.appendChild(particlesContainer);
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 0.5}s`;
        particlesContainer.appendChild(particle);
    }
    
    setTimeout(() => {
        particlesContainer.remove();
    }, 1500);
}

// Navigate to next level
function nextLevel(currentLevel) {
    if (currentLevel < 3) {
        document.getElementById(`level${currentLevel}`).classList.remove('active');
        document.getElementById(`level${currentLevel+1}`).classList.add('active');
        gameState.currentLevel = currentLevel + 1;
        // updateDogState(gameState.currentLevel);
        updateFoodLevel(gameState.currentLevel);
    }
}

// Navigate to previous level
function prevLevel(currentLevel) {
    if (currentLevel > 1) {
        document.getElementById(`level${currentLevel}`).classList.remove('active');
        document.getElementById(`level${currentLevel-1}`).classList.add('active');
        gameState.currentLevel = currentLevel - 1;
    }
}

// Evaluate the player's choice
function evaluateChoice() {
    let resultText = '';
    let accuracy = '';

    gameState.totalPoints = 
    gameState.levels[1].points + 
    gameState.levels[2].points + 
    gameState.levels[3].points;
    
    if (gameState.totalPoints >= 25 ) {
        resultText = "Lo hiciste bien, pero...<br>Tu mascota comió toda la porción, pero podría ser mejor. A veces, cuando quieres satisfacer a tu mascota, es importante observar su comportamiento cuidadosamente.";
        accuracy = "cerca";
        accuracy = "perfecta";
    } else if (gameState.totalPoints >= 15) {
        resultText = "¡Lo hiciste perfecto!<br>Tu mascota está feliz con la cantidad de comida que le diste. Has demostrado que conoces bien a tu perro.";
    } else {
        resultText = "¡Ups!<br>Tu mascota no está contenta con la cantidad de comida. Es importante observar su estado de ánimo para determinar cuánta comida necesita.";
        accuracy = "incorrecta";
    }
    
    resultMessage.innerHTML = resultText;
    return accuracy;
}

// Finish the game and show results
function finishGame() {
    // Calculate total points
    gameState.totalPoints = 
        gameState.levels[1].points + 
        gameState.levels[2].points + 
        gameState.levels[3].points;
    
    // Hide current level
    document.getElementById(`level${gameState.currentLevel}`).classList.remove('active');

    evaluateChoice();
    
    // Show results section
    const resultsSection = document.getElementById('results');
    resultsSection.classList.add('active');
}

// Restart the game
function restartGame() {
    // Reset game state
    gameState.currentLevel = 1;
    gameState.levels = {
        1: { foodState: 0, points: 0 },
        2: { foodState: 0, points: 0 },
        3: { foodState: 0, points: 0 }
    };
    gameState.totalPoints = 0;
    
    // Hide results section
    document.getElementById('results').classList.remove('active');
    
    // Show level 1
    document.getElementById('instructions').classList.add('active');
    
    // Reset all food levels and dog states
    for (let i = 1; i <= 3; i++) {
        // updateDogState(i);
        updateFoodLevel(i);
    }
}

// Initialize the game when the page loads
window.onload = function() {
    initGame();
};