document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-register");
  const btnSubmit = document.querySelector(".btn-register");
  const aceptTerms = document.getElementById("acept");
  const inputs = form.querySelectorAll("input:not([type='submit'])");

  // desactiva btn
  btnSubmit.disabled = true;

  // patrones validación
  const patterns = {
    name: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]{2,30}$/,
    lastName: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]{2,30}$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    phone: /^[0-9]{10}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
  };

  // nmnsajeserror
  const errorMessages = {
    name: "El nombre debe contener solo letras (2-30 caracteres).",
    lastName: "El apellido debe tener entre 2 y 30 caracteres y solo letras.",
    email: "Ingrese un correo electrónico válido.",
    phone: "El teléfono debe tener 10 dígitos numéricos.",
    password:
      "La contraseña debe tener al menos 6 caracteres, una letra y un número.",
    "confirm-password": "Las contraseñas no coinciden.",
    acept: "Debe aceptar los términos y condiciones.",
    empty: "Este campo no puede estar vacío.",
  };

  // mensaje de error
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

  // clear errores
  function clearError(input) {
    const errorDiv = input.parentElement.querySelector(".error-message");
    if (errorDiv) errorDiv.remove();
    input.style.border = "3px solid #27d604";
  }

  // validar campos
  function validateField(input) {
    const inputType = input.id;
    const value = input.value.trim();

    //campo está vacío
    if (!value) {
      showError(
        input,
        inputType === "name" ? errorMessages.name : errorMessages.empty
      );
      return false;
    }

    // checkbox terminos
    if (inputType === "acept") {
      if (!input.checked) {
        showError(input, errorMessages[inputType]);
        return false;
      }
    }
    // confirma contraseña
    else if (inputType === "confirm-password") {
      if (value !== document.getElementById("password").value) {
        showError(input, errorMessages[inputType]);
        return false;
      }
    }
    // patrones definidos
    else if (patterns[inputType] && !patterns[inputType].test(value)) {
      showError(input, errorMessages[inputType]);
      return false;
    }

    clearError(input);
    return true;
  }

  // Habilitar botón de enviar cuando usuario acepte términos
  aceptTerms.addEventListener("change", () => {
    btnSubmit.disabled = !aceptTerms.checked;
  });

  // alidación tiempo real
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      validateField(input);
    });
  });

  // envio del form
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let isValid = true;
    inputs.forEach((input) => {
      if (!validateField(input)) isValid = false;
    });

    if (!aceptTerms.checked) {
      showError(aceptTerms, errorMessages["acept"]);
      isValid = false;
    }

    if (isValid) {
      // objeto Josn con datos del usuario
      const userData = {};
      inputs.forEach((input) => {
        if (input.id !== "confirm-password") {
          userData[input.id] =
            input.type === "checkbox" ? input.checked : input.value.trim();
        }
      });

      // encriptacion contraseña
      const encryptedPassword = await hashPassword(userData.password);
      userData.password = encryptedPassword;

      // save en localStorage
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      existingUsers.push(userData);
      localStorage.setItem("users", JSON.stringify(existingUsers));

      // mensaje de éxito
      const messageContainer = document.querySelector("#success-message");
      messageContainer.innerHTML = `<p>Registro exitoso ✔</p>`;
      btnSubmit.disabled = true;

      
      setTimeout(() => {
        form.reset();
        messageContainer.innerHTML = "";
      }, 3000);
    }
  });

  //encriptar la contraseña usando SHA-256
  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  }
});