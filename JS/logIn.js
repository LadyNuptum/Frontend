document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-login");
  const btnSubmit = document.querySelector(".btn-login");
  const inputs = form.querySelectorAll("input:not([type='submit'])");
  const passwordInput = document.getElementById("password");
  const eyeIcon = document.getElementById("eye");

  // Desactiva el botón de enviar inicialmente
  btnSubmit.disabled = true;

  // Patrones de validación
  const patterns = {
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
  };

  // Mensajes de error
  const errorMessages = {
    email: "Ingrese un correo electrónico válido.",
    password:
      "La contraseña debe tener al menos 6 caracteres, una letra y un número.",
    empty: "Este campo no puede estar vacío.",
    invalidCredentials: "Correo o contraseña incorrectos.",
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

    if (patterns[inputType] && !patterns[inputType].test(value)) {
      showError(input, errorMessages[inputType]);
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
      showError(
        document.getElementById("email"),
        errorMessages.invalidCredentials
      );
      showError(
        document.getElementById("password"),
        errorMessages.invalidCredentials
      );
      return;
    }

    // Simulación de inicio de sesión
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "../HTML/home.html";
  });

  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
  }

 
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


  eyeIcon.addEventListener("click", () => {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.innerHTML = '<i class="bx bx-hide"></i>';
    } else {
      passwordInput.type = "password";
      eyeIcon.innerHTML = '<i class="bx bx-show-alt"></i>';
    }
  });
});
