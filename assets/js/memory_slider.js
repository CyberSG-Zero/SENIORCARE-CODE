document.addEventListener('DOMContentLoaded', function() {
    const cardsContainer = document.getElementById('cards-grid');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');
    
    // Variables para el drag para scroll
    let isDown = false;
    let startX;
    let scrollLeft;
    

    // Implementar scroll horizontal con mouse/touch
    cardsContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        cardsContainer.classList.add('grabbing');
        startX = e.pageX - cardsContainer.offsetLeft;
        scrollLeft = cardsContainer.scrollLeft;
    });
    
    cardsContainer.addEventListener('mouseleave', () => {
        isDown = false;
        cardsContainer.classList.remove('grabbing');
    });
    
    cardsContainer.addEventListener('mouseup', () => {
        isDown = false;
        cardsContainer.classList.remove('grabbing');
    });
    
    cardsContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - cardsContainer.offsetLeft;
        const walk = (x - startX) * 2; // Velocidad de scroll
        cardsContainer.scrollLeft = scrollLeft - walk;
    });
    
    // Soporte para dispositivos táctiles
    cardsContainer.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - cardsContainer.offsetLeft;
        scrollLeft = cardsContainer.scrollLeft;
    });
    
    cardsContainer.addEventListener('touchend', () => {
        isDown = false;
    });
    
    cardsContainer.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - cardsContainer.offsetLeft;
        const walk = (x - startX) * 2;
        cardsContainer.scrollLeft = scrollLeft - walk;
    });
    
    // Botones de flecha para scroll (opcional pero útil)
    scrollLeftBtn.addEventListener('click', () => {
        cardsContainer.scrollBy({ left: -300, behavior: 'smooth' });
    });
    
    scrollRightBtn.addEventListener('click', () => {
        cardsContainer.scrollBy({ left: 300, behavior: 'smooth' });
    });
    
});