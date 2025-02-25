document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-register");
  const btnSubmit = document.querySelector(".btn-register");
  const aceptTerms = document.getElementById("acept");
  const inputs = form.querySelectorAll("input:not([type='submit'])");

  btnSubmit.disabled = true; // Deshabilitar botón hasta aceptar términos

  const patterns = {
    name: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]{2,30}$/,
    lastName: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]{2,30}$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    phone: /^[0-9]{10}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
  };

  const errorMessages = {
    name: "El nombre debe contener solo letras (2-30 caracteres).",
    lastName: "El apellido debe tener entre 2 y 30 caracteres y solo letras.",
    email: "Ingrese un correo electrónico válido.",
    phone: "El teléfono debe tener 10 dígitos numéricos.",
    password: "La contraseña debe tener al menos 6 caracteres, una letra y un número.",
    "confirm-password": "Las contraseñas no coinciden.",
    acept: "Debe aceptar los términos y condiciones.",
    empty: "Este campo no puede estar vacío.",
  };

  function showError(input, message) {
    clearError(input);
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.style.color = "red";
    errorDiv.style.fontSize = "12px";
    errorDiv.style.marginTop = "5px";
    errorDiv.textContent = message;
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
      showError(input, errorMessages.empty);
      return false;
    }

    if (inputType === "acept" && !input.checked) {
      showError(input, errorMessages.acept);
      return false;
    }

    if (inputType === "confirm-password") {
      if (value !== document.getElementById("password").value) {
        showError(input, errorMessages[inputType]);
        return false;
      }
    } else if (patterns[inputType] && !patterns[inputType].test(value)) {
      showError(input, errorMessages[inputType]);
      return false;
    }

    clearError(input);
    return true;
  }

  aceptTerms.addEventListener("change", () => {
    btnSubmit.disabled = !aceptTerms.checked;
  });

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      validateField(input);
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let isValid = true;
    inputs.forEach((input) => {
      if (!validateField(input)) isValid = false;
    });

    if (!isValid) return;

    const userData = {
      correo: document.getElementById("email").value.trim(),
      contrasena: document.getElementById("password").value.trim(),
      nombre: document.getElementById("name").value.trim(),
      apellido: document.getElementById("lastName").value.trim(),
      telefono: document.getElementById("phone").value.trim(),
    };

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });


      const result = await response.json();

      if (!response.ok) {
        showError(document.getElementById("email"), result.message || "Error en el registro.");
        return;
      }

      alert("Registro exitoso! Redirigiendo al login...");
      window.location.href = "logIn.html";
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Ocurrió un error inesperado. Intente nuevamente.");
    }
  });
  
  const passInputs = document.querySelectorAll('.pass');
    const icons = document.querySelectorAll('.bx');
  
    if (passInputs.length === icons.length) {
      passInputs.forEach((input, index) => {
        const icon = icons[index];
  
        icon.addEventListener("click", () => {
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
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("home-button").addEventListener("click", function () {
      const form = document.querySelector(".form-register");
      form.reset();
      window.location.href = "../HTML/home.html"; 
  });
});