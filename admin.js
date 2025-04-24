document.addEventListener('DOMContentLoaded', function() {
    const userCountSpan = document.getElementById('user-count');
    const addUserForm = document.getElementById('add-user-form');
    const deleteUserForm = document.getElementById('delete-user-form');
    const addMessageDiv = document.getElementById('add-message');
    const deleteMessageDiv = document.getElementById('delete-message');

    // Simulación de almacenamiento de usuarios (en un entorno real, esto estaría en el backend)
    const users = {
        'usuario': 'clave123',
        'empleado': 'trabajo456'
        // 'admin': 'secreto789' - No se incluye aquí para no poder eliminarlo desde la interfaz
    };

    function updateUserCount() {
        userCountSpan.textContent = Object.keys(users).length;
    }

    updateUserCount(); // Inicializar el contador

    addUserForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const newUsername = document.getElementById('new-username').value;
        const newPassword = document.getElementById('new-password').value;
        const newRole = document.getElementById('new-role').value;

        if (users.hasOwnProperty(newUsername)) {
            addMessageDiv.textContent = `El usuario "${newUsername}" ya existe.`;
            addMessageDiv.className = 'message error';
        } else if (newUsername === 'admin') {
            addMessageDiv.textContent = 'No se puede añadir un usuario con el nombre "admin".';
            addMessageDiv.className = 'message error';
        } else if (newUsername && newPassword) {
            users[newUsername] = newPassword;
            updateUserCount();
            addMessageDiv.textContent = `Usuario "${newUsername}" (${newRole}) añadido con éxito.`;
            addMessageDiv.className = 'message success';
            addUserForm.reset();
        } else {
            addMessageDiv.textContent = 'Por favor, completa todos los campos para añadir un usuario.';
            addMessageDiv.className = 'message error';
        }
    });

    deleteUserForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const deleteUsernameInput = document.getElementById('delete-username');
        const deleteUsername = deleteUsernameInput.value;

        if (deleteUsername === 'admin') {
            deleteMessageDiv.textContent = 'No se puede eliminar al usuario "admin".';
            deleteMessageDiv.className = 'message error';
        } else if (users.hasOwnProperty(deleteUsername)) {
            delete users[deleteUsername];
            updateUserCount();
            deleteMessageDiv.textContent = `Usuario "${deleteUsername}" eliminado con éxito.`;
            deleteMessageDiv.className = 'message success';
            deleteUserForm.reset();
        } else {
            deleteMessageDiv.textContent = `El usuario "${deleteUsername}" no existe.`;
            deleteMessageDiv.className = 'message error';
        }
    });
});
