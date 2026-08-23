let productos = [];

async function cargarProductos() {

    try {

        const respuesta = await fetch("../assets/data/productos.json");
        productos = await respuesta.json();
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
}); 
    contenedor.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-agregar")) {
            const idProducto = Number(e.target.dataset.id);
            agregarAlPresupuesto(idProducto);
        }
    });

    } catch (error) {
        swal.fire({
            icon: "error",
            title: "Error al cargar los productos",
            text: "No se pudieron cargar los productos. Intentá recargar la página.",
        });
    }

}

cargarProductos();


