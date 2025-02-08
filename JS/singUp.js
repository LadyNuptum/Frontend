document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-register");
  const btnSubmit = document.querySelector(".btn-register");
  const aceptTerms = document.getElementById("acept");
  const inputs = form.querySelectorAll("input:not([type='submit'])");

<<<<<<< HEAD
  // desactiva btn
=======
  // Desactiva el botón de enviar inicialmente
>>>>>>> 2a0df1867c0bff40c75c57c02ccd731345960fc9
  btnSubmit.disabled = true;

  // Patrones de validación
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
    password: "La contraseña debe tener al menos 6 caracteres, una letra y un número.",
    "confirm-password": "Las contraseñas no coinciden.",
    acept: "Debe aceptar los términos y condiciones.",
    empty: "Este campo no puede estar vacío.",
    emailExists: "Este correo electrónico ya está registrado.",
  };

  // Mostrar mensaje de error
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

  // Limpiar mensaje de error
  function clearError(input) {
    const errorDiv = input.parentElement.querySelector(".error-message");
    if (errorDiv) errorDiv.remove();
    input.style.border = "2px solid #27d604";
  }

  // Validar campo
  function validateField(input) {
    const inputType = input.id;
    const value = input.value.trim();

    // Verificar si el campo está vacío
    if (!value) {
      showError(
        input,
        inputType === "name" ? errorMessages.name : errorMessages.empty
      );
      return false;
    }

    // Validar checkbox de términos
    if (inputType === "acept") {
      if (!input.checked) {
        showError(input, errorMessages[inputType]);
        return false;
      }
    }

    // Validar confirmación de contraseña
    else if (inputType === "confirm-password") {
      if (value !== document.getElementById("password").value) {
        showError(input, errorMessages[inputType]);
        return false;
      }
    }

    // Validar con patrones definidos
    else if (patterns[inputType] && !patterns[inputType].test(value)) {
      showError(input, errorMessages[inputType]);
      return false;
    }

    clearError(input);
    return true;
  }

  // Habilitar botón de enviar cuando el usuario acepte los términos
  aceptTerms.addEventListener("change", () => {
    btnSubmit.disabled = !aceptTerms.checked;
  });

  // Validación en tiempo real
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      validateField(input);
    });
  });

  // Envío del formulario
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
  
    let isValid = true;
    inputs.forEach((input) => {
      if (!validateField(input)) isValid = false;
    });
  
    if (!aceptTerms.checked) {
      showError(aceptTerms, errorMessages["acept"]);
      isValid = false;
    }
  
    const email = emailInput.value.trim();
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = existingUsers.some((user) => user.email === email);
  
    if (emailExists) {
      showError(emailInput, errorMessages.emailExists);
      isValid = false;
    }
  
    if (isValid) {
      // Mostrar el fondo oscuro y el spinner
      const overlay = document.getElementById("overlay");
      overlay.style.display = "flex"; // Muestra el fondo oscuro y centra el spinner
  
      // Crear objeto con los datos del usuario
      const userData = {};
      inputs.forEach((input) => {
        if (input.id !== "confirm-password") {
          userData[input.id] =
            input.type === "checkbox" ? input.checked : input.value.trim();
        }
      });
  
      // Encriptar la contraseña
      const encryptedPassword = await hashPassword(userData.password);
      userData.password = encryptedPassword;
  
      // Simular un retraso de 2 segundos para el registro (opcional)
      await new Promise((resolve) => setTimeout(resolve, 2000));
  
      // Guardar en localStorage
      existingUsers.push(userData);
      localStorage.setItem("users", JSON.stringify(existingUsers));
  
      // Ocultar el fondo oscuro y el spinner
      overlay.style.display = "none";
  
      // Mostrar mensaje de éxito
      const messageContainer = document.querySelector("#success-message");
      btnSubmit.disabled = true;

<<<<<<< HEAD
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
=======
      form.reset();
      inputs.forEach(input => clearError(input)); // Borra los estilos de error también
  
      // Redirigir a la página de inicio de sesión después de 3 segundos
      setTimeout(() => {
        window.location.href = "logIn.html"; // Redirige a logIn.html
      }, 300);
    }
  });

  // Función para encriptar la contraseña usando SHA-256
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

  // Función para mostrar/ocultar contraseña
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
>>>>>>> 2a0df1867c0bff40c75c57c02ccd731345960fc9
