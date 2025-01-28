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

let carrito = [];

// Cargar el carrito desde localStorage
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");
    carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

// Guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Renderizar los productos
function renderProductos() {
    const contenedorProductos = document.getElementById("products-container");
    contenedorProductos.innerHTML = "";

    productos.forEach((producto) => {
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
      <button class="add-to-cart" onclick="agregarAlCarrito(${producto.id})">🛒 Agregar</button>
    `;
        contenedorProductos.appendChild(card);
    });
}

// Agregar un producto al carrito
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

// Formatear precios
function formatearPrecio(precio) {
    return precio.toLocaleString("es-CO", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
}

// Mostrar el modal
function mostrarModalAgregado(nombreProducto) {
    const modal = new bootstrap.Modal(document.getElementById("addedToCartModal"));
    const modalBody = document.querySelector("#addedToCartModal .modal-body");
    modalBody.textContent = `Has agregado "${nombreProducto}" al carrito.`;
    modal.show();
}

// Mostrar el modal
function mostrarModalProductoExistente(nombreProducto) {
    const modal = new bootstrap.Modal(document.getElementById("addedToCartModal"));
    const modalBody = document.querySelector("#addedToCartModal .modal-body");
    modalBody.textContent = `El producto "${nombreProducto}" ya estaba en el carrito, añadiendo 1 unidad.`;
    modal.show();
}

// Cargar el carrito al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    cargarCarrito();
    renderProductos();
});