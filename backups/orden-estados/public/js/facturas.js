// Array para almacenar las facturas
let facturas = [];

// Función para mostrar una factura nueva
function showInvoice(selectedServices, totalCost) {
    // Crear objeto de factura con fecha actual
    const factura = {
        id: Date.now(), // ID único basado en timestamp
        services: selectedServices,
        totalCost: totalCost,
        date: new Date().toLocaleDateString()
    };
    
    // Agregar la factura al array
    facturas.push(factura);
    
    // Mostrar todas las facturas
    displayFacturas();
    
    // Mostrar la sección de facturas
    showSection('facturas');
}

// Función para mostrar todas las facturas
function displayFacturas() {
    const facturasDatos = document.getElementById('facturasDatos');
    facturasDatos.innerHTML = ''; // Limpiar contenido anterior
    
    // Mensaje si no hay facturas
    if (facturas.length === 0) {
        facturasDatos.innerHTML = '<div class="alert alert-info">No hay facturas generadas.</div>';
        return;
    }
    
    // Crear contenedor principal
    const containerDiv = document.createElement('div');
    containerDiv.className = 'row';
    
    // Crear tarjetas para cada factura
    facturas.forEach((factura, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'col-md-6 mb-4';
        
        // Crear tarjeta con Bootstrap
        cardDiv.innerHTML = `
            <div class="card">
                <div class="card-header bg-light">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">Factura #${index + 1}</h5>
                        <small>${factura.date}</small>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-sm">
                            <thead>
                                <tr>
                                    <th>Servicio</th>
                                    <th>Cantidad</th>
                                    <th class="text-end">Precio</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${factura.services.map(service => `
                                <tr>
                                    <td>${service.name}</td>
                                    <td>${service.quantity}</td>
                                    <td class="text-end">$${(service.price * service.quantity).toFixed(2)}</td>
                                </tr>
                                `).join('')}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th colspan="2">Total</th>
                                    <th class="text-end">$${factura.totalCost.toFixed(2)}</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div class="d-flex justify-content-end gap-2 mt-3">
                        <button class="btn btn-warning" onclick="modifyFactura(${index})">
                            <i class="bi bi-pencil-square"></i> Modificar
                        </button>
                        <button class="btn btn-danger" onclick="deleteFactura(${index})">
                            <i class="bi bi-trash"></i> Eliminar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        containerDiv.appendChild(cardDiv);
    });
    
    facturasDatos.appendChild(containerDiv);
}

// Función para modificar una factura existente
function modifyFactura(index) {
    const factura = facturas[index];
    
    // Cambiar a la sección de órdenes
    showSection('ordenes');
    
    // Asegurarse de que los servicios estén cargados
    loadServicesForOrders();
    
    // Esperar a que los servicios se carguen
    setTimeout(() => {
        // Limpiar selecciones anteriores
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Marcar los servicios de la factura
        factura.services.forEach(service => {
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                if (checkbox.getAttribute('data-nombre') === service.name) {
                    checkbox.checked = true;
                    
                    // Establecer la cantidad
                    const idServicio = checkbox.id.replace('servicio', '');
                    const cantidadInput = document.getElementById(`cantidad${idServicio}`);
                    if (cantidadInput) {
                        cantidadInput.value = service.quantity;
                    }
                }
            });
        });
        
        // Eliminar la factura anterior
        facturas.splice(index, 1);
        
        // Crear mensaje informativo
        const mensajeDiv = document.createElement('div');
        mensajeDiv.id = 'mensajeEdicion';
        mensajeDiv.className = 'alert alert-info mt-3';
        mensajeDiv.innerHTML = `
            <strong>Modo edición:</strong> 
            Está modificando una factura existente. 
            Ajuste los servicios y cantidades según necesite, 
            luego presione "Solicitar Servicios" para generar la factura actualizada.
        `;
        
        // Eliminar mensaje previo si existe
        const mensajeAnterior = document.getElementById('mensajeEdicion');
        if (mensajeAnterior) {
            mensajeAnterior.remove();
        }
        
        // Agregar mensaje al formulario
        const ordenesForm = document.getElementById('ordenesForm');
        ordenesForm.insertBefore(mensajeDiv, ordenesForm.querySelector('button[type="submit"]'));
        
        // Hacer scroll al inicio del formulario
        ordenesForm.scrollIntoView({ behavior: 'smooth' });
    }, 600);
}

// Función para eliminar una factura
function deleteFactura(index) {
    if (confirm('¿Está seguro de que desea eliminar esta factura?')) {
        facturas.splice(index, 1);
        displayFacturas();
    }
}

// Almacenar facturas en localStorage cuando se cierra la página
window.addEventListener('beforeunload', () => {
    localStorage.setItem('facturas', JSON.stringify(facturas));
});

// Cargar facturas desde localStorage al iniciar
document.addEventListener('DOMContentLoaded', () => {
    const facturasGuardadas = localStorage.getItem('facturas');
    if (facturasGuardadas) {
        facturas = JSON.parse(facturasGuardadas);
        displayFacturas(); // Mostrar las facturas guardadas
    }
});

const facturasManager = {
    async generarFactura(ordenId) {
        try {
            const response = await fetch(`/api/facturas/orden/${ordenId}`, {
                method: 'POST',
                headers: auth.getHeaders()
            });
            return await response.json();
        } catch (error) {
            console.error('Error al generar factura:', error);
            throw error;
        }
    },

    async obtenerFacturasCliente(clienteId) {
        try {
            const response = await fetch(`/api/facturas/cliente/${clienteId}`, {
                headers: auth.getHeaders()
            });
            return await response.json();
        } catch (error) {
            console.error('Error al obtener facturas:', error);
            throw error;
        }
    }
};

// Función para mostrar lista de facturas
async function mostrarListaFacturas() {
    try {
        // Obtener el elemento contenedor
        const facturasContainer = document.getElementById('facturasDatos');
        facturasContainer.innerHTML = `
            <div class="col-12 text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando facturas...</span>
                </div>
            </div>
        `;

        // Obtener las facturas
        let response;
        try {
            const usuarioInfo = window.getUserInfo();
            if (usuarioInfo.tipo === 'CLIENTE') {
                // Si es cliente, obtener solo sus facturas
                response = await fetch(`/api/facturas/cliente/${usuarioInfo.perfilId}`, {
                    headers: auth.getHeaders()
                });
            } else {
                // Si es admin o trabajador, obtener todas
                response = await fetch('/api/facturas', {
                    headers: auth.getHeaders()
                });
            }
            
            if (!response.ok) {
                throw new Error('Error al cargar facturas');
            }
        } catch (error) {
            console.error('Error al solicitar facturas:', error);
            facturasContainer.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-danger">
                        <i class="fas fa-exclamation-circle"></i> No se pudieron cargar las facturas: ${error.message}
                    </div>
                </div>
            `;
            return;
        }

        const facturas = await response.json();
        
        // Si no hay facturas
        if (!facturas || facturas.length === 0) {
            facturasContainer.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-info">
                        <i class="fas fa-info-circle"></i> No hay facturas disponibles.
                    </div>
                </div>
            `;
            return;
        }

        // Mostrar las facturas en un diseño de tarjetas
        const facturasHTML = facturas.map(factura => {
            // Formatear fecha
            const fecha = new Date(factura.fecha);
            const fechaFormateada = fecha.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            
            // Calcular IVA (16%)
            const iva = factura.subtotal * 0.16;
            
            // Construir el HTML para los servicios
            const serviciosHTML = factura.orden.servicios.map(s => {
                const servicio = s.servicio;
                const cantidad = s.cantidad;
                const precioUnitario = servicio.precioBase;
                const total = precioUnitario * cantidad;
                
                return `
                    <tr>
                        <td>${servicio.nombre}</td>
                        <td>${servicio.tipo === 'POR_HORA' ? 'Por hora' : 'Por cantidad'}</td>
                        <td class="text-center">${cantidad}</td>
                        <td class="text-end">$${precioUnitario.toLocaleString('es-CO')}</td>
                        <td class="text-end">$${total.toLocaleString('es-CO')}</td>
                    </tr>
                `;
            }).join('');
            
            // Datos del cliente
            const cliente = factura.orden.cliente?.usuario?.nombre || 'Cliente no disponible';
            const direccion = factura.orden.cliente?.direccion || 'No especificada';
            const telefono = factura.orden.cliente?.telefono || 'No especificado';
            
            return `
                <div class="col-md-12 mb-4">
                    <div class="card shadow-sm border-0">
                        <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                            <h5 class="mb-0">
                                <i class="fas fa-file-invoice-dollar me-2"></i>
                                Factura #${factura.id}
                            </h5>
                            <div class="badge bg-light text-dark">
                                <i class="fas fa-calendar-alt me-1"></i> ${fechaFormateada}
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row mb-4">
                                <div class="col-md-6">
                                    <h6 class="fw-bold text-primary">Información del Cliente</h6>
                                    <p class="mb-1"><strong>Cliente:</strong> ${cliente}</p>
                                    <p class="mb-1"><strong>Dirección:</strong> ${direccion}</p>
                                    <p class="mb-1"><strong>Teléfono:</strong> ${telefono}</p>
                                    <p class="mb-0"><strong>Orden:</strong> #${factura.orden.id}</p>
                                </div>
                                <div class="col-md-6 text-md-end">
                                    <h6 class="fw-bold text-primary">Información de la Factura</h6>
                                    <p class="mb-1"><strong>Estado:</strong> <span class="badge bg-success">Pagada</span></p>
                                    <p class="mb-1"><strong>Fecha de Orden:</strong> ${new Date(factura.orden.fechaCreacion).toLocaleDateString('es-ES')}</p>
                                    <p class="mb-0"><strong>Fecha de Vencimiento:</strong> ${new Date(fecha.getTime() + 30*24*60*60*1000).toLocaleDateString('es-ES')}</p>
                                </div>
                            </div>
                            
                            <h6 class="fw-bold text-primary mb-3">Detalle de Servicios</h6>
                            <div class="table-responsive mb-4">
                                <table class="table table-sm table-striped table-hover">
                                    <thead class="table-light">
                                        <tr>
                                            <th>Servicio</th>
                                            <th>Tipo</th>
                                            <th class="text-center">Cantidad</th>
                                            <th class="text-end">Precio Unitario</th>
                                            <th class="text-end">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${serviciosHTML}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th colspan="4" class="text-end">Subtotal:</th>
                                            <th class="text-end">$${factura.subtotal.toLocaleString('es-CO')}</th>
                                        </tr>
                                        <tr>
                                            <td colspan="4" class="text-end">IVA (16%):</td>
                                            <td class="text-end">$${iva.toLocaleString('es-CO')}</td>
                                        </tr>
                                        <tr class="table-primary">
                                            <th colspan="4" class="text-end fw-bold">TOTAL:</th>
                                            <th class="text-end">$${factura.total.toLocaleString('es-CO')}</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            
                            <!-- Sección de firmas -->
                            <div class="row mt-5 mb-4">
                                <div class="col-md-4 text-center">
                                    <div class="border-bottom border-dark" style="height: 40px;"></div>
                                    <p class="mt-2 mb-0">Firma Cliente</p>
                                </div>
                                <div class="col-md-4 text-center">
                                    <div class="border-bottom border-dark" style="height: 40px;"></div>
                                    <p class="mt-2 mb-0">Firma Técnico</p>
                                </div>
                                <div class="col-md-4 text-center">
                                    <div class="border-bottom border-dark" style="height: 40px;"></div>
                                    <p class="mt-2 mb-0">Sello Empresa</p>
                                </div>
                            </div>
                            
                            <div class="mt-4 text-end">
                                <button class="btn btn-secondary me-2" onclick="imprimirFactura(${factura.id})">
                                    <i class="fas fa-print me-1"></i> Imprimir
                                </button>
                                <button class="btn btn-primary" onclick="descargarFactura(${factura.id})">
                                    <i class="fas fa-download me-1"></i> Descargar PDF
                                </button>
                            </div>
                        </div>
                        <div class="card-footer text-muted">
                            <div class="row">
                                <div class="col-md-6">
                                    <small>
                                        <i class="fas fa-info-circle me-1"></i>
                                        Esta factura fue generada automáticamente al crear la orden de trabajo.
                                    </small>
                                </div>
                                <div class="col-md-6 text-end">
                                    <small>EICMAPRI - Servicios Tecnológicos</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        // Actualizar el contenedor
        facturasContainer.innerHTML = `
            <div class="row">
                <div class="col-12 mb-4">
                    <div class="alert alert-info">
                        <i class="fas fa-info-circle me-2"></i>
                        Las facturas se generan automáticamente al crear órdenes de trabajo. 
                        Puede descargarlas en formato PDF o imprimirlas haciendo clic en los botones correspondientes.
                    </div>
                </div>
                ${facturasHTML}
            </div>
        `;
        
    } catch (error) {
        console.error('Error al mostrar facturas:', error);
        const facturasContainer = document.getElementById('facturasDatos');
        facturasContainer.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger">
                    <i class="fas fa-exclamation-circle"></i> Error al procesar las facturas: ${error.message}
                </div>
            </div>
        `;
    }
}

// Función para descargar factura en PDF
async function descargarFactura(facturaId) {
    try {
        // Mostrar indicador de carga
        mostrarAlerta('Generando PDF, por favor espere...', 'info');
        
        // Obtener el token de autenticación
        const token = localStorage.getItem('token');
        
        // Solicitar el PDF al servidor
        const response = await fetch(`/api/facturas/${facturaId}/pdf`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`Error al generar PDF: ${response.status}`);
        }
        
        // Convertir la respuesta a blob
        const blob = await response.blob();
        
        // Crear URL para el blob
        const url = window.URL.createObjectURL(blob);
        
        // Crear enlace de descarga
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `factura-${facturaId}.pdf`;
        
        // Añadir al documento y hacer clic
        document.body.appendChild(a);
        a.click();
        
        // Limpiar
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        mostrarAlerta('PDF descargado correctamente', 'success');
    } catch (error) {
        console.error('Error al descargar factura:', error);
        mostrarAlerta(`Error al descargar factura: ${error.message}`, 'danger');
    }
}

// Función para imprimir la factura
function imprimirFactura(facturaId) {
    // Crear una ventana de impresión
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
        mostrarAlerta('Por favor, permite las ventanas emergentes para imprimir', 'warning');
        return;
    }
    
    // Obtener la factura del DOM
    const facturaElement = document.querySelector(`.card:has(h5:contains("Factura #${facturaId}"))`);
    if (!facturaElement) {
        mostrarAlerta('No se pudo encontrar la factura para imprimir', 'danger');
        printWindow.close();
        return;
    }
    
    // Clonar el contenido para no modificar el original
    const facturaClone = facturaElement.cloneNode(true);
    
    // Preparar el contenido HTML para impresión
    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Factura #${facturaId} - EICMAPRI</title>
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
                ${facturaClone.outerHTML}
            </div>
            <div class="print-footer">
                <p>Este documento es una representación impresa de la factura electrónica.</p>
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

// Inicializar módulo de facturas
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si existe la función showSection (definida en script.js)
    if (typeof window.showSection === 'function') {
        // Buscar todos los enlaces que llevan a la sección de facturas
        document.querySelectorAll('a[data-section="facturas"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                window.showSection('facturas');
                mostrarListaFacturas(); // Cargar las facturas
            });
        });
    }
    
    // Exportar funciones al objeto global
    window.mostrarListaFacturas = mostrarListaFacturas;
    window.descargarFactura = descargarFactura;
    window.imprimirFactura = imprimirFactura;
    
    // Exponer el módulo de facturas
    window.facturasManager = facturasManager;
});