/* ==========================================================================
   YCC CHARITABLE TRUST - APPLICATION ENTRY POINT & ROUTER
   ========================================================================== */

import { store } from './store.js';
import { auth } from './auth.js';

import { renderHeader } from './components/Header.js';
import { renderFooter } from './components/Footer.js';
import { openDonationModal } from './components/DonationModal.js';
import { openAuthModal } from './components/AuthModal.js';

import { renderHomePage } from './pages/HomePage.js';
import { renderAboutPage } from './pages/AboutPage.js';
import { renderProjectsPage } from './pages/ProjectsPage.js';
import { renderEventsPage } from './pages/EventsPage.js';
import { renderGalleryPage } from './pages/GalleryPage.js';
import { renderBlogPage } from './pages/BlogPage.js';
import { renderVolunteersPage } from './pages/VolunteersPage.js';
import { renderContactPage } from './pages/ContactPage.js';
import { renderProfilePage } from './pages/ProfilePage.js';
import { renderAdminPage } from './pages/AdminPage.js';

let currentPage = 'home';

function navigateTo(pageId) {
  currentPage = pageId;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderApp();
}

function renderApp() {
  // Render Header
  renderHeader(
    currentPage,
    navigateTo,
    (projId) => openDonationModal(projId),
    () => openAuthModal('login', () => renderApp())
  );

  // Render Page Body
  switch (currentPage) {
    case 'home':
      renderHomePage(navigateTo, (projId) => openDonationModal(projId));
      break;
    case 'about':
      renderAboutPage(navigateTo, (projId) => openDonationModal(projId));
      break;
    case 'projects':
      renderProjectsPage(navigateTo, (projId) => openDonationModal(projId));
      break;
    case 'events':
      renderEventsPage(navigateTo);
      break;
    case 'gallery':
      renderGalleryPage();
      break;
    case 'blog':
      renderBlogPage();
      break;
    case 'volunteers':
      renderVolunteersPage();
      break;
    case 'contact':
      renderContactPage();
      break;
    case 'profile':
      renderProfilePage(navigateTo);
      break;
    case 'admin':
      renderAdminPage(navigateTo);
      break;
    default:
      renderHomePage(navigateTo, (projId) => openDonationModal(projId));
  }

  // Render Footer
  renderFooter(navigateTo, (projId) => openDonationModal(projId));
}

// Subscribe to store updates so UI reflects live changes
store.subscribe(() => {
  renderApp();
});

// Initial boot
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
});
