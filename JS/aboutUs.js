// Obtener el título de la página
const pageTitle = document.title;

// Insertar el título en el navbar
const navbarTitle = document.getElementById("navbar-page-title");
navbarTitle.textContent = pageTitle;

// mostrar y ocultar el fondo sticky y el título
window.onscroll = function () {
  
  const navbar = document.querySelector("header");
  const titleContainer = document.querySelector(".navbar-title");

  if (window.scrollY > 10) {
    navbar.classList.add("sticky-navbar");
    titleContainer.classList.remove("d-none");
  } else {
    navbar.classList.remove("sticky-navbar");
    titleContainer.classList.add("d-none");
  }
};
