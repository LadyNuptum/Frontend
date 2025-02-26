document.addEventListener("DOMContentLoaded", () => {
  const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
  const nombreUsuario = sessionStorage.getItem("nombre");
  const apellidoUsuario = sessionStorage.getItem("apellido");
  console.log(nombreUsuario);
  console.log(apellidoUsuario);

  const orderItemsContainer = document.getElementById("order-items");
  const orderTotalContainer = document.getElementById("order-total");
  const orderPaymentMethodContainer = document.getElementById("order-payment-method");
  const orderNumberContainer = document.getElementById("order-number");
  const usernameContainer = document.getElementById("username");

  if (orderDetails && orderDetails.length > 0 && nombreUsuario) {
    let total = 0;

    // Mostrar nombre de usuario
    usernameContainer.textContent = `${nombreUsuario} ${apellidoUsuario}`;

    // Mostrar detalles del pedido
    orderDetails.forEach((producto) => {
      total += producto.precio * producto.cantidad;

      const row = document.createElement("div");
      row.classList.add("summary-row");
      row.innerHTML = `
          <span>${producto.nombre} (x${producto.cantidad})</span>
          <span>$ ${formatearPrecio(producto.precio * producto.cantidad)}</span>
        `;
      orderItemsContainer.appendChild(row);
    });

    // Mostrar total
    orderTotalContainer.innerHTML = `
        <span><strong>Total:</strong></span>
        <span><strong>$ ${formatearPrecio(total)}</strong></span>
      `;

    // Mostrar método de pago
    const paymentMethod = localStorage.getItem("paymentMethod");
    orderPaymentMethodContainer.innerHTML = `
        <span><strong>Método de Pago:</strong></span>
        <span><strong>${paymentMethod}</strong></span>
      `;

    // Mostrar número de factura (simulado)
    const orderNumber = Math.floor(Math.random() * 1000000);
    orderNumberContainer.innerHTML = `
        <span><strong>Número de Factura:</strong></span>
        <span><strong>#${orderNumber}</strong></span>
      `;
  } else {
    orderItemsContainer.innerHTML = "<p>No hay detalles del pedido disponibles.</p>";
  }
});

// Formatear precios
function formatearPrecio(precio) {
  return precio.toLocaleString("es-CO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

// Imprimir recibo en PDF
function imprimirRecibo() {
  window.print();
}

// Mostrar formulario para enviar por correo
function mostrarEnviarCorreo() {
  document.getElementById("email-form").style.display = "block";
}

// Enviar recibo por correo
function enviarReciboPorCorreo() {
  const email = document.getElementById("email-input").value;

  if (!email || !email.includes("@")) {
    alert("Por favor, ingresa un correo electrónico válido.");
    return;
  }

  alert(`Recibo enviado a ${email}.`);
  document.getElementById("email-form").style.display = "none";
}

// Función para redirigir a la página de productos
function irAProductos() {
  window.location.href = "../HTML/products.html";
}