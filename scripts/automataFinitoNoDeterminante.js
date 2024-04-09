// Estados
const estados = ["q0", "q1", "q2"];

// Alfabeto
const alfabeto = "ab";

// Funcion de Transicion
const funcionTransicion = {
    [estados[0]]: { [alfabeto[0]]: [estados[1]], },
    [estados[1]]: { [alfabeto[0]]: [estados[2]], [alfabeto[1]]: [estados[1], estados[2]] },
    [estados[2]]: { vacio: [] },
};

// Estado Inicial
let estadoInicial = estados[0];

// Estado de Aceptacion
const estadosAceptacion = [estados[2]];

let estadoActual = null;

let estadoActualImagen = document.getElementById("estadoActualImagen");

function mostrarImagen() {
    console.log("estado actual", estadoActual)
    switch (JSON.stringify(estadoActual)) {
        case JSON.stringify(['q0']):
            estadoActualImagen.src = "./automatas/no_determinante_primer/q0.jpg";
            break;
        case JSON.stringify(['q1']):
            estadoActualImagen.src = "./automatas/no_determinante_primer/q1.jpg";
            break;
        case JSON.stringify(['q2']):
            estadoActualImagen.src = "./automatas/no_determinante_primer/q2.jpg";
            break;
        case JSON.stringify(['q2', 'q1']):
            estadoActualImagen.src = "./automatas/no_determinante_primer/q1-q2.jpg";
            break;
        case JSON.stringify(['q1', 'q2']):
            estadoActualImagen.src = "./automatas/no_determinante_primer/q1-q2.jpg";
            break;
        default:
            estadoActualImagen.src = "./automatas/no_determinante_primer/sinPintar.jpg";
            break;
    }
}

function verificarPalabra() {
    let palabraUsuario = document.getElementById("palabra").value;
    chequearPalabraIngresada(palabraUsuario);
}

function chequearPalabraIngresada(palabra) {
    let palabraValida = true;
    for (let index = 0; index < palabra.length; index++) {
        const element = palabra[index];
        console.log(element);
        if (!alfabeto.includes(element)) {
            palabraValida = false;
            break;
        }
    }
    mostrarResultado(palabraValida);
}

async function mostrarResultado(resultado) {
    palabraUsuario = document.getElementById("palabra").value;
    resultadoPositivo = document.getElementById("resultadoPositivo");
    resultadoNegativo = document.getElementById("resultadoNegativo");
    if (resultado == false) {
        alert("Ingrese de nuevo la Palabra");
        document.getElementById("palabra").value = "";
        resultadoElemento.innerHTML = "";
    } else {
        await cambiarEstado(palabraUsuario);
        let palabraAceptada = estadoActual.some(estado => estadosAceptacion.includes(estado));
        if (palabraAceptada) {
            resultadoNegativo.style.setProperty('display', 'none', 'important');
            resultadoPositivo.style.display = "block";
            resultadoPositivo.innerHTML = "Palabra Aceptada";
        } else {
            resultadoPositivo.style.setProperty('display', 'none', 'important');
            resultadoNegativo.style.display = "block";
            resultadoNegativo.innerHTML = "Palabra No Aceptada";
        }
    }
}

async function cambiarEstado(palabra) {
    estadoInicial = ['q0'];
    estadoActual = estadoInicial;
    mostrarImagen();
    await sleep(1000);
    console.log("Estado inivial " + estadoInicial);
    console.log("Estado Actual " + estadoActual);
    for (const letra of palabra) {
        console.log("letra " + letra);
        const estadoSiguiente = [];
        for (const estado of estadoActual) {
            const transiciones = funcionTransicion[estado];
            console.log("Transiciones " + transiciones[letra]);
            if (transiciones) {
                if (transiciones[letra]) {
                    estadoSiguiente.push(...transiciones[letra]);
                } else {
                    if (transiciones.vacio) {
                        estados.push(...transiciones.vacio);
                    }
                }
                console.log("estadoSiguiente " + estadoSiguiente);
            }
        }
        estadoActual = [...new Set(estadoSiguiente)];
        mostrarImagen();
        console.log("estado actual " + estadoActual);
        await sleep(1000);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
