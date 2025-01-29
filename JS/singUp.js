// Seleccionar el formulario y todos los inputs
const form = document.querySelector('.form-register');
const inputs = form.querySelectorAll('input');

// Definir patrones de validación
const patterns = {
    name: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]{2,30}$/,
    lastName: /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]{2,30}$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    phone: /^[0-9]{10}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ // La contraseña debe tener al menos 8 caracteres, una letra y un número
};

// Mensajes de error para cada campo
const errorMessages = {
    name: 'El nombre debe contener solo letras y tener entre 2 y 30 caracteres',
    lastName: 'El apellido debe contener solo letras y tener entre 2 y 30 caracteres',
    email: 'Ingrese un correo electrónico válido',
    phone: 'El teléfono debe contener 10 dígitos numéricos',
    password: 'La contraseña debe tener al menos 8 caracteres, una letra y un número',
    'confirm-password': 'Las contraseñas no coinciden',
    acept: 'Debe aceptar los términos y condiciones'
};

// Función para crear y mostrar mensaje de error
function showError(input, message) {
    const parentDiv = input.parentElement;
    
    // Eliminar mensaje de error anterior si existe
    const existingError = parentDiv.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Crear nuevo mensaje de error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    
    // Agregar borde rojo al input
    input.style.border = '2px solid red';
    
    // Insertar mensaje después del input
    parentDiv.appendChild(errorDiv);
}

// Función para limpiar error
function clearError(input) {
    const parentDiv = input.parentElement;
    const errorDiv = parentDiv.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
    input.style.border = '1px solid #ccc';
}

// Función para validar un campo
function validateField(input) {
    const inputType = input.id;
    const inputValue = input.value.trim();
    
    // Validación del checkbox (términos y condiciones)
    if (inputType === 'acept') {
        if (!input.checked) {
            showError(input, errorMessages[inputType]);
            return false;
        }
        clearError(input);
        return true;
    }
    
    // Validación de campos vacíos
    if (inputValue === '' && input.required) {
        showError(input, 'Este campo es obligatorio');
        return false;
    }
    
    // Validación de campo confirmar contraseña
    if (inputType === 'confirm-password') {
        const password = document.getElementById('password').value;
        if (inputValue !== password) {
            showError(input, errorMessages[inputType]);
            return false;
        }
        clearError(input);
        return true;
    }
    
    // Validación de patrones para otros campos
    if (patterns[inputType]) {
        if (!patterns[inputType].test(inputValue)) {
            showError(input, errorMessages[inputType]);
            return false;
        }
    }
    
    clearError(input);
    return true;
}


// Validación al enviar el formulario
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;

    inputs.forEach(input => {
        // Validar todos los campos, incluida la contraseña
        if (!validateField(input)) {
            isValid = false; // Si hay un campo no válido, se establece isValid a false.
        }
        
        // Verificar si el campo está vacío antes de enviar
        if (input.required && input.value.trim() === '') {
            showError(input, 'Este campo es obligatorio'); // Mostrar mensaje si está vacío.
            isValid = false; 
        }
    });
    
    // Validación específica para el checkbox de términos y condiciones
    const aceptCheckbox = document.getElementById('acept');
    if (!aceptCheckbox.checked) {
        showError(aceptCheckbox, errorMessages['acept']);
        isValid = false;
    }
    
    if (isValid) {
        // Aquí puedes agregar el código para enviar el formulario
        console.log('Formulario válido, enviando datos...');
        form.submit(); // Envía el formulario si es válido.
    } else {
        console.log('Formulario inválido, por favor corrige los errores.');
    }
});

