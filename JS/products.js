let productos = [
  {
    id: 1,
    name: "Leche de vaca",
    description:
      "Leche fresca pasteurizada de vacas seleccionadas, rica en calcio y proteínas",
    image: "/imagenes/products/Leche_de_vaca.jpg",
    category: "lacteos",
    type: "Producto básico",
    price: 10000,
    measure: "litro",
  },
  {
    id: 2,
    name: "Leche de cabra",
    description:
      "Leche de cabra natural, más digestiva que la leche de vaca y con alto valor nutricional",
    image: "/imagenes/products/Leche_de_cabra.jpg",
    category: "lacteos",
    type: "Producto especializado",
    price: 15000,
    measure: "litro",
  },
  {
    id: 3,
    name: "Leche de oveja",
    description:
      "Leche de oveja pura, ideal para elaboración de quesos y con mayor contenido graso",
    image: "/imagenes/products/Leche_de_oveja.jpg",
    category: "lacteos",
    type: "Producto especializado",
    price: 16000,
    measure: "litro",
  },
  {
    id: 4,
    name: "Yogur natural",
    description:
      "Yogur tradicional sin azúcares añadidos, elaborado mediante fermentación láctica natural",
    image: "/imagenes/products/Yogur_natural.jpg",
    category: "lacteos",
    type: "Producto básico",
    price: 7200,
    measure: "litro",
  },
  {
    id: 5,
    name: "Yogur griego",
    description:
      "Yogur cremoso de estilo griego, con alto contenido en proteínas y textura extra suave",
    image: "/imagenes/products/Yogur_griego.jpg",
    category: "lacteos",
    type: "Producto especializado",
    price: 10000,
    measure: "litro",
  },
  {
    id: 6,
    name: "Yogur de frutas",
    description:
      "Yogur con trozos de frutas naturales seleccionadas y preparado de frutas",
    image: "/imagenes/products/Yogur_de_frutas.jpg",
    category: "lacteos",
    type: "Producto preparado",
    price: 8000,
    measure: "litro",
  },
  {
    id: 7,
    name: "Queso fresco",
    description:
      "Queso suave y ligero sin madurar, ideal para ensaladas y desayunos",
    image: "/imagenes/products/Queso_fresco.jpg",
    category: "lacteos",
    type: "Producto básico",
    price: 14000,
    measure: "libra",
  },
  {
    id: 8,
    name: "Queso curado",
    description:
      "Queso madurado durante varios meses, con sabor intenso y textura firme",
    image: "/imagenes/products/Queso_curado.jpg",
    category: "lacteos",
    type: "Producto madurado",
    price: 24000,
    measure: "libra",
  },
  {
    id: 9,
    name: "Queso de cabra",
    description:
      "Queso elaborado con leche de cabra, de sabor característico y textura cremosa",
    image: "/imagenes/products/Queso_de_cabra.jpg",
    category: "lacteos",
    type: "Producto especializado",
    price: 22000,
    measure: "libra",
  },
  {
    id: 10,
    name: "Queso manchego",
    description:
      "Queso tradicional español con denominación de origen, elaborado con leche de oveja manchega",
    image: "/imagenes/products/Queso_manchego.jpg",
    category: "lacteos",
    type: "Producto denominación de origen",
    price: 32000,
    measure: "libra",
  },
  {
    id: 11,
    name: "Queso ricotta",
    description:
      "Queso suave italiano de textura ligera y granulosa, ideal para postres y rellenos",
    image: "/imagenes/products/Queso_ricotta.jpg",
    image_alt: "Queso ricotta en envase",
    category: "lacteos",
    type: "Producto fresco",
    price: 12800,
    measure: "libra",
  },
  {
    id: 12,
    name: "Queso crema",
    description:
      "Queso suave y untable, perfecto para preparaciones culinarias y postres",
    image: "/imagenes/products/Queso_crema.jpg",
    image_alt: "Queso crema en envase",
    category: "lacteos",
    type: "Producto para untar",
    price: 11200,
    measure: "libra",
  },
  {
    id: 13,
    name: "Mantequilla",
    description:
      "Mantequilla cremosa elaborada con nata de leche de vaca, ideal para cocinar y untar",
    image: "/imagenes/products/Mantequilla.jpg",
    category: "lacteos",
    type: "Producto básico",
    price: 12000,
    measure: "libra",
  },
];

function renderProductos() {
  const contenedorProductos = document.getElementById("products-container");
  contenedorProductos.innerHTML = "";

  productos.forEach((producto, index) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
            <img src="${producto.image}" alt="${producto.name}">
            <h3>${producto.name}</h3>
            <p class="description">${producto.description}</p>
            <div class="info-container">
                <p class="cant">${producto.measure}</p>
                <p class="price">Precio: $${formatearPrecio(producto.price)}</p>
            </div>
            <button class="add-to-cart" onclick="mostrarModalAgregado('${producto.name}')"> 🛒Agregar</button>
        `;
    contenedorProductos.appendChild(card);
  });
}

function formatearPrecio(precio) {
  return precio.toLocaleString("es-CO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function agregarProducto() {
  const nuevoProducto = {
    id: productos.length + 1,
    name: document.getElementById("nombreProducto").value,
    description: document.getElementById("descripcionProducto").value,
    measure: document.getElementById("unidadProducto").value,
    price: parseFloat(document.getElementById("precioProducto").value),
    image: document.getElementById("imagenProducto").value,
  };
  productos.push(nuevoProducto);
  renderProductos();
  limpiarFormulario();
}

function mostrarFormularioEditar(index) {
  const producto = productos[index];
  document.getElementById("nombreProducto").value = producto.name;
  document.getElementById("descripcionProducto").value = producto.description;
  document.getElementById("unidadProducto").value = producto.measure;
  document.getElementById("precioProducto").value = producto.price;
  document.getElementById("imagenProducto").value = producto.image;
  document.getElementById("botonAgregar").innerText = "Guardar Cambios";
  document
    .getElementById("botonAgregar")
    .setAttribute("onclick", `editarProducto(${index})`);
}

function editarProducto(index) {
  productos[index] = {
    id: productos[index].id,
    name: document.getElementById("nombreProducto").value,
    description: document.getElementById("descripcionProducto").value,
    measure: document.getElementById("unidadProducto").value,
    price: parseFloat(document.getElementById("precioProducto").value),
    image: document.getElementById("imagenProducto").value,
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
  document.getElementById("unidadProducto").value = "";
  document.getElementById("precioProducto").value = "";
  document.getElementById("imagenProducto").value = "";
  document.getElementById("botonAgregar").innerText = "Agregar Producto";
  document
    .getElementById("botonAgregar")
    .setAttribute("onclick", "agregarProducto()");
}

document.addEventListener("DOMContentLoaded", renderProductos);

function mostrarModalAgregado(nombreProducto) {
  // Obtener el modal y sus elementos
  const modal = new bootstrap.Modal(document.getElementById('addedToCartModal'));
  const modalBody = document.querySelector('#addedToCartModal .modal-body');

  // Actualizar el contenido del modal con el nombre del producto
  modalBody.textContent = `Has agregado " ${nombreProducto}" al carrito.`;

  // Mostrar el modal
  modal.show();
}
