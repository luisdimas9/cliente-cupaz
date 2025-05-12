// modulos/componentes/navbar.js

export default function renderNavbar(container) {
  const nav = document.createElement('div');
  nav.className = 'container section';

  nav.innerHTML = `
    <a data-link href="/dashboard" class="waves-effect waves-light btn purple darken-2">Dashboard</a>
    <a data-link href="/productos" class="waves-effect waves-light btn purple darken-2">Productos</a>
    <a data-link href="/clientes" class="waves-effect waves-light btn purple darken-2">Clientes</a>
    <a href="#!" onclick="logout()" class="waves-effect waves-light btn red darken-2">Cerrar Sesión</a>
  `;

  container.appendChild(nav);
}

document.body.addEventListener('click', (e) => {
  if (e.target.matches('[data-link]')) {
    e.preventDefault();
    window.goTo(e.target.getAttribute('href'));
  }
});