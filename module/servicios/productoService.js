export let productos = [
  { id: 1, nombre: 'Producto A', precio: 100 },
  { id: 2, nombre: 'Producto B', precio: 200 },
  { id: 3, nombre: 'Producto A', precio: 100 },
  { id: 4, nombre: 'Producto B', precio: 200 },
  { id: 5, nombre: 'Producto A', precio: 100 },
  { id: 6, nombre: 'Producto B', precio: 200 },
  { id: 7, nombre: 'Producto A', precio: 100 },
  { id: 8, nombre: 'Producto B', precio: 200 },
  { id: 9, nombre: 'Producto A', precio: 100 },
  { id: 10, nombre: 'Producto B', precio: 200 },
  { id: 11, nombre: 'Producto A', precio: 100 },
  { id: 12, nombre: 'Producto B', precio: 200 }
];

export function getProductos() {
  return [...productos];
}

export function addProducto(producto) {
  producto.id = Date.now();
  productos.push(producto);
}

export function deleteProducto(id) {
  productos = productos.filter(p => p.id != id);
}