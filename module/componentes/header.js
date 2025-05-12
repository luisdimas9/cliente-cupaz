// modulos/componentes/header.js

export default function renderHeader() {
  const header = document.createElement('nav');
 header.className = 'azul';
  header.innerHTML = `
    <div class="nav-wrapper container">
      <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      <a href="#!" class="right brand-logo">APP CUPAZ</a>
    </div>
  `;
  return header;
}