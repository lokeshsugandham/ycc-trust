/* ==========================================================================
   YCC CHARITABLE TRUST - HOME PAGE
   ========================================================================== */
import { store } from '../store.js';

export function renderHomePage(onNavigate, openDonateModal) {
  const projects = store.getProjects().slice(0, 3);
  const wallOfHope = store.getWallOfHope().slice(0, 6);
  const blogPosts = store.getBlog().slice(0, 2);

  const html = `
    <!-- Hero Banner Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-grid">
          <div>
            <div class="hero-badge">
              <i data-lucide="shield-check" style="width: 16px; height: 16px;"></i>
              <span>Sec 80G Tax Exempted Organization</span>
            </div>
            <h1 class="hero-title">
              Empowering Lives, <br/>
              <span class="text-gradient">Building Brighter Futures</span>
            </h1>
            <p class="hero-description">
              Youth & Community Care (YCC) Charitable Trust brings education to rural children, quality healthcare to seniors, and green environmental initiatives to communities across India.
            </p>
            <div class="hero-cta">
              <button class="btn btn-accent btn-lg" id="hero-donate-now-btn">
                <i data-lucide="heart" style="width: 22px; height: 22px; fill: currentColor;"></i>
                <span>Donate Now (80G Benefit)</span>
              </button>
              <button class="btn btn-outline btn-lg" id="hero-explore-projects-btn">
                <i data-lucide="compass" style="width: 20px; height: 20px;"></i>
                <span>Explore Projects</span>
              </button>
            </div>
            <div class="hero-stats">
              <div>
                <div class="stat-number">50,000+</div>
                <div class="stat-label">Lives Touched & Empowered</div>
              </div>
              <div>
                <div class="stat-number">120+</div>
                <div class="stat-label">Villages & Communities</div>
              </div>
              <div>
                <div class="stat-number">100%</div>
                <div class="stat-label">Transparent Fund Utilization</div>
              </div>
            </div>
          </div>
          <div class="hero-image-wrapper">
            <div class="hero-image-card">
              <img src="/assets/images/hero.jpg" alt="YCC Children Education & Welfare" />
            </div>
            <div class="hero-floating-badge">
              <div class="floating-icon">
                <i data-lucide="award" style="width: 26px; height: 26px;"></i>
              </div>
              <div>
                <div style="font-weight: 800; font-size: 0.95rem; color: var(--slate-900);">NITI Aayog Registered</div>
                <div style="font-size: 0.78rem; color: var(--slate-500);">DARPAN Reg ID: IN/2018/019283</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Wall of Hope Live Supporter Ticker -->
    <div style="background: var(--primary-900); color: white; padding: 1rem 0; overflow: hidden; border-y: 1px solid var(--primary-700);">
      <div class="container" style="display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
        <div style="font-weight: 800; font-size: 0.85rem; color: var(--accent-400); text-transform: uppercase; letter-spacing: 0.08em; display: flex; align-items: center; gap: 0.4rem; white-space: nowrap;">
          <i data-lucide="sparkles" style="width: 16px; height: 16px;"></i> Wall of Hope (Recent Donors):
        </div>
        <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; font-size: 0.88rem;">
          ${wallOfHope.map(donor => `
            <div style="background: rgba(255,255,255,0.1); padding: 0.35rem 0.85rem; border-radius: var(--radius-full); display: flex; align-items: center; gap: 0.5rem;">
              <strong>${donor.name}</strong>
              <span style="color: var(--accent-400);">₹${donor.amount.toLocaleString('en-IN')}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Featured Projects Section -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <div class="section-subtitle">Active Initiatives</div>
          <h2 class="section-title">High-Impact Causes Needing Your Support</h2>
          <p class="section-desc">Choose a cause close to your heart and make a direct, measurable difference today.</p>
        </div>

        <div class="grid-3">
          ${projects.map(proj => {
            const percent = Math.min(100, Math.round((proj.raisedAmount / proj.targetAmount) * 100));
            return `
              <div class="project-card">
                <div class="project-img-box">
                  <img src="${proj.image}" alt="${proj.title}" />
                  <span class="category-tag">${proj.category}</span>
                </div>
                <div class="project-content">
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

                  <button class="btn btn-primary" data-donate-proj="${proj.id}" style="width: 100%; margin-top: auto;">
                    <i data-lucide="heart" style="width: 16px; height: 16px;"></i>
                    <span>Fund This Project</span>
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div style="text-align: center; margin-top: 3rem;">
          <button class="btn btn-outline btn-lg" id="view-all-projects-btn">
            <span>View All Campaigns & Projects</span>
            <i data-lucide="arrow-right" style="width: 20px; height: 20px;"></i>
          </button>
        </div>
      </div>
    </section>

    <!-- Why Choose YCC Trust Section -->
    <section class="section" style="background: var(--slate-100);">
      <div class="container">
        <div class="section-header">
          <div class="section-subtitle">Our Promise</div>
          <h2 class="section-title">Transparent, Verified & Community Driven</h2>
        </div>

        <div class="grid-4">
          <div style="background: var(--bg-card); padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); text-align: center;">
            <div style="width: 56px; height: 56px; background: var(--primary-100); color: var(--primary-700); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;">
              <i data-lucide="receipt" style="width: 28px; height: 28px;"></i>
            </div>
            <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem;">Instant 80G Receipts</h3>
            <p style="font-size: 0.9rem; color: var(--text-muted);">Get official tax exemption certificates generated immediately upon online donation.</p>
          </div>

          <div style="background: var(--bg-card); padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); text-align: center;">
            <div style="width: 56px; height: 56px; background: var(--accent-100); color: var(--accent-700); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;">
              <i data-lucide="pie-chart" style="width: 28px; height: 28px;"></i>
            </div>
            <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem;">100% Fund Transparency</h3>
            <p style="font-size: 0.9rem; color: var(--text-muted);">Audited financial statements published quarterly for absolute donor trust.</p>
          </div>

          <div style="background: var(--bg-card); padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); text-align: center;">
            <div style="width: 56px; height: 56px; background: var(--primary-100); color: var(--primary-700); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;">
              <i data-lucide="map-pin" style="width: 28px; height: 28px;"></i>
            </div>
            <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem;">Grassroots Ground Impact</h3>
            <p style="font-size: 0.9rem; color: var(--text-muted);">Direct field execution by verified ground volunteers in rural sectors.</p>
          </div>

          <div style="background: var(--bg-card); padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); text-align: center;">
            <div style="width: 56px; height: 56px; background: var(--accent-100); color: var(--accent-700); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;">
              <i data-lucide="users" style="width: 28px; height: 28px;"></i>
            </div>
            <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem;">Active Volunteer Network</h3>
            <p style="font-size: 0.9rem; color: var(--text-muted);">Over 1,200+ passionate volunteers supporting local community programs.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Latest Impact Stories -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <div class="section-subtitle">Field Updates</div>
          <h2 class="section-title">Impact Stories & News</h2>
        </div>

        <div class="grid-3" style="grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));">
          ${blogPosts.map(post => `
            <div class="project-card">
              <div class="project-img-box" style="height: 190px;">
                <img src="${post.image}" alt="${post.title}" />
              </div>
              <div class="project-content">
                <div style="font-size: 0.78rem; color: var(--primary-600); font-weight: 700; margin-bottom: 0.4rem;">${post.date} • ${post.category}</div>
                <h3 class="project-title" style="font-size: 1.15rem;">${post.title}</h3>
                <p class="project-desc" style="font-size: 0.88rem;">${post.content}</p>
                <div style="font-size: 0.8rem; font-weight: 700; color: var(--slate-600); margin-top: auto;">By ${post.author}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;

  const mainEl = document.getElementById('main-content');
  mainEl.innerHTML = html;
  if (window.lucide) window.lucide.createIcons();

  // Attach Handlers
  document.getElementById('hero-donate-now-btn')?.addEventListener('click', () => openDonateModal());
  document.getElementById('hero-explore-projects-btn')?.addEventListener('click', () => onNavigate('projects'));
  document.getElementById('view-all-projects-btn')?.addEventListener('click', () => onNavigate('projects'));

  mainEl.querySelectorAll('[data-donate-proj]').forEach(btn => {
    btn.addEventListener('click', () => {
      const projId = btn.getAttribute('data-donate-proj');
      openDonateModal(projId);
    });
  });
}
