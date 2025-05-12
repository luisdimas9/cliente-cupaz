let currentUser = null;

export function login(username, password) {
  if (username === 'admin' && password === '1234') {
    currentUser = { username };
    return true;
  }
  return false;
}

export function isAuthenticated() {
  return !!currentUser;
}

export function logout() {
  currentUser = null;
  window.goTo('/');
}