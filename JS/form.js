// Obtener elementos del formulario
const form = document.querySelector("form");
const btnSubmit = document.getElementById("btnSubmit");

// Definición global de formInputs
const formInputs = {
  name: {
    element: document.getElementById("name"),
    rules: {
      required: true,
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
    },
    errorMessages: {
      required: "El nombre es requerido",
      minLength: "El nombre debe tener al menos 2 caracteres",
      maxLength: "El nombre no puede exceder 50 caracteres",
      pattern: "El nombre solo puede contener letras y espacios",
    },
  },
  email: {
    element: document.getElementById("email"),
    rules: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    errorMessages: {
      required: "El correo electrónico es requerido",
      pattern: "Por favor, ingrese un correo electrónico válido",
    },
  },
  phone: {
    element: document.getElementById("phone"),
    rules: {
      required: true,
      pattern: /^\d{8,15}$/,
    },
    errorMessages: {
      required: "El teléfono es requerido",
      pattern: "El teléfono debe tener entre 8 y 15 dígitos",
    },
  },
  message: {
    element: document.getElementById("message"),
    rules: {
      required: true,
      minLength: 10,
      maxLength: 500,
    },
    errorMessages: {
      required: "El mensaje es requerido",
      minLength: "El mensaje debe tener al menos 10 caracteres",
      maxLength: "El mensaje no puede exceder 500 caracteres",
    },
  },
};

// Función para mostrar error
function displayError(element, message) {
  const formGroup = element.parentElement;
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.style.cssText = "color: red; font-size: 12px; margin-top: 5px;";
  errorDiv.textContent = message;

  // Remover error previo si existe
  const existingError = formGroup.querySelector(".error-message");
  if (existingError) {
    formGroup.removeChild(existingError);
  }

  formGroup.appendChild(errorDiv);
  element.style.borderColor = "red";
}

// Función para limpiar error
function clearError(element) {
  const formGroup = element.parentElement;
  const errorDiv = formGroup.querySelector(".error-message");
  if (errorDiv) {
    formGroup.removeChild(errorDiv);
  }
  element.style.borderColor = "";
}

// Función principal de validación en Submit
function validateFormOnSubmit(event) {
  event.preventDefault();

  let isValid = true;
  const errors = [];

  // Validar cada campo
  Object.keys(formInputs).forEach((inputName) => {
    const input = formInputs[inputName];
    const value = input.element.value.trim();
    clearError(input.element);
    if (input.rules.required && !value) {
      isValid = false;
      errors.push({
        element: input.element,
        message: input.errorMessages.required,
      });
    }

    if (value) {
      if (input.rules.minLength && value.length < input.rules.minLength) {
        isValid = false;
        errors.push({
          element: input.element,
          message: input.errorMessages.minLength,
        });
      }

      if (input.rules.maxLength && value.length > input.rules.maxLength) {
        isValid = false;
        errors.push({
          element: input.element,
          message: input.errorMessages.maxLength,
        });
      }

      if (input.rules.pattern && !input.rules.pattern.test(value)) {
        isValid = false;
        errors.push({
          element: input.element,
          message: input.errorMessages.pattern,
        });
      }
    }
  });

  // Mostrar errores si existen
  errors.forEach((error) => {
    displayError(error.element, error.message);
  });

  if (isValid) {
    btnSubmit.disabled = true;
    btnSubmit.textContent = "Enviando...";

    form.submit();
  }

  return isValid;
}

// Agregar evento submit al formulario
form.addEventListener("submit", validateFormOnSubmit);

Object.keys(formInputs).forEach((inputName) => {
  const input = formInputs[inputName].element;
  input.addEventListener("input", () => {
    clearError(input);
  });
});

