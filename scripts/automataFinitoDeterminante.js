// Estados
let q0 = "q0";
let q1 = "q1";
let q2 = "q2";
let q3 = "q3";
let q4 = "q4";

// Alfabeto
let alfabeto = "ab";

// Funcion de Transicion
let funcionTransicion = {
  q0: { [alfabeto[0]]: q1, [alfabeto[1]]: q4 },
  q1: { [alfabeto[0]]: q2, [alfabeto[1]]: q3 },
  q2: { [alfabeto[0]]: q4, [alfabeto[1]]: q4 },
  q3: { [alfabeto[0]]: q2, [alfabeto[1]]: q3 },
  q4: { [alfabeto[0]]: q4, [alfabeto[1]]: q4 },
};

// Estado Inicial
let estadoInicial = q0;

// Estado de Aceptacion
let estadoAceptacion = [q2, q3];

let estadoActual = null;


let estadoActualImagen = document.getElementById("estadoActualImagen");

function mostrarImagen() {
  switch (estadoActual) {
    case q0:
      estadoActualImagen.src = "./automatas/determinante_primer/q0.jpg";
      break;
    case q1:
      estadoActualImagen.src = "./automatas/determinante_primer/q1.jpg";
      break;
    case q2:
      estadoActualImagen.src = "./automatas/determinante_primer/q2.jpg";
      break;
    case q3:
      estadoActualImagen.src = "./automatas/determinante_primer/q3.jpg";
      break;
    case q4:
      estadoActualImagen.src = "./automatas/determinante_primer/q4.jpg";
      break;
    default:
      // Manejar cualquier otro caso
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
    let palabraAceptada = false;
    cambiarEstado(palabraUsuario);
    await sleep(palabraUsuario.length * 1000)
    if (estadoAceptacion.includes(estadoActual)) {
      palabraAceptada = true;
    }
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
  estadoActual = estadoInicial;
  mostrarImagen();
  for (let index = 0; index < palabra.length; index++) {
    const element = palabra[index];
    let estadoAnterior = estadoActual;
    let temp = funcionTransicion[estadoAnterior];
    estadoActual = temp[element];
    await sleep(1000);
    mostrarImagen();
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}