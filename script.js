// Usuarios predefinidos
const usuarios = [
  { username: "usuario", password: "usuario123", rol: "usuario" },
  { username: "empleado", password: "empleado123", rol: "empleado" },
  { username: "admin", password: "admin123", rol: "admin" }
];

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("error-msg");

  // Buscar usuario en la lista de usuarios predefinidos
  const user = usuarios.find(u => u.username === username && u.password === password);

  if (user) {
    // Guardamos al usuario actual en el localStorage
    localStorage.setItem("usuarioActual", JSON.stringify(user));

    // Redirigir según el rol
    if (user.rol === "admin") {
      window.location.href = "admin.html";  // Página que crearemos después
    } else if (user.rol === "empleado") {
      window.location.href = "empleado.html";  // Página que crearemos después
    } else if (user.rol === "usuario") {
      window.location.href = "usuario.html";  // Página que crearemos después
    }
  } else {
    // Si las credenciales son incorrectas, mostramos un mensaje de error
    errorMsg.textContent = "Usuario o contraseña incorrectos.";
    errorMsg.style.color = "red";
  }
}

// script.js
document.addEventListener("DOMContentLoaded", function() {
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Mostrar usuarios en la tabla
  function loadUsers() {
    const tableBody = document.querySelector("#users-table tbody");
    tableBody.innerHTML = "";

    usuarios.forEach((user, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.username}</td>
        <td>${user.rol}</td>
        <td>
          <button onclick="editUser(${index})">Editar</button>
          <button onclick="deleteUser(${index})">Eliminar</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Añadir un nuevo usuario
  function addUser(event) {
    event.preventDefault();

    const username = document.getElementById("new-username").value.trim();
    const password = document.getElementById("new-password").value.trim();
    const role = document.getElementById("new-role").value;

    if (username && password) {
      const newUser = { username, password, rol: role };

      usuarios.push(newUser);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      loadUsers();
      clearForm();
    }
  }

  // Editar un usuario
  window.editUser = function(index) {  // Usar window para que la función sea accesible globalmente
    const user = usuarios[index];
    document.getElementById("new-username").value = user.username;
    document.getElementById("new-password").value = user.password;
    document.getElementById("new-role").value = user.rol;

    // Cambiar el botón a "Guardar Cambios"
    const form = document.getElementById("user-form");
    const submitButton = form.querySelector("button");
    submitButton.textContent = "Guardar Cambios";
    submitButton.onclick = function(event) {
      saveChanges(event, index);
    };
  }

  // Guardar cambios después de editar
  function saveChanges(event, index) {
    event.preventDefault();

    const username = document.getElementById("new-username").value.trim();
    const password = document.getElementById("new-password").value.trim();
    const role = document.getElementById("new-role").value;

    if (username && password) {
      usuarios[index] = { username, password, rol: role };
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      loadUsers();
      clearForm();

      // Restaurar el texto y la función del botón
      const submitButton = event.target;
      submitButton.textContent = "Añadir Usuario";
      submitButton.onclick = addUser;  // Restaurar la acción de añadir
    }
  }

  // Eliminar un usuario
  window.deleteUser = function(index) {  // Usar window para que la función sea accesible globalmente
    if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      usuarios.splice(index, 1);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      loadUsers();
    }
  }

  // Limpiar el formulario
  function clearForm() {
    document.getElementById("new-username").value = "";
    document.getElementById("new-password").value = "";
    document.getElementById("new-role").value = "usuario";
  }

  // Evento de añadir usuario
  const form = document.getElementById("user-form");
  form.addEventListener("submit", addUser);

  // Cargar la lista de usuarios cuando la página se cargue
  loadUsers();
});

