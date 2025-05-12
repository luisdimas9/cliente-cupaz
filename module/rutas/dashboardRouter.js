// modulos/rutas/dashboardRouter.js

import { renderClientesPage } from '../paginas/clientesPage.js';
import { renderProductosPage } from '../paginas/productosPage.js';

const DASHBOARD_ROUTES = {
  'clientes': renderClientesPage,
  'productos': renderProductosPage
};

export function initDashboardRouter(container) {
  // Cargar contenido inicial
  loadDashboardContent(location.hash.slice(1) || 'clientes');

  // Escuchar cambios en el hash (ej: #clientes, #productos)
  window.addEventListener('hashchange', () => {
    const section = location.hash.slice(1) || 'clientes';
    loadDashboardContent(section);
  });

  // Función que carga el contenido dinámico
  function loadDashboardContent(section) {
    const renderFn = DASHBOARD_ROUTES[section];
    if (renderFn) {
      container.innerHTML = '';
      renderFn(container);
      updateActiveLink(section);
    } else {
      container.innerHTML = '<h3>404 - Sección no encontrada</h3>';
    }
  }

  // Marcar enlace activo
  function updateActiveLink(section) {
    document.querySelectorAll('.sidenav a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${section}`) {
        link.classList.add('active');
      }
    });
  }
}