document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-register");
  const btnSubmit = document.querySelector(".btn-register");
  const aceptTerms = document.getElementById("acept");
  const inputs = form.querySelectorAll("input:not([type='submit'])");

  // Función para verificar credenciales en localStorage
  async function verificarCredenciales(email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    // Encriptar la contraseña ingresada para comparar
    const encryptedPassword = await hashPassword(password);

    // Buscar usuario que coincida tanto en email como en contraseña
    const userFound = users.find(
      (user) => user.email === email && user.password === encryptedPassword
    );

    // Redirige a la pagina de una
    if (userFound) {
      window.location.href = "/HTML/home.html";
      return true;
    }
    return false;
  }

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

  // Mensajes de error
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
    emailExists: "Este correo electrónico ya está registrado.",
  };

  // mensaje de error
  function showError(input, message) {
    clearError(input);
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.style.color = "red";
    errorDiv.style.fontSize = "12px";
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

  // validación tiempo real
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      validateField(input);
    });
  });

  // envío del form
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    // Primero verificar si las credenciales existen para iniciar sesión
    if (
      await verificarCredenciales(
        emailInput.value.trim(),
        passwordInput.value.trim()
      )
    ) {
      return; // Si existe, la función ya hizo la redirección
    }

    let isValid = true;
    inputs.forEach((input) => {
      if (!validateField(input)) isValid = false;
    });

    if (!aceptTerms.checked) {
      showError(aceptTerms, errorMessages["acept"]);
      isValid = false;
    }

    // Verificar si el correo ya está registrado
    const email = emailInput.value.trim();
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = existingUsers.some((user) => user.email === email);

    if (emailExists) {
      showError(emailInput, errorMessages.emailExists);
      isValid = false;
    }

    if (isValid) {
      // objeto JSON con datos del usuario
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