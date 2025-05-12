// modulos/paginas/dashboardPage.js

import renderHeader from '../componentes/header.js';
import { isAuthenticated } from '../servicios/authService.js'; // ✅ Import correcto
import { renderSidenav } from '../componentes/sidenav.js';
import { initDashboardRouter } from '../rutas/dashboardRouter.js';

export function renderDashboardPage(container) {
  container.innerHTML = '';

  if (isAuthenticated()) {
    // Eliminar fondo del body
    document.body.style.backgroundImage = 'none';

    // Layout principal
    const layout = document.createElement('div');
    layout.className = 'row no-margin';

    // Sidebar (fijo)
    const sidenavContainer = document.createElement('div');
    sidenavContainer.className = 'col s3 m3 l2';
    renderSidenav(sidenavContainer);

    // Contenido dinámico (con ajuste de margen)
    const contentContainer = document.createElement('div');
    contentContainer.className = 'col s12 m9 l10';
    contentContainer.id = 'dashboard-content';
   
    layout.appendChild(sidenavContainer);
    layout.appendChild(contentContainer);

    // Header (con margen izquierdo para evitar solapamiento)
    const header = renderHeader();
    
    container.appendChild(header);

    // Contenido principal
    container.appendChild(layout);

    // Inicializar router del dashboard
    initDashboardRouter(contentContainer);
  } else {
    window.goTo('/login');
  }
}