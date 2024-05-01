const pizzaForm = document.getElementById('pizza-form');

//Evento para el Submit
pizzaForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe

    const selectedPizza = document.getElementById('selectedPizza').value;
    const selectedTamaño = document.getElementById('selectedTamaño').value;
    const bebidaSeleccionada = document.querySelector('input[name="bebida"]:checked') ? document.querySelector('input[name="bebida"]:checked').value : "No seleccionada";
    const saborBebida = document.getElementById('sabores').value;

    // Validación de campos vacíos
    if (!selectedPizza || !selectedTamaño) {
        mostrarError('Por favor, selecciona una pizza y un tamaño.');
        return;
    }

    if (bebidaSeleccionada === 'si' && !saborBebida) {
        mostrarError('Selecciona un sabor de bebida.');
        return;
    }

    //Capturar y recorrer los Ingredientes Extras
    const extras = document.querySelectorAll('.valores');
    let ingredienteExtra = [];

    extras.forEach((e) => {
       if(e.checked == true){
            ingredienteExtra.push(e.value);
       }
    });

    //Funcion Resultado donde se agregan todos los parametros a utilizar en dicha función
    mostrarResultado(selectedPizza, selectedTamaño, bebidaSeleccionada, saborBebida, ingredienteExtra);
});

//Funcion que muestra error al usuario si no selecciona una pizza, un tamaño o un sabor de bebida
function mostrarError(mensaje) {
    const errorDiv = document.getElementById("error-message");
    errorDiv.innerText = mensaje;

    setTimeout(() => {
        limpiarError();
    }, 6000);
}

//Funcion que limpia el mensaje de error luego de unos 5 segundos
function limpiarError() {
    const errorDiv = document.getElementById("error-message");
    errorDiv.innerText = "";
}


//calculos para determinar el costo total del pedido que haga el usuario
let costo_preparacion, totalc, costo_fijo_preparacion, pizza_pequeña, pizza_mediana, pizza_grande, pizza_familiar, ingrediente_extra_pp, ingrediente_extra_pm, ingrediente_extra_pg;
let totalb;
costo_fijo_preparacion = 2;
pizza_pequeña = Math.PI * 5 ^ 2;
pizza_mediana = Math.PI * 7 ^ 2;
pizza_grande = Math.PI * 8 ^ 2;
pizza_familiar = Math.PI * 10 ^ 2;
ingrediente_extra_pp = 1;
ingrediente_extra_pm = 2;
ingrediente_extra_pg = 4;

function calcular(selectedTamaño) {
    if (selectedTamaño === "pequeña") {
        costo_preparacion = pizza_pequeña * 0.3 + costo_fijo_preparacion * ingrediente_extra_pp;
        totalc = costo_preparacion * 1.5;
        totalb = parseFloat(totalc.toFixed(1));
    }
    if(selectedTamaño === "mediana"){

        costo_preparacion=pizza_mediana*0.3+costo_fijo_preparacion*ingrediente_extra_pp

        totalc=costo_preparacion*1.5

        totalb=parseFloat(totalc.toFixed(1))

        console.log(totalb) 
    }
    if(selectedTamaño === "grande"){

        costo_preparacion=pizza_grande*0.3+costo_fijo_preparacion*ingrediente_extra_pp

        totalc=costo_preparacion*1.5

        totalb=parseFloat(totalc.toFixed(1))

        console.log(totalb) 
    }
    if(selectedTamaño === "familiar"){

        costo_preparacion=pizza_familiar +2 *0.3+costo_fijo_preparacion*ingrediente_extra_pp

        totalc=costo_preparacion*1.5

        totalb=parseFloat(totalc.toFixed(1))

        console.log(totalb) 
    }
};

const cargador = document.getElementById("cargador");
const resultado = document.getElementById("resultado");

function mostrarCargador() {
    cargador.classList.remove("d-none");
}

function ocultarCargador() {
    cargador.classList.add("d-none");
}

function mostrarResultado(selectedPizza, selectedTamaño, bebidaSeleccionada, saborBebida, ingredienteExtra) {
    mostrarCargador(); // Mostrar el cargador de contenido

    setTimeout(() => {
        calcular(selectedTamaño);
        resultado.innerHTML = "";

        const divPizzas = document.createElement('div');
        divPizzas.className = "resultado__final";

        divPizzas.innerHTML = `
            <p>Pizza Seleccionada: ${selectedPizza}</p>
            <p>El Tamaño de su Pizza es: ${selectedTamaño}</p>`;

        // Verificar si el usuario ha seleccionado una bebida
        if (bebidaSeleccionada === 'si') {
            divPizzas.innerHTML += `<p>Bebida: ${bebidaSeleccionada}, ${saborBebida}</p>`;
        } else {
            divPizzas.innerHTML += `<p>Bebida: Sin Bebida</p>`;
        }

        // Verificar si hay ingredientes extra seleccionados antes de mostrarlos
        if (ingredienteExtra.length > 0) {
            divPizzas.innerHTML += `<p>Ingredientes Extras: ${ingredienteExtra.join(', ')}</p>`;
        }

        divPizzas.innerHTML += `
            <p>Costo de Preparacion: ${costo_preparacion}</p>
            <p>Total a Pagar: ${totalb}$</p>`;

        resultado.appendChild(divPizzas);

        ocultarCargador(); // Ocultar el cargador de contenido
        resultado.classList.remove("d-none"); // Mostrar el resultado
    }, 4000); // Simulación de carga con un timeout de 4 segundos
}


