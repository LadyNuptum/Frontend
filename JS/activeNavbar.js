// Funcion para Enlaces del navbar=======
const navbar = document.querySelector("header");
const titleContainer = document.querySelector(".navbar-title");
const navbarToggler = document.querySelector(".navbar-toggler");

function isNavbarExpanded() {
    return navbarToggler && navbarToggler.classList.contains("active");
}
function handleScroll() {
    if (window.scrollY > 5 || isNavbarExpanded()) {
        navbar.classList.add("sticky-navbar");
    }
}
window.addEventListener("scroll", handleScroll);
if (navbarToggler) {
    navbarToggler.addEventListener("click", function () {
        this.classList.toggle("active"); // Agrega una clase para detectar si está expandido
        handleScroll(); // Llamamos a handleScroll para forzar el cambio
        this.classList.toggle("active");
        handleScroll();
    });
}

document.addEventListener("DOMContentLoaded", function () {
    function activeNav() {

        const currentPage = window.location.pathname.split("/").pop();


        const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

        navLinks.forEach(link => {

            const linkPage = link.getAttribute("href").split("/").pop();


            if (linkPage === currentPage) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    activeNav();
});
