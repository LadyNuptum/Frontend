document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form-register");
    const btnSubmit = document.querySelector(".btn-regiter");
    const aceptTerms = document.getElementById("acept");
    const inputs = form.querySelectorAll("input:not([type='submit'])"); // Filtramos el botón de envío

    // Desactivar el botón de enviar inicialmente
    btnSubmit.disabled = true;

    // Patrones de validación
    const patterns = {
        name: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]{2,30}$/,
        lastName: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]{2,30}$/,
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        phone: /^[0-9]{10}$/,
        password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    };

    // Mensajes de error
    const errorMessages = {
        name: "El nombre no puede estar vacío y debe contener solo letras (2-30 caracteres).",
        lastName: "El apellido debe tener entre 2 y 30 caracteres y solo letras.",
        email: "Ingrese un correo electrónico válido.",
        phone: "El teléfono debe tener 10 dígitos numéricos.",
        password: "La contraseña debe tener al menos 8 caracteres, una letra y un número.",
        "confirm-password": "Las contraseñas no coinciden.",
        acept: "Debe aceptar los términos y condiciones.",
        empty: "Este campo no puede estar vacío.",
    };

    // Función para mostrar mensaje de error
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

    // Función para limpiar errores
    function clearError(input) {
        const errorDiv = input.parentElement.querySelector(".error-message");
        if (errorDiv) errorDiv.remove();
        input.style.border = "1px solid #ccc";
    }

    // Función de validación de campos
    function validateField(input) {
        const inputType = input.id;
        const value = input.value.trim();

        // Validar campos vacíos
        if (!value) {
            showError(input, inputType === "name" ? errorMessages.name : errorMessages.empty);
            return false;
        }

        // Validar términos y condiciones
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
        // Validar otros campos con patrones
        else if (patterns[inputType]) {
            if (!patterns[inputType].test(value)) {
                showError(input, errorMessages[inputType]);
                return false;
            }
        }

        clearError(input);
        return true;
    }

    // Habilitar el botón de enviar solo cuando el usuario acepte los términos
    aceptTerms.addEventListener("change", () => {
        btnSubmit.disabled = !aceptTerms.checked;
    });

    // Validación en tiempo real mientras el usuario escribe
    inputs.forEach((input) => {
        input.addEventListener("input", () => {
            validateField(input);
        });
    });

    // Validación y envío del formulario
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
            // Crear objeto JSON con los datos del usuario, excluyendo el botón de envío
            const userData = {};
            inputs.forEach((input) => {
                if (input.id !== "confirm-password") {
                    userData[input.id] = input.type === "checkbox" ? input.checked : input.value.trim();
                }
            });

            // Encriptar la contraseña
            const encryptedPassword = await hashPassword(userData.password);
            userData.password = encryptedPassword;

            // Obtener usuarios existentes o inicializar un array vacío
            const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
            existingUsers.push(userData);

            // Guardar en localStorage
            localStorage.setItem("users", JSON.stringify(existingUsers));

            // Mostrar mensaje de éxito
            const messageContainer = document.querySelector("#success-message");
            messageContainer.innerHTML = `<p style="color: green; font-weight: bold;">Registro exitoso.</p>`;

            // Deshabilitar el botón y resetear formulario después de 3 segundos
            btnSubmit.disabled = true;
            setTimeout(() => {
                form.reset();
                messageContainer.innerHTML = "";
            }, 3000);
        }
    });

    // Función para encriptar la contraseña usando SHA-256
    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
        return hashHex;
    }
});
