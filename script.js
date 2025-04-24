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
            let role = '';
            if (username === 'admin') {
                role = 'administrador';
            } else if (username === 'empleado') {
                role = 'empleado';
            } else {
                role = 'usuario';
            }
            messageDiv.textContent = `¡Bienvenido, ${username} (${role})! Inicio de sesión exitoso.`;
            messageDiv.className = 'message success';
            // Aquí podrías redirigir al usuario a su panel correspondiente
            console.log(`Usuario ${username} (${role}) ha iniciado sesión.`);
            // Por ejemplo: window.location.href = `/${role}-dashboard.html`;
        } else {
            messageDiv.textContent = 'Credenciales incorrectas. Inténtalo de nuevo.';
            messageDiv.className = 'message error';
        }

        // Limpiar los campos después de intentar iniciar sesión (opcional)
        usernameInput.value = '';
        passwordInput.value = '';
    });
});
