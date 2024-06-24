let numeroSecreto = 0;
let intentos = 0;
let listaNumeroSorteados = [];
let numeroMaximo = 10;
let maximoDeIntentos = 4;

function asignarTextoElemento(elemento, texto) {
  let parrafo = document.querySelector(elemento);
  parrafo.innerHTML = texto;
}

function verificarIntento() {
  if (intentos == maximoDeIntentos) {
    asignarTextoElemento("p", "Llegaste al maximo de intentos: Perdiste!");
    document.querySelector('p').setAttribute("disabled","true");
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    let numeroUsuario = parseInt(document.getElementById("valorUsuario").value);
    if (numeroSecreto == numeroUsuario) {
      asignarTextoElemento(
        "p",
        `Acertaste el número, Felicitaciones lo lograste en ${intentos} ${
          intentos == 1 ? "vez" : "veces"
        }`
      );
      document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
      limpiarCaja();
      //el usuario no acerto
      if (numeroUsuario > numeroSecreto) {
        asignarTextoElemento("p", "El número secreto es menor");
      } else {
        asignarTextoElemento("p", "El número secreto es mayor");
      }
      intentos++;
    }
  }
}

function limpiarCaja() {
  document.querySelector("#valorUsuario").value = "";
}


function generarNumeroSecreto() {
  let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

  //si ya sorteamos todos los números
  if (listaNumeroSorteados.length == numeroMaximo) {
    asignarTextoElemento("p", "Ya se sortearon todos los números posibles!");
  } else {
    //si el numero generado está en la lista
    if (listaNumeroSorteados.includes(numeroGenerado)) {
      return generarNumeroSecreto();
    } else {
      listaNumeroSorteados.push(numeroGenerado);
      return numeroGenerado;
    }
  }
}

function condicionesIniciales() {
  asignarTextoElemento("h1", "Juego del número secreto");
  asignarTextoElemento("p", `Indica un número del 1 al ${numeroMaximo}`);
  numeroSecreto = generarNumeroSecreto();
  intentos = 1;
}

function reiniciarJuego() {
  //Limpiar la caja
  limpiarCaja();
  //Indicar mensaje de intervalo de
  //Generar numero
  //Inicializar el numero de intentos
  condicionesIniciales();
  //Desabilitar el boton de nuevo
  document.getElementById("reiniciar").setAttribute("disabled", "true");
}



condicionesIniciales();
