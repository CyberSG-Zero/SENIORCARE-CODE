// Función para mostrar el SVG del perrito según el ID y el minijuego
function mostrarSVGPerrito(minijuegoID) {
    // Recuperar el ID del perrito del localStorage
    const perritoID = localStorage.getItem('selectedDogId');
    
    if (!perritoID) {
      console.error('No se encontró ID de perrito en localStorage');
      return;
    }
    
    // Determinar qué SVG mostrar según el perrito y el minijuego
    const svgURL = `../assets/svg/level_1/${perritoID}_minijuego_${minijuegoID}.svg`;
    
    // Cargar el SVG y mostrar el símbolo correcto
    fetch(svgURL)
      .then(response => response.text())
      .then(svgContent => {
        // Insertar el SVG en el contenedor
        const contenedorSVG = document.querySelector('.dog-result');
        contenedorSVG.innerHTML = svgContent;
        
        // Opcional: Si estás usando symbols dentro del SVG
        // const symbolID = `perrito_${perritoID}_game_${minijuegoID}`;
        // contenedorSVG.innerHTML = `<svg><use href="#${symbolID}"></use></svg>`;
    })
      .catch(error => {
        console.error('Error al cargar el SVG:', error);
    });
}
  
  // Ejemplo de uso: mostrar el SVG del perrito para el minijuego 1
mostrarSVGPerrito(1);