/**
 * Juego de Selección de Cartas con CardSlider Integrado
 * Una versión que evita el uso de importaciones
 */

document.addEventListener('DOMContentLoaded', function() {
    // ===== CLASE CARDSLIDER INTEGRADA =====
    class CardSlider {
        constructor(config) {
            this.sliderWrapper = config.sliderWrapper;
            this.sliderCards = config.sliderCards;
            this.cards = Array.from(config.cards);
            this.prevBtn = config.prevBtn;
            this.nextBtn = config.nextBtn;
            this.scrollIndicator = config.scrollIndicator;
            this.slideWidth = config.slideWidth || 110;
            this.visibleCards = config.visibleCards || 3;
            this.currentPosition = 0;
            this.isDragging = false;
            this.startX = 0;
            this.scrollLeft = 0;
            
            this.initialize();
        }
        
        initialize() {
            // Configurar el slider
            if (this.sliderCards) {
                this.renderCards();
                this.updateButtonStates();
                this.createScrollIndicators();
            }
            
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => this.slidePrev());
            }
            
            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => this.slideNext());
            }
            
            // Añadir funcionalidad de arrastre
            this.setupDragEvents();
        }
        
        renderCards() {
            if (!this.sliderCards) return;
            
            this.sliderCards.innerHTML = '';
            this.cards.forEach(card => {
                this.sliderCards.appendChild(card);
            });
        }
        
        updateCards(newCards) {
            if (!newCards) return;
            
            this.cards = Array.from(newCards);
            this.renderCards();
            this.currentPosition = 0;
            this.updateButtonStates();
            this.createScrollIndicators();
        }
        
        slideNext() {
            const maxPosition = Math.max(0, this.cards.length - this.visibleCards);
            if (this.currentPosition < maxPosition) {
                this.currentPosition++;
                this.updateSliderPosition();
            }
        }
        
        slidePrev() {
            if (this.currentPosition > 0) {
                this.currentPosition--;
                this.updateSliderPosition();
            }
        }
        
        updateSliderPosition() {
            if (!this.sliderCards) return;
            
            const position = -this.currentPosition * this.slideWidth;
            this.sliderCards.style.transform = `translateX(${position}px)`;
            this.updateButtonStates();
            this.updateScrollIndicators();
        }
        
        updateButtonStates() {
            if (this.prevBtn) {
                this.prevBtn.disabled = this.currentPosition === 0;
            }
            
            if (this.nextBtn) {
                const maxPosition = Math.max(0, this.cards.length - this.visibleCards);
                this.nextBtn.disabled = this.currentPosition >= maxPosition;
            }
        }
        
        createScrollIndicators() {
            if (!this.scrollIndicator) return;
            
            this.scrollIndicator.innerHTML = '';
            const indicatorCount = Math.max(1, this.cards.length - this.visibleCards + 1);
            
            for (let i = 0; i < indicatorCount; i++) {
                const dot = document.createElement('span');
                dot.classList.add('indicator-dot');
                if (i === this.currentPosition) {
                    dot.classList.add('active');
                }
                this.scrollIndicator.appendChild(dot);
            }
        }
        
        updateScrollIndicators() {
            if (!this.scrollIndicator) return;
            
            const dots = this.scrollIndicator.querySelectorAll('.indicator-dot');
            dots.forEach((dot, index) => {
                if (index === this.currentPosition) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        setupDragEvents() {
            if (!this.sliderCards) return;
            
            this.sliderCards.addEventListener('mousedown', (e) => this.startDragging(e));
            this.sliderCards.addEventListener('touchstart', (e) => this.startDragging(e.touches[0]), { passive: true });
            this.sliderCards.addEventListener('mouseup', () => this.stopDragging());
            this.sliderCards.addEventListener('touchend', () => this.stopDragging());
            this.sliderCards.addEventListener('mouseleave', () => this.stopDragging());
            this.sliderCards.addEventListener('mousemove', (e) => this.drag(e));
            this.sliderCards.addEventListener('touchmove', (e) => this.drag(e.touches[0]), { passive: true });
        }
        
        startDragging(e) {
            this.isDragging = true;
            this.startX = e.pageX - this.sliderCards.offsetLeft;
            this.scrollLeft = this.currentPosition * this.slideWidth;
        }
        
        stopDragging() {
            this.isDragging = false;
        }
        
        drag(e) {
            if (!this.isDragging) return;
            
            e.preventDefault();
            const x = e.pageX - this.sliderCards.offsetLeft;
            const walk = x - this.startX;
            
            const position = this.scrollLeft - walk;
            const maxPosition = (this.cards.length - this.visibleCards) * this.slideWidth;
            
            if (position < 0) {
                this.currentPosition = 0;
            } else if (position > maxPosition) {
                this.currentPosition = Math.floor(maxPosition / this.slideWidth);
            } else {
                this.currentPosition = Math.round(position / this.slideWidth);
            }
            
            this.updateSliderPosition();
        }
        
        reset() {
            this.currentPosition = 0;
            this.updateSliderPosition();
        }
    }

    // ===== VARIABLES DEL JUEGO =====
    let slider = null;
    let currentDeck = null;
    let selectedCard = null;
    let selectedCardElement = null;
    let score = 0;
    let currentSubLevel = 1;
    let totalScore = 0;
    
    // ===== CONFIGURACIÓN DE LOS SUBNIVELES =====
    const subLevelData = {
        1: { 
            correctCard: 'bone',
            nextScreen: 'screen6',
            instruction: 'Encuentra el hueso entre las cartas'
        },
        2: { 
            correctCard: 'claw',
            nextScreen: 'screen7',
            instruction: 'Encuentra la garra entre las cartas'
        },
        3: { 
            correctCard: 'star',
            nextScreen: 'screen8',
            instruction: 'Encuentra la estrella entre las cartas'
        }
    };
    
    // ===== ELEMENTOS DEL DOM =====
    // Pantallas principales
    const gameScreens = {
        intro: document.getElementById('screen1'),
        selection: document.getElementById('screen2'),
        verifying: document.getElementById('screen3'),
        success: document.getElementById('screen4'),
        failure: document.getElementById('screen5'),
        level2Intro: document.getElementById('screen6'),
        level3Intro: document.getElementById('screen7'),
        gameComplete: document.getElementById('screen8')
    };
    
    // Botones
    const startBtn = document.getElementById('startBtn');
    const selectBtn = document.getElementById('selectBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const restartGameBtn = document.getElementById('restartGameBtn');
    const nextLevelBtn = document.getElementById('nextLevelBtn');
    const startBtn2 = document.getElementById('startBtn2');
    const startBtn3 = document.getElementById('startBtn3');
    
    // Elementos del slider
    const sliderWrapper = document.getElementById('sliderWrapper');
    const sliderCards = document.getElementById('slider-cards');
    const scrollIndicator = document.getElementById('slider-nav');
    
    // Elementos de UI
    const pointsDisplay = document.getElementById('points');
    const verifyingCard = document.getElementById('verifyingCard');
    const successCard = document.getElementById('successCard');
    const failureCard = document.getElementById('failureCard');
    const subLevelDisplay = document.getElementById('currentSubLevelDisplay');
    const finalScoreDisplay = document.getElementById('finalScore');
    
    // ===== INICIALIZACIÓN =====
    initGame();
    
    function initGame() {
        // Configurar oyentes de eventos
        setupEventListeners();
        
        // Inicializar el deslizador de cartas
        initializeCardSlider();
        
        // Mostrar la pantalla de introducción
        showScreen('intro');
    }
    
    function setupEventListeners() {
        // Botones de inicio
        startBtn.addEventListener('click', showCardSelection);
        startBtn2.addEventListener('click', showCardSelection);
        startBtn3.addEventListener('click', showCardSelection);
        
        // Botón de selección
        selectBtn.addEventListener('click', verifySelection);
        
        // Botones de navegación del juego
        restartGameBtn.addEventListener('click', resetGame);
        nextLevelBtn.addEventListener('click', goToNextLevel);
    }
    
    function initializeCardSlider() {
        slider = new CardSlider({
            sliderWrapper: sliderWrapper,
            sliderCards: sliderCards,
            cards: document.querySelectorAll('.card'),
            prevBtn: prevBtn,
            nextBtn: nextBtn,
            scrollIndicator: scrollIndicator,
            slideWidth: 110,
            visibleCards: 3
        });
    }
    
    // ===== GESTIÓN DE PANTALLAS =====
    function showScreen(screenName) {
        // Ocultar todas las pantallas
        Object.values(gameScreens).forEach(screen => {
            if (screen) screen.classList.add('hidden');
        });
        
        // Mostrar la pantalla solicitada
        if (gameScreens[screenName]) {
            gameScreens[screenName].classList.remove('hidden');
        }
    }
    
    function showCardSelection() {
        // Actualizar el indicador de subnivel
        if (subLevelDisplay) {
            subLevelDisplay.textContent = currentSubLevel;
        }
        
        // Actualizar instrucción según el nivel actual
        const instructionElement = document.getElementById('levelInstruction');
        if (instructionElement && subLevelData[currentSubLevel]) {
            instructionElement.textContent = subLevelData[currentSubLevel].instruction;
        }
        
        // Ocultar todas las barajas
        document.querySelectorAll('.slider-cards').forEach(deck => {
            deck.classList.add('hidden');
        });
        
        // Mostrar la baraja correspondiente al subnivel actual
        currentDeck = document.getElementById(`deck${currentSubLevel}`);
        if (currentDeck) {
            currentDeck.classList.remove('hidden');
            
            // Reiniciar variables de selección
            selectedCard = null;
            selectedCardElement = null;
            selectBtn.disabled = true;
            
            // Configurar eventos para las cartas
            setupCardListeners();
            
            // Actualizar el slider con las nuevas cartas
            if (slider) {
                slider.updateCards(currentDeck.querySelectorAll('.card'));
                slider.reset();
            }
            
            // Mostrar la pantalla de selección
            showScreen('selection');
        }
    }
    
    // ===== GESTIÓN DE CARTAS =====
    function setupCardListeners() {
        if (!currentDeck) return;
        
        const currentCards = currentDeck.querySelectorAll('.card');
        currentCards.forEach(card => {
            // Eliminar eventos anteriores para evitar duplicación
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);
            
            // Añadir nuevo evento de clic
            newCard.addEventListener('click', (e) => {
                if (!slider || !slider.isDragging) {
                    currentCards.forEach(c => c.classList.remove('selected'));
                    newCard.classList.add('selected');
                    selectedCard = newCard.getAttribute('data-card');
                    selectedCardElement = newCard;
                    selectBtn.disabled = false;
                }
            });
            
            // Prevenir arrastre al hacer clic
            newCard.addEventListener('mousedown', function(e) {
                e.stopPropagation();
            });
        });
    }
    
    function verifySelection() {
        if (!selectedCardElement || !subLevelData[currentSubLevel]) return;
        
        // Clonar la carta seleccionada para mostrarla
        const cardClone = selectedCardElement.cloneNode(true);
        cardClone.classList.remove('selected');
        
        // Limpiar y mostrar la carta en la pantalla de verificación
        if (verifyingCard) {
            verifyingCard.innerHTML = '';
            verifyingCard.appendChild(cardClone);
        }
        
        // Mostrar pantalla de verificación
        showScreen('verifying');
        
        // Verificar después de un breve retraso
        setTimeout(() => {
            const isCorrect = selectedCard === subLevelData[currentSubLevel].correctCard;
            
            if (isCorrect) {
                handleCorrectSelection(cardClone);
            } else {
                handleIncorrectSelection(cardClone);
            }
        }, 1500);
    }
    
    function handleCorrectSelection(cardClone) {
        // Actualizar puntuación
        score = 10;
        totalScore += score;
        
        // Actualizar UI
        if (pointsDisplay) pointsDisplay.textContent = '+' + score;
        
        // Mostrar carta en pantalla de éxito
        if (successCard) {
            successCard.innerHTML = '';
            successCard.appendChild(cardClone.cloneNode(true));
        }
        
        // Mostrar pantalla de éxito
        showScreen('success');
        
        // Avanzar al siguiente nivel o mostrar pantalla final
        setTimeout(() => {
            if (currentSubLevel < 3) {
                currentSubLevel++;
                const nextScreenKey = subLevelData[currentSubLevel-1].nextScreen.replace('screen', '');
                
                // Buscar la pantalla correspondiente
                let nextScreenName = '';
                Object.keys(gameScreens).forEach(key => {
                    if (gameScreens[key] && gameScreens[key].id === subLevelData[currentSubLevel-1].nextScreen) {
                        nextScreenName = key;
                    }
                });
                
                if (nextScreenName) {
                    showScreen(nextScreenName);
                }
            } else {
                // Mostrar pantalla de finalización
                if (finalScoreDisplay) finalScoreDisplay.textContent = totalScore;
                showScreen('gameComplete');
            }
        }, 2000);
    }
    
    function handleIncorrectSelection(cardClone) {
        // Mostrar carta en pantalla de fallo
        if (failureCard) {
            failureCard.innerHTML = '';
            failureCard.appendChild(cardClone.cloneNode(true));
        }
        
        // Mostrar pantalla de fallo
        showScreen('failure');
        
        // Reintentar el nivel actual
        setTimeout(restartCurrentLevel, 2000);
    }
    
    // ===== REINICIO Y NAVEGACIÓN =====
    function restartCurrentLevel() {
        // Reiniciar variables de selección
        selectedCard = null;
        selectedCardElement = null;
        selectBtn.disabled = true;
        
        // Reiniciar el slider
        if (slider) {
            slider.reset();
        }
        
        // Mostrar la pantalla de introducción correspondiente al nivel actual
        let introScreen = 'intro';
        if (currentSubLevel === 2) introScreen = 'level2Intro';
        if (currentSubLevel === 3) introScreen = 'level3Intro';
        
        showScreen(introScreen);
    }
    
    function resetGame() {
        // Reiniciar variables de juego
        currentSubLevel = 1;
        totalScore = 0;
        score = 0;
        
        // Reiniciar nivel
        restartCurrentLevel();
    }
    
    function goToNextLevel() {
        // Navegación al siguiente nivel (ajustar según necesidad)
        window.location.href = 'next-level.html';
    }
});