const catalogo = document.getElementById("catalogo");
const buscador = document.getElementById("buscador");

let juegos = [];

// Cargar JSON
fetch("data/juegos.json")
.then(response => response.json())
.then(data => {

    juegos = data;

    mostrarJuegos(juegos);

});

// Función para pintar tarjetas
function mostrarJuegos(lista) {

    catalogo.innerHTML = "";

    lista.forEach(juego => {

        const div = document.createElement("div");

        div.classList.add("card");

        div.innerHTML = `
            <img src="${juego.imagen}">
            <h3>${juego.titulo}</h3>
            <p>${juego.genero}</p>
        `;

        // CLICK EN LA CARD
        div.addEventListener("click", function() {

            document.getElementById("info").innerHTML = `
                <div class="info-container">

                    <img src="${juego.imagen}" class="info-img">

                    <div class="info-texto">
                        <h2>${juego.titulo}</h2>
                        <p><b>Género:</b> ${juego.genero}</p>
                        <p>${juego.descripcion}</p>
                    </div>

                </div>
            `;

        });

        catalogo.appendChild(div);

    });

}

// Evento del buscador
buscador.addEventListener("keyup", function() {

    const texto = buscador.value.toLowerCase();

    const filtrados = juegos.filter(juego =>
        juego.titulo.toLowerCase().includes(texto)
    );

    mostrarJuegos(filtrados);

});

const filtroGenero = document.getElementById("filtroGenero");

filtroGenero.addEventListener("change", function() {

    const generoSeleccionado = filtroGenero.value;

    if(generoSeleccionado === "todos"){

        mostrarJuegos(juegos);

    } else {

        const filtrados = juegos.filter(juego =>
            juego.genero === generoSeleccionado
        );

        mostrarJuegos(filtrados);

    }

});

const letras = document.querySelectorAll(".letra");

const contenedorLetras = document.getElementById("letras");

const abecedario = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Botón TODOS
const botonTodos = document.createElement("button");

botonTodos.textContent = "Todos";

botonTodos.classList.add("letra");

contenedorLetras.appendChild(botonTodos);

// Evento TODOS
botonTodos.addEventListener("click", function(){

    mostrarJuegos(juegos);

});

// Crear letras automáticamente
for(let letra of abecedario){

    const boton = document.createElement("button");

    boton.textContent = letra;

    boton.classList.add("letra");

    contenedorLetras.appendChild(boton);

    boton.addEventListener("click", function(){

        const filtrados = juegos.filter(juego =>

            juego.titulo.startsWith(letra)

        );

        mostrarJuegos(filtrados);

    });

}