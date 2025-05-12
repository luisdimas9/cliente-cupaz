export function renderLoginPage(container) {
  container.innerHTML = '';

  const fullContainer = document.createElement('div');
  fullContainer.className = 'login-container';

  fullContainer.innerHTML = `
    <div class="login-form-column">
      <div class="form-card">
        <h3 class="logo"><i class="material-icons">travel_explore</i>CUPAZ</h3>
        <p class="subtitle">Sistema de Gestion de la Gran Mision Cuadrantes de Paz</p>
        <form id="loginForm">
          <div class="input-field">
            <i class="material-icons prefix">account_circle</i>
            <input id="username" type="text" required autocomplete="off" class="validate" />
            <label for="username">Username</label>
          </div>
          <div class="input-field">
            <i class="material-icons prefix">lock</i>
            <input id="password" type="password" required class="validate" />
            <label for="password">Password</label>
          </div>
          <button type="submit" class="btn-signin">SIGN IN</button>
        </form>
        
        <div class="or-separator"><span>Visite</span></div>
        <div class="social-buttons">
          <button class="social-btn facebook"><i class="material-icons"></i></button>
          <button class="social-btn twitter"><i class="material-icons"></i></button>
          <button class="social-btn google"><i class="material-icons"></i></button>
          <button class="social-btn linkedin"><i class="material-icons"></i></button>
        </div>
      </div>
    </div>

    <div class="background-column">
      <div class="overlay">
        
      </div>
    </div>
  `;

  container.appendChild(fullContainer);

  // Inicializa labels flotantes de Materialize
  M.updateTextFields();

  // form submit
  document.getElementById('loginForm').addEventListener('submit', e => {
    e.preventDefault();
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    import('../servicios/authService.js').then(({ login }) => {
      if (login(u, p)) window.goTo('/dashboard');
      else M.toast({ html: 'Credenciales incorrectas', classes: 'red' });
    });
  });
}

