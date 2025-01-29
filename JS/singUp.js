// Obtener elementos del formulario
const btnSubmit = document.querySelector(".btn-regiter");
const aceptTerms = document.getElementById("acept");

// Desactivar el botón de enviar inicialmente
btnSubmit.disabled = true;

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

    // Validar coincidencia de contraseñas
    if (inputName === "confirmPassword" && value !== formInputs.password.element.value.trim()) {
      isValid = false;
      errors.push({
        element: input.element,
        message: input.errorMessages.match,
      });
    }

    // Validar términos y condiciones
    if (inputName === "acept" && !input.element.checked) {
      isValid = false;
      errors.push({
        element: input.element,
        message: input.errorMessages.required,
      });
    }
  });

//   // Si el formulario es válido, enviar
//   if (isValid) {
//     btnSubmit.disabled = true;

//     form.submit();
//   }
}

// Habilita botón
aceptTerms.addEventListener("change", () => {
  btnSubmit.disabled = !aceptTerms.checked;
});