 // Obtener el título de la página
 const pageTitle = document.title;

 // Insertar el título en el navbar
 const navbarTitle = document.getElementById('navbar-page-title');
 navbarTitle.textContent = pageTitle;

 //comentarios oscar 
 // mostrar y ocultar el fondo sticky y el título
 window.onscroll = function () { //onscroll sigue le scroll para una accion determinada
   const navbar = document.querySelector('header');//selecciona el header
   const titleContainer = document.querySelector('.navbar-title');//selecciona mi titulo del header
   
   if (window.scrollY > 0) {//cuando scrol es mayor a 0 se activa
     navbar.classList.add('sticky-navbar'); // Este ctiva el fondo cristal
     titleContainer.classList.remove('d-none'); // Asegura que el título esté visible
   } else {
     navbar.classList.remove('sticky-navbar'); // Desactivar fondo cristal
     titleContainer.classList.add('d-none'); // oculta el titulo cuando está en la parte superior
   }
 };