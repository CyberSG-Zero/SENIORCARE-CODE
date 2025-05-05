 // Game configuration
 const config = {
    levels: [
        {
            targetSvg: `
                <img src="../../assets/svg/level_3/sublevel_1/correct_bone.svg" alt="Target Object" />
            `,
            cards: [
                {
                    id: 1,
                    svg: `
                        <img src="../../assets/svg/level_3/sublevel_1/bone.svg" alt="Bone" />
                    `
                },
                {
                    id: 2,
                    svg: `
                        <img src="../../assets/svg/level_3/sublevel_1/scar.svg" alt="Bone" />
                    `
                },
                {
                    id: 3,
                    svg: `
                        <svg viewBox="0 0 100 100">
                            <path d="M30,30 L70,70 M30,70 L70,30" stroke="#000" stroke-width="8" stroke-linecap="round"/>
                            <path d="M20,50 L80,50 M50,20 L50,80" stroke="#000" stroke-width="8" stroke-linecap="round"/>
                        </svg>
                    `
                },
                {
                    id: 4,
                    svg: `
                        <svg viewBox="0 0 100 100">
                            <path d="M30,30 L70,70 M30,70 L70,30" stroke="#000" stroke-width="8" stroke-linecap="round"/>
                        </svg>
                    `
                },
                {
                    id: 5,
                    svg: `
                        <svg viewBox="0 0 100 100">
                            <path d="M20,45 C20,35 30,35 35,35 L30,25 C30,20 40,20 40,25 L45,35 C50,35 60,35 60,45 L50,55 L60,65 C60,75 50,75 45,75 L50,85 C50,90 40,90 40,85 L35,75 C30,75 20,75 20,65 L30,55 Z" fill="#000" stroke="none"/>
                        </svg>
                    `
                }
            ],
            correctId: 1
        },
        {
            targetSvg: `
                <svg viewBox="0 0 100 100">
                    <path d="M30,40 C25,50 25,60 30,70 C40,75 45,70 50,65 C55,70 60,75 70,70 C75,60 75,50 70,40 C60,35 55,40 50,45 C45,40 40,35 30,40 Z" fill="#f8e2c8" stroke="#333" stroke-width="3"/>
                </svg>
            `,
            cards: [
                {
                    id: 1,
                    svg: `
                        <svg viewBox="0 0 100 100">
                            <path d="M30,40 L70,40 C75,40 75,30 70,30 L60,30 C60,20 50,20 50,30 L40,30 C35,30 35,40 40,40 Z" fill="#000" stroke="none"/>
                        </svg>
                    `
                },
                {
                    id: 2,
                    svg: `
                        <svg viewBox="0 0 100 100">
                            <path d="M30,40 C25,50 25,60 30,70 C40,75 45,70 50,65 C55,70 60,75 70,70 C75,60 75,50 70,40 C60,35 55,40 50,45 C45,40 40,35 30,40 Z" fill="#000" stroke="none"/>
                        </svg>
                    `
                },
                {
                    id: 3,
                    svg: `
                        <svg viewBox="0 0 100 100">
                            <path d="M30,30 L70,70 M30,70 L70,30" stroke="#000" stroke-width="8" stroke-linecap="round"/>
                            <path d="M20,50 L80,50 M50,20 L50,80" stroke="#000" stroke-width="8" stroke-linecap="round"/>
                        </svg>
                    `
                },
                {
                    id: 4,
                    svg: `
                        <svg viewBox="0 0 100 100">
                            <path d="M30,30 L70,70 M30,70 L70,30" stroke="#000" stroke-width="8" stroke-linecap="round"/>
                        </svg>
                    `
                },
                {
                    id: 5,
                    svg: `
                        <svg viewBox="0 0 100 100">
                            <path d="M20,45 C20,35 30,35 35,35 L30,25 C30,20 40,20 40,25 L45,35 C50,35 60,35 60,45 L50,55 L60,65 C60,75 50,75 45,75 L50,85 C50,90 40,90 40,85 L35,75 C30,75 20,75 20,65 L30,55 Z" fill="#000" stroke="none"/>
                        </svg>
                    `
                }
            ],
            correctId: 2
        },
        {
            targetSvg: `
                <svg viewBox="0 0 100 100">
                    <path d="M30,30 L70,70 M30,70 L70,30" stroke="#f8e2c8" stroke-width="8" stroke-linecap="round"/>
                    <path d="M20,50 L80,50 M50,20 L50,80" stroke="#f8e2c8" stroke-width="8" stroke-linecap="round"/>
                </svg>
            `,
            cards: [
                {
                    id: 1,
                    svg: `
                        <svg viewBox="0 0 100 100">
                            <path d="M30,40 L70,40 C75,40 75,30 70,30 L60,30 C60,20 50,20 50,30 L40,30 C35,30 35,40 40,40 Z" fill="#000" stroke="none"/>
                        </svg>
                    `
                },
                {
                    id: 2,
                    svg: `
                        <svg viewBox="0 0 100 100">
                            <path d="M30,40 C25,50 25,60 30,70 C40,75 45,70 50,65 C55,70 60,75 70,70 C75,60 75,50 70,40 C60,35 55,40 50,45 C45,40 40,35 30,40 Z" fill="#000" stroke="none"/>
                        </svg>
                    `
                },
                {
                    id: 3,
                    svg: `
                        <svg viewBox="0 0 100 100">
                            <path d="M30,30 L70,70 M30,70 L70,30" stroke="#000" stroke-width="8" stroke-linecap="round"/>
                            <path d="M20,50 L80,50 M50,20 L50,80" stroke="#000" stroke-width="8" stroke-linecap="round"/>
                        </svg>
                    `
                },
                {
                    id: 4,
                    svg: `
                        <svg viewBox="0 0 100 100">
                            <path d="M30,30 L70,70 M30,70 L70,30" stroke="#000" stroke-width="8" stroke-linecap="round"/>
                        </svg>
                    `
                },
                {
                    id: 5,
                    svg: `
                        <svg viewBox="0 0 100 100">
                            <path d="M20,45 C20,35 30,35 35,35 L30,25 C30,20 40,20 40,25 L45,35 C50,35 60,35 60,45 L50,55 L60,65 C60,75 50,75 45,75 L50,85 C50,90 40,90 40,85 L35,75 C30,75 20,75 20,65 L30,55 Z" fill="#000" stroke="none"/>
                        </svg>
                    `
                }
            ],
            correctId: 3
        }
    ],
    currentLevel: 0
};

// Game state
let selectedCardId = null;

// DOM elements
const selectionScreen = document.getElementById('selection-screen');
const instructionsScreen = document.getElementById('instructions-screen');
const verificationScreen = document.getElementById('verification-screen');
const resultScreen = document.getElementById('result-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const cardsGrid = document.getElementById('cards-grid');
const targetObject = document.getElementById('target-object');
const startButton = document.getElementById('start-button');
const verificationIcon = document.getElementById('verify-icon');
const verificationProgress = document.getElementById('verification-progress');
const resultIcon = document.getElementById('result-icon');
const resultProgress = document.getElementById('result-progress');
const resultButtons = document.getElementById('result-buttons');
const backToMenuButton = document.getElementById('back-to-menu');
const nextGameButton = document.getElementById('next-game');

// Initialize the game
function initGame() {
    showScreen(instructionsScreen);
    loadLevel(config.currentLevel);

    // Event listeners
    startButton.addEventListener('click', startLevel);
    backToMenuButton.addEventListener('click', resetGame);
    nextGameButton.addEventListener('click', nextGame);
}

// Load a specific level
function loadLevel(levelIndex) {
    const level = config.levels[levelIndex];
    
    // Clear the cards grid
    cardsGrid.innerHTML = '';
    
    // Set the target object
    targetObject.innerHTML = level.targetSvg;
    document.getElementById('verification-target').innerHTML = level.targetSvg;
    document.getElementById('result-target').innerHTML = level.targetSvg;
    
    // Create the cards
    level.cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.dataset.id = card.id;
        cardElement.innerHTML = `
            <div class="card-number">${card.id.toString().padStart(2, '0')}</div>
            ${card.svg}
        `;
        
        cardElement.addEventListener('click', () => selectCard(card.id));
        cardsGrid.appendChild(cardElement);
    });
}

// Start the current level
function startLevel() {
    showScreen(selectionScreen);
}



// Handle card selection only
function selectCard(cardId) {
    selectedCardId = cardId;
    const level = config.levels[config.currentLevel];
    const selectedCard = level.cards.find(card => card.id === cardId);
    
    // Opcionalmente, aquí puedes añadir alguna lógica visual 
    // para indicar qué carta está seleccionada
    
    // Llamar a la función que muestra la pantalla de verificación
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Añadir la clase "selected" a la carta seleccionada
    document.querySelector(`.card[data-id="${cardId}"]`)?.classList.add('selected');
    
}

function initializeVerificationButton() {
    const verificationButton = document.querySelector('.verification-button');
    
    if (verificationButton) {
        verificationButton.addEventListener('click', () => {
            // Verificar que haya una carta seleccionada
            if (selectedCardId !== null) {
                const level = config.levels[config.currentLevel];
                const selectedCard = level.cards.find(card => card.id === selectedCardId);
                showVerificationScreen(selectedCard);
            } else {
                // Opcional: mostrar un mensaje si no hay carta seleccionada
                alert('Por favor, selecciona una carta primero.');
            }
        });
    }
}

// Show verification screen and handle verification process
function showVerificationScreen(selectedCard) {
    // Show verification screen
    showScreen(verificationScreen);
    
    // Display selected card
    document.getElementById('selected-card').innerHTML = `
        <div class="card">
            <div class="card-number">${selectedCard.id.toString().padStart(2, '0')}</div>
            ${selectedCard.svg}
        </div>
    `;
    
    // Animate verification
    verificationProgress.style.width = '0%';
    setTimeout(() => {
        verificationProgress.style.width = '100%';
        setTimeout(() => {
            const level = config.levels[config.currentLevel];
            showResult(selectedCardId === level.correctId);
        }, 2000);
    }, 100);
}

// Show the result of the selection
function showResult(isCorrect) {
    showScreen(resultScreen);
    
    const level = config.levels[config.currentLevel];
    const selectedCard = level.cards.find(card => card.id === selectedCardId);
    
    // Display selected card
    document.getElementById('result-card').innerHTML = `
        <div class="card">
            <div class="card-number">${selectedCard.id.toString().padStart(2, '0')}</div>
            ${selectedCard.svg}
        </div>
    `;
    
    // Set result icon and text
    if (isCorrect) {
        resultIcon.className = 'status-box green-check';
        resultIcon.style.border = 'solid 2.5px var(--darkpurple)';
        resultIcon.innerHTML = '<svg width="40" height="40" viewBox="0 0 70 70" fill="none"><path d="M14.5835 35.0001L29.1668 49.5834L58.3335 20.4167" stroke="#FAFAFA" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        resultProgress.innerHTML = 'Correcto <span class="background-span">°U°</span>';
        resultProgress.style.width = 'auto';
        
        // Add next level button
        resultButtons.innerHTML = `
            <button class="btn white" id="next-level">Siguiente nivel ▶</button>
        `;
        document.getElementById('next-level').addEventListener('click', nextLevel);
    } else {
        resultIcon.className = 'status-box red-check';
        resultIcon.style.border = 'solid 2.5px var(--darkpurple)';
        resultIcon.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 12l7 7M12 12l-7 -7M12 12l-7 7M12 12l7 -7"/></svg>';
        resultProgress.innerHTML = 'Incorrecto <span class="background-span">:(</span>';
        resultProgress.style.width = 'auto';
        
        // Add retry button
        resultButtons.innerHTML = `
            <button class="btn white" id="retry-level">◀ Reintentar</button>
        `;
        document.getElementById('retry-level').addEventListener('click', retryLevel);
    }
}

// Move to the next level
function nextLevel() {
    config.currentLevel++;
    
    if (config.currentLevel >= config.levels.length) {
        // Game completed
        showScreen(gameOverScreen);
    } else {
        // Load the next level
        loadLevel(config.currentLevel);
        showScreen(instructionsScreen);
    }
}

// Retry the current level
function retryLevel() {
    showScreen(selectionScreen);
}

// Reset the game
function resetGame() {
    config.currentLevel = 0;
    loadLevel(config.currentLevel);
    showScreen(instructionsScreen);
}

// Placeholder for next game function
function nextGame() {
    alert('¡Gracias por jugar! El siguiente juego estará disponible pronto.');
}

// Helper function to show a specific screen
function showScreen(screen) {
    // Hide all screens
    document.querySelectorAll('.game-screen').forEach(s => {
        s.classList.remove('active');
    });
    
    // Show the requested screen
    screen.classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
    initializeVerificationButton();
});
// Start the game when the page loads
window.onload = initGame;