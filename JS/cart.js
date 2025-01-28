let carrito = [];

function cargarCarrito() {
  const carritoGuardado = localStorage.getItem("carrito");
  carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

  // Asegurar que cada producto tenga la propiedad `quantity`
  carrito = carrito.map((producto) => ({
    ...producto,
    quantity: producto.quantity || 1, // Si no tiene quantity, se establece en 1
  }));

  renderCarrito();
}

function renderCarrito() {
  const contenedorCarrito = document.getElementById("cart-container");
  contenedorCarrito.innerHTML = "";

  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = "<p>El carrito está vacío.</p>";
  } else {
    carrito.forEach((producto, index) => {
      const item = document.createElement("div");
      item.classList.add("cart-item");
      item.innerHTML = `
        <div class="card">
          <h2 class="product-title">${producto.name}</h2>
          <img src="${producto.image}" alt="${producto.name}">
          <p class="description">${producto.description}</p>
          
          <div class="product-quantity">
            <button class="btn-quantity minus" onclick="cambiarCantidad(${index}, -1)">-</button>
            <span class="quantity">${producto.quantity}</span>
            <button class="btn-quantity plus" onclick="cambiarCantidad(${index}, 1)">+</button>
          </div>

          <div class="product-actions">
            <button class="btn btn-danger" onclick="eliminarDelCarrito(${index})">Eliminar</button>
          </div>
          
          <div class="product-price">
            <span class="price">$${formatearPrecio(producto.price * producto.quantity)}</span>
          </div>
        </div>
      `;
      contenedorCarrito.appendChild(item);
    });
  }

  actualizarResumenCompra();
}

function cambiarCantidad(index, cambio) {
  const producto = carrito[index];
  producto.quantity += cambio;

  if (producto.quantity < 1) {
    producto.quantity = 1; // No permitir cantidades menores a 1
  }

  guardarCarrito();
  renderCarrito();
}

function actualizarResumenCompra() {
  const total = carrito.length === 0 ? 0 : carrito.reduce((sum, producto) => {
    return sum + producto.price * producto.quantity;
  }, 0);

  const resumenCompra = document.querySelector(".order-summary .card");
  resumenCompra.innerHTML = `
    <h3 class="summary-title">Resumen de compra</h3>
    <div class="summary-table">
      ${carrito.length === 0 
        ? `<p>El carrito está vacío.</p><img src="../imagenes/carro-vacio.png" alt="Carrito vacío" class="empty-cart-img">` 
        : carrito
            .map(
              (producto) => `
            <div class="summary-row">
              <span>${producto.name} (x${producto.quantity})</span>
              <span>$${formatearPrecio(producto.price * producto.quantity)}</span>
            </div>
          `
            )
            .join("")}
    </div>
    <div class="total">
      <span>Total</span>
      <span>$${formatearPrecio(total)}</span>
    </div>
    <button class="btn-checkout">Continuar compra</button>
  `;
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