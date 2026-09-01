function guardarPresupuesto(presupuesto) {
    localStorage.setItem("presupuesto", JSON.stringify(presupuesto));
}

function cargarPresupuesto() {
    const datosGuardados = localStorage.getItem("presupuesto");
    return datosGuardados ? JSON.parse(datosGuardados) : [];
}