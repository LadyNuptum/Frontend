
// =========  Cargar perfil del usuario =====

async function cargarPerfil() {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      console.error("No se encontró el userId en sessionStorage.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/usuarios/${userId}`);
      if (!response.ok) {
        throw new Error("Error al cargar los datos del usuario.");
      }
      const usuario = await response.json();
      // Actualizar vista del perfil
      document.getElementById("user-name").textContent = `${usuario.nombre} ${usuario.apellido}`;
      document.getElementById("user-email").textContent = `Correo: ${usuario.correo}`;
      document.getElementById("user-phone").textContent = `Teléfono: ${usuario.telefono}`;
      // Actualizar placeholders en el formulario de actualización
      document.getElementById("nombre").placeholder = usuario.nombre;
      document.getElementById("apellido").placeholder = usuario.apellido;
      document.getElementById("telefono").placeholder = usuario.telefono;
      document.getElementById("correo").placeholder = usuario.correo;
    } catch (error) {
      console.error(error);
    }
  }
  
  document.addEventListener("DOMContentLoaded", cargarPerfil);
  
  

  // ==========    Actualizar Perfil =========

  async function actualizarInformacion() {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      alert("No se encontró el ID del usuario. Inicia sesión nuevamente.");
      return;
    }
    
    // Recoger valores del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const correo = document.getElementById("correo").value.trim();
  
    // Aquí podrías agregar validaciones adicionales si lo deseas
    // Por ejemplo, validar que el teléfono tenga 10 dígitos, que el correo tenga formato válido, etc.
  
    const usuarioActualizado = {
      nombre,
      apellido,
      telefono,
      correo
    };
  
    try {
      const response = await fetch(`http://localhost:8080/usuarios/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(usuarioActualizado)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar la información.");
      }
      const updatedUser = await response.json();
      // Actualizar la vista de perfil
      document.getElementById("user-name").textContent = `${updatedUser.nombre} ${updatedUser.apellido}`;
      alert("Información actualizada correctamente.");
    } catch (error) {
      console.error(error);
      alert("Error al actualizar la información: " + error.message);
    }
  }

  
  // =======  Cambiar contraseña ===========

  async function cambiarContrasena() {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      alert("No se encontró el ID del usuario. Inicia sesión nuevamente.");
      return;
    }
    
    const currentPassword = document.getElementById("current-password").value.trim();
    const newPassword = document.getElementById("new-password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();
    
    if (newPassword !== confirmPassword) {
      alert("La nueva contraseña y su confirmación no coinciden.");
      return;
    }
    
    // Se podría agregar validaciones adicionales (mínimo 6 caracteres, etc.)
  
    // Se prepara el objeto usuario para actualizar la contraseña
    const usuarioActualizado = {
      // Se incluyen otros datos necesarios, o se puede enviar solo el campo contraseña
      contrasena: newPassword
    };
  
    try {
      const response = await fetch(`http://localhost:8080/usuarios/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(usuarioActualizado)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al cambiar la contraseña.");
      }
      alert("Contraseña actualizada correctamente.");
    } catch (error) {
      console.error(error);
      alert("Error al cambiar la contraseña: " + error.message);
    }
  }

  
//  ///==========   Pedidos del usuario =========

//  async function cargarHistorialPedidos() {
//     const userId = sessionStorage.getItem("userId");
//     if (!userId) {
//       console.error("No se encontró el userId.");
//       return;
//     }
//     try {
//       const response = await fetch(`http://localhost:8080/pedidos/usuario/${userId}`);
//       if (!response.ok) {
//         throw new Error("Error al cargar el historial de pedidos.");
//       }
//       const pedidos = await response.json();
//       const tbody = document.querySelector("#account-order-history tbody");
//       if (!tbody) {
//         console.error("No se encontró el tbody de historial de pedidos.");
//         return;
//       }
//       tbody.innerHTML = "";
//       pedidos.forEach(pedido => {
//         const tr = document.createElement("tr");
//         tr.innerHTML = `
//           <td>${pedido.idPedido}</td>
//           <td>${new Date(pedido.fechaPedido).toLocaleDateString()}</td>
//           <td>$ ${pedido.total.toLocaleString("es-CO", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
//           <td>${pedido.estado}</td>
//         `;
//         tbody.appendChild(tr);
//       });
//     } catch (error) {
//       console.error(error);
//       alert("Error al cargar el historial de pedidos: " + error.message);
//     }
//   }
  
//   document.addEventListener("DOMContentLoaded", cargarHistorialPedidos);
  