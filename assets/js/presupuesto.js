const presupuesto = [];

function agregarAlPresupuesto(idProducto) {
    const productoSeleccionado = productos.find((producto) => producto.id === idProducto);
    const yaExiste = presupuesto.some((producto) => producto.id === idProducto);

    if (yaExiste) {
        const productoEnPresupuesto = presupuesto.find((producto) => producto.id === idProducto);
        productoEnPresupuesto.cantidad++;
    } else {
        presupuesto.push({ ...productoSeleccionado, cantidad: 1 });
    }  
    renderizarPresupuesto();
}

function renderizarPresupuesto() {
    const contenedor = document.getElementById("lista-presupuesto");
    const totalElemento = document.getElementById("total-presupuesto");

    if (presupuesto.length === 0) {
        contenedor.innerHTML = "<p>No agregaste productos todavía.</p>";
        totalElemento.textContent = "Total: $0";
        return;
    }

    contenedor.innerHTML = "";

    presupuesto.forEach((producto) => {
        contenedor.innerHTML += `
        <div class="item-presupuesto">
            <span>${producto.nombre} x${producto.cantidad}</span>
            <span>$ ${(producto.precio * producto.cantidad).toLocaleString("es-AR")}</span>
        </div>
        `;
    });

    const total = presupuesto.reduce((acumulador, producto) => {
        return acumulador + (producto.precio * producto.cantidad);
    }, 0);

    totalElemento.textContent = `Total: $ ${total.toLocaleString("es-AR")}`;
}