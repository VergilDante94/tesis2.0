const ordenesManager = {
    async crearOrden(datos) {
        try {
            const response = await fetch('/api/ordenes', {
                method: 'POST',
                headers: auth.getHeaders(),
                body: JSON.stringify(datos)
            });
            return await response.json();
        } catch (error) {
            console.error('Error al crear orden:', error);
            throw error;
        }
    },

    async listarOrdenes(filtros = {}) {
        try {
            const queryParams = new URLSearchParams(filtros);
            const response = await fetch(`/api/ordenes?${queryParams}`, {
                headers: auth.getHeaders()
            });
            return await response.json();
        } catch (error) {
            console.error('Error al listar órdenes:', error);
            throw error;
        }
    },

    async actualizarEstado(ordenId, estado) {
        try {
            const response = await fetch(`/api/ordenes/${ordenId}/estado`, {
                method: 'PUT',
                headers: auth.getHeaders(),
                body: JSON.stringify({ estado })
            });
            return await response.json();
        } catch (error) {
            console.error('Error al actualizar estado:', error);
            throw error;
        }
    }
};

// Variables globales para el estado de órdenes
const ordenesState = {
    serviciosSeleccionados: [],
    total: 0
};

// Funciones para la UI de órdenes
function mostrarFormularioOrden() {
    const serviciosSeleccionados = [];
    let total = 0;

    async function cargarServicios() {
        try {
            const response = await fetch('/api/servicios');
            const servicios = await response.json();
            const serviciosContainer = document.getElementById('serviciosDisponibles');
            
            serviciosContainer.innerHTML = servicios.map(servicio => `
                <div class="card mb-3">
                        <div class="card-body">
                        <h5 class="card-title">${servicio.nombre}</h5>
                        <p class="card-text">${servicio.descripcion}</p>
                        <p class="card-text">Precio: $${servicio.precioBase}</p>
                        <div class="form-group">
                            <label>Cantidad:</label>
                            <input type="number" min="1" value="1" class="form-control cantidad-servicio" 
                                   data-servicio-id="${servicio.id}" data-precio="${servicio.precioBase}">
                        </div>
                        <button class="btn btn-primary agregar-servicio" data-servicio-id="${servicio.id}">
                            Agregar
                        </button>
                    </div>
                </div>
            `).join('');

            // Eventos para agregar servicios
            document.querySelectorAll('.agregar-servicio').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const servicioId = e.target.dataset.servicioId;
                    const cantidad = document.querySelector(`input[data-servicio-id="${servicioId}"]`).value;
                    const servicio = servicios.find(s => s.id === parseInt(servicioId));
                    
                    serviciosSeleccionados.push({
                        servicioId: parseInt(servicioId),
                        cantidad: parseInt(cantidad),
                        nombre: servicio.nombre,
                        precio: servicio.precioBase
                    });

                    actualizarResumen();
                });
            });
        } catch (error) {
            console.error('Error al cargar servicios:', error);
        }
    }

    function actualizarResumen() {
        const resumenContainer = document.getElementById('resumenOrden');
        total = serviciosSeleccionados.reduce((sum, s) => sum + (s.precio * s.cantidad), 0);

        resumenContainer.innerHTML = `
            <h4>Resumen de la Orden</h4>
            <ul class="list-group">
                ${serviciosSeleccionados.map(s => `
                    <li class="list-group-item">
                        ${s.nombre} x ${s.cantidad} = $${s.precio * s.cantidad}
                        <button class="btn btn-sm btn-danger float-end eliminar-servicio" 
                                data-servicio-id="${s.servicioId}">Eliminar</button>
                    </li>
                `).join('')}
            </ul>
            <div class="mt-3">
                <h5>Total: $${total}</h5>
                </div>
            `;

        // Eventos para eliminar servicios
        document.querySelectorAll('.eliminar-servicio').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const servicioId = parseInt(e.target.dataset.servicioId);
                const index = serviciosSeleccionados.findIndex(s => s.servicioId === servicioId);
                if (index > -1) {
                    serviciosSeleccionados.splice(index, 1);
                    actualizarResumen();
                }
            });
        });
    }

    // Cargar servicios al mostrar el formulario
    cargarServicios();
}

// Función para mostrar lista de órdenes
async function mostrarListaOrdenes() {
    try {
        const response = await fetch('/api/ordenes', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.status === 404) {
            console.log('El endpoint de órdenes no está disponible');
            const ordenesContainer = document.getElementById('listaOrdenes');
            if (ordenesContainer) {
                ordenesContainer.innerHTML = `
                    <div class="alert alert-info">
                        <i class="fas fa-info-circle"></i>
                        El servicio de órdenes no está disponible en este momento.
                    </div>
                `;
            }
            return;
        }

        if (!response.ok) {
            throw new Error('Error al cargar órdenes');
        }

        const ordenes = await response.json();
        const ordenesContainer = document.getElementById('listaOrdenes');
        
        if (!ordenesContainer) {
            console.log('Contenedor de órdenes no encontrado');
            return;
        }

        if (!Array.isArray(ordenes) || ordenes.length === 0) {
            ordenesContainer.innerHTML = `
                <div class="alert alert-info">
                    <i class="fas fa-info-circle"></i>
                    No hay órdenes disponibles.
                </div>
            `;
            return;
        }

        ordenesContainer.innerHTML = ordenes.map(orden => `
            <div class="card mb-3">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <strong>Orden #${orden.id}</strong>
                    <span class="badge ${getEstadoBadgeClass(orden.estado)}">${orden.estado}</span>
                </div>
                <div class="card-body">
                    <h5 class="card-title">Cliente: ${orden.cliente?.usuario?.nombre || 'N/A'}</h5>
                    <p class="card-text">Fecha: ${new Date(orden.fechaCreacion).toLocaleDateString()}</p>
                    <div class="servicios-lista">
                        <h6>Servicios:</h6>
                        <ul class="list-group">
                            ${orden.servicios?.map(s => `
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    <span>${s.servicio?.nombre || 'N/A'}</span>
                                    <span class="badge bg-secondary">x${s.cantidad}</span>
                                </li>
                            `).join('') || ''}
                        </ul>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error al mostrar órdenes:', error);
        const ordenesContainer = document.getElementById('listaOrdenes');
        if (ordenesContainer) {
            ordenesContainer.innerHTML = `
                <div class="alert alert-danger">
                    <i class="fas fa-exclamation-circle"></i>
                    Error al cargar las órdenes: ${error.message}
                </div>
            `;
        }
    }
}

// Función auxiliar para determinar la clase de badge según el estado
function getEstadoBadgeClass(estado) {
    switch (estado) {
        case 'PENDIENTE':
            return 'bg-warning text-dark';
        case 'PROGRAMADA':
            return 'bg-info text-white';
        case 'EN_PROCESO':
            return 'bg-primary text-white';
        case 'COMPLETADA':
            return 'bg-success text-white';
        case 'CANCELADA':
            return 'bg-danger text-white';
        default:
            return 'bg-secondary text-white';
    }
}

// Función para cargar servicios disponibles para órdenes
async function loadServicesForOrders() {
    console.log('Iniciando carga de servicios para órdenes...');
    try {
        const token = localStorage.getItem('token');
        const userData = window.decodeJWT(token);
        if (!userData) {
            console.error('No hay token válido disponible');
            mostrarAlerta('Error de autenticación', 'danger');
            return;
        }

        // Mostrar la lista de órdenes existentes
        await mostrarListaOrdenes();

        console.log('Realizando petición a /api/servicios...');
        const response = await fetch('/api/servicios', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.text();
            console.error('Error en la respuesta:', error);
            throw new Error(`Error al cargar servicios: ${response.status} ${response.statusText}`);
        }

        const servicios = await response.json();
        console.log('Servicios obtenidos:', servicios);
        
        if (!Array.isArray(servicios)) {
            console.error('La respuesta no es un array:', servicios);
            throw new Error('Formato de respuesta inválido');
        }

        displayServicesForOrders(servicios);
        console.log('Servicios mostrados correctamente');
    } catch (error) {
        console.error('Error en loadServicesForOrders:', error);
        mostrarAlerta('Error al cargar servicios para órdenes: ' + error.message, 'danger');
    }
}

// Función para mostrar servicios en el formulario de órdenes
function displayServicesForOrders(servicios) {
    console.log('Iniciando displayServicesForOrders...');
    const container = document.getElementById('serviciosDisponibles');
    
    if (!container) {
        console.error('No se encontró el contenedor #serviciosDisponibles');
        mostrarAlerta('Error: No se encontró el contenedor de servicios', 'danger');
        return;
    }

    console.log('Limpiando contenedor...');
    container.innerHTML = '';

    if (!Array.isArray(servicios) || servicios.length === 0) {
        console.log('No hay servicios para mostrar');
        container.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-info">
                    <i class="fas fa-info-circle"></i>
                    No hay servicios disponibles en este momento
                </div>
            </div>
        `;
        return;
    }

    // Crear las tarjetas de servicios
    const serviciosHTML = servicios.map(servicio => {
        const tipoServicio = servicio.tipo === 'POR_HORA' ? 'Por Hora' : 'Por Cantidad';
        const unidad = servicio.tipo === 'POR_HORA' ? '/hora' : '/unidad';

        return `
            <div class="col-md-6 mb-4 servicio-item" data-id="${servicio.id}" data-tipo="${servicio.tipo}">
                <div class="card h-100 shadow-sm">
                    <div class="card-header bg-light">
                        <h5 class="card-title mb-0 text-primary">${servicio.nombre}</h5>
                    </div>
                    <div class="card-body">
                        <p class="card-text text-dark">${servicio.descripcion || 'Sin descripción'}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <p class="mb-0 text-dark"><strong>Precio Base:</strong> <span class="text-success">$${(servicio.precioBase || 0).toFixed(2)}${unidad}</span></p>
                                <p class="mb-0 text-dark"><strong>Tipo:</strong> <span class="badge bg-info">${tipoServicio}</span></p>
                            </div>
                            <div class="d-flex flex-column">
                                <input type="number" class="form-control mb-2" 
                                       id="cantidad-${servicio.id}" 
                                       min="1" value="1" 
                                       style="width: 80px; background-color: #ffffff; color: #212529;">
                                <button type="button" class="btn btn-primary" 
                                        onclick="seleccionarServicio(${servicio.id}, '${servicio.nombre}', ${servicio.precioBase}, '${servicio.tipo}')">
                                    <i class="fas fa-plus-circle"></i> Seleccionar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Crear contenedor para los servicios
    container.innerHTML = `
        <div class="row">
            <div id="listaServiciosDisponibles" class="row w-100">
                ${serviciosHTML}
            </div>
        </div>
    `;
    
    // Verificar si existe el módulo de filtros y utilizarlo
    if (window.filtrosManager) {
        window.filtrosManager.inicializarFiltro('#serviciosDisponibles', '.servicio-item');
    } else {
        console.warn('El módulo de filtros no está disponible. Asegúrate de incluir filtros.js en tu HTML.');
        // Usar el filtro básico como respaldo
        const buscarServicioInput = document.createElement('input');
        buscarServicioInput.type = 'text';
        buscarServicioInput.id = 'buscarServicio';
        buscarServicioInput.className = 'form-control mb-3';
        buscarServicioInput.placeholder = 'Buscar servicio...';
        buscarServicioInput.style = 'background-color: #ffffff; color: #212529;';
        
        buscarServicioInput.addEventListener('input', function() {
            const busqueda = this.value.toLowerCase().trim();
            const serviciosItems = document.querySelectorAll('.servicio-item');
            
            serviciosItems.forEach(item => {
                const nombre = item.querySelector('.card-title').textContent.toLowerCase();
                const descripcion = item.querySelector('.card-text').textContent.toLowerCase();
                
                if (nombre.includes(busqueda) || descripcion.includes(busqueda)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
        
        // Insertar el input de búsqueda al principio del contenedor
        const listaServicios = document.getElementById('listaServiciosDisponibles');
        if (listaServicios) {
            listaServicios.parentNode.insertBefore(buscarServicioInput, listaServicios);
        }
    }
}

// Función para seleccionar un servicio
function seleccionarServicio(servicioId, nombre, precioBase, tipo = 'POR_HORA') {
    console.log('Seleccionando servicio:', servicioId);
    
    // Obtener tipo de servicio del elemento seleccionado
    const tipoElement = document.querySelector(`[data-id="${servicioId}"]`);
    if (tipoElement) {
        tipo = tipoElement.dataset.tipo;
    }
    
    const cantidadInput = document.getElementById(`cantidad-${servicioId}`);
    if (!cantidadInput) {
        console.error('No se encontró el input de cantidad para el servicio:', servicioId);
        mostrarAlerta('Error al seleccionar el servicio', 'danger');
        return;
    }

    const cantidad = parseInt(cantidadInput.value);
    if (isNaN(cantidad) || cantidad < 1) {
        mostrarAlerta('Por favor ingrese una cantidad válida', 'warning');
        return;
    }

    // Agregar servicio al estado
    const servicio = {
        id: servicioId,
        nombre: nombre,
        cantidad: cantidad,
        precioBase: precioBase,
        tipo: tipo,
        total: cantidad * precioBase
    };

    // Verificar si el servicio ya está seleccionado
    const index = ordenesState.serviciosSeleccionados.findIndex(s => s.id === servicioId);
    if (index >= 0) {
        ordenesState.serviciosSeleccionados[index] = servicio;
    } else {
        ordenesState.serviciosSeleccionados.push(servicio);
    }

    actualizarResumenOrden();
    mostrarFormularioNuevaOrden();
    mostrarAlerta(`Servicio agregado: ${nombre} x ${cantidad}`, 'success');
}

// Función para actualizar el resumen de la orden
function actualizarResumenOrden() {
    const resumenDiv = document.getElementById('serviciosSeleccionados');
    const totalSpan = document.getElementById('totalOrden');
    const resumenContainer = document.getElementById('resumenOrden');

    if (!resumenDiv || !totalSpan || !resumenContainer) {
        console.error('No se encontraron los elementos necesarios para el resumen');
        return;
    }

    resumenContainer.style.display = 'block';

    if (ordenesState.serviciosSeleccionados.length === 0) {
        resumenDiv.innerHTML = '<p class="text-muted">No hay servicios seleccionados</p>';
        totalSpan.textContent = '0.00';
        return;
    }

    const total = ordenesState.serviciosSeleccionados.reduce((sum, s) => sum + s.total, 0);
    ordenesState.total = total;

    resumenDiv.innerHTML = `
        <div class="list-group">
            ${ordenesState.serviciosSeleccionados.map(s => {
                const unidad = s.tipo === 'POR_HORA' ? '/hora' : '/unidad';
                return `
                    <div class="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="mb-0">${s.nombre}</h6>
                            <small>
                                ${s.cantidad} x $${s.precioBase.toFixed(2)}${unidad}
                                <span class="badge bg-info ms-2">${s.tipo === 'POR_HORA' ? 'Por Hora' : 'Por Cantidad'}</span>
                            </small>
                        </div>
                        <div class="text-end">
                            <div class="mb-2">$${s.total.toFixed(2)}</div>
                            <button type="button" class="btn btn-sm btn-danger" 
                                    onclick="eliminarServicio(${s.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;

    totalSpan.textContent = total.toFixed(2);
    
    // Aplicar estilos a los campos del formulario
    fixFormFields();
}

// Función para eliminar un servicio del resumen
function eliminarServicio(servicioId) {
    ordenesState.serviciosSeleccionados = ordenesState.serviciosSeleccionados.filter(s => s.id !== servicioId);
    actualizarResumenOrden();
    if (ordenesState.serviciosSeleccionados.length === 0) {
        document.getElementById('resumenOrden').style.display = 'none';
    }
    mostrarAlerta('Servicio eliminado', 'info');
}

// Función para mostrar el formulario de nueva orden
function mostrarFormularioNuevaOrden() {
    const formContainer = document.getElementById('nuevaOrdenForm');
    if (formContainer) {
        formContainer.style.display = 'block';
    }
}

// Función para crear una nueva orden
function nuevaOrden() {
    console.log('Iniciando nueva orden...');
    ordenesState.serviciosSeleccionados = [];
    ordenesState.total = 0;
    
    const formContainer = document.getElementById('nuevaOrdenForm');
    const listaOrdenes = document.getElementById('listaOrdenes');
    
    if (formContainer && listaOrdenes) {
        formContainer.style.display = 'block';
        listaOrdenes.style.display = 'none';
    }
    
    // Limpiar el resumen
    const resumenOrden = document.getElementById('resumenOrden');
    if (resumenOrden) {
        resumenOrden.style.display = 'none';
    }
    
    // Cargar servicios disponibles
    loadServicesForOrders();
    
    // Asegurar que los campos del formulario tengan el estilo correcto
    fixFormFields();
}

// Función para arreglar los campos de formulario
function fixFormFields() {
    console.log('Aplicando estilos a campos de formulario...');
    
    // No añadir estilos duplicados, solo aplicar directamente a los elementos
    setTimeout(() => {
        // Aplicar a elementos específicos con prioridad
        const fechaProgramada = document.getElementById('fechaProgramada');
        if (fechaProgramada) {
            fechaProgramada.setAttribute('style', 'background-color: #ffffff !important; color: #212529 !important; border: 1px solid #ced4da !important;');
            console.log('Estilos aplicados a fechaProgramada');
        }
        
        const descripcion = document.getElementById('descripcion');
        if (descripcion) {
            descripcion.setAttribute('style', 'background-color: #ffffff !important; color: #212529 !important; border: 1px solid #ced4da !important;');
            console.log('Estilos aplicados a descripcion');
        }
        
        // Aplicar a todos los inputs dentro del formulario de órdenes
        const ordenesForm = document.getElementById('ordenesForm');
        if (ordenesForm) {
            ordenesForm.querySelectorAll('input, textarea, select').forEach(el => {
                el.setAttribute('style', 'background-color: #ffffff !important; color: #212529 !important; border: 1px solid #ced4da !important;');
                console.log('Estilos aplicados a elemento de formulario:', el.id || el.name || 'sin id');
            });
        }
        
        // Buscar específicamente inputs de cantidad en tarjetas de servicios
        document.querySelectorAll('.servicio-item input[type="number"]').forEach(el => {
            el.setAttribute('style', 'background-color: #ffffff !important; color: #212529 !important; border: 1px solid #ced4da !important;');
            console.log('Estilos aplicados a input de cantidad en tarjeta de servicio');
        });
        
        // Aplicar al buscador de servicios
        const buscarServicio = document.getElementById('buscarServicio');
        if (buscarServicio) {
            buscarServicio.setAttribute('style', 'background-color: #ffffff !important; color: #212529 !important; border: 1px solid #ced4da !important;');
            console.log('Estilos aplicados al buscador de servicios');
        }
    }, 300);
}

// Función para mostrar alertas
function mostrarAlerta(mensaje, tipo) {
    const alertaDiv = document.createElement('div');
    alertaDiv.className = `alert alert-${tipo} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    alertaDiv.role = 'alert';
    alertaDiv.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.body.appendChild(alertaDiv);
    
    setTimeout(() => {
        alertaDiv.remove();
    }, 3000);
}

// Configurar el formulario de órdenes
document.addEventListener('DOMContentLoaded', function() {
    // Añadir estilos para mejorar la visualización en modo claro y oscuro
    const estilosPersonalizados = document.createElement('style');
    estilosPersonalizados.textContent = `
        /* ESTILOS FORZADOS PARA MODO CLARO - Alta especificidad */
        html body input,
        html body textarea,
        html body select,
        html body .form-control,
        html body input.form-control,
        html body textarea.form-control,
        html body select.form-control,
        html body input[type="text"],
        html body input[type="number"],
        html body input[type="datetime-local"],
        html body input[type="date"],
        html body input[type="time"] {
            background-color: #ffffff !important;
            color: #212529 !important;
            border: 1px solid #ced4da !important;
        }
        
        /* ESTILOS BASE PARA APLICAR SIEMPRE */
        .card {
            background-color: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.125);
            color: #212529;
        }
        
        .card-header {
            background-color: #f8f9fa;
            border-bottom: 1px solid rgba(0, 0, 0, 0.125);
        }
        
        .card-title {
            color: #0d6efd;
        }
        
        .card-text,
        p, 
        h5, 
        h6 {
            color: #212529;
        }
        
        .list-group-item {
            background-color: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.125);
            color: #212529;
        }
        
        /* Entradas de formulario */
        input.form-control,
        textarea.form-control,
        select.form-control {
            background-color: #ffffff !important;
            color: #212529 !important;
            border: 1px solid #ced4da;
        }
        
        /* Estilos específicos para tipos de input especiales */
        input[type="datetime-local"],
        input[type="date"],
        input[type="time"],
        input[type="number"] {
            background-color: #ffffff !important;
            color: #212529 !important;
            border: 1px solid #ced4da;
        }
        
        /* ===================== ESTILOS COMPARTIDOS ===================== */
        /* Estilos para tarjetas de servicios (animación hover) */
        .servicio-item .card:hover {
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
            transition: box-shadow 0.3s ease;
        }
        
        /* Badges y botones conservan sus estilos originales */
        .badge {
            font-weight: 500;
        }
    `;
    
    document.head.appendChild(estilosPersonalizados);
    
    // Hacer visible todos los inputs y aplicar estilos inline
    function aplicarEstilosFormularios() {
        console.log('Aplicando estilos inline a todos los elementos de formulario...');
        
        // Identificar todos los inputs y aplicarles estilo directamente
        document.querySelectorAll('input, textarea, select, .form-control').forEach(el => {
            el.setAttribute('style', 'background-color: #ffffff !important; color: #212529 !important; border: 1px solid #ced4da !important;');
        });
        
        // Específicamente apuntar a los inputs en tarjetas de servicios
        document.querySelectorAll('.servicio-item input[type="number"]').forEach(el => {
            el.setAttribute('style', 'background-color: #ffffff !important; color: #212529 !important; border: 1px solid #ced4da !important; width: 80px;');
        });
        
        // Aplicar al buscador de servicios
        const buscarServicio = document.getElementById('buscarServicio');
        if (buscarServicio) {
            buscarServicio.setAttribute('style', 'background-color: #ffffff !important; color: #212529 !important; border: 1px solid #ced4da !important;');
        }
        
        // Aplicar a los campos específicos del formulario de órdenes
        const fechaProgramada = document.getElementById('fechaProgramada');
        if (fechaProgramada) {
            fechaProgramada.setAttribute('style', 'background-color: #ffffff !important; color: #212529 !important; border: 1px solid #ced4da !important;');
        }
        
        const descripcion = document.getElementById('descripcion');
        if (descripcion) {
            descripcion.setAttribute('style', 'background-color: #ffffff !important; color: #212529 !important; border: 1px solid #ced4da !important;');
        }
    }
    
    // Ejecutar ahora
    aplicarEstilosFormularios();
    
    // Y también después de un retraso
    setTimeout(aplicarEstilosFormularios, 500);
    setTimeout(aplicarEstilosFormularios, 1000);
    
    // Configurar un observador para ajustar estilos cuando cambie el DOM
    try {
        const observer = new MutationObserver(function() {
            aplicarEstilosFormularios();
        });
        
        observer.observe(document.body, { 
            childList: true, 
            subtree: true,
            attributes: false,
            characterData: false
        });
        
        console.log('Observador de mutaciones configurado para aplicar estilos automáticamente');
    } catch (e) {
        console.error('Error al configurar observador:', e);
        // Si falla el observador, aplicar estilos periódicamente
        setInterval(aplicarEstilosFormularios, 2000);
    }
    
    const ordenesForm = document.getElementById('ordenesForm');
    if (ordenesForm) {
        ordenesForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (ordenesState.serviciosSeleccionados.length === 0) {
                mostrarAlerta('Debe seleccionar al menos un servicio', 'warning');
                return;
            }

            const fechaProgramada = document.getElementById('fechaProgramada').value;
            const descripcion = document.getElementById('descripcion').value;

            if (!fechaProgramada) {
                mostrarAlerta('Debe seleccionar una fecha programada', 'warning');
                return;
            }

            try {
                const response = await fetch('/api/ordenes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        clienteId: JSON.parse(localStorage.getItem('usuario')).id,
                        servicios: ordenesState.serviciosSeleccionados.map(s => ({
                            servicioId: s.id,
                            cantidad: s.cantidad
                        })),
                        fechaProgramada,
                        descripcion
                    })
                });

                if (!response.ok) {
                    throw new Error('Error al crear la orden');
                }

                const orden = await response.json();
                
                // Generar factura automáticamente
                try {
                    const facturaResponse = await fetch(`/api/facturas/orden/${orden.id}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    
                    if (facturaResponse.ok) {
                        const factura = await facturaResponse.json();
                        console.log('Factura generada automáticamente:', factura);
                        mostrarAlerta('Orden creada y factura generada exitosamente. Consulte la sección de Facturas.', 'success');
                    } else {
                        console.error('La factura no pudo ser generada automáticamente');
                        mostrarAlerta('Orden creada exitosamente. Sin embargo, hubo un problema al generar la factura.', 'warning');
                    }
                } catch (facturaError) {
                    console.error('Error al generar factura:', facturaError);
                    mostrarAlerta('Orden creada exitosamente. Sin embargo, hubo un problema al generar la factura.', 'warning');
                }
                
                // Limpiar el formulario y mostrar la lista de órdenes
                ordenesState.serviciosSeleccionados = [];
                document.getElementById('nuevaOrdenForm').style.display = 'none';
                document.getElementById('listaOrdenes').style.display = 'block';
                await mostrarListaOrdenes();
            } catch (error) {
                console.error('Error al crear orden:', error);
                mostrarAlerta('Error al crear la orden: ' + error.message, 'danger');
            }
        });
    }
});

// Exportar todas las funciones necesarias al objeto window
window.ordenesManager = ordenesManager;
window.mostrarFormularioOrden = mostrarFormularioOrden;
window.mostrarListaOrdenes = mostrarListaOrdenes;
window.loadServicesForOrders = loadServicesForOrders;
window.displayServicesForOrders = displayServicesForOrders;
window.seleccionarServicio = seleccionarServicio;
window.eliminarServicio = eliminarServicio;
window.nuevaOrden = nuevaOrden;
window.mostrarAlerta = mostrarAlerta;
window.fixFormFields = fixFormFields;