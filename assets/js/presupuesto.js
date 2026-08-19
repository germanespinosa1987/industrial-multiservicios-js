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
}