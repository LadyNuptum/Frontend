let productos = [
    {
        id: 1,
        name: "Leche de vaca",
        description:
            "Leche fresca pasteurizada de vacas seleccionadas, rica en calcio y proteínas",
        image: "/imagenes/products/Leche_de_vaca.jpg",
        category: "lácteos",
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
        category: "lácteos",
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
        category: "lácteos",
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
        category: "lácteos",
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
        category: "lácteos",
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
        category: "lácteos",
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
        category: "lácteos",
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
        category: "lácteos",
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
        category: "lácteos",
        type: "Producto especializado",
        price: 22000,
        measure: "libra",
    },
    {
        id: 10,
        name: "Papa criolla",
        description: "Pequeñas papas amarillas, dulces y versátiles en la cocina.",
        image: "/imagenes/products/papa_criolla.jpg",
        category: "Hortalizas",
        price: 8000,
        measure: "libra",
    },
    {
        id: 11,
        name: "Cubios",
        description:
            "Tubérculos andinos de sabor único, ideales para sopas y guisos.",
        image: "/imagenes/products/cubios.jpg",
        category: "Hortalizas",
        price: 10000,
        measure: "libra",
    },
    {
        id: 12,
        name: "Ibias",
        description:
            "Tubérculos similares a la papa, de sabor suave y textura firme.",
        image: "/imagenes/products/ibias.jpg",
        category: "Hortalizas",
        price: 9000,
        measure: "libra",
    },
    {
        id: 13,
        name: "Arracacha",
        description: "Raíz similar a la yuca, usada en purés y sopas.",
        image: "/imagenes/products/arracacha.jpg",
        category: "Hortalizas",
        price: 7000,
        measure: "libra",
    },
    {
        id: 14,
        name: "Zanahoria blanca",
        description: "Variedad local de zanahoria, más dulce y suave.",
        image: "/imagenes/products/zanahoria_blanca.jpg",
        category: "Hortalizas",
        price: 6000,
        measure: "libra",
    },
    {
        id: 15,
        name: "Cebolla larga",
        description: "Cebolla de tallo largo, esencial en guisos y sopas.",
        image: "/imagenes/products/cebolla_larga.jpg",
        category: "Hortalizas",
        price: 5000,
        measure: "libra",
    },
    {
        id: 16,
        name: "Ajo",
        description: "Ajo fresco, cultivado en la región, ideal para condimentar.",
        image: "/imagenes/products/ajo.jpg",
        category: "Hortalizas",
        price: 12000,
        measure: "libra",
    },
    {
        id: 17,
        name: "Espinaca",
        description: "Hojas verdes ricas en hierro, usadas en ensaladas y guisos.",
        image: "/imagenes/products/espinaca.jpg",
        category: "Hortalizas",
        price: 4000,
        measure: "libra",
    },
    {
        id: 18,
        name: "Rúcula",
        description: "Hojas picantes, perfectas para ensaladas y acompañamientos.",
        image: "/imagenes/products/rucula.jpg",
        category: "Hortalizas",
        price: 6000,
        measure: "libra",
    },
    {
        id: 19,
        name: "Curuba",
        description: "Fruta exótica con sabor agridulce, usada en jugos y postres.",
        image: "/imagenes/products/curuba.jpg",
        category: "Frutas",
        price: 12000,
        measure: "1 kg",
    },
    {
        id: 20,
        name: "Mora",
        description: "Fruta pequeña y ácida, perfecta para mermeladas y bebidas.",
        image: "/imagenes/products/mora.jpg",
        category: "Frutas",
        price: 9000,
        measure: "libra",
    },
    {
        id: 21,
        name: "Feijoa",
        description: "Fruta verde de sabor dulce y aromático, ideal para jugos.",
        image: "/imagenes/products/feijoa.jpg",
        category: "Frutas",
        price: 10000,
        measure: "libra",
    },
    {
        id: 22,
        name: "Uchuva",
        description: "Fruta dorada y dulce, usada en postres y ensaladas.",
        image: "/imagenes/products/uchuva.jpg",
        category: "Frutas",
        price: 15000,
        measure: "libra",
    },
    {
        id: 23,
        name: "Tomate de árbol",
        description: "Fruta roja y ácida, usada en jugos y salsas.",
        image: "/imagenes/products/tomate_arbol.jpg",
        category: "Frutas",
        price: 8000,
        measure: "libra",
    },
    {
        id: 24,
        name: "Granadilla",
        description: "Fruta dulce y refrescante, con semillas comestibles.",
        image: "/imagenes/products/granadilla.jpg",
        category: "Frutas",
        price: 18000,
        measure: "1 kg",
    },
    {
        id: 25,
        name: "Guayaba",
        description:
            "Fruta tropical, dulce y aromática, ideal para jugos y postres.",
        image: "/imagenes/products/guayaba.jpg",
        category: "Frutas",
        price: 7000,
        measure: "libra",
    },
    {
        id: 26,
        name: "Lulo",
        description: "Fruta ácida y jugosa, usada en bebidas tradicionales.",
        image: "/imagenes/products/lulo.jpg",
        category: "Frutas",
        price: 11000,
        measure: "1 kg",
    },
    {
        id: 27,
        name: "Ciruela",
        description: "Fruta dulce y jugosa, cultivada en la región.",
        image: "/imagenes/products/ciruela.jpg",
        category: "Frutas",
        price: 14000,
        measure: "libra",
    },
    {
        id: 28,
        name: "Breva en almíbar",
        description: "Brevas cocidas en almíbar, un dulce típico de la región.",
        image: "/imagenes/products/breva_almibar.jpg",
        category: "Conservas",
        price: 18000,
        measure: "libra",
    },
    {
        id: 29,
        name: "Mermelada de mora",
        description: "Mermelada artesanal hecha con moras cultivadas en la región.",
        image: "/imagenes/products/mermelada_mora.jpg",
        category: "Conservas",
        price: 12000,
        measure: "500 g",
    },
    {
        id: 30,
        name: "Dulce de uchuvas",
        description: "Uchuva en almíbar, un postre tradicional.",
        image: "/imagenes/products/dulce_uchuva.jpg",
        category: "Conservas",
        price: 15000,
        measure: "libra",
    },
    {
        id: 31,
        name: "Arepas boyacenses",
        description:
            "Arepas de maíz amarillo, rellenas o acompañadas de queso y cuajada.",
        image: "/imagenes/products/arepas_boyacenses.jpg",
        category: "Conservas",
        price: 5000,
        measure: "1 unidad",
    },
    {
        id: 32,
        name: "Duraznos en almíbar",
        description:
            "Duraznos enteros en un suave almíbar, perfectos para postres o como acompañamiento.",
        image: "/imagenes/products/duraznos_almibar.jpg",
        category: "Conservas",
        price: 25000,
        measure: "500 g",
    },
    {
        id: 33,
        name: "Mermelada de feijoa",
        description:
            "Mermelada elaborada con feijoas frescas, ideal para untar o como ingrediente en recetas.",
        image: "/imagenes/products/mermelada_feijoa.jpg",
        category: "Conservas",
        price: 22000,
        measure: "500 g",
    },
    {
        id: 34,
        name: "Miel de abejas",
        description: "Miel pura producida en la región, ideal para endulzar.",
        image: "/imagenes/products/miel_abejas.jpg",
        category: "Conservas",
        price: 30000,
        measure: "500 g",
    },
    {
        id: 35,
        name: "Chocolate artesanal",
        description:
            "Chocolate hecho con cacao de la región, perfecto para bebidas y postres.",
        image: "/imagenes/products/chocolate_artesanal.jpg",
        category: "Conservas",
        price: 22000,
        measure: "500 g",
    },
    {
        id: 36,
        name: "Almojábanas",
        description: "Panecillos de queso y harina de maíz, típicos de la región.",
        image: "/imagenes/products/almojabanas.jpg",
        category: "Conservas",
        price: 3000,
        measure: "1 unidad",
    },
    {
        id: 37,
        name: "Chunchullo",
        description:
            "Tripa de res asada, típica en platos tradicionales de la región.",
        image: "/imagenes/products/chunchullo.jpg",
        category: "Carnes",
        price: 15000,
        measure: "500 g",
    },
    {
        id: 38,
        name: "Longaniza",
        description:
            "Embutido tradicional, ahumado y sazonado con especias locales.",
        image: "/imagenes/products/longaniza.jpg",
        category: "Carnes",
        price: 20000,
        measure: "1 kg",
    },
    {
        id: 39,
        name: "Carne de cerdo",
        description: "Carne fresca de cerdo, ideal para asados y guisos.",
        image: "/imagenes/products/carne_cerdo.jpg",
        category: "Carnes",
        price: 18000,
        measure: "1 kg",
    },
    {
        id: 40,
        name: "Pollo campesino",
        description: "Pollo criollo, de sabor intenso y textura firme.",
        image: "/imagenes/products/pollo_campesino.jpg",
        category: "Carnes",
        price: 25000,
        measure: "1 kg",
    },
    {
        id: 41,
        name: "Carne de res",
        description: "Cortes de res frescos, ideales para asados y estofados.",
        image: "/imagenes/products/carne_res.jpg",
        category: "Carnes",
        price: 30000,
        measure: "1 kg",
    },
    {
        id: 42,
        name: "Chorizo",
        description: "Embutido ahumado y sazonado, típico de la región.",
        image: "/imagenes/products/chorizos.jpg",
        category: "Carnes",
        price: 22000,
        measure: "1 kg",
    },
    {
        id: 43,
        name: "Hígado de res",
        description: "Víscera rica en hierro, usada en guisos y frituras.",
        image: "/imagenes/products/higado_res.jpg",
        category: "Carnes",
        price: 10000,
        measure: "1 kg",
    },
    {
        id: 44,
        name: "Costillas de cerdo",
        description: "Costillas frescas, perfectas para asar o ahumar.",
        image: "/imagenes/products/costillas_cerdo.jpg",
        category: "Carnes",
        price: 28000,
        measure: "1 kg",
    },
    {
        id: 45,
        name: "Morcilla",
        description: "Embutido relleno de arroz y sangre, típico de la región.",
        image: "/imagenes/products/morcilla.jpg",
        category: "Carnes",
        price: 12000,
        measure: "1 kg",
    },
    {
        id: 46,
        name: "Habas",
        description:
            "Legumbres verdes y nutritivas, comunes en platos tradicionales.",
        image: "/imagenes/products/habas.jpg",
        category: "Granos",
        price: 6000,
        measure: "1 kg",
    },
    {
        id: 47,
        name: "Fríjol",
        description: "Frijoles rojos y negros, base de la alimentación local.",
        image: "/imagenes/products/frijol.jpg",
        category: "Granos",
        price: 8000,
        measure: "1 kg",
    },
    {
        id: 48,
        name: "Lentejas",
        description: "Legumbres ricas en proteínas, ideales para sopas y guisos.",
        image: "/imagenes/products/lentejas.jpg",
        category: "Granos",
        price: 7000,
        measure: "1 kg",
    },
    {
        id: 49,
        name: "Arvejas",
        description: "Granos verdes y dulces, usados en sopas y ensaladas.",
        image: "/imagenes/products/arvejas.jpg",
        category: "Granos",
        price: 5000,
        measure: "1 kg",
    },
    {
        id: 50,
        name: "Garbanzos",
        description: "Legumbres versátiles, usadas en guisos y ensaladas.",
        image: "/imagenes/products/garbanzos.jpg",
        category: "Granos",
        price: 9000,
        measure: "1 kg",
    },
    {
        id: 51,
        name: "Maíz",
        description: "Maíz amarillo y blanco, base para arepas y otros platos.",
        image: "/imagenes/products/maiz.jpg",
        category: "Granos",
        price: 4000,
        measure: "1 kg",
    },
    {
        id: 52,
        name: "Quinua",
        description: "Grano andino rico en proteínas, usado en ensaladas y sopas.",
        image: "/imagenes/products/quinua.jpg",
        category: "Granos",
        price: 15000,
        measure: "1 kg",
    },
    {
        id: 53,
        name: "Cebada",
        description: "Cereal usado en bebidas como la chicha y sopas.",
        image: "/imagenes/products/cebada.jpg",
        category: "Granos",
        price: 6000,
        measure: "1 kg",
    },
    {
        id: 54,
        name: "Trigo",
        description: "Cereal usado para panes y productos horneados.",
        image: "/imagenes/products/trigo.jpg",
        category: "Granos",
        price: 5000,
        measure: "1 kg",
    }
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

    // Agrupar productos por categoría
    const productosPorCategoria = {};
    productos.forEach(producto => {
        if (!productosPorCategoria[producto.category]) {
            productosPorCategoria[producto.category] = [];
        }
        productosPorCategoria[producto.category].push(producto);
    });

    // Renderizar productos por categoría
    for (const categoria in productosPorCategoria) {
        const tituloCategoria = document.createElement("h2");
        tituloCategoria.textContent = categoria.toUpperCase();
        tituloCategoria.id=`categoria-${categoria.toLowerCase()}`;
        contenedorProductos.appendChild(tituloCategoria);

        const contenedorCategoria = document.createElement("div");
        
        // Renderizar todos los productos de cada categoría
        productosPorCategoria[categoria].forEach(producto => {
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
            contenedorCategoria.appendChild(card);
        });

        contenedorProductos.appendChild(contenedorCategoria);
    }
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
    actualizarSidebar();
    toggleSidebar();
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

function toggleSidebar() {
    const sidebar = document.getElementById("cart-sidebar");
    sidebar.classList.toggle("open");
}

// Función para actualizar la sidebar
function actualizarSidebar() {
    const sidebarContent = document.getElementById("sidebar-content");
    sidebarContent.innerHTML = "";

    if (carrito.length === 0) {
        sidebarContent.innerHTML = "<p>Tu carrito está vacío.</p>";
        return;
    }

    carrito.forEach((producto, index) => {
        const item = document.createElement("div");
        item.classList.add("cart-item");
        item.innerHTML = `
          <div class="card-sidebar">
            <h4 >${producto.name}</h4>
            <p>Precio: $${formatearPrecio(producto.price)}</p>
            <button class="btn btn-danger" onclick="eliminarDelCarrito(${index})">Eliminar</button>
          </div>
        `;
        sidebarContent.appendChild(item);
    });
}

// Cargar el carrito al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    cargarCarrito();
    renderProductos();
});

document
    .getElementById("close-sidebar")
    .addEventListener("click", toggleSidebar);
