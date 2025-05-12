// rutas.js (sin cambios, ya está bien estructurado)

import { renderLoginPage } from '../paginas/loginPage.js';
import { renderDashboardPage } from '../paginas/dashboardPage.js';
import { renderProductosPage } from '../paginas/productosPage.js';
import { renderClientesPage } from '../paginas/clientesPage.js';

import { isAuthenticated, logout } from '../servicios/authService.js';

const routes = {
  '/login': { component: renderLoginPage, protected: false },
  '/dashboard': { component: renderDashboardPage, protected: true },
  '/productos': { component: renderProductosPage, protected: true },
  '/clientes': { component: renderClientesPage, protected: true }
};

export function navigateTo(path) {
  const fullPath = path.split('?')[0];
  const route = routes[fullPath];

  if (!route) {
    return navigateTo('/login');
  }

  if (route.protected && !isAuthenticated()) {
    return navigateTo('/login');
  }

  const container = document.getElementById('app');
  route.component(container);
}

window.addEventListener('popstate', () => {
  navigateTo(location.pathname);
});

window.goTo = function(path) {
  history.pushState(null, '', path);
  navigateTo(path);
}

window.logout = logout;