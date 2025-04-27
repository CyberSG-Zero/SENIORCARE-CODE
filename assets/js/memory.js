document.addEventListener('DOMContentLoaded', function() {
    // Game variables
    let selectedCard = null;
    let selectedCardElement = null;
    let correctCard = 'bone'; // La carta que coincide con el objeto objetivo
    let score = 0;
    let currentSlide = 0;
    let slideWidth = 110; // Ancho de la carta + margen
    let visibleCards = 3; // Número de cartas visibles a la vez
    let maxSlide = 0;
    
    // Variables para el arrastre (drag)
    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    let previousTranslate = 0;
    
    // DOM elements
    const screen1 = document.getElementById('screen1');
    const screen2 = document.getElementById('screen2');
    const screen3 = document.getElementById('screen3');
    const screen4 = document.getElementById('screen4');
    const screen5 = document.getElementById('screen5');
    const startBtn = document.getElementById('startBtn');
    const selectBtn = document.getElementById('selectBtn');
    const sliderCards = document.getElementById('sliderCards');
    const sliderWrapper = document.getElementById('sliderWrapper');
    const cards = document.querySelectorAll('.card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pointsDisplay = document.getElementById('points');
    const verifyingCard = document.getElementById('verifyingCard');
    const successCard = document.getElementById('successCard');
    const failureCard = document.getElementById('failureCard');
    const scrollIndicator = document.getElementById('scrollIndicator');
    
    // Calcular el máximo número de slides
    maxSlide = Math.max(0, cards.length - visibleCards);
    
    // Crear los puntos indicadores de navegación
    createScrollDots();
    
    // Event listeners
    startBtn.addEventListener('click', showCardSelection);
    selectBtn.addEventListener('click', verifySelection);
    prevBtn.addEventListener('click', slideLeft);
    nextBtn.addEventListener('click', slideRight);
    
    // Event listeners para drag
    sliderWrapper.addEventListener('mousedown', dragStart);
    sliderWrapper.addEventListener('touchstart', dragStart);
    sliderWrapper.addEventListener('mouseup', dragEnd);
    sliderWrapper.addEventListener('touchend', dragEnd);
    sliderWrapper.addEventListener('mouseleave', dragEnd);
    window.addEventListener('mousemove', drag);
    window.addEventListener('touchmove', drag);
    
    // Prevenir el comportamiento predeterminado en móviles
    sliderWrapper.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, { passive: false });
    
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Solo seleccionar si no estamos arrastrando
            if (!isDragging) {
                // Deselect all cards
                cards.forEach(c => c.classList.remove('selected'));
                
                // Select this card
                card.classList.add('selected');
                selectedCard = card.getAttribute('data-card');
                selectedCardElement = card;
                
                // Enable the select button
                selectBtn.disabled = false;
            }
        });
        
        // Prevenir que los clicks en las cartas interfieran con el arrastre
        card.addEventListener('mousedown', function(e) {
            e.stopPropagation();
        });
    });
    
    // Functions
    function showCardSelection() {
        screen1.classList.add('hidden');
        screen2.classList.remove('hidden');
        updateSlider(); // Inicializar el slider
    }
    
    function createScrollDots() {
        scrollIndicator.innerHTML = '';
        for (let i = 0; i <= maxSlide; i++) {
            const dot = document.createElement('div');
            dot.classList.add('scroll-dot');
            if (i === 0) dot.classList.add('active');
            scrollIndicator.appendChild(dot);
        }
    }
    
    function updateScrollDots() {
        const dots = scrollIndicator.querySelectorAll('.scroll-dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    function slideLeft() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        }
    }
    
    function slideRight() {
        if (currentSlide < maxSlide) {
            currentSlide++;
            updateSlider();
        }
    }
    
    function updateSlider() {
        currentTranslate = -currentSlide * slideWidth;
        previousTranslate = currentTranslate;
        setSliderPosition();
        
        // Actualizar estado de los botones de navegación
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide >= maxSlide;
        
        // Actualizar los puntos indicadores
        updateScrollDots();
    }
    
    function setSliderPosition() {
        sliderCards.style.transform = `translateX(${currentTranslate}px)`;
    }
    
    // Funciones para el arrastre (drag)
    function dragStart(event) {
        isDragging = true;
        startPosition = getPositionX(event);
        sliderWrapper.classList.add('dragging');
        
        // Cancelar cualquier transición suave durante el arrastre
        sliderCards.style.transition = 'none';
    }
    
    function drag(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            const diff = currentPosition - startPosition;
            
            // Calcular la nueva posición con límites
            let newTranslate = previousTranslate + diff;
            
            // Aplicar resistencia en los extremos
            if (newTranslate > 0) {
                newTranslate = newTranslate / 3; // Resistencia en el borde izquierdo
            } else if (newTranslate < -maxSlide * slideWidth) {
                const overshoot = newTranslate + maxSlide * slideWidth;
                newTranslate = -maxSlide * slideWidth + overshoot / 3; // Resistencia en el borde derecho
            }
            
            currentTranslate = newTranslate;
            setSliderPosition();
        }
    }
    
    function dragEnd() {
        if (isDragging) {
            isDragging = false;
            sliderWrapper.classList.remove('dragging');
            
            // Restaurar la transición suave
            sliderCards.style.transition = 'transform 0.3s ease';
            
            // Calcular el slide más cercano
            let slideToGo = Math.round(-currentTranslate / slideWidth);
            
            // Asegurarse de que está dentro de los límites
            slideToGo = Math.max(0, Math.min(slideToGo, maxSlide));
            
            currentSlide = slideToGo;
            updateSlider();
        }
    }
    
    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }
    
    function verifySelection() {
        if (!selectedCardElement) return;
        
        // Clonar la carta seleccionada para mostrarla en las pantallas de verificación
        const cardClone = selectedCardElement.cloneNode(true);
        cardClone.classList.remove('selected');
        
        // Mostrar la carta seleccionada en la pantalla de verificación
        verifyingCard.innerHTML = '';
        verifyingCard.appendChild(cardClone);
        
        // Show verification screen
        screen2.classList.add('hidden');
        screen3.classList.remove('hidden');
        
        // Simulate verification delay
        setTimeout(() => {
            screen3.classList.add('hidden');
            
            if (selectedCard === correctCard) {
                // Correct answer
                score += 10;
                pointsDisplay.textContent = '+' + score;
                
                // Mostrar la carta correcta en la pantalla de éxito
                successCard.innerHTML = '';
                successCard.appendChild(cardClone.cloneNode(true));
                
                screen4.classList.remove('hidden');
                
                // After 2 seconds, restart game
                setTimeout(restartGame, 2000);
            } else {
                // Wrong answer
                // Mostrar la carta incorrecta en la pantalla de fallo
                failureCard.innerHTML = '';
                failureCard.appendChild(cardClone.cloneNode(true));
                
                screen5.classList.remove('hidden');
                
                // After 2 seconds, restart game
                setTimeout(restartGame, 2000);
            }
        }, 1500);
    }
    
    function restartGame() {
        // Reset selection
        selectedCard = null;
        selectedCardElement = null;
        selectBtn.disabled = true;
        cards.forEach(c => c.classList.remove('selected'));
        
        // Reset slider position
        currentSlide = 0;
        currentTranslate = 0;
        previousTranslate = 0;
        updateSlider();
        
        // Hide all screens
        screen1.classList.add('hidden');
        screen2.classList.add('hidden');
        screen3.classList.add('hidden');
        screen4.classList.add('hidden');
        screen5.classList.add('hidden');
        
        // Show first screen
        screen1.classList.remove('hidden');
    }
    
    // Inicializar el slider
    updateSlider();
});