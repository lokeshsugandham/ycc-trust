/* ==========================================================================
   YCC CHARITABLE TRUST - MEDIA GALLERY & LIGHTBOX
   ========================================================================== */
import { store } from '../store.js';

export function renderGalleryPage() {
  const mediaList = store.getMedia();
  let filter = 'All';

  const mainEl = document.getElementById('main-content');

  const render = () => {
    const categories = ['All', 'Education', 'Healthcare', 'Environment', 'Events'];
    const filtered = filter === 'All' ? mediaList : mediaList.filter(m => m.category === filter);

    const html = `
      <div style="background: linear-gradient(135deg, var(--primary-900), var(--primary-800)); color: white; padding: 4.5rem 0 3.5rem; text-align: center;">
        <div class="container">
          <h1 style="font-size: 3rem; margin-bottom: 1rem; color: white;">Media & Photo Gallery</h1>
          <p style="font-size: 1.15rem; max-width: 720px; margin: 0 auto; color: var(--primary-100);">
            Witness the real impact of your contributions through high-definition photo documentation and video reports.
          </p>
        </div>
      </div>

      <section class="section">
        <div class="container">
          <!-- Filter Buttons -->
          <div style="display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 3.5rem;">
            ${categories.map(cat => `
              <button class="btn ${filter === cat ? 'btn-primary' : 'btn-outline'}" data-gallery-cat="${cat}">
                ${cat}
              </button>
            `).join('')}
          </div>

          <!-- Media Cards Grid -->
          <div class="grid-3">
            ${filtered.map(m => `
              <div class="project-card" style="cursor: pointer;" data-lightbox-url="${m.url}" data-lightbox-title="${m.title}">
                <div class="project-img-box" style="height: 240px;">
                  <img src="${m.url}" alt="${m.title}" />
                  <span class="category-tag">${m.category}</span>
                  <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s;" class="media-hover-overlay">
                    <div style="width: 50px; height: 50px; border-radius: 50%; background: white; color: var(--primary-700); display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-lg);">
                      <i data-lucide="maximize-2" style="width: 24px; height: 24px;"></i>
                    </div>
                  </div>
                </div>
                <div style="padding: 1.25rem;">
                  <h3 style="font-size: 1.1rem;">${m.title}</h3>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;

    mainEl.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();

    mainEl.querySelectorAll('[data-gallery-cat]').forEach(btn => {
      btn.addEventListener('click', () => {
        filter = btn.getAttribute('data-gallery-cat');
        render();
      });
    });

    mainEl.querySelectorAll('[data-lightbox-url]').forEach(card => {
      card.addEventListener('mouseenter', () => {
        const overlay = card.querySelector('.media-hover-overlay');
        if (overlay) overlay.style.opacity = '1';
      });
      card.addEventListener('mouseleave', () => {
        const overlay = card.querySelector('.media-hover-overlay');
        if (overlay) overlay.style.opacity = '0';
      });
      card.addEventListener('click', () => {
        const url = card.getAttribute('data-lightbox-url');
        const title = card.getAttribute('data-lightbox-title');
        openLightbox(url, title);
      });
    });
  };

  render();
}

function openLightbox(url, title) {
  const modalContainer = document.getElementById('modal-container');
  const html = `
    <div class="modal-overlay active" id="lightbox-modal">
      <div style="max-width: 900px; width: 100%; position: relative;">
        <button class="modal-close-btn" id="close-lightbox" style="top: -40px; right: 0; background: white; color: black;">
          <i data-lucide="x" style="width: 24px; height: 24px;"></i>
        </button>
        <img src="${url}" alt="${title}" style="width: 100%; max-height: 80vh; object-fit: contain; border-radius: var(--radius-lg); box-shadow: var(--shadow-xl);" />
        <div style="color: white; text-align: center; margin-top: 1rem; font-size: 1.2rem; font-weight: 700;">${title}</div>
      </div>
    </div>
  `;
  modalContainer.innerHTML = html;
  if (window.lucide) window.lucide.createIcons();

  document.getElementById('close-lightbox')?.addEventListener('click', () => { modalContainer.innerHTML = ''; });
  document.getElementById('lightbox-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'lightbox-modal') modalContainer.innerHTML = '';
  });
}
