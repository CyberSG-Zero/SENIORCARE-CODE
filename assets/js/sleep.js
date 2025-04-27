// Game state
const gameState = {
    currentLevel: 0,
    maxLevels: 3,
    squaresFound: 0,
    volume: 0.5
};

// Audio elements
const levelAudios = [
    [
        { src: 'https://assets.mixkit.co/active_storage/sfx/2092/2092.wav', correct: true },
        { src: 'https://assets.mixkit.co/active_storage/sfx/2016/2016.wav', correct: false },
        { src: 'https://assets.mixkit.co/active_storage/sfx/209/209.wav', correct: false }
    ],
    [
        { src: 'https://assets.mixkit.co/active_storage/sfx/2445/2445.wav', correct: false },
        { src: 'https://assets.mixkit.co/active_storage/sfx/1791/1791.wav', correct: true },
        { src: 'https://assets.mixkit.co/active_storage/sfx/550/550.wav', correct: false }
    ],
    [
        { src: 'https://assets.mixkit.co/active_storage/sfx/2004/2004.wav', correct: false },
        { src: 'https://assets.mixkit.co/active_storage/sfx/875/875.wav', correct: false },
        { src: 'https://assets.mixkit.co/active_storage/sfx/2091/2091.wav', correct: true }
    ]
];

let introAudios = [];
let squareAudios = [];

// DOM Elements
const gameContainer = document.getElementById('game-container');
const flashlight = document.querySelector('.flashlight');
const volumeSlider = document.getElementById('volume-control');
const correctPopup = document.getElementById('correct-popup');
const incorrectPopup = document.getElementById('incorrect-popup');
const introScreens = [
    document.getElementById('intro-level1'),
    document.getElementById('intro-level2'),
    document.getElementById('intro-level3')
];
const finalScreen = document.getElementById('final-screen');

// Initialize game
window.onload = function() {
    // Setup volume control
    volumeSlider.value = gameState.volume;
    volumeSlider.addEventListener('input', updateVolume);
    
    // Setup flashlight effect
    document.addEventListener('mousemove', moveFlashlight);
    
    // Load audio files
    for (let i = 0; i < gameState.maxLevels; i++) {
        introAudios[i] = new Audio(levelAudios[i].find(audio => audio.correct).src);
        introAudios[i].volume = gameState.volume;
    }
    
    // Setup first level
    setTimeout(() => {
        startLevel(0);
    }, 2000);
};

// Move flashlight with mouse
function moveFlashlight(e) {
    const x = e.clientX;
    const y = e.clientY;
    flashlight.style.left = x + 'px';
    flashlight.style.top = y + 'px';
}

// Update volume for all audio elements
function updateVolume() {
    gameState.volume = volumeSlider.value;
    
    // Update intro audios
    introAudios.forEach(audio => {
        if (audio) audio.volume = gameState.volume;
    });
    
    // Update square audios
    squareAudios.forEach(audio => {
        if (audio) audio.volume = gameState.volume;
    });
}

// Start a level
function startLevel(level) {
    gameState.currentLevel = level;
    
    // Hide all intro screens
    introScreens.forEach(screen => screen.style.display = 'none');
    
    // Show current intro screen
    introScreens[level].style.display = 'flex';
    
    // Play intro audio
    if (introAudios[level]) {
        introAudios[level].currentTime = 0;
        introAudios[level].play();
    }
    
    // Wait for intro audio to finish or 3 seconds
    setTimeout(() => {
        introScreens[level].style.display = 'none';
        createSoundSquares(level);
    }, 3000);
}

// Create sound squares for current level
function createSoundSquares(level) {
    // Clear previous squares
    const oldSquares = document.querySelectorAll('.sound-square');
    oldSquares.forEach(square => square.remove());
    
    // Clear previous audio
    if (squareAudios.length > 0) {
        squareAudios.forEach(audio => {
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        });
    }
    squareAudios = [];
    
    // Create new squares
    const levelData = levelAudios[level];
    const colors = ['#5d3fd3', '#ff4081', '#3fd3c9'];
    
    for (let i = 0; i < levelData.length; i++) {
        // Create square element
        const square = document.createElement('div');
        square.className = 'sound-square';
        square.style.backgroundColor = colors[i];
        
        // Random position
        const xPos = Math.random() * (window.innerWidth - 100) + 50;
        const yPos = Math.random() * (window.innerHeight - 100) + 50;
        square.style.left = xPos + 'px';
        square.style.top = yPos + 'px';
        
        // Create audio for square
        const audio = new Audio(levelData[i].src);
        audio.loop = true;
        audio.volume = 0;
        audio.play();
        squareAudios.push(audio);
        
        // Handle click
        square.addEventListener('click', () => {
            checkAnswer(i, level);
        });
        
        gameContainer.appendChild(square);
    }
    
    // Add mouse move listener to update sound volumes
    document.addEventListener('mousemove', updateSoundVolumes);
}

// Update sound volumes based on mouse position
function updateSoundVolumes(e) {
    const squares = document.querySelectorAll('.sound-square');
    
    squares.forEach((square, index) => {
        const rect = square.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from mouse to square center
        const distance = Math.sqrt(
            Math.pow(e.clientX - centerX, 2) + 
            Math.pow(e.clientY - centerY, 2)
        );
        
        // Reveal square if mouse is close
        if (distance < 150) {
            square.style.opacity = 1 - (distance / 150);
            
            // Update audio volume based on distance
            if (squareAudios[index]) {
                const volume = Math.max(0, 1 - (distance / 300)) * gameState.volume;
                squareAudios[index].volume = volume;
            }
        } else {
            square.style.opacity = 0;
            if (squareAudios[index]) {
                squareAudios[index].volume = 0;
            }
        }
    });
}

// Check if selected answer is correct
function checkAnswer(index, level) {
    const levelData = levelAudios[level];
    
    // Stop all audio
    squareAudios.forEach(audio => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
    
    // Remove mousemove listener
    document.removeEventListener('mousemove', updateSoundVolumes);
    
    // Check if answer is correct
    if (levelData[index].correct) {
        correctPopup.style.display = 'flex';
    } else {
        incorrectPopup.style.display = 'flex';
        
        // Resume audio for continuing
        setTimeout(() => {
            squareAudios.forEach(audio => {
                if (audio) audio.play();
            });
            document.addEventListener('mousemove', updateSoundVolumes);
        }, 500);
    }
}

// Close incorrect popup
function closePopup() {
    incorrectPopup.style.display = 'none';
}

// Go to next level
function nextLevel() {
    correctPopup.style.display = 'none';
    
    const nextLevel = gameState.currentLevel + 1;
    if (nextLevel < gameState.maxLevels) {
        startLevel(nextLevel);
    } else {
        showFinalScreen();
    }
}

// Show final screen
function showFinalScreen() {
    finalScreen.style.display = 'flex';
}

// Return to menu (placeholder function)
function returnToMenu() {
    // For now, just restart the game
    window.location.reload();
}

// Go to next level (placeholder function from final screen)
function goToNextLevel() {
    // For now, just restart the game
    window.location.reload();
}