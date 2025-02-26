let carrito = [];

// Cargar el carrito desde localStorage
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");
    carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
}


function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Renderizar los productos
async function renderProductos() {
    const contenedorProductos = document.getElementById("products-container");
    if (!contenedorProductos) {
        console.error("No se encontró el contenedor de productos.");
        return;
    }
    
    contenedorProductos.innerHTML = "";

    // Obtener la categoría de la URL (si existe)
    const urlParams = new URLSearchParams(window.location.search);
    const categoriaSeleccionada = urlParams.get("categoria");

    // Agrupar productos por categoría
    const productosPorCategoria = new Map();
    try {
        const response = await fetch("http://localhost:8080/productos");
        const data = await response.json();
        const productos = data;
        localStorage.setItem("productos", JSON.stringify(productos));

        productos.forEach((producto) => {
            if (!productosPorCategoria.has(producto.categoria)) {
                productosPorCategoria.set(producto.categoria, []);
            }
            productosPorCategoria.get(producto.categoria).push(producto);
        });

        // Si hay una categoría en la URL, filtrar productos
        if (categoriaSeleccionada && productosPorCategoria.has(categoriaSeleccionada)) {
            mostrarProductosPorCategoria(categoriaSeleccionada, productosPorCategoria, contenedorProductos);
        } else {
            // Si no hay categoría en la URL, mostrar todas las categorías
            for (const [categoria, productosDeCategoria] of productosPorCategoria) {
                mostrarProductosPorCategoria(categoria, productosPorCategoria, contenedorProductos);
            }
        }
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
}

// Función auxiliar para mostrar productos por categoría
function mostrarProductosPorCategoria(categoria, productosPorCategoria, contenedorProductos) {
    const productosDeCategoria = productosPorCategoria.get(categoria);
    
    const tituloCategoria = document.createElement("h2");
    tituloCategoria.id = categoria;
    tituloCategoria.textContent = categoria;
    contenedorProductos.appendChild(tituloCategoria);

    const contenedorCategoria = document.createElement("div");

    productosDeCategoria.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p class="description">${producto.descripcion}</p>
            <div class="info-container">
              <p class="cant">${producto.medida}</p>
              <p class="price">Precio: $${formatearPrecio(producto.precio)}</p>
            </div>
            <button class="add-to-cart" onclick="agregarAlCarrito(${producto.idProducto})">🛒 Agregar</button>
        `;
        contenedorCategoria.appendChild(card);
    });

    contenedorProductos.appendChild(contenedorCategoria);
}
// Agregar un producto al carrito
function agregarAlCarrito(idProducto) {
    let productos = JSON.parse(localStorage.getItem("productos"))
    let producto = productos.find(p => p.idProducto === idProducto);
    if (!producto) return
    const productoEnCarrito = carrito.find((p) => p.idProducto === idProducto);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
        mostrarModalProductoExistente(productoEnCarrito.nombre);
    } else {
        const productoNuevo = productos.find((p) => p.idProducto === idProducto);
        if (productoNuevo) {
            productoNuevo.cantidad = 1;
            carrito.push(productoNuevo);
            mostrarModalAgregado(productoNuevo.nombre);
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
    await renderProductos(); 
});