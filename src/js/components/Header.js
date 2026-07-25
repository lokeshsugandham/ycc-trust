/* ==========================================================================
   YCC CHARITABLE TRUST - HEADER COMPONENT
   ========================================================================== */
import { auth } from '../auth.js';

export function renderHeader(activePage = 'home', onNavigate, openDonateModal, openAuthModal) {
  const user = auth.getUser();
  const isAdmin = auth.isAdmin();

  const navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'about', label: 'About Us', icon: 'info' },
    { id: 'projects', label: 'Projects', icon: 'heart-handshake' },
    { id: 'events', label: 'Events', icon: 'calendar' },
    { id: 'gallery', label: 'Gallery', icon: 'image' },
    { id: 'blog', label: 'Impact & Blog', icon: 'book-open' },
    { id: 'volunteers', label: 'Volunteers', icon: 'users' },
    { id: 'contact', label: 'Contact', icon: 'phone-call' }
  ];

  if (isAdmin) {
    navItems.push({ id: 'admin', label: 'Admin CMS', icon: 'shield-check' });
  }

  const html = `
    <div class="container">
      <div class="header-inner">
        <!-- Brand Logo -->
        <a href="#" class="logo" data-nav="home">
          <div class="logo-badge">YCC</div>
          <div>
            <span>YCC Trust</span>
            <div style="font-size: 0.65rem; font-weight: 600; color: var(--slate-500); text-transform: uppercase; letter-spacing: 0.05em;">Youth & Community Care</div>
          </div>
        </a>

        <!-- Desktop Navigation -->
        <nav>
          <ul class="nav-menu">
            ${navItems.map(item => `
              <li>
                <a href="#" class="nav-link ${activePage === item.id ? 'active' : ''}" data-nav="${item.id}">
                  <i data-lucide="${item.icon}" style="width: 16px; height: 16px;"></i>
                  ${item.label}
                </a>
              </li>
            `).join('')}
          </ul>
        </nav>

        <!-- Right Side Actions -->
        <div class="header-actions">
          <!-- Theme Toggle -->
          <button id="theme-toggle-btn" class="theme-toggle" title="Toggle Light/Dark Theme">
            <i data-lucide="${document.documentElement.getAttribute('data-theme') === 'dark' ? 'sun' : 'moon'}" style="width: 20px; height: 20px;"></i>
          </button>

          <!-- User Account / Login Button -->
          ${user ? `
            <a href="#" class="btn btn-ghost btn-sm" data-nav="profile">
              <i data-lucide="user-check" style="width: 18px; height: 18px; color: var(--primary-600);"></i>
              <span>${user.name.split(' ')[0]}</span>
            </a>
          ` : `
            <button id="header-login-btn" class="btn btn-ghost btn-sm">
              <i data-lucide="log-in" style="width: 18px; height: 18px;"></i>
              <span>Login</span>
            </button>
          `}

          <!-- Primary CTA: Donate -->
          <button id="header-donate-btn" class="btn btn-accent btn-sm">
            <i data-lucide="heart" style="width: 18px; height: 18px; fill: currentColor;"></i>
            <span>Donate Now</span>
          </button>

          <!-- Mobile Menu Drawer Toggle -->
          <button id="mobile-menu-toggle" class="btn btn-ghost btn-sm" style="display: none;">
            <i data-lucide="menu" style="width: 24px; height: 24px;"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  const headerEl = document.getElementById('site-header');
  headerEl.className = 'site-header';
  headerEl.innerHTML = html;

  // Re-initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Event Listeners
  headerEl.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.getAttribute('data-nav');
      onNavigate(page);
    });
  });

  const donateBtn = headerEl.querySelector('#header-donate-btn');
  if (donateBtn) {
    donateBtn.addEventListener('click', () => openDonateModal());
  }

  const loginBtn = headerEl.querySelector('#header-login-btn');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => openAuthModal());
  }

  const themeBtn = headerEl.querySelector('#theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      renderHeader(activePage, onNavigate, openDonateModal, openAuthModal);
    });
  }
}
