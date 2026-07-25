/* ==========================================================================
   YCC CHARITABLE TRUST - IMPACT STORIES & BLOG PAGE
   ========================================================================== */
import { store } from '../store.js';

export function renderBlogPage() {
  const posts = store.getBlog();
  const mainEl = document.getElementById('main-content');

  const html = `
    <div style="background: linear-gradient(135deg, var(--primary-900), var(--primary-800)); color: white; padding: 4.5rem 0 3.5rem; text-align: center;">
      <div class="container">
        <h1 style="font-size: 3rem; margin-bottom: 1rem; color: white;">Impact Stories & Blog</h1>
        <p style="font-size: 1.15rem; max-width: 720px; margin: 0 auto; color: var(--primary-100);">
          Read inspiring stories from the field, donor spotlights, and field campaign progress reports.
        </p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="grid-3" style="grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));">
          ${posts.map(post => `
            <div class="project-card">
              <div class="project-img-box" style="height: 220px;">
                <img src="${post.image}" alt="${post.title}" />
                <span class="category-tag">${post.category}</span>
              </div>
              <div class="project-content">
                <div style="font-size: 0.8rem; color: var(--primary-600); font-weight: 700; margin-bottom: 0.5rem;">
                  ${post.date} • By ${post.author}
                </div>
                <h3 class="project-title" style="font-size: 1.3rem;">${post.title}</h3>
                <p class="project-desc" style="line-height: 1.6;">${post.content}</p>
                <button class="btn btn-outline btn-sm" data-read-post="${post.id}" style="margin-top: auto; align-self: flex-start;">
                  <span>Read Full Story</span>
                  <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;

  mainEl.innerHTML = html;
  if (window.lucide) window.lucide.createIcons();

  mainEl.querySelectorAll('[data-read-post]').forEach(btn => {
    btn.addEventListener('click', () => {
      const postId = btn.getAttribute('data-read-post');
      const post = posts.find(p => p.id === postId);
      if (post) openPostModal(post);
    });
  });
}

function openPostModal(post) {
  const modalContainer = document.getElementById('modal-container');
  const html = `
    <div class="modal-overlay active" id="post-modal">
      <div class="modal-box" style="max-width: 750px;">
        <button class="modal-close-btn" id="close-post-modal">
          <i data-lucide="x" style="width: 20px; height: 20px;"></i>
        </button>

        <img src="${post.image}" alt="${post.title}" style="width: 100%; height: 320px; object-fit: cover; border-radius: var(--radius-lg); margin-bottom: 1.5rem;" />

        <div style="font-size: 0.85rem; color: var(--primary-600); font-weight: 800; text-transform: uppercase; margin-bottom: 0.5rem;">
          ${post.category} • Published ${post.date}
        </div>
        <h2 style="font-size: 1.8rem; margin-bottom: 1rem;">${post.title}</h2>
        <div style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.5rem;">Author: <strong>${post.author}</strong></div>

        <div style="font-size: 1rem; line-height: 1.8; color: var(--text-main); margin-bottom: 2rem;">
          <p style="margin-bottom: 1rem;">${post.content}</p>
          <p style="margin-bottom: 1rem;">Through the dedicated support of our donor network, we have successfully scaled these operations to reach outlying hamlets. Volunteers conducted house-to-house surveys, provided nutritional supplements, and registered students for formal school enrollment.</p>
          <blockquote style="border-left: 4px solid var(--primary-600); padding-left: 1rem; font-style: italic; color: var(--primary-800); margin: 1.5rem 0;">
            "Seeing a child write their first sentence and smile with pride is the single greatest reward any community organization could ever ask for."
          </blockquote>
        </div>

        <div style="border-top: 1px solid var(--border-color); padding-top: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
          <div style="font-weight: 700; font-size: 0.9rem;">Share this story:</div>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-ghost btn-sm" onclick="alert('Story link copied to clipboard!')"><i data-lucide="share-2" style="width: 16px; height: 16px;"></i> Copy Link</button>
          </div>
        </div>
      </div>
    </div>
  `;
  modalContainer.innerHTML = html;
  if (window.lucide) window.lucide.createIcons();

  document.getElementById('close-post-modal')?.addEventListener('click', () => { modalContainer.innerHTML = ''; });
}
