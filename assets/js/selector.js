// Elementos del DOM
const dogSelector = document.getElementById('dogSelector');

const dogOptions = document.querySelectorAll('.dog-option');




const dogNameInput = document.getElementById('dogName');
const finalConfirmBtn = document.getElementById('finalConfirm');
const nameScreenDog = document.getElementById('name-screen-dog');

// Variables para almacenar la selección
let selectedDogBreed = null;
let selectedDogElement = null;

// Selección de raza de perro
dogOptions.forEach(option => {
    option.addEventListener('click', function() {
        const dogBreed = this.getAttribute('data-dog');
        selectDogBreed(this, dogBreed);
    });
});

// ------------------------------------------------------------


// Función para seleccionar una raza de perro en el DOM
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

// ------------------------------------------------------------

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


// -------------------------------------------------------------


// Desabilidar el botInput de nombre
dogNameInput.addEventListener('input', function() {
    finalConfirmBtn.disabled = this.value.trim() === '';
});

// -------------------------------------------------------------

// Botón de confirmación final (guardar nombre y proceder)
finalConfirmBtn.addEventListener('click', function() {
    const dogName = dogNameInput.value.trim();
    if (dogName) {
        saveDogName(dogName);
        
        // Aquí podrías redirigir a la siguiente pantalla o mostrar un mensaje
        alert(`¡Tu ${selectedDogBreed} llamado "${dogName}" ha sido guardado con éxito!`);
        
    }
});