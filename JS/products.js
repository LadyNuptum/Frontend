let productos = [
    { id: 1, name: "Producto 1", description: "Descripción del producto 1", price: 10.99, image: "/imagenes/foto_alejo.jpg" },
    { id: 2, name: "Producto 2", description: "Descripción del producto 2", price: 19.99, image: "/imagenes/foto_alejo.jpg" }
];

function renderProductos() {
    const contenedorProductos = document.getElementById("contenedorProductos");
    contenedorProductos.innerHTML = "";

    productos.forEach((producto, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${producto.image}" alt="${producto.name}">
            <h3>${producto.name}</h3>
            <p>${producto.description}</p>
            <p>Precio: $${producto.price.toFixed(2)}</p>
            <button onclick="mostrarFormularioEditar(${index})">Editar</button>
            <button onclick="eliminarProducto(${index})">Eliminar</button>
        `;
        contenedorProductos.appendChild(card);
    });
}

function agregarProducto() {
    const nuevoProducto = {
        id: productos.length + 1,
        name: document.getElementById("nombreProducto").value,
        description: document.getElementById("descripcionProducto").value,
        price: parseFloat(document.getElementById("precioProducto").value),
        image: document.getElementById("imagenProducto").value
    };
    productos.push(nuevoProducto);
    renderProductos();
    limpiarFormulario();
}

function mostrarFormularioEditar(index) {
    const producto = productos[index];
    document.getElementById("nombreProducto").value = producto.name;
    document.getElementById("descripcionProducto").value = producto.description;
    document.getElementById("precioProducto").value = producto.price;
    document.getElementById("imagenProducto").value = producto.image;
    document.getElementById("botonAgregar").innerText = "Guardar Cambios";
    document.getElementById("botonAgregar").setAttribute("onclick", `editarProducto(${index})`);
}

function editarProducto(index) {
    productos[index] = {
        id: productos[index].id,
        name: document.getElementById("nombreProducto").value,
        description: document.getElementById("descripcionProducto").value,
        price: parseFloat(document.getElementById("precioProducto").value),
        image: document.getElementById("imagenProducto").value
    };
    renderProductos();
    limpiarFormulario();
}

function eliminarProducto(index) {
    productos.splice(index, 1);
    renderProductos();
}

function limpiarFormulario() {
    document.getElementById("nombreProducto").value = "";
    document.getElementById("descripcionProducto").value = "";
    document.getElementById("precioProducto").value = "";
    document.getElementById("imagenProducto").value = "";
    document.getElementById("botonAgregar").innerText = "Agregar Producto";
    document.getElementById("botonAgregar").setAttribute("onclick", "agregarProducto()");
}

// Inicializar la lista de productos al cargar la página
document.addEventListener("DOMContentLoaded", renderProductos);
