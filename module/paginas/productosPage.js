import initCrudTable from '../componentes/crudTable.js';
import { getProductos, addProducto, deleteProducto } from '../servicios/productoService.js';

export function renderProductosPage(container) {
  const productos = getProductos();

  const config = {
    fields: [
      { key: 'id', label: 'ID', hidden: true },
      { key: 'nombre', label: 'Nombre' },
      { key: 'precio', label: 'Precio' }
    ],
    addRow: addProducto,
    deleteItem: deleteProducto
  };

  initCrudTable(productos, config, container);
}