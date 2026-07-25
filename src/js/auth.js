/* ==========================================================================
   YCC CHARITABLE TRUST - AUTHENTICATION & USER MANAGEMENT
   ========================================================================== */

const AUTH_USER_KEY = 'YCC_AUTH_CURRENT_USER';
const USERS_LIST_KEY = 'YCC_AUTH_ALL_USERS';

const DEFAULT_ADMIN = {
  id: 'usr-admin-01',
  name: 'Trust Admin',
  email: 'admin@ycctrust.org',
  role: 'admin',
  phone: '+91 98000 00000',
  pan: 'AAATY0000A'
};

class Auth {
  constructor() {
    this.currentUser = this.loadCurrentUser();
    this.users = this.loadUsers();
  }

  loadCurrentUser() {
    try {
      const stored = localStorage.getItem(AUTH_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  }

  loadUsers() {
    try {
      const stored = localStorage.getItem(USERS_LIST_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    const defaultList = [DEFAULT_ADMIN];
    localStorage.setItem(USERS_LIST_KEY, JSON.stringify(defaultList));
    return defaultList;
  }

  saveCurrentUser(user) {
    this.currentUser = user;
    if (user) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_USER_KEY);
    }
  }

  saveUsers() {
    localStorage.setItem(USERS_LIST_KEY, JSON.stringify(this.users));
  }

  login(email, password) {
    if (email === 'admin@ycctrust.org' && password === 'admin123') {
      this.saveCurrentUser(DEFAULT_ADMIN);
      return { success: true, user: DEFAULT_ADMIN };
    }

    const existing = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing && existing.password === password) {
      this.saveCurrentUser(existing);
      return { success: true, user: existing };
    }

    return { success: false, message: 'Invalid email or password.' };
  }

  signup(name, email, phone, pan, password) {
    const existing = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: false, message: 'User with this email already exists.' };
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone,
      pan: pan ? pan.toUpperCase() : '',
      role: 'donor',
      password
    };

    this.users.push(newUser);
    this.saveUsers();
    this.saveCurrentUser(newUser);
    return { success: true, user: newUser };
  }

  logout() {
    this.saveCurrentUser(null);
  }

  updateProfile(updatedData) {
    if (!this.currentUser) return;
    Object.assign(this.currentUser, updatedData);
    const idx = this.users.findIndex(u => u.id === this.currentUser.id);
    if (idx !== -1) {
      this.users[idx] = this.currentUser;
      this.saveUsers();
    }
    this.saveCurrentUser(this.currentUser);
  }

  isLoggedIn() {
    return !!this.currentUser;
  }

  isAdmin() {
    return this.currentUser && this.currentUser.role === 'admin';
  }

  getUser() {
    return this.currentUser;
  }
}

export const auth = new Auth();
