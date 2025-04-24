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
