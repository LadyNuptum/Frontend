// Obtener el ícono de perfil y el menú desplegable
const profileIcon = document.getElementById('profile-icon');
const dropdownMenu = document.getElementById('dropdown-menu');

// Toggle para mostrar/ocultar el menú
profileIcon.addEventListener('click', function(event) {
    event.stopPropagation();  // Evita que el clic se propague y cierre el menú de inmediato
    dropdownMenu.classList.toggle('show');
});

// Cerrar el menú si el usuario hace clic fuera de él
document.addEventListener('click', function(event) {
    if (!profileIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.remove('show');
    }
});

