fetch("../assets/data/productos.json")
    .then((respuesta) => {
        return respuesta.json();
    })
    .then((productos) => {

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
        const botonesAgregar = document.querySelectorAll(".btn-agregar");

        botonesAgregar.forEach((boton) => {

            boton.addEventListener("click", () => {

                agregarAlPresupuesto(Number(boton.dataset.id));

            });

        });

    })

    .catch((error) => {
        console.error(error);
    });