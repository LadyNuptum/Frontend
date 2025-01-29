const form = document.querySelector(".form-register");
const btnSubmit = document.querySelector(".btn-regiter");
const aceptTerms = document.getElementById("acept");
const inputs = form.querySelectorAll("input");

// Desactivar el botón
btnSubmit.disabled = true;

// Patrone
const patterns = {
    name: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]{2,30}$/,
    lastName: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]{2,30}$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    phone: /^[0-9]{10}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
};

// Mensajes de error
const errorMessages = {
    name: "El nombre debe tener entre 2 y 30 caracteres y solo letras.",
    lastName: "El apellido debe tener entre 2 y 30 caracteres y solo letras.",
    email: "Ingrese un correo electrónico válido.",
    phone: "El teléfono debe tener 10 dígitos numéricos.",
    password: "La contraseña debe tener al menos 8 caracteres, una letra y un número.",
    "confirm-password": "Las contraseñas no coinciden.",
    acept: "Debe aceptar los términos y condiciones."
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

    //validación 
function validateField(input) {
    const inputType = input.id;
    const value = input.value.trim();

    if (inputType === "acept") {
        if (!input.checked) {
            showError(input, errorMessages[inputType]);
            return false;
        }
    } else if (inputType === "confirm-password") {
        if (value !== document.getElementById("password").value) {
            showError(input, errorMessages[inputType]);
            return false;
        }
    } else if (patterns[inputType]) {
        if (!patterns[inputType].test(value)) {
            showError(input, errorMessages[inputType]);
            return false;
        }
    }

    clearError(input);
    return true;
}

// Habilitar botun
aceptTerms.addEventListener("change", () => {
    btnSubmit.disabled = !aceptTerms.checked;
});
            
form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;
    inputs.forEach(input => {
        if (!validateField(input)) isValid = false;
    });

    if (!aceptTerms.checked) {
        showError(aceptTerms, errorMessages["acept"]);
        isValid = false;
    }

    if (isValid) {
        // objeto JSON en consola
        const userData = {};
        inputs.forEach(input => {
            if (input.id !== "confirm-password" && input.id !== "acept") {
                userData[input.id] = input.value.trim();
            }
        });

        console.log("Usuario registrado:", JSON.stringify(userData, null, 2));

        // registro esxitoso
        const messageContainer = document.querySelector("#success-message");
        messageContainer.innerHTML = `<p style="color: green; font-weight: bold;">Registro exitoso.</p>`;

        // resets botón y formulari en 3 segundos
        btnSubmit.disabled = true;
        setTimeout(() => {
            form.reset();
            messageContainer.innerHTML = "";
        }, 3000);//milisegundos
    }
});