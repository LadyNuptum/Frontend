// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.querySelector(".form-login");
//   const btnSubmit = document.querySelector(".btn-login");
//   const inputs = form.querySelectorAll("input:not([type='submit'])");

//   const patterns = {
//     email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
//   };

//   function showError(input, message) {
//     clearError(input);
//     const errorDiv = document.createElement("div");
//     errorDiv.className = "error-message";
//     errorDiv.textContent = message;
//     errorDiv.style.color = "red";
//     errorDiv.style.fontSize = "0.7rem";
//     input.style.border = "2px solid red";
//     input.parentElement.appendChild(errorDiv);
//   }

//   function clearError(input) {
//     const errorDiv = input.parentElement.querySelector(".error-message");
//     if (errorDiv) errorDiv.remove();
//     input.style.border = "2px solid #27d604";
//   }

//   function validateField(input) {
//     const inputType = input.id;
//     const value = input.value.trim();
//     if (!value) {
//       showError(input, "Este campo no puede estar vacío.");
//       return false;
//     }
//     if (patterns[inputType] && !patterns[inputType].test(value)) {
//       showError(input, "Correo inválido.");
//       return false;
//     }
//     clearError(input);
//     return true;
//   }

//   inputs.forEach((input) => {
//     input.addEventListener("input", () => {
//       validateField(input);
//       btnSubmit.disabled = !Array.from(inputs).every(validateField);
//     });
//   });

//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     let isValid = true;
//     inputs.forEach((input) => {
//       if (!validateField(input)) isValid = false;
//     });
//     if (!isValid) return;

//     const userData = {
//       correo: document.getElementById("email").value.trim(),
//       contrasena: document.getElementById("password").value.trim(),
//     };

//     try {
//       const response = await fetch("http://localhost:8080/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });

//       const data = await response.json().catch(() => ({})); // Manejar el error en caso de que la respuesta no sea JSON


//       if (!response.ok) {
//         const errorMsg = data.message || "Correo o contraseña incorrectos.";
//         showError(document.getElementById("email"), errorMsg);
//         showError(document.getElementById("password"), errorMsg);
//         return;
//       }

//       sessionStorage.setItem("token", data.token);
//       window.location.href = "../HTML/home.html";
//     } catch (error) {
//       console.error("Error en la solicitud:", error);
//     }
//   });

//   const passInputs = document.querySelectorAll(".pass");
//   const icons = document.querySelectorAll(".bx");

//   if (passInputs.length === icons.length) {
//     passInputs.forEach((input, index) => {
//       const icon = icons[index];
//       icon.addEventListener("click", () => {
//         const isPassword = input.type === "password";
//         input.type = isPassword ? "text" : "password";
//         icon.classList.toggle("bx-show-alt", !isPassword);
//         icon.classList.toggle("bx-hide", isPassword);
//       });
//     });
//   } else {
//     console.error("Número de inputs e iconos no coincide.");
//   }
// });

// document.addEventListener("DOMContentLoaded", function () {
//   document.getElementById("home-button").addEventListener("click", function () {
//     const form = document.querySelector(".form-login");
//     form.reset();
//     window.location.href = "../HTML/home.html";
//   });
// });



document.addEventListener("DOMContentLoaded", () => {
  // Seleccionar elementos
  const form = document.querySelector(".form-login");
  if (!form) return console.error("No se encontró el formulario de login.");
  
  const btnSubmit = document.querySelector(".btn-login");
  const inputs = form.querySelectorAll("input:not([type='submit'])");

  // Expresiones regulares para validaciones
  const patterns = {
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
  };

  // Funciones de validación y manejo de errores
  const showError = (input, message) => {
    clearError(input);
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;
    errorDiv.style.color = "red";
    errorDiv.style.fontSize = "0.7rem";
    input.style.border = "2px solid red";
    input.parentElement.appendChild(errorDiv);
  };

  const clearError = (input) => {
    const errorDiv = input.parentElement.querySelector(".error-message");
    if (errorDiv) errorDiv.remove();
    input.style.border = "2px solid #27d604";
  };

  const validateField = (input) => {
    const value = input.value.trim();
    if (!value) {
      showError(input, "Este campo no puede estar vacío.");
      return false;
    }
    if (patterns[input.id] && !patterns[input.id].test(value)) {
      showError(input, "Correo inválido.");
      return false;
    }
    clearError(input);
    return true;
  };

  // Validar cada input al escribir y habilitar/deshabilitar botón
  inputs.forEach(input => {
    input.addEventListener("input", () => {
      validateField(input);
      btnSubmit.disabled = !Array.from(inputs).every(validateField);
    });
  });

  // Manejo del envío del formulario
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const isValid = Array.from(inputs).every(validateField);
    if (!isValid) return;

    const userData = {
      correo: document.getElementById("email").value.trim(),
      contrasena: document.getElementById("password").value.trim(),
    };

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const errorMsg = data.message || "Correo o contraseña incorrectos.";
        showError(document.getElementById("email"), errorMsg);
        showError(document.getElementById("password"), errorMsg);
        return;
      }

      // Guardar token y userId en sessionStorage si están presentes
      sessionStorage.setItem("token", data.token);
      if (data.userId) {
        sessionStorage.setItem("userId", data.userId);
      } else {
        console.warn("La respuesta no incluye userId.");
      }

      window.location.href = "../HTML/home.html";
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  });

  // Toggle de visibilidad de contraseñas
  const passInputs = document.querySelectorAll(".pass");
  const icons = document.querySelectorAll(".bx");
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

  // Botón para ir al home
  const homeButton = document.getElementById("home-button");
  if (homeButton) {
    homeButton.addEventListener("click", () => {
      form.reset();
      window.location.href = "../HTML/home.html";
    });
  }
});
