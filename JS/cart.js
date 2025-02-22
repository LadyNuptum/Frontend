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
  actualizarContadorCarrito(); // Actualizar el contador al cargar la página
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
      <div>
      <p>¿Quieres realizar otra compra?</p>
      <button class="btn btn-success" onclick="irAProductos()">
      <i class="fas fa-shopping-cart"></i> Realizar otra compra
      </button>
      </div>
    `;
    return;
  }

  carrito.forEach((producto, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h2 class="product-title">${producto.name}</h2>
      <p class="product-description">${producto.description}</p>
      
      <div class="product-actions">
        <button class="btn btn-danger" onclick="eliminarDelCarrito(${index})">Eliminar</button>
      </div>
      <div class="product-quantity">
        <button class="btn-quantity minus" onclick="actualizarCantidad(${index}, -1)">-</button>
        <span class="quantity">${producto.cantidad}</span>
        <button class="btn-quantity plus" onclick="actualizarCantidad(${index}, 1)">+</button>
      </div>
      <div class="product-price">
        <span class="price">$ ${formatearPrecio(producto.price * producto.cantidad)}</span>
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
    total += producto.price * producto.cantidad;

    const row = document.createElement("div");
    row.classList.add("summary-row");
    row.innerHTML = `
      <span>${producto.name}</span>
      <span>$ ${formatearPrecio(producto.price * producto.cantidad)}</span>
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
  actualizarContadorCarrito(); // Actualizar el contador
}

// Agregar un producto al carrito
function agregarAlCarrito(producto) {
  const productoEnCarrito = carrito.find(item => item.id === producto.id);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito();
  renderCarrito();
  renderResumenCompra();
  actualizarContadorCarrito(); // Actualizar el contador
}

// Eliminar un producto del carrito
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  renderCarrito();
  renderResumenCompra();
  actualizarContadorCarrito(); // Actualizar el contador
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
  actualizarContadorCarrito(); // Actualizar el contador
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    const totalItems = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    cartCount.textContent = totalItems;
  }
}

// Función para redirigir a la página de productos
function irAProductos() {
  window.location.href = "../HTML/products.html";
}

// Función para mostrar el modal de checkout
function mostrarCheckout() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  const checkoutSummary = document.getElementById("checkout-summary");
  checkoutSummary.innerHTML = "";

  let total = 0;

  carrito.forEach((producto) => {
    total += producto.price * producto.cantidad;
  });

  // Mostrar total y métodos de pago
  checkoutSummary.innerHTML = `
    <div class="summary-row">
      <span><strong>Total</strong></span>
      <span><strong>$ ${formatearPrecio(total)}</strong></span>
    </div>
    <div class="payment-methods">
      <h4>Métodos de Pago</h4>
      <label>
        <input type="radio" name="payment" value="transferencia"> Transferencia
      </label>
      <label>
        <input type="radio" name="payment" value="tarjeta"> Tarjeta de Crédito/Débito
      </label>
      <label>
        <input type="radio" name="payment" value="efectivo"> Efectivo
      </label>
    </div>
  `;

  // Mostrar el modal
  const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
  checkoutModal.show();
}

// Función para finalizar la compra
function finalizarCompra() {
  const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
  localStorage.setItem("paymentMethod", paymentMethod);

  // Guardar detalles de la compra
  localStorage.setItem("orderDetails", JSON.stringify(carrito));

  // Limpiar el carrito
  carrito = [];
  guardarCarrito(); // Guardar el carrito vacío en localStorage
  renderCarrito(); // Actualizar la vista del carrito
  renderResumenCompra(); // Actualizar el resumen de la compra
  actualizarContadorCarrito(); // Actualizar el contador del carrito

  // Cerrar el modal
  const checkoutModal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
  checkoutModal.hide();

  // Redirigir a detail-order.html en una nueva pestaña
  window.open("detail-order.html", "_blank");
}

// Cargar el carrito al cargar la página
document.addEventListener("DOMContentLoaded", cargarCarrito);



