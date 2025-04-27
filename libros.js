document.addEventListener('DOMContentLoaded', function() {
    const addBookButton = document.getElementById('add-book-button');
    const addEditForm = document.getElementById('add-edit-form');
    const bookForm = document.getElementById('book-form');
    const libroIdInput = document.getElementById('libro-id');
    const tituloInput = document.getElementById('titulo');
    const autorIdInput = document.getElementById('autor_id');
    const generoIdInput = document.getElementById('genero_id');
    const estanteIdInput = document.getElementById('estante_id');
    const precioInput = document.getElementById('precio');
    const stockInput = document.getElementById('stock');
    const bookListTbody = document.getElementById('book-list');
    const cancelButton = document.getElementById('cancel-button');
    const formMessageDiv = document.getElementById('form-message');
    const searchInput = document.getElementById('search-input');

    let libros = [
        { libro_id: 1, titulo: 'Cien años de soledad', autor_id: 1, genero_id: 1, estante_id: 101, precio: 25.00, stock: 5 },
        { libro_id: 2, titulo: 'El Señor de los Anillos', autor_id: 2, genero_id: 2, estante_id: 102, precio: 30.50, stock: 3 }
    ];

    let editingBookId = null;

    function mostrarLibros(librosParaMostrar = libros) {
        bookListTbody.innerHTML = '';
        librosParaMostrar.forEach(libro => {
            const row = bookListTbody.insertRow();
            row.insertCell().textContent = libro.libro_id;
            row.insertCell().textContent = libro.titulo;
            row.insertCell().textContent = libro.autor_id;
            row.insertCell().textContent = libro.genero_id || '';
            row.insertCell().textContent = libro.estante_id || '';
            row.insertCell().textContent = libro.precio.toFixed(2);
            row.insertCell().textContent = libro.stock;

            const actionsCell = row.insertCell();
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.classList.add('edit');
            editButton.addEventListener('click', () => mostrarFormularioEditar(libro.libro_id));
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.classList.add('delete');
            deleteButton.addEventListener('click', () => eliminarLibro(libro.libro_id));
            actionsCell.appendChild(deleteButton);
        });
    }

    function mostrarFormulario(mostrar = true) {
        addEditForm.style.display = mostrar ? 'block' : 'none';
        formMessageDiv.textContent = '';
        formMessageDiv.className = 'message';
        bookForm.reset();
        libroIdInput.value = '';
        editingBookId = null;
    }

    function mostrarFormularioEditar(id) {
        const libro = libros.find(libro => libro.libro_id === id);
        if (libro) {
            libroIdInput.value = libro.libro_id;
            tituloInput.value = libro.titulo;
            autorIdInput.value = libro.autor_id;
            generoIdInput.value = libro.genero_id || '';
            estanteIdInput.value = libro.estante_id || '';
            precioInput.value = libro.precio;
            stockInput.value = libro.stock;
            addEditForm.style.display = 'block';
            editingBookId = id;
        }
    }

    function guardarLibro(event) {
        event.preventDefault();
        const libroData = {
            libro_id: editingBookId ? parseInt(libroIdInput.value) : (libros.length > 0 ? Math.max(...libros.map(l => l.libro_id)) + 1 : 1),
            titulo: tituloInput.value,
            autor_id: parseInt(autorIdInput.value),
            genero_id: generoIdInput.value ? parseInt(generoIdInput.value) : null,
            estante_id: estanteIdInput.value ? parseInt(estanteIdInput.value) : null,
            precio: parseFloat(precioInput.value),
            stock: parseInt(stockInput.value)
        };

        if (editingBookId) {
            const index = libros.findIndex(libro => libro.libro_id === editingBookId);
            if (index !== -1) {
                libros[index] = libroData;
                formMessageDiv.textContent = `Libro "${libroData.titulo}" editado con éxito.`;
                formMessageDiv.className = 'message success';
            }
        } else {
            libros.push(libroData);
            formMessageDiv.textContent = `Libro "${libroData.titulo}" añadido con éxito.`;
            formMessageDiv.className = 'message success';
        }

        mostrarLibros();
        mostrarFormulario(false);
    }

    function eliminarLibro(id) {
        libros = libros.filter(libro => libro.libro_id !== id);
        mostrarLibros();
    }

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const librosFiltrados = libros.filter(libro =>
            libro.titulo.toLowerCase().includes(searchTerm)
        );
        mostrarLibros(librosFiltrados);
    });

    addBookButton.addEventListener('click', () => mostrarFormulario());
    cancelButton.addEventListener('click', () => mostrarFormulario(false));
    bookForm.addEventListener('submit', guardarLibro);

    mostrarLibros();
});
