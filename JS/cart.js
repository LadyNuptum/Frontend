let carrito = [];

function cargarCarrito() {
  const carritoGuardado = localStorage.getItem("carrito");
  carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
  renderCarrito();
}

function renderCarrito() {
  const contenedorCarrito = document.getElementById("cart-container");
  contenedorCarrito.innerHTML = "";

  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = "<p>El carrito está vacío.</p>";
    return;
  }

  carrito.forEach((producto, index) => {
    const item = document.createElement("div");
    item.classList.add("cart-item");
    item.innerHTML = `
      <img src="${producto.image}" alt="${producto.name}">
      <h3>${producto.name}</h3>
      <p>${producto.description}</p>
      <p>Precio: $${formatearPrecio(producto.price)}</p>
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;
    contenedorCarrito.appendChild(item);
  });
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  renderCarrito();
}

function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  renderCarrito();
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function formatearPrecio(precio) {
  return precio.toLocaleString("es-CO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

document.addEventListener("DOMContentLoaded", cargarCarrito);