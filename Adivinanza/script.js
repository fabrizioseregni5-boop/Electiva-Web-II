// lista de palabras para adivinar
const palabras = [
    'MARIA', 'VICTOR', 'FABRIZIO', 'ZABALA', 
    'STARDEWVALLEY', 'RAUL', 'CARLA', 'MINECRAFT',
    'KAREN', 'JORGE', 'FABIO', 'ROYBED'
];

let palabraSecreta = '';
let palabraAdivinada = [];
let intentosRestantes = 6;
let letrasUsadas = [];
let juegoTerminado = false;

const elementoPalabra = document.getElementById('palabra');
const elementoIntentos = document.getElementById('intentos');
const elementoLetrasUsadas = document.getElementById('letras_usadas');
const elementoMensaje = document.getElementById('mensaje');
const inputLetra = document.getElementById('letra');
const botonAdivinar = document.getElementById('adivinar');
const botonNuevoJuego = document.getElementById('nuevo_juego');


function iniciarJuego() {
    
    palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
    palabraAdivinada = Array(palabraSecreta.length).fill('_');
    
    intentosRestantes = 10;
    letrasUsadas = [];
    juegoTerminado = false;
    
    actualizarInterfaz();
    
    elementoMensaje.textContent = '';
    elementoMensaje.className = 'mensaje';
    
   
    inputLetra.disabled = false;
    botonAdivinar.disabled = false;
    inputLetra.focus();
}

function actualizarInterfaz() {
    elementoPalabra.textContent = palabraAdivinada.join(' ');
    
    elementoIntentos.textContent = `Intentos restantes: ${intentosRestantes}`;
    
    elementoLetrasUsadas.textContent = `Letras usadas: ${letrasUsadas.join(', ')}`;
}

function adivinarLetra(letra) {
    if (juegoTerminado) return;
    
    letra = letra.toUpperCase();
    
    if (!letra.match(/[A-ZÑ]/)) {
        elementoMensaje.textContent = 'Por favor, introduce una letra válida.';
        elementoMensaje.className = 'mensaje';
        return;
    }
    
    if (letrasUsadas.includes(letra)) {
        elementoMensaje.textContent = 'Ya has usado esa letra. Intenta con otra.';
        elementoMensaje.className = 'mensaje';
        return;
    }
    
    letrasUsadas.push(letra);
    
    if (palabraSecreta.includes(letra)) {
        for (let i = 0; i < palabraSecreta.length; i++) {
            if (palabraSecreta[i] === letra) {
                palabraAdivinada[i] = letra;
            }
        }
        
        elementoMensaje.textContent = '¡Correcto! La letra está en la palabra.';
        
        elementoMensaje.className = 'mensaje';
        
        if (!palabraAdivinada.includes('_')) {
            juegoTerminado = true;
            elementoMensaje.textContent = '¡Felicidades! ¡Has adivinado la palabra!';
            elementoMensaje.className = 'mensaje ganador';
            inputLetra.disabled = true;
            botonAdivinar.disabled = true;
        }
    } else {
        intentosRestantes--;
        elementoMensaje.textContent = 'Incorrecto. Esa letra no está en la palabra.';
        elementoMensaje.className = 'mensaje';
        
        if (intentosRestantes === 0) {
            juegoTerminado = true;
            elementoMensaje.textContent = `¡Game Over! La palabra era: ${palabraSecreta}`;
            elementoMensaje.className = 'mensaje perdedor';
            inputLetra.disabled = true;
            botonAdivinar.disabled = true;
        }
    }
    
    actualizarInterfaz();
    
    inputLetra.value = '';
}

botonAdivinar.addEventListener('click', () => {
    const letra = inputLetra.value;
    if (letra) {
        adivinarLetra(letra);
    }
});

inputLetra.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const letra = inputLetra.value;
        if (letra) {
            adivinarLetra(letra);
        }
    }
});

botonNuevoJuego.addEventListener('click', iniciarJuego);

window.addEventListener('load', iniciarJuego);