

// Funcionalidad de carousel de publicidad página home
const images = [
    '/imagenes/products/Cebollas.jpg',
    '/imagenes/products/Calabacion.jpg',
    '/imagenes/products/Judias_verdes.jpg',
    '/imagenes/products/Helado_artesanal.jpg',
    '/imagenes/products/Alcachofas.jpg',
    '/imagenes/products/Apio.jpg',
    '/imagenes/products/Brocoli.jpg',
    '/imagenes/products/leche_condensada.jpg',
    '/imagenes/products/Leche_de_oveja.jpg',
    '/imagenes/products/Pepino.jpg',
    '/imagenes/products/carnes.jpeg',
    '/imagenes/products/Zanahoria.jpg',
    '/imagenes/products/Queso_manchego.jpg',
];

const sliderMove = document.getElementById('slider-move');

images.forEach((src) => {
const box = document.createElement('div');
box.classList.add('box');
const img = document.createElement('img');
img.src = src;
box.appendChild(img);
sliderMove.appendChild(box);
});




  // Funcionalidad de carousel del banner página home

const slide = document.querySelector('.carousel-slide');
const img = document.querySelectorAll('.carousel-slide img');

const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');

let imgActual = 0;
const totalImg = img.length;

function carouselPosition() {
      const desplazamiento = -imgActual * 100; 
    slide.style.transform = `translateX(${desplazamiento}%)`;
}

function siguienteImg() {
    imgActual = (imgActual + 1) % totalImg;
    carouselPosition();
}
nextBtn.addEventListener('click', () => {
    siguienteImg(); 
    reiniciarCarousel();
});

prevBtn.addEventListener('click', () => {
    imgActual = (imgActual - 1 + totalImg) % totalImg; 
    carouselPosition();
    reiniciarCarousel();
});

let autoSlide = setInterval(siguienteImg, 3000);

const reiniciarCarousel = () => {
    clearInterval(autoSlide);
    autoSlide = setInterval(siguienteImg, 3000);
}














