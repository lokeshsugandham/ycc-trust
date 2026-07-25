/* ==========================================================================
   YCC CHARITABLE TRUST - USER & ADMIN AUTHENTICATION MODAL
   ========================================================================== */
import { auth } from '../auth.js';

export function openAuthModal(initialTab = 'login', onSuccess) {
  const modalContainer = document.getElementById('modal-container');
  let tab = initialTab;

  const render = () => {
    const html = `
      <div class="modal-overlay active" id="auth-modal-overlay">
        <div class="modal-box" style="max-width: 480px;">
          <button class="modal-close-btn" id="close-auth-modal">
            <i data-lucide="x" style="width: 20px; height: 20px;"></i>
          </button>

          <!-- Header -->
          <div style="text-align: center; margin-bottom: 1.5rem;">
            <div style="width: 48px; height: 48px; background: var(--primary-100); color: var(--primary-700); border-radius: var(--radius-md); display: inline-flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.2rem; margin-bottom: 0.5rem;">
              YCC
            </div>
            <h3 style="font-size: 1.5rem; margin-bottom: 0.25rem;">Donor & Member Portal</h3>
            <p style="font-size: 0.88rem; color: var(--text-muted);">Access your donation receipts and volunteer history.</p>
          </div>

          <!-- Tabs -->
          <div class="tab-nav" style="justify-content: center;">
            <button class="tab-btn ${tab === 'login' ? 'active' : ''}" id="auth-tab-login">Login</button>
            <button class="tab-btn ${tab === 'signup' ? 'active' : ''}" id="auth-tab-signup">Create Account</button>
          </div>

          <!-- TAB 1: LOGIN -->
          ${tab === 'login' ? `
            <form id="auth-login-form">
              <div class="form-group">
                <label class="form-label">Email Address</label>
                <input type="email" id="login-email" class="form-control" placeholder="name@example.com" required />
              </div>
              <div class="form-group">
                <label class="form-label">Password</label>
                <input type="password" id="login-pass" class="form-control" placeholder="••••••••" required />
              </div>

              <!-- Quick Fill Admin Demo Button -->
              <div style="margin-bottom: 1.25rem; text-align: right;">
                <button type="button" id="fill-admin-demo-btn" style="font-size: 0.8rem; color: var(--primary-700); font-weight: 700;">
                  ⚡ Quick Demo Admin Login
                </button>
              </div>

              <button type="submit" class="btn btn-primary" style="width: 100%;">
                <i data-lucide="log-in" style="width: 18px; height: 18px;"></i>
                <span>Sign In to Account</span>
              </button>
            </form>
          ` : ''}

          <!-- TAB 2: SIGN UP -->
          ${tab === 'signup' ? `
            <form id="auth-signup-form">
              <div class="form-group">
                <label class="form-label">Full Name *</label>
                <input type="text" id="signup-name" class="form-control" placeholder="Ramesh Sharma" required />
              </div>
              <div class="form-group">
                <label class="form-label">Email Address *</label>
                <input type="email" id="signup-email" class="form-control" placeholder="name@example.com" required />
              </div>
              <div class="form-group">
                <label class="form-label">Mobile Number *</label>
                <input type="tel" id="signup-phone" class="form-control" placeholder="+91 98765 43210" required />
              </div>
              <div class="form-group">
                <label class="form-label">PAN Number (for 80G Tax Certificates)</label>
                <input type="text" id="signup-pan" class="form-control" placeholder="ABCDE1234F" style="text-transform: uppercase;" />
              </div>
              <div class="form-group">
                <label class="form-label">Create Password *</label>
                <input type="password" id="signup-pass" class="form-control" placeholder="At least 6 characters" required minlength="6" />
              </div>

              <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 0.5rem;">
                <i data-lucide="user-plus" style="width: 18px; height: 18px;"></i>
                <span>Create Account</span>
              </button>
            </form>
          ` : ''}

        </div>
      </div>
    `;

    modalContainer.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();

    document.getElementById('close-auth-modal')?.addEventListener('click', () => { modalContainer.innerHTML = ''; });
    document.getElementById('auth-tab-login')?.addEventListener('click', () => { tab = 'login'; render(); });
    document.getElementById('auth-tab-signup')?.addEventListener('click', () => { tab = 'signup'; render(); });

    // Quick Admin Fill
    document.getElementById('fill-admin-demo-btn')?.addEventListener('click', () => {
      document.getElementById('login-email').value = 'admin@ycctrust.org';
      document.getElementById('login-pass').value = 'admin123';
    });

    // Forms Submission
    const loginForm = document.getElementById('auth-login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-pass').value;
        const res = auth.login(email, pass);
        if (res.success) {
          modalContainer.innerHTML = '';
          if (onSuccess) onSuccess(res.user);
        } else {
          alert(res.message);
        }
      });
    }

    const signupForm = document.getElementById('auth-signup-form');
    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const phone = document.getElementById('signup-phone').value;
        const pan = document.getElementById('signup-pan').value;
        const pass = document.getElementById('signup-pass').value;

        const res = auth.signup(name, email, phone, pan, pass);
        if (res.success) {
          modalContainer.innerHTML = '';
          if (onSuccess) onSuccess(res.user);
        } else {
          alert(res.message);
        }
      });
    }
  };

  render();
}
