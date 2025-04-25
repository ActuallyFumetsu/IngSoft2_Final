document.addEventListener('DOMContentLoaded', function() {
    const clientListTbody = document.getElementById('client-list');
    const searchInput = document.getElementById('search-input');

    let clientes = [
        { cliente_id: 101, nombre: 'Juan Pérez', email: 'juan.perez@example.com', telefono: '0981 123456' },
        { cliente_id: 102, nombre: 'María González', email: 'maria.gonzalez@example.com', telefono: '0982 987654' },
        { cliente_id: 103, nombre: 'Carlos López', email: 'carlos.lopez@example.com', telefono: '0971 555111' }
    ];

    function mostrarClientes(clientesParaMostrar = clientes) {
        clientListTbody.innerHTML = '';
        clientesParaMostrar.forEach(cliente => {
            const row = clientListTbody.insertRow();
            row.insertCell().textContent = cliente.cliente_id;
            row.insertCell().textContent = cliente.nombre;
            row.insertCell().textContent = cliente.email;
            row.insertCell().textContent = cliente.telefono;
        });
    }

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const clientesFiltrados = clientes.filter(cliente =>
            cliente.nombre.toLowerCase().includes(searchTerm)
        );
        mostrarClientes(clientesFiltrados);
    });

    mostrarClientes(); // Inicializar la lista de clientes
});
