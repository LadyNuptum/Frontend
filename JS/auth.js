//*  Funionalidad mostrar contraseña


const passInputs = document.querySelectorAll('.pass');
const icons = document.querySelectorAll('.bx');


if (passInputs.length === icons.length) {
  
  passInputs.forEach((input, index) => {
    const icon = icons[index];

    icon.addEventListener("click", e => {
      if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("bx-show-alt");
        icon.classList.add("bx-hide");
      } else {
        input.type = "password";
        icon.classList.add("bx-show-alt");
        icon.classList.remove("bx-hide");
      }
    });
  });
} else {
  console.error("Número de inputs e iconos no coincide.");
}


//* Funcionalidad para reducir el tamaño de contenedor izquierdo

const containerLeft = document.querySelector('.container-left');

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  if (scrollPosition > 100) { 
    containerLeft.style.height = '20vh';
  } else {
    containerLeft.style.height = '100vh';
  }
});

//* Optimizar esta funcion para Inicio de Sesion
const containerLeftS = document.querySelector('.container-left-s');

window.addEventListener('scroll', () => {
  const scrollPositions = window.scrollY;
  if (scrollPositions > 100) { 
    containerLeftS.style.height = '20vh';
  } else {
    containerLeftS.style.height = '100vh';
  }
});
