// Card Slider Component
class CardSlider {
    constructor(options) {
        // Slider configuration
        this.sliderWrapper = options.sliderWrapper;
        this.sliderCards = options.sliderCards;
        this.cards = options.cards;
        this.prevBtn = options.prevBtn;
        this.nextBtn = options.nextBtn;
        this.scrollIndicator = options.scrollIndicator;
        
        // Slider state
        this.currentSlide = 0;
        this.slideWidth = options.slideWidth || 110; // Ancho de la carta + margen
        this.visibleCards = options.visibleCards || 3; // Número de cartas visibles a la vez
        this.maxSlide = Math.max(0, this.cards.length - this.visibleCards);
        
        // Variables para el arrastre (drag)
        this.isDragging = false;
        this.startPosition = 0;
        this.currentTranslate = 0;
        this.previousTranslate = 0;
        
        // Inicializar
        this.init();
    }
    
    init() {
        // Crear los puntos indicadores de navegación
        this.createScrollDots();
        
        // Event listeners para botones
        this.prevBtn.addEventListener('click', () => this.slideLeft());
        this.nextBtn.addEventListener('click', () => this.slideRight());
        
        // Event listeners para drag
        this.sliderWrapper.addEventListener('mousedown', (e) => this.dragStart(e));
        this.sliderWrapper.addEventListener('touchstart', (e) => this.dragStart(e));
        this.sliderWrapper.addEventListener('mouseup', () => this.dragEnd());
        this.sliderWrapper.addEventListener('touchend', () => this.dragEnd());
        this.sliderWrapper.addEventListener('mouseleave', () => this.dragEnd());
        window.addEventListener('mousemove', (e) => this.drag(e));
        window.addEventListener('touchmove', (e) => this.drag(e));
        
        // Prevenir el comportamiento predeterminado en móviles
        this.sliderWrapper.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, { passive: false });
        
        // Inicializar el slider
        this.updateSlider();
    }
    
    createScrollDots() {
        this.scrollIndicator.innerHTML = '';
        for (let i = 0; i <= this.maxSlide; i++) {
            const dot = document.createElement('div');
            dot.classList.add('scroll-dot');
            if (i === 0) dot.classList.add('active');
            this.scrollIndicator.appendChild(dot);
        }
    }
    
    updateScrollDots() {
        const dots = this.scrollIndicator.querySelectorAll('.scroll-dot');
        dots.forEach((dot, index) => {
            if (index === this.currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    slideLeft() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.updateSlider();
        }
    }
    
    slideRight() {
        if (this.currentSlide < this.maxSlide) {
            this.currentSlide++;
            this.updateSlider();
        }
    }
    
    updateSlider() {
        this.currentTranslate = -this.currentSlide * this.slideWidth;
        this.previousTranslate = this.currentTranslate;
        this.setSliderPosition();
        
        // Actualizar estado de los botones de navegación
        this.prevBtn.disabled = this.currentSlide === 0;
        this.nextBtn.disabled = this.currentSlide >= this.maxSlide;
        
        // Actualizar los puntos indicadores
        this.updateScrollDots();
    }
    
    setSliderPosition() {
        this.sliderCards.style.transform = `translateX(${this.currentTranslate}px)`;
    }
    
    // Funciones para el arrastre (drag)
    dragStart(event) {
        this.isDragging = true;
        this.startPosition = this.getPositionX(event);
        this.sliderWrapper.classList.add('dragging');
        
        // Cancelar cualquier transición suave durante el arrastre
        this.sliderCards.style.transition = 'none';
    }
    
    drag(event) {
        if (this.isDragging) {
            const currentPosition = this.getPositionX(event);
            const diff = currentPosition - this.startPosition;
            
            // Calcular la nueva posición con límites
            let newTranslate = this.previousTranslate + diff;
            
            // Aplicar resistencia en los extremos
            if (newTranslate > 0) {
                newTranslate = newTranslate / 3; // Resistencia en el borde izquierdo
            } else if (newTranslate < -this.maxSlide * this.slideWidth) {
                const overshoot = newTranslate + this.maxSlide * this.slideWidth;
                newTranslate = -this.maxSlide * this.slideWidth + overshoot / 3; // Resistencia en el borde derecho
            }
            
            this.currentTranslate = newTranslate;
            this.setSliderPosition();
        }
    }
    
    dragEnd() {
        if (this.isDragging) {
            this.isDragging = false;
            this.sliderWrapper.classList.remove('dragging');
            
            // Restaurar la transición suave
            this.sliderCards.style.transition = 'transform 0.3s ease';
            
            // Calcular el slide más cercano
            let slideToGo = Math.round(-this.currentTranslate / this.slideWidth);
            
            // Asegurarse de que está dentro de los límites
            slideToGo = Math.max(0, Math.min(slideToGo, this.maxSlide));
            
            this.currentSlide = slideToGo;
            this.updateSlider();
        }
    }
    
    getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }
    
    // Método para actualizar las cartas cuando cambien
    updateCards(newCards) {
        this.cards = newCards;
        this.maxSlide = Math.max(0, this.cards.length - this.visibleCards);
        this.currentSlide = 0;
        this.currentTranslate = 0;
        this.previousTranslate = 0;
        this.createScrollDots();
        this.updateSlider();
    }
    
    // Método para resetear el slider
    reset() {
        this.currentSlide = 0;
        this.currentTranslate = 0;
        this.previousTranslate = 0;
        this.updateSlider();
    }
}

// Uso:
/*
const slider = new CardSlider({
    sliderWrapper: document.getElementById('sliderWrapper'),
    sliderCards: document.getElementById('sliderCards'),
    cards: document.querySelectorAll('.card'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    scrollIndicator: document.getElementById('scrollIndicator'),
    slideWidth: 110,
    visibleCards: 3
});
*/