// Elementos del DOM
const dogSelector = document.getElementById('dogSelector');
const nameScreen = document.getElementById('nameScreen');
const dogOptions = document.querySelectorAll('.dog-option');
const continueBtn = document.getElementById('continueBtn');
const dogNameInput = document.getElementById('dogName');
const finalConfirmBtn = document.getElementById('finalConfirm');
const backToBreedBtn = document.getElementById('backToBreed');
const nameScreenDog = document.getElementById('name-screen-dog');

// Variables para almacenar la selección
let selectedDogBreed = null;
let selectedDogElement = null;

// Función para mostrar solo el perro seleccionado en el SVG
function showSelectedDog(dogId) {
    // Ocultar todos los perros
    document.querySelectorAll('.dog-part').forEach(dogPart => {
        dogPart.classList.remove('active');
    });
    
    // Mostrar solo el perro seleccionado
    const selectedDog = document.getElementById(dogId);
    if (selectedDog) {
        selectedDog.classList.add('active');
    }
}

// Función para guardar la raza seleccionada en localStorage
function saveSelectedBreed(breed) {
    localStorage.setItem('selectedDogBreed', breed);
}

// Función para guardar el nombre del perro en localStorage
function saveDogName(name) {
    localStorage.setItem('dogName', name);
}

// Función para cargar datos guardados del localStorage
function loadSavedData() {
    const savedBreed = localStorage.getItem('selectedDogBreed');
    const savedName = localStorage.getItem('dogName');
    
    // Si hay una raza guardada, seleccionarla automáticamente
    if (savedBreed) {
        const savedDogOption = document.querySelector(`.dog-option[data-dog="${savedBreed}"]`);
        if (savedDogOption) {
            selectDogBreed(savedDogOption, savedBreed);
            continueBtn.disabled = false;
        }
    }
    
    // Si hay un nombre guardado, rellenar el campo
    if (savedName) {
        dogNameInput.value = savedName;
        // Habilitar el botón si hay un nombre
        if (dogNameInput.value.trim()) {
            finalConfirmBtn.disabled = false;
        }
    }
}

// Función para seleccionar una raza de perro
function selectDogBreed(element, breed) {
    // Quitar selección anterior
    if (selectedDogElement) {
        selectedDogElement.classList.remove('selected');
    }
    
    // Aplicar nueva selección
    element.classList.add('selected');
    selectedDogElement = element;
    selectedDogBreed = breed;
    
    // Mostrar el perro seleccionado
    showSelectedDog(breed);
    
    // Guardar en localStorage
    saveSelectedBreed(breed);
    
    // Habilitar el botón de continuar
    continueBtn.disabled = false;
}

// Función para copiar el SVG del perro seleccionado a la pantalla de nombre
function copySelectedDogToNameScreen() {
    if (!selectedDogBreed) return;
    
    // Obtener el SVG del perro seleccionado
    const selectedDogSVG = document.getElementById(selectedDogBreed).cloneNode(true);
    
    // Copiar elementos comunes (nariz, ojos, etc.)
    const commonElements = document.querySelector('.dog-common').cloneNode(true);
    
    // Limpiar el SVG de destino
    while (nameScreenDog.firstChild) {
        nameScreenDog.removeChild(nameScreenDog.firstChild);
    }
    
    // Agregar el círculo verde (base)
    const greenCircle = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    greenCircle.setAttribute("cx", "75");
    greenCircle.setAttribute("cy", "140");
    greenCircle.setAttribute("rx", "50");
    greenCircle.setAttribute("ry", "10");
    greenCircle.setAttribute("fill", "#4de886");
    greenCircle.setAttribute("opacity", "0.6");
    nameScreenDog.appendChild(greenCircle);
    
    // Añadir elementos al SVG de destino
    nameScreenDog.appendChild(commonElements);
    nameScreenDog.appendChild(selectedDogSVG);
    
    // Asegurarse de que el perro sea visible
    selectedDogSVG.classList.add('active');
}


//  //////////////////////////////////////////////

// Event Listeners
// 1. Selección de raza de perro
dogOptions.forEach(option => {
    option.addEventListener('click', function() {
        const dogBreed = this.getAttribute('data-dog');
        selectDogBreed(this, dogBreed);
    });
});

// 2. Botón de continuar a la pantalla de nombre
continueBtn.addEventListener('click', function() {
    if (selectedDogBreed) {
        dogSelector.style.display = 'none';
        nameScreen.style.display = 'block';
        copySelectedDogToNameScreen();
        
        // Enfocar el campo de entrada
        dogNameInput.focus();
    }
});

// 3. Input de nombre
dogNameInput.addEventListener('input', function() {
    finalConfirmBtn.disabled = this.value.trim() === '';
});

// 4. Botón para volver a la selección de raza
backToBreedBtn.addEventListener('click', function() {
    nameScreen.style.display = 'none';
    dogSelector.style.display = 'block';
});

// 5. Botón de confirmación final (guardar nombre y proceder)
finalConfirmBtn.addEventListener('click', function() {
    const dogName = dogNameInput.value.trim();
    if (dogName) {
        saveDogName(dogName);
        
        // Aquí podrías redirigir a la siguiente pantalla o mostrar un mensaje
        alert(`¡Tu ${selectedDogBreed} llamado "${dogName}" ha sido guardado con éxito!`);
        
        // Si quieres redirigir a otra página:
        // window.location.href = 'siguiente-pagina.html';
    }
});