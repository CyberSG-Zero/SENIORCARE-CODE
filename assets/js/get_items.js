// Este script carga el perro seleccionado desde localStorage y lo muestra en el juego

// Elementos del DOM
const repeatDog = document.querySelector('.dog-svg');
const instructionDogSVG = document.getElementById('instruction-dog');
const gameDogSVG = document.getElementById('game-dog');
const dogTemplates = document.getElementById('dogTemplates');

// Cargar datos del perro
document.addEventListener('DOMContentLoaded', function() {
    loadSavedDogId();
});

// Ejemplo de cómo se guardarían los datos (esto estaría en otra página/archivo)
function saveDogSelection(breed, name) {
    localStorage.setItem('selectedDogBreed', breed);
    localStorage.setItem('dogName', name);
    console.log(`Perro guardado: ${breed} llamado ${name}`);
}

// Función para cargar el perro guardado
// function loadSavedDog() {
//     // Obtener la raza guardada en localStorage
//     const savedBreed = localStorage.getItem('selectedDogBreed');
//     const dogName = localStorage.getItem('dogName');
    
//     // Si no hay perro guardado, mostrar un perro por defecto
//     if (!savedBreed) {
//         console.warn('No se encontró un perro guardado. Mostrando perro por defecto.');
//         showDefaultDog();
//         return;
//     }
    
//     console.log(`Cargando ${savedBreed} llamado ${dogName || 'sin nombre'}`);
    
//     // Mostrar el perro en ambas pantallas
//     drawDog(instructionDogSVG, savedBreed);
//     drawDog(gameDogSVG, savedBreed);
// }

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


// Función para dibujar el perro en el SVG proporcionado
function drawDog(svgElement, breed) {
    // Limpiar el SVG
    while (svgElement.firstChild) {
        svgElement.removeChild(svgElement.firstChild);
    }
    
    // Crear y añadir el círculo verde (base)
    const greenCircle = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    greenCircle.setAttribute("cx", "75");
    greenCircle.setAttribute("cy", "140");
    greenCircle.setAttribute("rx", "50");
    greenCircle.setAttribute("ry", "10");
    greenCircle.setAttribute("fill", "#4de886");
    greenCircle.setAttribute("opacity", "0.6");
    svgElement.appendChild(greenCircle);
    
    // Añadir elementos comunes del perro
    addCommonDogElements(svgElement);
    
    // Añadir elementos específicos según la raza
    addBreedSpecificElements(svgElement, breed);
}

// Función para añadir elementos comunes del perro (nariz, ojos, etc.)
function addCommonDogElements(svgElement) {
    // Nariz
    const nose = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    nose.setAttribute("cx", "75");
    nose.setAttribute("cy", "65");
    nose.setAttribute("rx", "8");
    nose.setAttribute("ry", "5");
    nose.setAttribute("fill", "black");
    svgElement.appendChild(nose);
    
    // Ojos
    const leftEye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    leftEye.setAttribute("cx", "65");
    leftEye.setAttribute("cy", "55");
    leftEye.setAttribute("r", "3");
    leftEye.setAttribute("fill", "black");
    svgElement.appendChild(leftEye);
    
    const rightEye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    rightEye.setAttribute("cx", "85");
    rightEye.setAttribute("cy", "55");
    rightEye.setAttribute("r", "3");
    rightEye.setAttribute("fill", "black");
    svgElement.appendChild(rightEye);
    
    // Boca (sonrisa)
    const mouthLeft = document.createElementNS("http://www.w3.org/2000/svg", "path");
    mouthLeft.setAttribute("d", "M75 70 Q 75 75 65 73");
    mouthLeft.setAttribute("fill", "none");
    mouthLeft.setAttribute("stroke", "black");
    mouthLeft.setAttribute("stroke-width", "1.5");
    svgElement.appendChild(mouthLeft);
    
    const mouthRight = document.createElementNS("http://www.w3.org/2000/svg", "path");
    mouthRight.setAttribute("d", "M75 70 Q 75 75 85 73");
    mouthRight.setAttribute("fill", "none");
    mouthRight.setAttribute("stroke", "black");
    mouthRight.setAttribute("stroke-width", "1.5");
    svgElement.appendChild(mouthRight);
    
    // Collar
    const collar = document.createElementNS("http://www.w3.org/2000/svg", "path");
    collar.setAttribute("d", "M55 75 Q 75 85 95 75");
    collar.setAttribute("fill", "none");
    collar.setAttribute("stroke", "#ff5a76");
    collar.setAttribute("stroke-width", "5");
    svgElement.appendChild(collar);
}

// Función para añadir elementos específicos según la raza
function addBreedSpecificElements(svgElement, breed) {
    // Definir características específicas para cada raza
    const breedElements = {
        labrador: () => {
            // Cuerpo
            const body = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
            body.setAttribute("cx", "75");
            body.setAttribute("cy", "100");
            body.setAttribute("rx", "40");
            body.setAttribute("ry", "30");
            body.setAttribute("fill", "#F7D08A");
            svgElement.appendChild(body);
            
            // Cabeza
            const head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            head.setAttribute("cx", "75");
            head.setAttribute("cy", "60");
            head.setAttribute("r", "25");
            head.setAttribute("fill", "#F7D08A");
            svgElement.appendChild(head);
            
            // Orejas
            const leftEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
            leftEar.setAttribute("d", "M55 45 Q 45 30 60 35");
            leftEar.setAttribute("fill", "#E8C170");
            svgElement.appendChild(leftEar);
            
            const rightEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
            rightEar.setAttribute("d", "M95 45 Q 105 30 90 35");
            rightEar.setAttribute("fill", "#E8C170");
            svgElement.appendChild(rightEar);
            
            // Cola
            const tail = document.createElementNS("http://www.w3.org/2000/svg", "path");
            tail.setAttribute("d", "M115 90 Q 130 80 135 95");
            tail.setAttribute("fill", "#F7D08A");
            tail.setAttribute("stroke", "#E8C170");
            tail.setAttribute("stroke-width", "3");
            tail.classList.add("dog-tail");
            svgElement.appendChild(tail);
        },
        
        dachshund: () => {
            // Cuerpo alargado
            const body = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
            body.setAttribute("cx", "75");
            body.setAttribute("cy", "100");
            body.setAttribute("rx", "50");
            body.setAttribute("ry", "20");
            body.setAttribute("fill", "#8B4513");
            svgElement.appendChild(body);
            
            // Cabeza
            const head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            head.setAttribute("cx", "75");
            head.setAttribute("cy", "65");
            head.setAttribute("r", "20");
            head.setAttribute("fill", "#8B4513");
            svgElement.appendChild(head);
            
            // Hocico alargado
            const snout = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
            snout.setAttribute("cx", "75");
            snout.setAttribute("cy", "72");
            snout.setAttribute("rx", "15");
            snout.setAttribute("ry", "8");
            snout.setAttribute("fill", "#8B4513");
            svgElement.appendChild(snout);
            
            // Orejas caídas
            const leftEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
            leftEar.setAttribute("d", "M60 50 Q 50 65 60 70");
            leftEar.setAttribute("fill", "#703600");
            svgElement.appendChild(leftEar);
            
            const rightEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
            rightEar.setAttribute("d", "M90 50 Q 100 65 90 70");
            rightEar.setAttribute("fill", "#703600");
            svgElement.appendChild(rightEar);
            
            // Patas cortas
            const frontLeg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            frontLeg.setAttribute("x", "55");
            frontLeg.setAttribute("y", "115");
            frontLeg.setAttribute("width", "8");
            frontLeg.setAttribute("height", "15");
            frontLeg.setAttribute("rx", "4");
            frontLeg.setAttribute("fill", "#8B4513");
            svgElement.appendChild(frontLeg);
            
            const backLeg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            backLeg.setAttribute("x", "87");
            backLeg.setAttribute("y", "115");
            backLeg.setAttribute("width", "8");
            backLeg.setAttribute("height", "15");
            backLeg.setAttribute("rx", "4");
            backLeg.setAttribute("fill", "#8B4513");
            svgElement.appendChild(backLeg);
            
            // Cola
            const tail = document.createElementNS("http://www.w3.org/2000/svg", "path");
            tail.setAttribute("d", "M125 100 Q 135 95 130 110");
            tail.setAttribute("fill", "#8B4513");
            tail.classList.add("dog-tail");
            svgElement.appendChild(tail);
        },
        
        pitbull: () => {
            // Cuerpo musculoso
            const body = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
            body.setAttribute("cx", "75");
            body.setAttribute("cy", "100");
            body.setAttribute("rx", "45");
            body.setAttribute("ry", "30");
            body.setAttribute("fill", "#B5A397");
            svgElement.appendChild(body);
            
            // Pecho ancho
            const chest = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
            chest.setAttribute("cx", "75");
            chest.setAttribute("cy", "105");
            chest.setAttribute("rx", "40");
            chest.setAttribute("ry", "25");
            chest.setAttribute("fill", "#C8B8AD");
            svgElement.appendChild(chest);
            
            // Cabeza
            const head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            head.setAttribute("cx", "75");
            head.setAttribute("cy", "60");
            head.setAttribute("r", "22");
            head.setAttribute("fill", "#B5A397");
            svgElement.appendChild(head);
            
            // Mandíbula fuerte
            const jaw = document.createElementNS("http://www.w3.org/2000/svg", "path");
            jaw.setAttribute("d", "M60 70 Q 75 80 90 70");
            jaw.setAttribute("fill", "#C8B8AD");
            svgElement.appendChild(jaw);
            
            // Orejas recortadas
            const leftEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
            leftEar.setAttribute("d", "M58 45 L 55 35 L 65 40");
            leftEar.setAttribute("fill", "#B5A397");
            svgElement.appendChild(leftEar);
            
            const rightEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
            rightEar.setAttribute("d", "M92 45 L 95 35 L 85 40");
            rightEar.setAttribute("fill", "#B5A397");
            svgElement.appendChild(rightEar);
            
            // Cola fuerte
            const tail = document.createElementNS("http://www.w3.org/2000/svg", "path");
            tail.setAttribute("d", "M118 95 Q 130 85 125 105");
            tail.setAttribute("fill", "#B5A397");
            tail.setAttribute("stroke", "#A59385");
            tail.setAttribute("stroke-width", "2");
            tail.classList.add("dog-tail");
            svgElement.appendChild(tail);
        },
        
        poodle: () => {
            // Cuerpo
            const body = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
            body.setAttribute("cx", "75");
            body.setAttribute("cy", "100");
            body.setAttribute("rx", "35");
            body.setAttribute("ry", "30");
            body.setAttribute("fill", "#F5F5F5");
            svgElement.appendChild(body);
            
            // Pelo esponjoso cuerpo
            const fur = document.createElementNS("http://www.w3.org/2000/svg", "path");
            fur.setAttribute("d", "M40 100 Q 45 70 65 85 Q 75 65 85 85 Q 105 70 110 100");
            fur.setAttribute("fill", "#F5F5F5");
            svgElement.appendChild(fur);
            
            // Cabeza redondeada
            const head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            head.setAttribute("cx", "75");
            head.setAttribute("cy", "60");
            head.setAttribute("r", "22");
            head.setAttribute("fill", "#F5F5F5");
            svgElement.appendChild(head);
            
            // Pelo esponjoso en cabeza
            const headFur = document.createElementNS("http://www.w3.org/2000/svg", "path");
            headFur.setAttribute("d", "M55 45 Q 45 30 60 25 Q 75 15 90 25 Q 105 30 95 45");
            headFur.setAttribute("fill", "#F5F5F5");
            svgElement.appendChild(headFur);
            
            // Decoración de pelo en patas
            const leftLeg = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
            leftLeg.setAttribute("cx", "55");
            leftLeg.setAttribute("cy", "115");
            leftLeg.setAttribute("rx", "8");
            leftLeg.setAttribute("ry", "15");
            leftLeg.setAttribute("fill", "#F5F5F5");
            svgElement.appendChild(leftLeg);
            
            const rightLeg = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
            rightLeg.setAttribute("cx", "95");
            rightLeg.setAttribute("cy", "115");
            rightLeg.setAttribute("rx", "8");
            rightLeg.setAttribute("ry", "15");
            rightLeg.setAttribute("fill", "#F5F5F5");
            svgElement.appendChild(rightLeg);
            
            // Cola decorativa
            const tail = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            tail.setAttribute("cx", "115");
            tail.setAttribute("cy", "90");
            tail.setAttribute("r", "12");
            tail.setAttribute("fill", "#F5F5F5");
            tail.classList.add("dog-tail");
            svgElement.appendChild(tail);
        },
        
        chihuahua: () => {
            // Cuerpo pequeño
            const body = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
            body.setAttribute("cx", "75");
            body.setAttribute("cy", "105");
            body.setAttribute("rx", "25");
            body.setAttribute("ry", "20");
            body.setAttribute("fill", "#D2B48C");
            svgElement.appendChild(body);
            
            // Cabeza redondeada grande
            const head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            head.setAttribute("cx", "75");
            head.setAttribute("cy", "65");
            head.setAttribute("r", "28");
            head.setAttribute("fill", "#D2B48C");
            svgElement.appendChild(head);
            
            // Orejas grandes triangulares
            const leftEar = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            leftEar.setAttribute("points", "50,45 45,20 65,35");
            leftEar.setAttribute("fill", "#D2B48C");
            svgElement.appendChild(leftEar);
            
            const rightEar = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            rightEar.setAttribute("points", "100,45 105,20 85,35");
            rightEar.setAttribute("fill", "#D2B48C");
            svgElement.appendChild(rightEar);
            
            // Patas pequeñas
            const leftLeg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            leftLeg.setAttribute("x", "65");
            leftLeg.setAttribute("y", "120");
            leftLeg.setAttribute("width", "6");
            leftLeg.setAttribute("height", "10");
            leftLeg.setAttribute("rx", "3");
            leftLeg.setAttribute("fill", "#D2B48C");
            svgElement.appendChild(leftLeg);
            
            const rightLeg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rightLeg.setAttribute("x", "79");
            rightLeg.setAttribute("y", "120");
            rightLeg.setAttribute("width", "6");
            rightLeg.setAttribute("height", "10");
            rightLeg.setAttribute("rx", "3");
            rightLeg.setAttribute("fill", "#D2B48C");
            svgElement.appendChild(rightLeg);
            
            // Cola en arco
            const tail = document.createElementNS("http://www.w3.org/2000/svg", "path");
            tail.setAttribute("d", "M95 95 Q 110 85 105 75");
            tail.setAttribute("fill", "#D2B48C");
            tail.classList.add("dog-tail");
            svgElement.appendChild(tail);
        },
        
        german_shepherd: () => {
            // Cuerpo fuerte
            const body = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
            body.setAttribute("cx", "75");
            body.setAttribute("cy", "100");
            body.setAttribute("rx", "40");
            body.setAttribute("ry", "30");
            body.setAttribute("fill", "#D5A353");
            svgElement.appendChild(body);
            
            // Cabeza
            const head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            head.setAttribute("cx", "75");
            head.setAttribute("cy", "60");
            head.setAttribute("r", "23");
            head.setAttribute("fill", "#252525");
            svgElement.appendChild(head);
            
            // Hocico alargado
            const snout = document.createElementNS("http://www.w3.org/2000/svg", "path");
            snout.setAttribute("d", "M75 70 Q 75 85 95 70");
            snout.setAttribute("fill", "#252525");
            svgElement.appendChild(snout);
            
            // Orejas puntiagudas
            const leftEar = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            leftEar.setAttribute("points", "58,40 50,15 68,30");
            leftEar.setAttribute("fill", "#252525");
            svgElement.appendChild(leftEar);
            
            const rightEar = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            rightEar.setAttribute("points", "92,40 100,15 82,30");
            rightEar.setAttribute("fill", "#252525");
            svgElement.appendChild(rightEar);
            
            // Patrón de color negro y marrón
            const blackPattern = document.createElementNS("http://www.w3.org/2000/svg", "path");
            blackPattern.setAttribute("d", "M75 75 Q 90 90 110 85 Q 100 100 75 110 Q 50 100 40 85 Q 60 90 75 75");
            blackPattern.setAttribute("fill", "#252525");
            svgElement.appendChild(blackPattern);
            
            const tanPattern = document.createElementNS("http://www.w3.org/2000/svg", "path");
            tanPattern.setAttribute("d", "M45 85 Q 75 100 105 85 Q 90 105 75 120 Q 60 105 45 85");
            tanPattern.setAttribute("fill", "#D5A353");
            svgElement.appendChild(tanPattern);
            
            // Cola larga
            const tail = document.createElementNS("http://www.w3.org/2000/svg", "path");
            tail.setAttribute("d", "M110 90 Q 130 80 135 100");
            tail.setAttribute("fill", "#252525");
            tail.setAttribute("stroke", "#D5A353");
            tail.setAttribute("stroke-width", "1");
            tail.classList.add("dog-tail");
            svgElement.appendChild(tail);
        },
        
        // Perro por defecto si la raza no se reconoce
        default: () => {
            // Cuerpo
            const body = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
            body.setAttribute("cx", "75");
            body.setAttribute("cy", "100");
            body.setAttribute("rx", "40");
            body.setAttribute("ry", "30");
            body.setAttribute("fill", "white");
            svgElement.appendChild(body);
            
            // Cabeza
            const head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            head.setAttribute("cx", "75");
            head.setAttribute("cy", "60");
            head.setAttribute("r", "25");
            head.setAttribute("fill", "white");
            svgElement.appendChild(head);
            
            // Orejas
            const leftEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
            leftEar.setAttribute("d", "M55 45 Q 50 25 60 40");
            leftEar.setAttribute("fill", "#3d2463");
            svgElement.appendChild(leftEar);
            
            const rightEar = document.createElementNS("http://www.w3.org/2000/svg", "path");
            rightEar.setAttribute("d", "M95 45 Q 100 25 90 40");
            rightEar.setAttribute("fill", "#3d2463");
            svgElement.appendChild(rightEar);
            
            // Manchas
            const spot = document.createElementNS("http://www.w3.org/2000/svg", "path");
            spot.setAttribute("d", "M95 90 Q 110 85 100 110 Q 85 120 80 110 Z");
            spot.setAttribute("fill", "#3d2463");
            svgElement.appendChild(spot);
            
            // Cola
            const tail = document.createElementNS("http://www.w3.org/2000/svg", "path");
            tail.setAttribute("d", "M115 90 Q 130 80 135 95");
            tail.setAttribute("fill", "white");
            tail.setAttribute("stroke", "#3d2463");
            tail.setAttribute("stroke-width", "3");
            tail.classList.add("dog-tail");
            svgElement.appendChild(tail);
        }
    };
    
    // Dibuja los elementos específicos de la raza
    if (breedElements[breed]) {
        breedElements[breed]();
    } else {
        breedElements.default();
    }
}

// Mostrar un perro por defecto si no hay uno guardado
function showDefaultDog() {
    drawDog(instructionDogSVG, 'default');
    drawDog(gameDogSVG, 'default');
}