let carrito = [];

const loggedInUser = sessionStorage.getItem("token");

// Cargar el carrito desde localStorage
function cargarCarrito() {
  const carritoGuardado = localStorage.getItem("carrito");
  carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

  carrito = carrito.map((producto) => ({
    ...producto,
    cantidad: producto.cantidad || 1, // Asegurarse de que la propiedad sea "cantidad"
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
      <h2 class="empty-cart">El carrito está vacío</h2>
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
      <div class="card-container">
        <div class="product-info">
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
        </div>
        <div class="product-image">
          <img src="${producto.imagen}" alt="${producto.nombre}">
        </div>
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

// Formatear precios
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

// Redirigir a la página de productos
function irAProductos() {
  window.location.href = "../HTML/products.html";
}

// Mostrar el modal de checkout
function mostrarCheckout() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  // Verificar si el usuario ha iniciado sesión
  if (!loggedInUser) {
    mostrarModalLogin();
    return;
  }

  const checkoutSummary = document.getElementById("checkout-summary");
  checkoutSummary.innerHTML = "";

  let total = 0;

  carrito.forEach((producto) => {
    total += producto.precio * producto.cantidad;
  });

  checkoutSummary.innerHTML = `
    <div class="summary-row">
      <span><strong>Total</strong></span>
      <span><strong>$ ${formatearPrecio(total)}</strong></span>
    </div>
    <div class="paymentMethods">
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

  const checkoutModal = new bootstrap.Modal(document.getElementById("checkoutModal"));
  checkoutModal.show();
}

// Mostrar el modal de login
function mostrarModalLogin() {
  const loginModalContent = document.getElementById("idModal");
  loginModalContent.innerHTML = `
    <div class="modal-header">
      <h5 class="modal-title">Iniciar Sesión</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <p>Debes iniciar sesión para continuar con la compra.</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      <button type="button" class="btn btn-primary" onclick="irALogin()">Ir a Iniciar Sesión</button>
    </div>
  `;

  const loginModal = new bootstrap.Modal(document.getElementById("Modal"));
  loginModal.show();
}

// Redirigir a la página de login
function irALogin() {
  window.location.href = "login.html";
}

// Finalizar la compra
function finalizarCompra() {
  if (!loggedInUser) {
    mostrarModalLogin();
    return;
  }

  const paymentMethod = document.querySelector('input[name="payment"]:checked');

  if (!paymentMethod) {
    const paymentMethodsContainer = document.querySelector(".paymentMethods");
    showError(paymentMethodsContainer, "Por favor, seleccione un método de pago.");
    return;
  }

  localStorage.setItem("paymentMethod", paymentMethod.value);
  localStorage.setItem("orderDetails", JSON.stringify(carrito));

  carrito = [];
  guardarCarrito();
  renderCarrito();
  renderResumenCompra();

  const checkoutModal = bootstrap.Modal.getInstance(document.getElementById("checkoutModal"));
  checkoutModal.hide();

  window.location.href = "detail-order.html";
}

// Mostrar un mensaje de error
function showError(input, message) {
  clearError(input);
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;
  errorDiv.style.color = "red";
  errorDiv.style.fontSize = "0.7rem";
  input.style.border = "2px solid red";
  input.parentElement.appendChild(errorDiv);
}

// Limpiar el mensaje de error
function clearError(input) {
  const errorDiv = input.parentElement.querySelector(".error-message");
  if (errorDiv) {
    errorDiv.remove();
  }
  input.style.border = "";
}

// Cargar el carrito al cargar la página
document.addEventListener("DOMContentLoaded", cargarCarrito);