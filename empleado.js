document.addEventListener('DOMContentLoaded', function() {
    // --- SIMULACIÓN DE BASE DE DATOS ---
    let libros = [
        { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', genero: 'Ficción', estante: 'A1' },
        { id: 2, titulo: 'El Señor de los Anillos', autor: 'J.R.R. Tolkien', genero: 'Fantasía', estante: 'B3' }
        // ... más libros
    ];

    let autores = [
        { id: 1, nombre: 'Gabriel García Márquez' },
        { id: 2, nombre: 'J.R.R. Tolkien' }
        // ... más autores
    ];

    let generos = [
        { id: 1, nombre: 'Ficción' },
        { id: 2, nombre: 'Fantasía' }
        // ... más géneros
    ];

    let estantes = [
        { id: 1, codigo: 'A1' },
        { id: 2, codigo: 'B3' }
        // ... más estantes
    ];

    let ventasCabecera = [
        { id: 1, clienteId: 101, fecha: '2025-04-24' }
        // ... más encabezados de venta
    ];

    let ventasDetalle = [
        { id: 1, ventaId: 1, libroId: 1, cantidad: 1, precioUnitario: 25.00 }
        // ... más detalles de venta
    ];

    let clientes = [
        { id: 101, nombre: 'Juan Pérez' }
        // ... más clientes
    ];

    // --- FUNCIONES PARA GESTIONAR LIBROS ---
    function mostrarLibros() {
        console.log('Libros:', libros); // Por ahora, solo mostrar en consola
        // En la implementación real, aquí se actualizaría una tabla HTML
    }

    function agregarLibro(titulo, autor, genero, estante) {
        const nuevoId = libros.length > 0 ? Math.max(...libros.map(libro => libro.id)) + 1 : 1;
        const nuevoLibro = { id: nuevoId, titulo, autor, genero, estante };
        libros.push(nuevoLibro);
        console.log('Libro agregado:', nuevoLibro);
        mostrarLibros();
    }

    function editarLibro(id, nuevoTitulo, nuevoAutor, nuevoGenero, nuevoEstante) {
        const libroIndex = libros.findIndex(libro => libro.id === id);
        if (libroIndex !== -1) {
            libros[libroIndex] = { id, titulo: nuevoTitulo, autor: nuevoAutor, genero: nuevoGenero, estante: nuevoEstante };
            console.log('Libro editado:', libros[libroIndex]);
            mostrarLibros();
        } else {
            console.log(`No se encontró el libro con ID ${id}`);
        }
    }

    function eliminarLibro(id) {
        libros = libros.filter(libro => libro.id !== id);
        console.log(`Libro con ID ${id} eliminado.`);
        mostrarLibros();
    }

    // --- FUNCIONES PARA GESTIONAR AUTORES ---
    function mostrarAutores() {
        console.log('Autores:', autores);
    }

    function agregarAutor(nombre) {
        const nuevoId = autores.length > 0 ? Math.max(...autores.map(autor => autor.id)) + 1 : 1;
        const nuevoAutor = { id: nuevoId, nombre };
        autores.push(nuevoAutor);
        console.log('Autor agregado:', nuevoAutor);
        mostrarAutores();
    }

    function editarAutor(id, nuevoNombre) {
        const autorIndex = autores.findIndex(autor => autor.id === id);
        if (autorIndex !== -1) {
            autores[autorIndex] = { id, nombre: nuevoNombre };
            console.log('Autor editado:', autores[autorIndex]);
            mostrarAutores();
        } else {
            console.log(`No se encontró el autor con ID ${id}`);
        }
    }

    function eliminarAutor(id) {
        autores = autores.filter(autor => autor.id !== id);
        console.log(`Autor con ID ${id} eliminado.`);
        mostrarAutores();
    }

    // --- FUNCIONES PARA GESTIONAR GÉNEROS ---
    function mostrarGeneros() {
        console.log('Géneros:', generos);
    }

    function agregarGenero(nombre) {
        const nuevoId = generos.length > 0 ? Math.max(...generos.map(genero => genero.id)) + 1 : 1;
        const nuevoGenero = { id: nuevoId, nombre };
        generos.push(nuevoGenero);
        console.log('Género agregado:', nuevoGenero);
        mostrarGeneros();
    }

    function editarGenero(id, nuevoNombre) {
        const generoIndex = generos.findIndex(genero => genero.id === id);
        if (generoIndex !== -1) {
            generos[generoIndex] = { id, nombre: nuevoNombre };
            console.log('Género editado:', generos[generoIndex]);
            mostrarGeneros();
        } else {
            console.log(`No se encontró el género con ID ${id}`);
        }
    }

    function eliminarGenero(id) {
        generos = generos.filter(genero => genero.id !== id);
        console.log(`Género con ID ${id} eliminado.`);
        mostrarGeneros();
    }

    // --- FUNCIONES PARA GESTIONAR ESTANTES ---
    function mostrarEstantes() {
        console.log('Estantes:', estantes);
    }

    function agregarEstante(codigo) {
        const nuevoId = estantes.length > 0 ? Math.max(...estantes.map(estante => estante.id)) + 1 : 1;
        const nuevoEstante = { id: nuevoId, codigo };
        estantes.push(nuevoEstante);
        console.log('Estante agregado:', nuevoEstante);
        mostrarEstantes();
    }

    function editarEstante(id, nuevoCodigo) {
        const estanteIndex = estantes.findIndex(estante => estante.id === id);
        if (estanteIndex !== -1) {
            estantes[estanteIndex] = { id, codigo: nuevoCodigo };
            console.log('Estante editado:', estantes[estanteIndex]);
            mostrarEstantes();
        } else {
            console.log(`No se encontró el estante con ID ${id}`);
        }
    }

    function eliminarEstante(id) {
        estantes = estantes.filter(estante => estante.id !== id);
        console.log(`Estante con ID ${id} eliminado.`);
        mostrarEstantes();
    }

    // --- FUNCIONES PARA GESTIONAR VENTAS (CABECERA Y DETALLE) Y CLIENTES ---
    // (Se pueden crear funciones similares para estas entidades)

    // --- INICIALIZACIÓN Y PRUEBAS (POR AHORA EN CONSOLA) ---
    mostrarLibros();
    agregarLibro('1984', 'George Orwell', 'Ciencia Ficción', 'C2');
    editarLibro(1, 'Cien años de soledad', 'Gabriel García Márquez', 'Ficción Latinoamericana', 'A1');
    eliminarLibro(2);

    mostrarAutores();
    agregarAutor('Isabel Allende');
    editarAutor(1, 'Gabriel García Márquez Márquez');
    eliminarAutor(2);

    mostrarGeneros();
    agregarGenero('Misterio');
    editarGenero(1, 'Ficción');
    eliminarGenero(2);

    mostrarEstantes();
    agregarEstante('D4');
    editarEstante(1, 'A01');
    eliminarEstante(2);

    // ... (similar para ventas y clientes)
});

document.addEventListener('DOMContentLoaded', function() {
    // --- SIMULACIÓN DE BASE DE DATOS DE LIBROS ---
    let libros = [
        { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', genero: 'Ficción', estante: 'A1' },
        { id: 2, titulo: 'El Señor de los Anillos', autor: 'J.R.R. Tolkien', genero: 'Fantasía', estante: 'B3' }
    ];

    const addBookForm = document.getElementById('add-book-form');
    const bookListTbody = document.getElementById('book-list');
    const addBookMessageDiv = document.getElementById('add-book-message');

    // --- FUNCIONES PARA GESTIONAR LIBROS ---
    function mostrarLibros() {
        bookListTbody.innerHTML = ''; // Limpiar la tabla antes de actualizarla
        libros.forEach(libro => {
            const row = bookListTbody.insertRow();
            row.insertCell().textContent = libro.id;
            row.insertCell().textContent = libro.titulo;
            row.insertCell().textContent = libro.autor;
            row.insertCell().textContent = libro.genero;
            row.insertCell().textContent = libro.estante;
            const actionsCell = row.insertCell();
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            // Aquí se añadiría la lógica para editar
            actionsCell.appendChild(editButton);
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', () => eliminarLibro(libro.id));
            actionsCell.appendChild(deleteButton);
        });
    }

    function agregarLibro(titulo, autor, genero, estante) {
        const nuevoId = libros.length > 0 ? Math.max(...libros.map(libro => libro.id)) + 1 : 1;
        const nuevoLibro = { id: nuevoId, titulo, autor, genero, estante };
        libros.push(nuevoLibro);
        mostrarLibros();
        addBookMessageDiv.textContent = `Libro "${titulo}" añadido con éxito.`;
        addBookMessageDiv.className = 'message success';
        addBookForm.reset();
    }

    function eliminarLibro(id) {
        libros = libros.filter(libro => libro.id !== id);
        mostrarLibros();
        console.log(`Libro con ID ${id} eliminado.`);
    }

    // --- EVENT LISTENER PARA EL FORMULARIO DE AÑADIR LIBRO ---
    addBookForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const titulo = document.getElementById('book-title').value;
        const autor = document.getElementById('book-author').value;
        const genero = document.getElementById('book-genre').value;
        const estante = document.getElementById('book-shelf').value;
        agregarLibro(titulo, autor, genero, estante);
    });

    // --- INICIALIZACIÓN ---
    mostrarLibros(); // Mostrar los libros iniciales al cargar la página
});
