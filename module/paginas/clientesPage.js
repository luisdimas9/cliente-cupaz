// modulos/paginas/clientesPage.js

import initCrudTable from '../componentes/crudTable.js';
import { getClientes, addCliente, deleteCliente } from '../servicios/clienteService.js';

export function renderClientesPage(container) {
  const clientes = getClientes();

  const config = {
    title: 'Lista de Clientes',
    fields: [
      { key: 'id', label: 'ID', hidden: true },
      { key: 'nombre', label: 'Nombre' },
      { key: 'email', label: 'Email' }
    ],
    addRow: addCliente,
    deleteItem: deleteCliente
  };
// 👇 Eliminar la imagen de fondo del body
    document.body.style.backgroundImage = 'none';
  initCrudTable(clientes, config, container);
}