const pageTitle = document.title;

const navbarTitle = document.getElementById("navbar-page-title");
navbarTitle.textContent = pageTitle;

window.onscroll = function () {

  const navbar = document.querySelector("header");
  const titleContainer = document.querySelector(".navbar-title");

  if (window.scrollY > 100) {
    navbar.classList.add("sticky-navbar");
    titleContainer.classList.remove("d-none");
  } else {
    navbar.classList.remove("sticky-navbar");
    titleContainer.classList.add("d-none");
  }
};
