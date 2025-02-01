// document.addEventListener("DOMContentLoaded", () => {
//     const form = document.querySelector(".form-register");
    
//     form.addEventListener("submit", (event) => {
//         event.preventDefault(); // Evita el envío del formulario
        
//         const formData = {
//             name: document.getElementById("name").value,
//             lastName: document.getElementById("lastName").value,
//             email: document.getElementById("email").value,
//             phone: document.getElementById("phone").value,
//             password: document.getElementById("password").value,
//             confirmPassword: document.getElementById("confirm-password").value,
//             acept: document.getElementById("acept").checked
//         };

//         // Validar que las contraseñas coincidan
//         if (formData.password !== formData.confirmPassword) {
//             alert("Las contraseñas no coinciden");
//             return;
//         }

//         // Guardar en localStorage
//         localStorage.setItem("userData", JSON.stringify(formData));
//         alert("Datos guardados correctamente");
//         form.reset();
//     });
// });



//* Ejemplo para local storaje y guardar en un archivo descargable
//// ejemplo localetorage 

// document.addEventListener("DOMContentLoaded", () => {
//     const form = document.querySelector(".form-register");
    
//     form.addEventListener("submit", (event) => {
//         event.preventDefault(); // Evita el envío del formulario
        
//         const formData = {
//             name: document.getElementById("name").value,
//             lastName: document.getElementById("lastName").value,
//             email: document.getElementById("email").value,
//             phone: document.getElementById("phone").value,
//             password: document.getElementById("password").value,
//             confirmPassword: document.getElementById("confirm-password").value,
//             acept: document.getElementById("acept").checked
//         };

//         // Validar que las contraseñas coincidan
//         if (formData.password !== formData.confirmPassword) {
//             alert("Las contraseñas no coinciden");
//             return;
//         }

//         // Guardar en localStorage
//         localStorage.setItem("userData", JSON.stringify(formData));
//         alert("Datos guardados correctamente");
//         form.reset();

//         // Guardar datos en un archivo JSON
//         saveDataToFile(formData);
//     });
// });

// function saveDataToFile(data) {
//     const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
//     const a = document.createElement("a");
//     a.href = URL.createObjectURL(blob);
//     a.download = "userData.json";
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
// }


document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form-register");
    let storedData = JSON.parse(localStorage.getItem("userRegisterData")) || [];
    
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita el envío del formulario
        
        const formData = {
            name: document.getElementById("name").value,
            lastName: document.getElementById("lastName").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            password: document.getElementById("password").value,
            acept: document.getElementById("acept").checked
        };

        // Validar que las contraseñas coincidan
        if (formData.password !== document.getElementById("confirm-password").value) {
            alert("Las contraseñas no coinciden");
            return;
        }

        // Agregar nuevos datos al arreglo y guardar en localStorage
        storedData.push(formData);
        localStorage.setItem("userRegisterData", JSON.stringify(storedData));
        saveDataToFile(storedData);
    });
});

function saveDataToFile(data) {
    const fileContent = "export default " + JSON.stringify(data, null, 2) + ";";
    const blob = new Blob([fileContent], { type: "application/javascript" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "register.js";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}


