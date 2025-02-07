document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector("header");
  const titleContainer = document.querySelector(".navbar-title");
  const navbarToggler = document.querySelector(".navbar-toggler");

  // Detectar el navbar colapsado
  function isNavbarExpanded() {
    return navbarToggler && navbarToggler.classList.contains("active");
  }

  // Manejar el scroll y el fondo del navbar
  function handleScroll() {
    if (window.scrollY > 5 || isNavbarExpanded()) {
      navbar.classList.add("sticky-navbar");
      titleContainer.classList.remove("d-none");
      navbar.style.background = "rgba(11, 45, 38, 0.1)";
      navbar.style.backdropFilter = "blur(10px)";
    } else {
      navbar.classList.remove("sticky-navbar");
      titleContainer.classList.add("d-none");
      navbar.style.background = "";
      navbar.style.backdropFilter = "";
    }
  }

  // Evento de scroll
  window.addEventListener("scroll", handleScroll);

  // Evento del toggler
  if (navbarToggler) {
    navbarToggler.addEventListener("click", function () {
      this.classList.toggle("active"); // Agrega una clase para detectar si está expandido
      handleScroll(); // Llamamos a handleScroll para forzar el cambio
    });
  }

  // ------------------------------------
  //         FORMULARIO LOGIN
  // ------------------------------------
  const form = document.querySelector(".form-login");
  const btnSubmit = document.querySelector(".btn-login");
  const inputs = form.querySelectorAll("input:not([type='submit'])");


  // Validaciones
  const patterns = {
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
  };

  function showError(input, message) {
  clearError(input);
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;
  errorDiv.style.color = "red"; // Agregar color rojo al mensaje
  errorDiv.style.fontSize= "0.7rem ";
  input.style.border = "2px solid red";
  input.parentElement.appendChild(errorDiv);
}

  function clearError(input) {
    const errorDiv = input.parentElement.querySelector(".error-message");
    if (errorDiv) errorDiv.remove();
    input.style.border = "2px solid #27d604";
  }

  function validateField(input) {
    const inputType = input.id;
    const value = input.value.trim();

    if (!value) {
      showError(input, "Este campo no puede estar vacío.");
      return false;
    }

    if (patterns[inputType] && !patterns[inputType].test(value)) {
      showError(input, inputType === "email" ? "Correo inválido." : "Contraseña débil.");
      return false;
    }

    clearError(input);
    return true;
  }

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      validateField(input);
      btnSubmit.disabled = !Array.from(inputs).every(validateField);
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let isValid = true;
    inputs.forEach((input) => {
      if (!validateField(input)) isValid = false;
    });

    if (!isValid) return;

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = existingUsers.find((user) => user.email === email);

    if (!user || (await hashPassword(password)) !== user.password) {
      showError(document.getElementById("email"), "Correo o contraseña incorrectos.");
      showError(document.getElementById("password"), "Correo o contraseña incorrectos.");
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "../HTML/home.html";
  });

  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map(byte => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  // ------------------------------------
  //         MOSTRAR/Ocultar CONTRASEÑA
  // ------------------------------------
  const passInputs = document.querySelectorAll('.pass');
  const icons = document.querySelectorAll('.bx');

  if (passInputs.length === icons.length) {
    passInputs.forEach((input, index) => {
      const icon = icons[index];

      icon.addEventListener("click", () => {
        const isPassword = input.type === "password";
        input.type = isPassword ? "text" : "password";
        icon.classList.toggle("bx-show-alt", !isPassword);
        icon.classList.toggle("bx-hide", isPassword);
      });
    });
  } else {
    console.error("Número de inputs e iconos no coincide.");
  }
});
