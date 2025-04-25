document.addEventListener('DOMContentLoaded', function() {
    const ventaDetalleListTbody = document.getElementById('venta-detalle-list');
    const ventaCabeceraListTbody = document.getElementById('venta-cabecera-list');
    const generarReportePdfButton = document.getElementById('generar-reporte-pdf');

    let ventaDetalle = [
        { detalle_id: 1, venta_id: 1001, libro_id: 1, cantidad: 1, subtotal: 25.00 },
        { detalle_id: 2, venta_id: 1001, libro_id: 2, cantidad: 2, subtotal: 61.00 },
        { detalle_id: 3, venta_id: 1002, libro_id: 1, cantidad: 1, subtotal: 25.00 }
    ];

    let ventaCabecera = [
        { venta_id: 1001, cliente_id: 101, fecha_venta: '2025-04-24', total: 86.00 },
        { venta_id: 1002, cliente_id: 102, fecha_venta: '2025-04-25', total: 25.00 }
    ];

    function mostrarVentaDetalle(detalles = ventaDetalle) {
        ventaDetalleListTbody.innerHTML = '';
        detalles.forEach(detalle => {
            const row = ventaDetalleListTbody.insertRow();
            row.insertCell().textContent = detalle.detalle_id;
            row.insertCell().textContent = detalle.venta_id;
            row.insertCell().textContent = detalle.libro_id;
            row.insertCell().textContent = detalle.cantidad;
            row.insertCell().textContent = detalle.subtotal.toFixed(2);
        });
    }

    function mostrarVentaCabecera(cabeceras = ventaCabecera) {
        ventaCabeceraListTbody.innerHTML = '';
        cabeceras.forEach(cabecera => {
            const row = ventaCabeceraListTbody.insertRow();
            row.insertCell().textContent = cabecera.venta_id;
            row.insertCell().textContent = cabecera.cliente_id;
            row.insertCell().textContent = cabecera.fecha_venta;
            row.insertCell().textContent = cabecera.total.toFixed(2);
        });
    }

    function generarReportePDF() {
    // Cargar la librería jsPDF dinámicamente si no está cargada
    if (typeof jsPDF === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = crearDocumentoPDF; // Asigna la función directamente al onload
        script.onerror = () => {
            console.error('Error al cargar la librería jsPDF.');
        };
        document.head.appendChild(script);
    } else {
        crearDocumentoPDF();
    }
}

function generarReportePDF() {
    // Cargar la librería jsPDF dinámicamente si no está cargada
    if (typeof jsPDF === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = function() {
            // Ahora jsPDF debería estar definido, llamamos a la función para crear el PDF
            crearDocumentoPDF();
        };
        script.onerror = () => {
            console.error('Error al cargar la librería jsPDF.');
        };
        document.head.appendChild(script);
    } else {
        // jsPDF ya está definido, podemos crear el PDF directamente
        crearDocumentoPDF();
    }
}

function crearDocumentoPDF() {
    if (typeof jsPDF !== 'undefined') {
        const pdf = new jsPDF();
        let y = 20;
        const lineHeight = 10;

        pdf.setFontSize(16);
        pdf.text('Reporte de Ventas', 10, y);
        y += 20;

        pdf.setFontSize(12);
        pdf.text('Detalles de Venta:', 10, y);
        y += lineHeight;

        // Encabezado de la tabla de detalles
        const detalleColumnas = ['ID Detalle', 'ID Venta', 'ID Libro', 'Cantidad', 'Subtotal'];
        let x = 10;
        detalleColumnas.forEach(col => {
            pdf.text(col, x, y);
            x += 30;
        });
        y += lineHeight - 2;
        pdf.line(10, y, x - 10, y);
        y += 2;

        // Datos de la tabla de detalles
        ventaDetalle.forEach(detalle => {
            x = 10;
            pdf.text(detalle.detalle_id.toString(), x, y); x += 30;
            pdf.text(detalle.venta_id.toString(), x, y); x += 30;
            pdf.text(detalle.libro_id.toString(), x, y); x += 30;
            pdf.text(detalle.cantidad.toString(), x, y); x += 30;
            pdf.text(detalle.subtotal.toFixed(2), x, y);
            y += lineHeight;
            if (y > pdf.internal.pageSize.height - 20) {
                pdf.addPage();
                y = 20;
            }
        });

        y += 10;
        pdf.text('Cabecera de Venta:', 10, y);
        y += lineHeight;

        // Encabezado de la tabla de cabecera
        const cabeceraColumnas = ['ID Venta', 'ID Cliente', 'Fecha Venta', 'Total'];
        x = 10;
        cabeceraColumnas.forEach(col => {
            pdf.text(col, x, y);
            x += 40;
        });
        y += lineHeight - 2;
        pdf.line(10, y, x - 10, y);
        y += 2;

        // Datos de la tabla de cabecera
        ventaCabecera.forEach(cabecera => {
            x = 10;
            pdf.text(cabecera.venta_id.toString(), x, y); x += 40;
            pdf.text(cabecera.cliente_id.toString(), x, y); x += 40;
            pdf.text(cabecera.fecha_venta, x, y); x += 40;
            pdf.text(cabecera.total.toFixed(2), x, y);
            y += lineHeight;
            if (y > pdf.internal.pageSize.height - 20) {
                pdf.addPage();
                y = 20;
            }
        });

        pdf.save('reporte_ventas.pdf');
    } else {
        console.error('La librería jsPDF no se ha cargado correctamente.');
    }
}

    generarReportePdfButton.addEventListener('click', generarReportePDF);

    mostrarVentaDetalle();
    mostrarVentaCabecera();
});
