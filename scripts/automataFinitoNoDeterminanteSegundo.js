// Estados
const estados = ["q0", "q1", "q2"];

// Alfabeto
const alfabeto = "ab";

// Funcion de Transicion
const funcionTransicion = {
    [estados[0]]: { transicionVacia: [estados[2]], [alfabeto[1]]: [estados[1]] },
    [estados[1]]: { [alfabeto[0]]: [estados[1], estados[2]], [alfabeto[1]]: [estados[2]] },
    [estados[2]]: { [alfabeto[0]]: [estados[0]] },
};

const estadosAceptacion = ['q0'];
let estadoInicial = ['q0'];
let estadoActual = null;

let estadoActualImagen = document.getElementById("estadoActualImagen");

function mostrarImagen() {
    switch (JSON.stringify(estadoActual)) {
        case JSON.stringify(['q0']):
            estadoActualImagen.src = "./automatas/no_determinante_segundo/q0.jpg";
            break;
        case JSON.stringify(['q1']):
            estadoActualImagen.src = "./automatas/no_determinante_segundo/q1.jpg";
            break;
        case JSON.stringify(['q2']):
            estadoActualImagen.src = "./automatas/no_determinante_segundo/q2.jpg";
            break;
        case JSON.stringify(['q2', 'q0']):
            estadoActualImagen.src = "./automatas/no_determinante_segundo/q0-q2.jpg";
            break;
        case JSON.stringify(['q0', 'q2']):
            estadoActualImagen.src = "./automatas/no_determinante_segundo/q0-q2.jpg";
            break;
        case JSON.stringify(['q1', 'q2']):
            estadoActualImagen.src = "./automatas/no_determinante_segundo/q1-q2.jpg";
            break;
        case JSON.stringify(['q1', 'q2', 'q0']):
            estadoActualImagen.src = "./automatas/no_determinante_segundo/todos.jpg";
            break;
        default:
            estadoActualImagen.src = "./automatas/no_determinante_segundo/sinPintar.jpg";
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
        console.log("estado actual " + estadoActual);
    }
}

async function cambiarEstado(palabra) {
    estadoInicial = ['q0'];
    estadoActual = estadoInicial;
    console.log("Estado inivial " + estadoInicial);
    if (funcionTransicion[estadoActual].transicionVacia) {
        estadoActual.push(...funcionTransicion[estadoActual].transicionVacia);
    }
    mostrarImagen();
    await sleep(1000);
    console.log("Estado Inicial " + estadoActual);
    for (const letra of palabra) {
        console.log("letra " + letra);
        const estadoSiguiente = [];
        for (const estado of estadoActual) {
            const transiciones = funcionTransicion[estado];
            if (transiciones) {
                if (transiciones[letra]) {
                    estadoSiguiente.push(...transiciones[letra]);
                } else {
                    if (transiciones.transicionVacia) {
                        estadoSiguiente.push(...transiciones.transicionVacia);
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
