document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slide');
  const navBtns = document.querySelectorAll('.nav-btn');
  const navigationWheel = document.querySelector('.navigation-wheel');
  let currentSlide = 0;
  

  // Establecer la posición inicial
  positionButtons();

  // Función para actualizar el slider con efecto de rotación
  function updateSlider(newSlide) {
    // No hacer nada si es el mismo slide
    if (newSlide === currentSlide) return;

    // Calcular el ángulo de rotación
    const totalButtons = navBtns.length;
    const anglePerButton = 360 / totalButtons;
    
    // Calcular cuántos pasos necesitamos rotar
    let steps = newSlide - currentSlide;
    if (steps < 0) steps += totalButtons; // Ajustar para rotación en sentido horario
    
    // Calcular el nuevo ángulo
    const currentRotation = getCurrentRotation(navigationWheel);
    const newRotation = currentRotation - (anglePerButton * steps);
    
    // Aplicar la animación de rotación
    navigationWheel.style.transition = 'transform 1s ease';
    navigationWheel.style.transform = `rotate(${newRotation}deg)`;

    // Ajustar la rotación de los SVGs
  navBtns.forEach((btn) => {
    const svg = btn.querySelector('svg');
    if (svg) {
      svg.style.transform = `rotate(${newRotation * -1}deg)`; // Contrarresta la rotación
    }
  });

    // Ocultar slide actual y mostrar el nuevo
    slides[currentSlide].classList.remove('active');
    slides[newSlide].classList.add('active');

    // Actualizar la clase activa en los botones
    navBtns[currentSlide].classList.remove('active');
    navBtns[newSlide].classList.add('active');

    // Actualizar el índice del slide actual
    currentSlide = newSlide;
  }

  // Función para obtener la rotación actual del elemento
  function getCurrentRotation(element) {
    const transform = window.getComputedStyle(element).getPropertyValue('transform');
    if (transform === 'none') return 0;
    
    const matrix = transform.match(/^matrix\((.+)\)$/);
    if (matrix) {
      const values = matrix[1].split(', ');
      const a = values[0];
      const b = values[1];
      const angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
      return angle < 0 ? angle + 360 : angle;
    }
    return 0;
  }

  // Función para posicionar los botones en círculo
  function positionButtons() {
    const totalButtons = navBtns.length;
    const anglePerButton = 360 / totalButtons;
    const radius = 120; // Radio del círculo
    
    navBtns.forEach((btn, index) => {
      const svg = btn.querySelector('svg');
      if (svg) {
      svg.style.transform = 'rotate(0deg)'; // Asegura que los SVGs estén estáticos al inicio
      }
      const angle = (anglePerButton * index - 180) * (Math.PI / 180); // Convertir a radianes
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      
      btn.style.position = 'absolute';
      btn.style.left = `calc(50% + ${x}px - 2.5em)`;
      btn.style.top = `calc(50% + ${y}px - 2.5em)`;
    });
  }

  // Agregar evento de clic a los botones de navegación
  navBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      updateSlider(index);
    });
  });

});