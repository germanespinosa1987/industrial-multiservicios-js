async function cargarProductos() {

    try {

        const respuesta = await fetch("../assets/data/productos.json");

        const productos = await respuesta.json();

        const contenedor = document.getElementById("contenedor-productos");

        productos.forEach((producto) => {

        contenedor.innerHTML += `
        <div class="card-producto">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="card-content">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p><strong>$ ${producto.precio.toLocaleString("es-AR")}</strong></p>

                <button
                    class="btn btn-agregar"
                    data-id="${producto.id}">
                    Agregar al presupuesto
                </button>
            </div>
        </div>
        `;

    const botonesAgregar = document.querySelectorAll(".btn-agregar");

botonesAgregar.forEach((boton) => {

    boton.addEventListener("click", () => {
        const idProducto = Number(boton.dataset.id);
        agregarAlPresupuesto(idProducto);
    });

});

}); 

    } catch (error) {
        console.error(error);
    }

}

cargarProductos();

const productoSeleccionado = productos.find((producto) => producto.id === idProducto);
