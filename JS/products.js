const url = "http://localhost:8080/productos";
let carrito = [];
let productos = [];


async function obtenerProductos() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error al obtener productos del backend");
        }
        productos = await response.json();
        renderProductos();
    } catch (error) {
        console.error("Error:", error);
        mostrarAlerta("No se pudieron cargar los productos. Intente más tarde.");
    }
}


function cargarCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");
    carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
}


function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


function renderProductos() {
    const contenedorProductos = document.getElementById("products-container");
    if (!contenedorProductos) {
        console.error("No se encontró el contenedor de productos.");
        return;
    }
    
    contenedorProductos.innerHTML = "";
    const productosPorCategoria = {};

    productos.forEach(producto => {
        const categoria = producto.categoria || "Sin Categoría";
        if (!productosPorCategoria[categoria]) {
            productosPorCategoria[categoria] = [];
        }
        productosPorCategoria[categoria].push(producto);
    });

    for (const categoria in productosPorCategoria) {
        const tituloCategoria = document.createElement("h2");
        tituloCategoria.id = categoria;
        tituloCategoria.textContent = categoria.toUpperCase();
        contenedorProductos.appendChild(tituloCategoria);

        const contenedorCategoria = document.createElement("div");
        productosPorCategoria[categoria].forEach(producto => {
            const card = document.createElement("div");
            card.classList.add("product-card");
            card.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.name}">
                <h3>${producto.nombre}</h3>
                <p class="description">${producto.descripcion}</p>
                <div class="info-container">
                    <p class="cant">${producto.medida}</p>
                    <p class="price">Precio: $${formatearPrecio(producto.precio)}</p>
                </div>
                <button class="add-to-cart" onclick="agregarAlCarrito(${producto.id})">🛒 Agregar</button>
            `;
            contenedorCategoria.appendChild(card);
        });

        contenedorProductos.appendChild(contenedorCategoria);
    }
}


function agregarAlCarrito(productId) {
    const productoEnCarrito = carrito.find((p) => p.id === productId);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
        mostrarModalProductoExistente(productoEnCarrito.name);
    } else {
        const producto = productos.find((p) => p.id === productId);
        if (producto) {
            producto.cantidad = 1;
            carrito.push(producto);
            mostrarModalAgregado(producto.name);
        }
    }
    guardarCarrito();
}

function formatearPrecio(precio) {
    return precio.toLocaleString("es-CO", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
}


function mostrarModalAgregado(nombreProducto) {
    const modal = new bootstrap.Modal(document.getElementById("addedToCartModal"));
    const modalBody = document.querySelector("#addedToCartModal .modal-body");
    modalBody.textContent = `Has agregado "${nombreProducto}" al carrito.`;
    modal.show();
}

function mostrarModalProductoExistente(nombreProducto) {
    const modal = new bootstrap.Modal(document.getElementById("addedToCartModal"));
    const modalBody = document.querySelector("#addedToCartModal .modal-body");
    modalBody.textContent = `El producto "${nombreProducto}" ya estaba en el carrito, añadiendo 1 unidad.`;
    modal.show();
}


// Alerta
function mostrarAlerta(mensaje) {
    const alertBox = document.getElementById("custom-alert");
    if (!alertBox) return;
    document.getElementById("alert-message").textContent = mensaje;
    alertBox.classList.remove("hidden");
}

function cerrarAlerta() {
    document.getElementById("custom-alert").classList.add("hidden");
}

// cargar productos antes de renderizar la página 
document.addEventListener("DOMContentLoaded", async () => {
    cargarCarrito();
    await obtenerProductos(); 
});
