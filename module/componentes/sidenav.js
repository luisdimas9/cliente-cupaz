// modulos/componentes/sidenav.js

export function renderSidenav(container) {
  const nav = document.createElement('ul');
  nav.className = 'sidenav sidenav-fixed azul';
  nav.id = 'slide-out';

  nav.innerHTML = `
    <li><div class="user-view">
      <div class="background">
        <img src="../../assets/image/dark.avif">
      </div>
      <a href="#user"><img class="circle" src="../../assets/image/blaise.jpeg"></a>
      <a href="#name"><span class="white-text name">John Doe</span></a>
      <a href="#email"><span class="white-text email">jd@example.com</span></a>
    </div></li>
    <li><a href="#clientes" class="waves-effect white-text">Clientes</a></li>
    <li><a href="#productos" class="waves-effect white-text">Productos</a></li>
    <li><div class="divider"></div></li>
    <li><a href="#!" onclick="logout()" class="waves-effect white-text red-text">Cerrar Sesión</a></li>
  `;

  container.appendChild(nav);

  // Inicializar Materialize Sidenav
  document.addEventListener('DOMContentLoaded', () => {
    M.Sidenav.init(document.querySelectorAll('.sidenav'));
  });
}