export let clientes = [
  { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com' },
  { id: 2, nombre: 'Ana Gómez', email: 'ana@example.com' }
];

export function getClientes() {
  return [...clientes];
}

export function addCliente(cliente) {
  cliente.id = Date.now();
  clientes.push(cliente);
}

export function deleteCliente(id) {
  clientes = clientes.filter(c => c.id != id);
}