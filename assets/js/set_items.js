const dogSvg = document.querySelector('.dog-part');
const saveIdDog = document.querySelector('#continueBtn');
const repeatDog = document.querySelector('.dog-svg');
const backToBreedBtn = document.getElementById('backToBreed');
const nameScreen = document.getElementById('nameScreen');

// Función para guardar el ID en localStorage
function saveSVGLocalStorage(dogId) {
    localStorage.setItem('selectedDogId', dogId);
}


// Función del Botón continuar

saveIdDog.addEventListener('click', function() {
    // Obtener el ID del perro seleccionado

    const activeDog = document.querySelector('.dog-part.active');
    let dogId;
    
    if (activeDog && activeDog.id) {
        // Si hay un perro seleccionado y tiene ID, lo usamos
        dogId = activeDog.id;
    } else {
        // Si no hay perro seleccionado o no tiene ID, usamos "pitbull" por defecto
        dogId = "pitbull";
    }
    
    // Guardar el ID en localStorage
    saveSVGLocalStorage(dogId);
    
    console.log('ID del perro guardado en localStorage:', dogId);

    // Botón de continuar a la pantalla de "nombre"
    if (selectedDogBreed) {
        dogSelector.style.display = 'none';
        nameScreen.style.display = 'block';
        // copySelectedDogToNameScreen();
        
        // Enfocar el campo de entrada
        dogNameInput.focus();
        loadSavedDogId() 
    }
});


// --------------------------------------

// Función para cargar el ID desde localStorage y aplicarlo al SVG
function loadSavedDogId() {
    const savedDogId = localStorage.getItem('selectedDogId');
    
    if (savedDogId && repeatDog) {
        // Actualizar la referencia del SVG con el ID guardado
        
        fetch('../assets/svg/dogs.svg')
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo cargar el archivo SVG');
                }
                return response.text();
            })
            .then(svgContent => {
                // Crear un elemento DOM temporal para manipular el SVG
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
                
                // Obtener el símbolo específico por ID
                const symbolElement = svgDoc.querySelector(`#${savedDogId}`);
                
                if (symbolElement) {
                    // Crear un nuevo SVG que contendrá el símbolo
                    const newSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

                    newSvg.setAttribute('viewBox', symbolElement.getAttribute('viewBox'));
                    
                    // Copiar el contenido del símbolo al nuevo SVG
                    const symbolContent = Array.from(symbolElement.childNodes);
                    symbolContent.forEach(node => {
                        const importedNode = document.importNode(node, true);
                        newSvg.appendChild(importedNode);
                    });
                    
                    // Reemplazar el SVG anterior con el nuevo
                    const dogSvgContainer = document.querySelector('.dog-svg');
                    dogSvgContainer.parentNode.replaceChild(newSvg, dogSvgContainer);
                    newSvg.classList.add('dog-svg'); // Mantener la clase
                    
                    console.log('SVG cargado dinámicamente:', savedDogId);
                } else {
                    console.error('No se encontró el símbolo con ID:', savedDogId);
                }
            })
            .catch(error => {
                console.error('Error al cargar el SVG:', error);
            });
    }
}

// ---------------------------------------------------

// Eliminar el SVG del perro seleccionado
function clearDogSvg() {
    const dogSvgContainer = document.querySelector('.dog-svg');
    if (dogSvgContainer) {
        // Limpiar todo el contenido del contenedor SVG
        while (dogSvgContainer.firstChild) {
            dogSvgContainer.removeChild(dogSvgContainer.firstChild);
        }
        console.log('SVG de perro eliminado correctamente');
    }
}

// Boton para volver a la pantalla de selección de raza y que borre el localStorage
backToBreedBtn.addEventListener('click', function() {
    nameScreen.style.display = 'none';
    dogSelector.style.display = 'block';
    localStorage.removeItem('selectedDogId');
    clearDogSvg()
});



// ---------------------------------------------------

