// Variables
const contenedorSVG = document.querySelector('.dog-result');
const resultMessage = document.getElementById('result-message');    
const resultTitle = document.getElementById('result-title');
const recommentMessage = document.getElementById('recommentMessage');

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
        `../../assets/svg/level_1/dog_states/${savedDogId}-dog-mid.svg`;
        dogImage.alt = 'Perro correcto';
    } else {
        foodImage.src = 
        `../../assets/svg/level_1/food_states/food-high.svg`; 
        // SVG para mucha comida
        foodImage.alt = 'Mucha comida';

        dogImage.src = 
        `../../assets/svg/level_1/dog_states/${savedDogId}-dog-satisfied.svg`;
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
    const perritoID = localStorage.getItem('selectedDogId');

    let resultHead = '';
    let resultText = '';
    let recommentMe = '';
    let accuracy = '';
    let dogimg = '';


    gameState.totalPoints = 
    gameState.levels[1].points + 
    gameState.levels[2].points + 
    gameState.levels[3].points;
    
    if (gameState.totalPoints >= 25 ) {
        resultHead = "Lo hiciste bien, pero...";
        resultText = "Tu mascota comió toda la porción, pero podría ser mejor. A veces, cuando quieres <span class='span-bold'>satisfacer a tu mascota,</span> es importante observar su comportamiento cuidadosamente. <br><br>En la vejez, la actividad de tu perro puede disminuir, y darle más comida de la que necesita puede llevar al sobrepeso. El exceso de peso puede generar <span class='span-bold'>problemas articulares, cardíacos y otros problemas de salud.</span>";
        recommentMe = "Noto que su perro ha consumido una cantidad <span class='span-bold'>excesiva de alimento.</span> Si bien una ocasión puntual no suele generar problemas graves, <span class='span-bold'>la sobrealimentación crónica</span> puede derivar en obesidad y otros problemas de salud a largo plazo. Monitoree si presenta signos de malestar gastrointestinal como vómitos o hinchazón abdominal. <br><br>En las próximas comidas, ajuste gradualmente la porción a la recomendada para <span class='span-bold'>su peso y nivel de actividad.</span> Si esto ocurre con frecuencia, le sugiero agendar una consulta para evaluar <span class='span-bold'>su plan de alimentación y descartar cualquier ansiedad</span> por la comida.";
        dogimg = `<img src="../assets/svg/level_1/dog_final/full/${perritoID}_full.svg" alt="Perrito Resultado">`;
        accuracy = "cerca";
        accuracy = "perfecta";
    } else if (gameState.totalPoints >= 15) {
        resultHead = "¡Lo hiciste perfecto!";
        resultText = "Tu mascota está feliz con la cantidad de comida que le diste. Has demostrado que conoces bien a tu perro. Mantener una <span class='span-bold'>porción adecuada</span> ayuda a tu perro a mantener un peso saludable, lo cual es crucial para su bienestar en la vejez. <br><br>Un peso equilibrado <span class='span-bold'>reduce el estrés</span> en sus articulaciones y órganos internos, contribuyendo a una mejor calidad de vida.";
        recommentMe = "¡Excelente! Me alegra saber que su perro ha comido bien. Mantener una <span class='span-bold'>rutina de alimentación regular</span> y ofrecerle un alimento balanceado de alta calidad es fundamental para su salud y vitalidad. <br><br>Continúe observando <span class='span-bold'>su energía, la calidad de sus heces y su peso corporal</span> para asegurar que sus necesidades nutricionales se están cubriendo de manera óptima. No dude en consultarnos si tiene alguna pregunta sobre su alimentación a medida que envejece o si nota algún cambio en sus requerimientos.";
        dogimg = `<img src="../assets/svg/level_1/dog_final/full/${perritoID}_full.svg" alt="Perrito Resultado">`;
    } else {
        resultHead = "¡Ups!";
        resultText = "Tu mascota <span class='span-bold'>no está contenta</span> con la cantidad de comida. Es importante observar su estado de ánimo para determinar cuánta comida necesita. <br><br>Es importante asegurarse de que tu perro mayor esté recibiendo suficientes nutrientes. Si bien sus <span class='span-bold'>necesidades calóricas pueden cambiar,</span> una porción demasiado pequeña podría llevar a <span class='span-bold'>la pérdida de peso y masa muscular,</span> lo cual también puede ser perjudicial.";
        accuracy = "incorrecta";
        recommentMe = "Observo que su mascota no ha ingerido la cantidad usual de alimento. Esto puede deberse tanto a una <span class='span-bold'>falta de apetito, como al no darle los suficientes cantidad de nutrientes.</span> <br><br>Es crucial monitorear su apetito y estado general en <span class='span-bold'>las próximas 24-48 horas.</span> Asegúrese de ofrecerle agua fresca y un ambiente tranquilo. Si la inapetencia persiste, se acompaña de <span class='span-bold'>letargo, vómitos, diarrea</span> o cualquier otro signo de malestar, le recomiendo agendar una consulta veterinaria para evaluar las posibles causas subyacentes y establecer un plan de acción adecuado para asegurar su <span class='span-bold'>bienestar nutricional.</span>";
        dogimg = `<img src="../assets/svg/level_1/dog_final/hungry/${perritoID}_hungry.svg" alt="Perrito Resultado">`;
    }
    resultTitle.innerHTML = resultHead;
    resultMessage.innerHTML = resultText;
    recommentMessage.innerHTML = recommentMe;
    contenedorSVG.innerHTML = dogimg;
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