// Eliminar el sistema local de facturas y mantener solo las funciones del backend
const facturasManager = {
    async generarFactura(ordenId) {
        try {
            const response = await fetch(`/api/facturas/orden/${ordenId}`, {
                method: 'POST',
                headers: auth.getHeaders()
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al generar prefactura');
            }
            const factura = await response.json();
            
            // Obtener datos de la orden para la notificación
            const ordenResponse = await fetch(`/api/ordenes/${ordenId}`, {
                headers: auth.getHeaders()
            });
            const orden = await ordenResponse.json();
            
            // Generar notificación
            if (window.notificacionesUtils) {
                notificacionesUtils.notificarEventoFactura(factura, 'CREAR', orden);
            }
            
            return factura;
        } catch (error) {
            console.error('Error al generar prefactura:', error);
            throw error;
        }
    },

    async obtenerFacturasCliente(clienteId) {
        try {
            console.log('Obteniendo prefacturas para cliente ID:', clienteId);
            const response = await fetch(`/api/facturas/cliente/${clienteId}`, {
                headers: auth.getHeaders()
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al obtener prefacturas');
            }
            const prefacturas = await response.json();
            console.log('Prefacturas recibidas:', prefacturas);
            return prefacturas;
        } catch (error) {
            console.error('Error al obtener prefacturas:', error);
            throw error;
        }
    },

    async obtenerTodasLasPrefacturas() {
        try {
            const response = await fetch('/api/facturas', {
                headers: auth.getHeaders()
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al obtener prefacturas');
            }
            return await response.json();
        } catch (error) {
            console.error('Error al obtener prefacturas:', error);
            throw error;
        }
    },

    async eliminarFactura(facturaId) {
        try {
            const response = await fetch(`/api/facturas/${facturaId}`, {
                method: 'DELETE',
                headers: auth.getHeaders()
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al eliminar la prefactura');
            }
            return await response.json();
        } catch (error) {
            console.error('Error al eliminar prefactura:', error);
            throw error;
        }
    },

    async actualizarFactura(facturaId, datos) {
        try {
            const response = await fetch(`/api/facturas/${facturaId}`, {
                method: 'PUT',
                headers: auth.getHeaders(),
                body: JSON.stringify(datos)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar la prefactura');
            }
            const factura = await response.json();
            
            // Obtener datos de la orden para la notificación
            const ordenResponse = await fetch(`/api/ordenes/${factura.ordenId}`, {
                headers: auth.getHeaders()
            });
            const orden = await ordenResponse.json();
            
            // Generar notificación
            if (window.notificacionesUtils) {
                notificacionesUtils.notificarEventoFactura(factura, 'ACTUALIZAR', orden);
            }
            
            return factura;
        } catch (error) {
            console.error('Error al actualizar prefactura:', error);
            throw error;
        }
    }
};

// Función para mostrar lista de prefacturas
async function mostrarListaPrefacturas() {
    try {
        console.log('Iniciando mostrarListaPrefacturas...');
        
        // Obtener el elemento contenedor
        const prefacturasContainer = document.getElementById('facturasDatos');
        if (!prefacturasContainer) {
            console.error('No se encontró el contenedor de prefacturas');
            return;
        }
        console.log('Contenedor de prefacturas encontrado:', prefacturasContainer);

        // Mostrar indicador de carga
        prefacturasContainer.innerHTML = `
            <div class="col-12 text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando prefacturas...</span>
                </div>
            </div>
        `;

        // Obtener las prefacturas
        let prefacturas;
        const usuarioInfo = window.getUserInfo();
        console.log('Información del usuario:', usuarioInfo);
        
        if (!usuarioInfo) {
            console.error('No se pudo obtener la información del usuario');
            prefacturasContainer.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-danger">
                        <i class="fas fa-exclamation-circle"></i> Error: No se pudo obtener la información del usuario
                    </div>
                </div>
            `;
            return;
        }
        
        try {
            if (usuarioInfo.tipo === 'CLIENTE') {
                console.log('Obteniendo prefacturas para cliente:', usuarioInfo.id);
                // Si es cliente, obtener solo sus prefacturas
                prefacturas = await facturasManager.obtenerFacturasCliente(usuarioInfo.id);
            } else {
                console.log('Obteniendo todas las prefacturas');
                // Si es admin o trabajador, obtener todas
                prefacturas = await facturasManager.obtenerTodasLasPrefacturas();
            }
            console.log('Respuesta del servidor:', prefacturas);
        } catch (error) {
            console.error('Error al obtener prefacturas:', error);
            prefacturasContainer.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-danger">
                        <i class="fas fa-exclamation-circle"></i> Error al cargar las prefacturas: ${error.message}
                    </div>
                </div>
            `;
            return;
        }

        // Limpiar el contenedor
        prefacturasContainer.innerHTML = '';
        
        if (!prefacturas || prefacturas.length === 0) {
            console.log('No hay prefacturas disponibles');
            prefacturasContainer.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-info">
                        <i class="fas fa-info-circle"></i> No hay prefacturas disponibles
                    </div>
                </div>
            `;
            return;
        }

        // Crear el contenedor de la tabla
        const tableContainer = document.createElement('div');
        tableContainer.className = 'table-responsive';
        
        // Crear la tabla
        const table = document.createElement('table');
        table.className = 'table table-striped table-hover';
        
        // Crear el encabezado de la tabla
        table.innerHTML = `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Orden</th>
                    <th>Cliente</th>
                    <th>Fecha Solicitada</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${prefacturas.map(prefactura => {
                    // Verificar si el usuario es administrador
                    const esAdmin = usuarioInfo.tipo === 'ADMIN';
                    
                    return `
                    <tr>
                        <td>${prefactura.id}</td>
                        <td>#${prefactura.ordenId}</td>
                        <td>${prefactura.orden?.cliente?.usuario?.nombre || 'N/A'}</td>
                        <td>${prefactura.orden?.fechaProgramada ? 
                            new Date(prefactura.orden.fechaProgramada).toLocaleDateString() : 
                            new Date(prefactura.fechaEmision).toLocaleDateString()}</td>
                        <td>$${prefactura.total.toFixed(2)}</td>
                        <td>
                            <span class="badge bg-success">
                                ${prefactura.estado || 'COMPLETADA'}
                            </span>
                        </td>
                        <td>
                            <div class="btn-group">
                                <button class="btn btn-sm btn-primary" onclick="descargarFactura(${prefactura.id})">
                                    <i class="fas fa-download"></i>
                                </button>
                                <button class="btn btn-sm btn-info" onclick="imprimirFactura(${prefactura.id})">
                                    <i class="fas fa-print"></i>
                                </button>
                                ${esAdmin ? `
                                <button class="btn btn-sm btn-danger" onclick="eliminarFactura(${prefactura.id})">
                                    <i class="fas fa-trash"></i>
                                </button>
                                ` : ''}
                            </div>
                        </td>
                    </tr>
                `}).join('')}
            </tbody>
        `;
        
        tableContainer.appendChild(table);
        prefacturasContainer.appendChild(tableContainer);
        
        console.log('Tabla de prefacturas creada exitosamente');
        
    } catch (error) {
        console.error('Error al mostrar prefacturas:', error);
        const prefacturasContainer = document.getElementById('facturasDatos');
        if (prefacturasContainer) {
            prefacturasContainer.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger">
                        <i class="fas fa-exclamation-circle"></i> Error al cargar las prefacturas: ${error.message}
                    </div>
            </div>
        `;
        }
    }
}

// Función para descargar prefactura en PDF
async function descargarFactura(prefacturaId) {
    try {
        // Mostrar indicador de carga
        mostrarAlerta('Generando PDF, por favor espere...', 'info');
        
        // Verificar que el usuario esté autenticado
        const usuarioInfo = window.getUserInfo();
        if (!usuarioInfo) {
            throw new Error('No hay sesión activa');
        }

        console.log('Iniciando descarga de prefactura:', prefacturaId);
        
        // Obtener el token para incluirlo en la URL
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No hay token de autenticación disponible');
        }
        
        // Abrir directamente en una nueva ventana para evitar problemas con Content-Type
        // Usamos el endpoint pdf-download que ya existe en el servidor
        const url = `/api/facturas/${prefacturaId}/pdf-download?token=${token}`;
        window.open(url, '_blank');
        
        // Mostrar mensaje de éxito
        mostrarAlerta('PDF abierto en nueva ventana', 'success');
    } catch (error) {
        console.error('Error al abrir prefactura:', error);
        mostrarAlerta(`Error al abrir la prefactura: ${error.message}`, 'danger');
    }
}

// Función para imprimir la prefactura
function imprimirFactura(prefacturaId) {
    // Crear una ventana de impresión
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
        mostrarAlerta('Por favor, permite las ventanas emergentes para imprimir', 'warning');
        return;
    }
    
    // Obtener la prefactura del DOM
    const prefacturaElement = document.querySelector(`.card:has(h5:contains("Prefactura #${prefacturaId}"))`);
    if (!prefacturaElement) {
        mostrarAlerta('No se pudo encontrar la prefactura para imprimir', 'danger');
        printWindow.close();
        return;
    }
    
    // Clonar el contenido para no modificar el original
    const prefacturaClone = prefacturaElement.cloneNode(true);
    
    // Preparar el contenido HTML para impresión
    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Prefactura #${prefacturaId} - EICMAPRI</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                }
                @media print {
                    .no-print {
                        display: none !important;
                    }
                }
                .print-header {
                    text-align: center;
                    margin-bottom: 30px;
                }
                .print-footer {
                    text-align: center;
                    margin-top: 30px;
                    font-size: 0.8rem;
                    color: #6c757d;
                }
            </style>
        </head>
        <body>
            <div class="print-header">
                <h2>EICMAPRI</h2>
                <p>Servicios Tecnológicos</p>
            </div>
            <div class="container">
                ${prefacturaClone.outerHTML}
            </div>
            <div class="print-footer">
                <p>Este documento es una representación impresa de la prefactura electrónica.</p>
                <p>Fecha de impresión: ${new Date().toLocaleString()}</p>
            </div>
            <script>
                // Ocultar botones que no deben imprimirse
                document.querySelectorAll('.btn').forEach(btn => {
                    btn.classList.add('no-print');
                });
                
                // Imprimir automáticamente
                window.onload = function() {
                    setTimeout(() => {
                        window.print();
                        setTimeout(() => window.close(), 500);
                    }, 500);
                };
            </script>
        </body>
        </html>
    `);
}

// Función para mostrar alertas
function mostrarAlerta(mensaje, tipo) {
    const alertaDiv = document.createElement('div');
    alertaDiv.className = `alert alert-${tipo} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    alertaDiv.style.zIndex = '9999';
    alertaDiv.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.body.appendChild(alertaDiv);
    
    setTimeout(() => {
        alertaDiv.remove();
    }, 3000);
}

// Función para eliminar una factura
async function eliminarFactura(facturaId) {
    // Confirmar la eliminación
    if (!confirm('¿Está seguro de que desea eliminar esta factura? Esta acción no se puede deshacer.')) {
        return;
    }

    try {
        // Mostrar cargando
        mostrarAlerta('Eliminando factura...', 'info');

        // Llamar al servicio para eliminar la factura
        await facturasManager.eliminarFactura(facturaId);

        // Mostrar mensaje de éxito
        mostrarAlerta('Factura eliminada correctamente', 'success');

        // Recargar la lista de facturas
        await mostrarListaPrefacturas();
    } catch (error) {
        console.error('Error al eliminar factura:', error);
        mostrarAlerta(`Error al eliminar la factura: ${error.message}`, 'danger');
    }
}

// Inicializar módulo de prefacturas
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando módulo de prefacturas...');
    
    // Verificar si existe la función showSection (definida en script.js)
    if (typeof window.showSection === 'function') {
        // Buscar todos los enlaces que llevan a la sección de prefacturas
        document.querySelectorAll('a[data-section="facturas"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Enlace de prefacturas clickeado');
                window.showSection('facturas');
                mostrarListaPrefacturas(); // Cargar las prefacturas
            });
        });
    } else {
        console.error('No se encontró la función showSection');
    }
    
    // Exportar funciones al objeto global
    window.mostrarListaPrefacturas = mostrarListaPrefacturas;
    window.mostrarListaFacturas = mostrarListaPrefacturas; // Mantener compatibilidad con nombre antiguo
    window.descargarFactura = descargarFactura;
    window.imprimirFactura = imprimirFactura;
    window.eliminarFactura = eliminarFactura;
    
    // Exponer el módulo de prefacturas
    window.facturasManager = facturasManager;
    
    console.log('Módulo de prefacturas inicializado correctamente');
});

// Inicializar la vista de facturas cuando se cargue la página
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('facturasDatos')) {
        mostrarListaPrefacturas();
    }
});