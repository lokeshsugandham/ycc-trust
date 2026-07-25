/* ==========================================================================
   YCC CHARITABLE TRUST - PROJECTS & CAMPAIGN EXPLORER
   ========================================================================== */
import { store } from '../store.js';

export function renderProjectsPage(onNavigate, openDonateModal) {
  let projects = store.getProjects();
  let selectedCategory = 'All';

  const mainEl = document.getElementById('main-content');

  const render = () => {
    const categories = ['All', 'Education', 'Healthcare', 'Environment', 'Empowerment'];
    const filtered = selectedCategory === 'All' ? projects : projects.filter(p => p.category === selectedCategory);

    const html = `
      <div style="background: linear-gradient(135deg, var(--primary-900), var(--primary-800)); color: white; padding: 4.5rem 0 3.5rem; text-align: center;">
        <div class="container">
          <h1 style="font-size: 3rem; margin-bottom: 1rem; color: white;">Trust Initiatives & Campaigns</h1>
          <p style="font-size: 1.15rem; max-width: 720px; margin: 0 auto; color: var(--primary-100);">
            Explore our ongoing community development programs. Every contribution qualifies for 50% Sec 80G tax benefit.
          </p>
        </div>
      </div>

      <section class="section">
        <div class="container">
          <!-- Category Filter Bar -->
          <div style="display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 3.5rem;">
            ${categories.map(cat => `
              <button class="btn ${selectedCategory === cat ? 'btn-primary' : 'btn-outline'}" data-cat="${cat}">
                ${cat}
              </button>
            `).join('')}
          </div>

          <!-- Projects Grid -->
          <div class="grid-3">
            ${filtered.map(proj => {
              const percent = Math.min(100, Math.round((proj.raisedAmount / proj.targetAmount) * 100));
              return `
                <div class="project-card">
                  <div class="project-img-box">
                    <img src="${proj.image}" alt="${proj.title}" />
                    <span class="category-tag">${proj.category}</span>
                  </div>
                  <div class="project-content">
                    <div style="font-size: 0.8rem; color: var(--slate-500); font-weight: 600; margin-bottom: 0.25rem;">
                      <i data-lucide="map-pin" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle;"></i> ${proj.location || 'Pan India'}
                    </div>
                    <h3 class="project-title">${proj.title}</h3>
                    <p class="project-desc">${proj.summary}</p>
                    
                    <div class="progress-container">
                      <div class="progress-info">
                        <span>Raised: ₹${proj.raisedAmount.toLocaleString('en-IN')}</span>
                        <span>${percent}%</span>
                      </div>
                      <div class="progress-bar-bg">
                        <div class="progress-bar-fill" style="width: ${percent}%;"></div>
                      </div>
                      <div style="display: flex; justify-content: space-between; font-size: 0.78rem; color: var(--text-muted); margin-top: 0.4rem;">
                        <span>Goal: ₹${proj.targetAmount.toLocaleString('en-IN')}</span>
                        <span>Beneficiaries: ${proj.beneficiaries}</span>
                      </div>
                    </div>

                    <button class="btn btn-primary" data-donate-id="${proj.id}" style="width: 100%; margin-top: auto;">
                      <i data-lucide="heart" style="width: 16px; height: 16px;"></i>
                      <span>Donate to This Campaign</span>
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          ${filtered.length === 0 ? `
            <div style="text-align: center; padding: 4rem; color: var(--text-muted);">
              <i data-lucide="info" style="width: 48px; height: 48px; margin-bottom: 1rem;"></i>
              <h3>No campaigns found in this category.</h3>
            </div>
          ` : ''}
        </div>
      </section>
    `;

    mainEl.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();

    mainEl.querySelectorAll('[data-cat]').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedCategory = btn.getAttribute('data-cat');
        render();
      });
    });

    mainEl.querySelectorAll('[data-donate-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        openDonateModal(btn.getAttribute('data-donate-id'));
      });
    });
  };

  render();
}
