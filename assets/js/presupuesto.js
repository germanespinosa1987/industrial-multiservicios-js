const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
});

const presupuesto = [];

function agregarAlPresupuesto(idProducto) {
    const productoSeleccionado = productos.find((producto) => producto.id === idProducto);
    const yaExiste = presupuesto.some((producto) => producto.id === idProducto);

    if (yaExiste) {
        const productoEnPresupuesto = presupuesto.find((producto) => producto.id === idProducto);
        productoEnPresupuesto.cantidad++;

        Toast.fire({
            icon: "info",
            title: `${productoSeleccionado.nombre} Se sumó otra unidad de ${productoSeleccionado.nombre}`,
        });

    } else {
        presupuesto.push({ ...productoSeleccionado, cantidad: 1 });
        Toast.fire({
            icon: "success",
            title: `${productoSeleccionado.nombre} agregado al presupuesto`,
        });
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
    <div class="item-derecha">
        <span>$ ${(producto.precio * producto.cantidad).toLocaleString("es-AR")}</span>
        <button class="btn btn-eliminar" data-id="${producto.id}">Eliminar</button>
    </div>
</div>
`;
    });

    const total = presupuesto.reduce((acumulador, producto) => {
        return acumulador + (producto.precio * producto.cantidad);
    }, 0);

    totalElemento.textContent = `Total: $ ${total.toLocaleString("es-AR")}`;
}

const listaPresupuesto = document.getElementById("lista-presupuesto");
listaPresupuesto.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
        const idProducto = Number(e.target.dataset.id);
        eliminarDelPresupuesto(idProducto);
    }
});

function eliminarDelPresupuesto(idProducto) {
    const index = presupuesto.findIndex((producto) => producto.id === idProducto);
    if (index !== -1) {
        const productoEliminado = presupuesto.splice(index, 1)[0];

        Toast.fire({
            icon: "warning",
            title: `${productoEliminado.nombre} eliminado del presupuesto`,
        });
        renderizarPresupuesto();
    }
}

const btnConfirmar = document.getElementById("btn-confirmar");
btnConfirmar.addEventListener("click", () => {
    if (presupuesto.length === 0) {
        Toast.fire({
            icon: "warning",
            title: "No hay productos en el presupuesto",
        });
        return;
    }

    const numeroPedido = Math.floor(Math.random() * 9000) + 1000;

    const resumenHTML = presupuesto.map((producto) => {
        return `<p>${producto.nombre} x${producto.cantidad} — $ ${(producto.precio * producto.cantidad).toLocaleString("es-AR")}</p>`;
    }).join("");

    const total = presupuesto.reduce((acumulador, producto) => {
        return acumulador + (producto.precio * producto.cantidad);
    }, 0);

    Swal.fire({
        icon: "success",
        title: `Pedido #${numeroPedido} confirmado`,
        html: `${resumenHTML}<hr><strong>Total: $ ${total.toLocaleString("es-AR")}</strong>`,
    });

    presupuesto.splice(0, presupuesto.length);
    renderizarPresupuesto();

});