let currentIndex = 0;
const ventanas = document.querySelectorAll('.ventana');
const flecha = document.getElementById('flecha');
flecha.style.display = 'none';
// Función para mostrar la ventana siguiente (deslizar hacia arriba)
function siguienteVentana() {
    // Si no estamos en la última ventana, cambiamos a la siguiente
    if (currentIndex < ventanas.length - 1) {
        // Ocultamos la ventana actual
        ventanas[currentIndex].classList.remove('visible');
        ventanas[currentIndex].classList.add('hidden');

        // Avanzamos al siguiente índice
        currentIndex++;
        // Hacemos visible la siguiente ventana
        ventanas[currentIndex].classList.remove('hidden');
        ventanas[currentIndex].classList.add('visible');
        if (currentIndex < ventanas.length - 1) {
            flecha.style.display = 'inline-block';
        }
        if (currentIndex === 1) {
            mostrarNombreYApellido();
        }
        if (currentIndex === 2) {
            ventana3();
        }
    }
}

// Función para mostrar la ventana anterior (deslizar hacia abajo)
function ventanaAnterior() {
    // Si no estamos en la primera ventana, regresamos a la anterior
    if (currentIndex > 0) {
        // Ocultamos la ventana actual
        ventanas[currentIndex].classList.remove('visible');
        ventanas[currentIndex].classList.add('hidden');

        // Retrocedemos al índice anterior
        currentIndex--;

        // Hacemos visible la ventana anterior
        ventanas[currentIndex].classList.remove('hidden');
        ventanas[currentIndex].classList.add('visible');
        if (currentIndex < ventanas.length - 1) {
            flecha.style.display = 'inline-block';
        }
    }
}

// Detectar el gesto de deslizar hacia arriba o hacia abajo
let touchStart = 0; // Almacena la posición inicial del toque o desplazamiento

// Para dispositivos táctiles
document.addEventListener('touchstart', (e) => {
    touchStart = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    const touchEnd = e.changedTouches[0].clientY;

    if (touchEnd < touchStart) {
        // Deslizar hacia arriba (mover a la siguiente ventana)
        siguienteVentana();
    } else if (touchEnd > touchStart) {
        // Deslizar hacia abajo (volver a la ventana anterior)
        ventanaAnterior();
    }
});

// Para dispositivos de escritorio (mouse scroll)
document.addEventListener('wheel', (e) => {
    if (e.deltaY < 0) {
        // Deslizar hacia arriba (mover a la siguiente ventana)
        siguienteVentana();
    } else if (e.deltaY > 0) {
        // Deslizar hacia abajo (volver a la ventana anterior)
        ventanaAnterior();
    }
});

// Función para abrir la tapa
function abrirTapa() {
    var musica = document.getElementById('miMusica');

    // Abre la tapa de la derecha
    document.querySelector('.tapa.derecha').classList.toggle('abierta-derecha');

    // Abre la tapa de la izquierda
    document.querySelector('.tapa.izquierda').classList.toggle('abierta-izquierda');

    // Oculta el botón
    document.querySelector('.boton').style.display = 'none';

    // Establece el tiempo de inicio de la música en el segundo 3
    musica.currentTime = 3;
    // Reproduce la música
    musica.play();
    // Retrasar la aparición de las ventanas (después de que las tapas se abran)
    setTimeout(function () {

        // Inicializar la primera ventana como visible
        ventanas[currentIndex].classList.remove('hidden');
        ventanas[currentIndex].classList.add('visible');
        flecha.style.display = 'inline-block';
        animateTitle(); // Se ejecuta cada 50 segundos
    }, 500);
}


function animateTitle() {
    const titleContainer = document.querySelector('.title');
    const titleText = titleContainer.textContent.trim(); // Obtén el texto del HTML y elimina espacios innecesarios

    titleContainer.textContent = ''; // Limpiar el contenido actual del contenedor

    // Crear un span por cada letra
    titleText.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char; // Reemplaza los espacios por un espacio no separable
        span.classList.add('letter');
        span.style.animationDelay = `${index * 0.3}s`; // Retraso escalonado para la animación
        titleContainer.appendChild(span);
    });
}

function mostrarLetras(texto, elementoId, delay) {
    const elemento = document.getElementById(elementoId);
    const letras = texto.split(''); // Divide el texto en letras
    elemento.innerHTML = ''; // Limpia el contenido inicial

    // Crear un span por cada letra
    letras.forEach((letra, index) => {
        const span = document.createElement('span');
        span.textContent = letra === ' ' ? '\u00A0' : letra; // Mantén los espacios
        span.classList.add('letra');
        elemento.appendChild(span);

        // Añade la clase .visible con retraso para cada letra
        setTimeout(() => {
            span.classList.add('visible');
        }, delay * index);
    });
}

function mostrarNombreYApellido() {
    const delayEntreLetras = 100; // 100ms entre letras
    const delayEntreTextos = 1000; // 2 segundos entre nombre y apellidos

    // Mostrar el nombre
    mostrarLetras('Deymi Dessire', 'nombreGraduado', delayEntreLetras);

    // Mostrar los apellidos después de un retraso
    setTimeout(() => {
        mostrarLetras('Vaca Huayta', 'apellidosGraduado', delayEntreLetras);
    }, delayEntreTextos + (delayEntreLetras * 12)); // Asegúrate de que el nombre termine antes de mostrar los apellidos
}

function ventana3() {
    const mensaje = document.getElementById('mensaje');

    // Aseguramos que el mensaje sea visible al iniciar la animación
    mensaje.style.visibility = 'visible';

    // Dividir el mensaje en palabras, respetando saltos de línea
    const words = mensaje.innerHTML.split(/(\s+)/); // Dividir por espacios y mantenerlos

    mensaje.innerHTML = ''; // Limpiar el contenido original del párrafo

    // Crear un <span> por cada palabra
    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.innerHTML = word; // Asignamos la palabra al span
        mensaje.appendChild(span);
    });

    // Animar palabra por palabra
    let count = 0;
    const spans = mensaje.querySelectorAll('span');

    function showWord() {
        if (count < spans.length) {
            spans[count].classList.add('show'); // Hacemos visible la palabra
            count++;
            setTimeout(showWord, 500); // Espera 500ms antes de mostrar la siguiente palabra
        }
    }

    // Iniciar la animación
    showWord();
}

// Si estamos en la última ventana, ocultamos la flecha
function chequearUltimaVentana() {
    if (currentIndex === ventanas.length - 1) {
        flecha.style.display = 'none';  // Ocultar la flecha en la última ventana
    }
}

setInterval(chequearUltimaVentana, 100);






