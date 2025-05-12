let currentPage = 1;
let itemsPerPage = 5;
let filteredData = [];
let originalData = [];
let config = {};

export default function initCrudTable(data, tableConfig, container) {
  originalData = [...data];
  filteredData = [...originalData];
  config = tableConfig;

  // Limpiar contenedor previo
  container.innerHTML = '';

  // Crear card completo
  const card = document.createElement('div');
  card.className = 'card z-depth-3';

  // Contenido del card
  const cardContent = document.createElement('div');
  cardContent.className = 'card-content';

  // Título (opcional)
  if (config.title) {
    const title = document.createElement('span');
    title.className = 'card-title';
    title.textContent = config.title;
    cardContent.appendChild(title);
  }

  // Buscador
  const searchDiv = document.createElement('div');
  searchDiv.className = 'row';
  searchDiv.innerHTML = `
    <div class="col s12">
      <div class="input-field">
        <input type="text" id="searchInput" placeholder="Buscar..." />
        <label for="searchInput">Buscar</label>
      </div>
    </div>
  `;
  cardContent.appendChild(searchDiv);

  // Contenedor de tabla
  const tableContainer = document.createElement('div');
  tableContainer.id = 'tableContainer';
  cardContent.appendChild(tableContainer);

  // Agregar contenido al card
  card.appendChild(cardContent);

  // Contenedor de paginación (fuera del card-content para evitar colisión)
  const paginationContainer = document.createElement('div');
  paginationContainer.className = 'card-action center-align';
  paginationContainer.id = 'paginationContainer';
  card.appendChild(paginationContainer);

  // Botón flotante (fuera del card)
  const floatingBtn = document.createElement('div');
  floatingBtn.className = 'fixed-action-btn';
  floatingBtn.innerHTML = `
    <a class="btn-floating btn-large red accent-4 modal-trigger" href="#modalForm" onclick="openAddModal()">
      <i class="large material-icons">add</i>
    </a>
  `;
  container.appendChild(floatingBtn);

  // Modal (fuera del card)
  const modalHTML = `
    <div id="modalForm" class="modal">
      <div class="modal-content">
        <h4 id="modalTitle">Agregar Registro</h4>
        <form id="formCRUD">
          ${config.fields.map(f => `
            <div class="input-field">
              <input type="text" id="${f.key}" name="${f.key}" required />
              <label for="${f.key}">${f.label}</label>
            </div>
          `).join('')}
          <button type="submit" class="btn-uni">Guardar</button>
        </form>
      </div>
    </div>
  `;
  container.insertAdjacentHTML('beforeend', modalHTML);

  // Agregar card al contenedor principal
  container.appendChild(card);

  // Inicializar componentes de Materialize
  M.AutoInit();

  // Eventos
  document.getElementById('searchInput').addEventListener('input', handleSearch);
  document.getElementById('formCRUD').addEventListener('submit', handleSave);

  // Renderizar contenido inicial
  renderTable();
  renderPagination();
}

function renderTable() {
  const tableContainer = document.getElementById('tableContainer');
  tableContainer.innerHTML = '';

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const dataToShow = filteredData.slice(start, end);

  if (dataToShow.length === 0) {
    tableContainer.innerHTML = `
      <p class="center-align">No hay registros disponibles.</p>
    `;
    return;
  }

  const tableHTML = `
    <table class="striped responsive-table">
      <thead>
        <tr>
          ${config.fields.map(f => `<th>${f.label}</th>`).join('')}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        ${dataToShow.map(row => `
          <tr>
            ${config.fields.map(f => `<td>${row[f.key]}</td>`).join('')}
            <td>
              <a href="#modalForm" class="btn-floating azul modal-trigger" onclick="openEditModal(${row.id})">
                <i class="material-icons">edit</i>
              </a>
              <a class="btn-floating red accent-4" onclick="deleteItem(${row.id})">
                <i class="material-icons">delete</i>
              </a>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  tableContainer.innerHTML = tableHTML;
}
function renderPagination() {
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginationContainer = document.getElementById('paginationContainer');
  paginationContainer.innerHTML = '';

  // Creamos un contenedor flex para alinear los botones
  const wrapper = document.createElement('div');
  wrapper.style.display = 'flex';
  wrapper.style.justifyContent = 'center';
  wrapper.style.gap = '0.5rem';

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    // Botón redondo flotante pequeño de Materialize
    btn.className = `btn-floating btn-small ${i === currentPage ? 'azul' : 'grey lighten-1'}`;
    btn.textContent = i;
    btn.style.width = '40px';
    btn.style.height = '40px';
    btn.style.lineHeight = '40px';
    btn.style.padding = '0';

    btn.addEventListener('click', () => {
      currentPage = i;
      renderTable();
      renderPagination();
    });

    wrapper.appendChild(btn);
  }

  paginationContainer.appendChild(wrapper);
}

function changePage(page) {
  currentPage = page;
  renderTable();
  renderPagination();
}

function handleSearch(e) {
  const term = e.target.value.toLowerCase();
  filteredData = originalData.filter(item =>
    Object.values(item).some(val =>
      val.toString().toLowerCase().includes(term)
    )
  );
  currentPage = 1;
  renderTable();
  renderPagination();
}

function openAddModal() {
  document.getElementById('modalTitle').textContent = 'Agregar Registro';
  document.getElementById('formCRUD').reset();
  document.querySelectorAll('#formCRUD input').forEach(input => input.value = '');
}

function openEditModal(id) {
  document.getElementById('modalTitle').textContent = 'Editar Registro';
  const item = originalData.find(i => i.id === id);
  config.fields.forEach(f => {
    document.getElementById(f.key).value = item[f.key];
  });
  M.updateTextFields();
}

function handleSave(e) {
  e.preventDefault();
  const formData = {};
  let isValid = true;

  config.fields.forEach(f => {
    const value = document.getElementById(f.key).value.trim();
    if (!value) isValid = false;
    formData[f.key] = value;
  });

  if (!isValid) {
    M.toast({ html: 'Todos los campos son obligatorios', classes: 'red' });
    return;
  }

  if (document.getElementById('modalTitle').textContent.includes('Agregar')) {
    addRow(formData);
  } else {
    updateRow(formData);
  }

  M.Modal.getInstance(document.getElementById('modalForm')).close();
  M.toast({ html: 'Guardado correctamente', classes: 'green' });
}

function addRow(data) {
  const newItem = { ...data, id: Date.now() };
  originalData.push(newItem);
  filteredData.push(newItem);
  renderTable();
  renderPagination();
}

function updateRow(data) {
  const index = originalData.findIndex(i => i.id == data.id);
  if (index > -1) {
    originalData[index] = { ...originalData[index], ...data };
    const fIndex = filteredData.findIndex(i => i.id == data.id);
    if (fIndex > -1) filteredData[fIndex] = { ...filteredData[fIndex], ...data };
    renderTable();
  }
}

function deleteItem(id) {
  if (!confirm('¿Estás seguro de eliminar este registro?')) return;

  originalData = originalData.filter(i => i.id != id);
  filteredData = filteredData.filter(i => i.id != id);
  renderTable();
  renderPagination();
}