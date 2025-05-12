// main.js
import { navigateTo } from './module/rutas/router.js';

document.addEventListener('DOMContentLoaded', () => {
  M.AutoInit();
  navigateTo(location.pathname);
});