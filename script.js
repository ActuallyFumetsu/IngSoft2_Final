document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const messageDiv = document.getElementById('message');

    // Simulación de usuarios por defecto (en un entorno real, esto vendría del backend)
    const defaultUsers = {
        'usuario': 'clave123',
        'empleado': 'trabajo456',
        'admin': 'secreto789'
    };

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe de la forma predeterminada

        const username = usernameInput.value;
        const password = passwordInput.value;

        if (defaultUsers.hasOwnProperty(username) && defaultUsers[username] === password) {
            if (username === 'admin') {
                window.location.href = 'admin.html';
            } else if (username === 'empleado') {
                window.location.href = 'empleado.html';
            } else {
                messageDiv.textContent = `¡Bienvenido, ${username} (usuario)! Inicio de sesión exitoso.`;
                messageDiv.className = 'message success';
                console.log(`Usuario ${username} (usuario) ha iniciado sesión.`);
                // Aquí podrías redirigir a la página correspondiente para usuarios
                // Por ejemplo: window.location.href = `/usuario-dashboard.html`;
            }
        } else {
            messageDiv.textContent = 'Credenciales incorrectas. Inténtalo de nuevo.';
            messageDiv.className = 'message error';
        }

        // Limpiar los campos después de intentar iniciar sesión (opcional)
        usernameInput.value = '';
        passwordInput.value = '';
    });
});
