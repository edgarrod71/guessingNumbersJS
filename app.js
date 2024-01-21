const maximo = 10;
const minimo = 1;
let adivinaEste = -1;
const maxIntentos = 5;
let intentosArr = [];
let intentos = 0;
nuevoJuego();

function setTexto(...opts) {
    let elem = document.querySelector(opts[0]);
    elem.innerHTML = opts[1];
}

setTexto("h1", "Juego del número malpariao");
setTexto("p", "Indica un número entre 1 y 10");

function intentoUsuario() {
    intentos = intentosArr.length;
    let numUsuario = parseInt(document.getElementById("entrada").value);
    if (intentos === maxIntentos) {
        setTexto("p", "Ya no hay más números para sortear");
        finalizaJuego();
    }
    if (numUsuario > maximo || numUsuario < minimo) { 
        setTexto('p', `${numUsuario} no es un número válido, debe ser entre ${minimo} y ${maximo}.`)
    } else {
        if (intentosArr.includes(numUsuario)) {
            setTexto('p', `${numUsuario} ya fue jugado, escoge otro.`);
            intentoUsuario();  // esta recursión no me agrada...
        } else {
            intentosArr.push(numUsuario);
        }
    }
    if (numUsuario === adivinaEste) {
        setTexto("p", `lo lograste en ${intentos+1} intento${intentos > 1 ? 's' : ''}`);
        finalizaJuego();
    } else if (numUsuario >= adivinaEste) {
        setTexto("p", 'el número es menor!');
    } else {
        setTexto("p", 'definitivamente es mayor');
    }
    document.querySelector('#entrada').value = '';
    document.querySelector('#entrada').focus();
}

function finalizaJuego() {
    desHabilitar('reiniciar', true);
    desHabilitar('intentar', false)
}

function desHabilitar(objeto, estado) {
    let O = document.getElementById(objeto);
    if (estado) {
        O.removeAttribute('disabled');
    } else {
        O.setAttribute('disabled', '');
    }
}

function nuevoJuego() {
    document.querySelector('#entrada').value = 0;
    document.querySelector('#entrada').focus();
    adivinaEste = dameAleatorio();
    intentos = 1;
    setTexto("p", "Indica un número entre 1 y 10");
    desHabilitar('intentar', true);
    desHabilitar('reiniciar', false);
    intentosArr = [];
}

function dameAleatorio() {
    // return Math.floor(Math.random() * maximo + minimo)
    // cuando se usa parseInt se corta automáticamente
    // los decimales así que Math.floor sobra...
    return parseInt(Math.random() * maximo - minimo + 1) + minimo
}
