// Funcion para Enlaces del navbar=======

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
