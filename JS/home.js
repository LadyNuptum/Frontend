//==== Función para optimizar carga de imágedes ====
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img[data-src]");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.srcset = img.dataset.srcset || "";
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => observer.observe(img));
});

// Funció  carousel de publicidad página home
const images = [
  "/imagenes/products/Cebollas.jpg",
  "/imagenes/products/Calabacion.jpg",
  "/imagenes/products/Judias_verdes.jpg",
  "/imagenes/products/Helado_artesanal.jpg",
  "/imagenes/products/Alcachofas.jpg",
  "/imagenes/products/Apio.jpg",
  "/imagenes/products/Brocoli.jpg",
  "/imagenes/products/leche_condensada.jpg",
  "/imagenes/products/Leche_de_oveja.jpg",
  "/imagenes/products/Pepino.jpg",
  "/imagenes/products/carnes.jpeg",
  "/imagenes/products/Zanahoria.jpg",
  "/imagenes/products/Queso_manchego.jpg",
];

const sliderMove = document.getElementById("slider-move");

images.forEach((src) => {
  const box = document.createElement("div");
  box.classList.add("box");
  const img = document.createElement("img");
  img.src = src;
  box.appendChild(img);
  sliderMove.appendChild(box);
});

// ========== Inicia  Funcionalidad para carousel Destacados ===========*//
function iniciarCarrusel(contenedor) {
  const slide = contenedor.querySelector(".carousel-slide");
  const img = contenedor.querySelectorAll(".carousel-slide img");

  const prevBtn = contenedor.querySelector(".prev-btn");
  const nextBtn = contenedor.querySelector(".next-btn");

  let imgActual = 0;
  const totalImg = img.length;
  let direccion = 1;

  function carouselPosition() {
    const desplazamiento = -imgActual * 100;
    slide.style.transform = `translateX(${desplazamiento}%)`;
  }

  function siguienteImg() {
    if (imgActual === totalImg - 1) {
      direccion = -1;
    } else if (imgActual === 0) {
      direccion = 1;
    }
    imgActual = (imgActual + direccion + totalImg) % totalImg;
    carouselPosition();
  }

  nextBtn.addEventListener("click", () => {
    siguienteImg();
    reiniciarCarousel();
  });

  prevBtn.addEventListener("click", () => {
    direccion = -1;
    siguienteImg();
    reiniciarCarousel();
  });

  let autoSlide = setInterval(siguienteImg, 4000);

  function reiniciarCarousel() {
    clearInterval(autoSlide);
    autoSlide = setInterval(siguienteImg, 4000);
  }
}

document.querySelectorAll(".carousel").forEach((carrusel) => {
  iniciarCarrusel(carrusel);
});

// =============================*//

// ===========  Función para ampliar imágen de blog icono Lupa y redirigir al blog ======
document.addEventListener("DOMContentLoaded", function () {
  amplifyImg();
});

function amplifyImg() {
  const magnifyIcons = document.querySelectorAll(".fa-magnifying-glass");

  magnifyIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      const card = this.closest(".card-blog");
      const imgSrc = card.querySelector(".container-imgb img").src;

      showAmplifyImg(imgSrc);
    });
  });

  function showAmplifyImg(src) {
    const modal = document.createElement("div");
    modal.classList.add("image-modal-blog");
    modal.innerHTML = `
            <div class="image-modal-content">
              <a href="../HTML/blog.html"> <img src="${src}" alt="Imagen ampliada"> </a>
            </div>
        `;

    document.body.appendChild(modal);

    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeAmplifyImg();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeAmplifyImg();
      }
    });

    function closeAmplifyImg() {
      modal.classList.add("fade-out");
      setTimeout(() => modal.remove(), 300);
    }
  }
}
//======================================================

// ====== Funciones par anavegación de pagina Inicio=====
document.addEventListener("DOMContentLoaded", () => {
  // ======  Navegación del Carrusel =======
  const carouselImages = document.querySelectorAll(".carousel-slide img");
  carouselImages.forEach((img) => {
    img.addEventListener("click", () => {
      if (img.classList.contains("aboutUs-home")) {
        window.location.href = "../HTML/aboutUs.html";
      } else if (img.classList.contains("products-home")) {
        window.location.href = "../HTML/products.html";
      } else {
        console.log("Página no encontrada");
      }
    });
  });

  // ======  Navegación de Blogs =========
  const blogCards = document.querySelectorAll(".card-blog");
  blogCards.forEach((card) => {
    const blogClass = Array.from(card.classList).find((className) =>
      className.startsWith("blog-")
    );
    if (blogClass) {
      const linkElements = card.querySelectorAll(
        "h3, .btn-read-more, .fa-link"
      );
      linkElements.forEach((element) => {
        element.addEventListener("click", () => {
          // window.location.href = `../HTML/blog.html#${blogClass}`;
          window.location.href = "../HTML/blog.html";
        });
      });
    }
  });
});

//======= Función Para div lateral de publicidad======
const sticky = (() => {
  const stickyContainer = document.getElementById("stickyContainer");
  const offerIcon = document.getElementById("offerIcon");

  if (!stickyContainer || !offerIcon) {
    console.error("❌ Error: Página no Encontrada");
    return;
  }

  const btnSticky = (isOpen) => {
    stickyContainer.style.display = isOpen ? "block" : "none";
    offerIcon.style.display = isOpen ? "none" : "flex";
  };

  return {
    close: () => btnSticky(false),
    open: () => btnSticky(true),
  };
})();
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".close-btn")?.addEventListener("click", sticky.close);
  document.getElementById("offerIcon")?.addEventListener("click", sticky.open);
});
//=========================================================



// ========= Categorias ============
