let carrito = [];

// Cargar el carrito desde localStorage
function cargarCarrito() {
  const carritoGuardado = localStorage.getItem("carrito");
  carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

  carrito = carrito.map((producto) => ({
    ...producto,
    quantity: producto.quantity || 1,
  }));

  renderCarrito();
  renderResumenCompra();
}

// Renderizar los productos en el carrito
function renderCarrito() {
  const contenedorProductos = document.querySelector(".product-details");
  contenedorProductos.innerHTML = "";

  if (carrito.length === 0) {
    contenedorProductos.innerHTML = `
      <h2 class="empty-cart"> El carrito está vacío</h2>
      <div class="img-carrito">   
        <img src="../imagenes/carro-vacio.png" alt="Carrito vacío" class="empty-cart-img">
      </div>
    `;
    return;
  }

  carrito.forEach((producto, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h2 class="product-title">${producto.nombre}</h2>
      <p class="product-description">${producto.descripcion}</p>
      
      <div class="product-actions">
        <button class="btn btn-danger" onclick="eliminarDelCarrito(${index})">Eliminar</button>
      </div>
      <div class="product-quantity">
        <button class="btn-quantity minus" onclick="actualizarCantidad(${index}, -1)">-</button>
        <span class="quantity">${producto.cantidad}</span>
        <button class="btn-quantity plus" onclick="actualizarCantidad(${index}, 1)">+</button>
      </div>
      <div class="product-price">
        <span class="price">$ ${formatearPrecio(producto.precio * producto.cantidad)}</span>
      </div>
    `;
    contenedorProductos.appendChild(card);
  });
}

// Renderizar el resumen de compra
function renderResumenCompra() {
  const contenedorResumen = document.querySelector(".order-summary .summary-table");
  const totalContainer = document.querySelector(".order-summary .total span:last-child");

  contenedorResumen.innerHTML = "";

  if (carrito.length === 0) {
    contenedorResumen.innerHTML = "<p>No hay productos en el carrito.</p>";
    totalContainer.innerText = "$ 0";
    return;
  }

  let total = 0;

  carrito.forEach((producto) => {
    total += producto.precio * producto.cantidad;

    const row = document.createElement("div");
    row.classList.add("summary-row");
    row.innerHTML = `
      <span>${producto.nombre}</span>
      <span>$ ${formatearPrecio(producto.precio * producto.cantidad)}</span>
    `;
    contenedorResumen.appendChild(row);
  });

  totalContainer.innerText = `$ ${formatearPrecio(total)}`;
}

// Actualizar la cantidad de un producto
function actualizarCantidad(index, delta) {
  carrito[index].cantidad += delta;

  // Evitar cantidades negativas, si es menor a cero lo elimino
  if (carrito[index].cantidad <= 0) {
    eliminarDelCarrito(index);
    return;
  }

  guardarCarrito();
  renderCarrito();
  renderResumenCompra();
}


// Eliminar un producto del carrito
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  renderCarrito();
  renderResumenCompra();
}

// Guardar el carrito en localStorage
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Formatear precios según la configuración local
function formatearPrecio(precio) {
  return precio.toLocaleString("es-CO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

// Vaciar el carrito
function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  renderCarrito();
  renderResumenCompra();
}

// Cargar el carrito al cargar la página
document.addEventListener("DOMContentLoaded", cargarCarrito);
