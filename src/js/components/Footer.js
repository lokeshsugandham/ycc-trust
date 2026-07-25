/* ==========================================================================
   YCC CHARITABLE TRUST - FOOTER COMPONENT
   ========================================================================== */

export function renderFooter(onNavigate, openDonateModal) {
  const html = `
    <div style="background: var(--slate-900); color: var(--slate-300); padding: 4.5rem 0 2rem; margin-top: 4rem; border-top: 4px solid var(--primary-600);">
      <div class="container">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 2.5rem; margin-bottom: 3.5rem;">
          
          <!-- Column 1: Brand & 80G Tax info -->
          <div>
            <div style="display: flex; align-items: center; gap: 0.75rem; font-family: var(--font-display); font-size: 1.4rem; font-weight: 800; color: white; margin-bottom: 1rem;">
              <div style="width: 36px; height: 36px; background: var(--primary-600); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; color: white;">YCC</div>
              <span>YCC Trust</span>
            </div>
            <p style="font-size: 0.9rem; color: var(--slate-400); margin-bottom: 1.5rem; line-height: 1.6;">
              Youth & Community Care (YCC) Charitable Trust is a registered non-profit organization dedicated to empowering underprivileged children, rural healthcare, and environmental conservation.
            </p>
            <div style="background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.3); padding: 0.8rem 1rem; border-radius: var(--radius-md); font-size: 0.85rem; color: var(--primary-400);">
              <i data-lucide="shield-check" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle; margin-right: 0.4rem;"></i>
              <strong>80G Tax Exempted:</strong> All donations are eligible for 50% tax benefit under Sec 80G of IT Act, 1961.
            </div>
          </div>

          <!-- Column 2: Quick Links -->
          <div>
            <h4 style="color: white; margin-bottom: 1.25rem; font-size: 1.1rem;">Quick Links</h4>
            <ul style="list-style: none; font-size: 0.9rem; display: flex; flex-direction: column; gap: 0.65rem;">
              <li><a href="#" data-footer-nav="about" style="color: var(--slate-300); transition: color 0.2s;">About Our Mission</a></li>
              <li><a href="#" data-footer-nav="projects" style="color: var(--slate-300); transition: color 0.2s;">Active Projects</a></li>
              <li><a href="#" data-footer-nav="events" style="color: var(--slate-300); transition: color 0.2s;">Upcoming Events</a></li>
              <li><a href="#" data-footer-nav="gallery" style="color: var(--slate-300); transition: color 0.2s;">Media Gallery & Videos</a></li>
              <li><a href="#" data-footer-nav="volunteers" style="color: var(--slate-300); transition: color 0.2s;">Become a Volunteer</a></li>
            </ul>
          </div>

          <!-- Column 3: Trust Information -->
          <div>
            <h4 style="color: white; margin-bottom: 1.25rem; font-size: 1.1rem;">Trust Details</h4>
            <div style="font-size: 0.88rem; display: flex; flex-direction: column; gap: 0.75rem; color: var(--slate-400);">
              <div><strong style="color: white;">Registration No:</strong> IV-1082/2018/YCC</div>
              <div><strong style="color: white;">NITI Aayog DARPAN ID:</strong> IN/2018/019283</div>
              <div><strong style="color: white;">12A Certificate:</strong> AABTY1290EE20214</div>
              <div><strong style="color: white;">80G Reg No:</strong> AABTY1290EF20218</div>
            </div>
          </div>

          <!-- Column 4: Newsletter & Contact -->
          <div>
            <h4 style="color: white; margin-bottom: 1.25rem; font-size: 1.1rem;">Stay Connected</h4>
            <p style="font-size: 0.88rem; color: var(--slate-400); margin-bottom: 1rem;">
              Subscribe to get monthly impact reports and activity updates directly in your inbox.
            </p>
            <form id="footer-newsletter-form" style="display: flex; gap: 0.5rem; margin-bottom: 1.25rem;">
              <input type="email" placeholder="Enter your email" required style="padding: 0.65rem 0.9rem; border-radius: var(--radius-md); border: 1px solid var(--slate-700); background: var(--slate-800); color: white; font-size: 0.85rem; width: 100%;" />
              <button type="submit" class="btn btn-primary btn-sm">Subscribe</button>
            </form>
            <div style="display: flex; gap: 0.75rem;">
              <a href="#" style="width: 36px; height: 36px; border-radius: var(--radius-full); background: var(--slate-800); display: flex; align-items: center; justify-content: center; color: white;"><i data-lucide="facebook" style="width: 16px; height: 16px;"></i></a>
              <a href="#" style="width: 36px; height: 36px; border-radius: var(--radius-full); background: var(--slate-800); display: flex; align-items: center; justify-content: center; color: white;"><i data-lucide="twitter" style="width: 16px; height: 16px;"></i></a>
              <a href="#" style="width: 36px; height: 36px; border-radius: var(--radius-full); background: var(--slate-800); display: flex; align-items: center; justify-content: center; color: white;"><i data-lucide="instagram" style="width: 16px; height: 16px;"></i></a>
              <a href="#" style="width: 36px; height: 36px; border-radius: var(--radius-full); background: var(--slate-800); display: flex; align-items: center; justify-content: center; color: white;"><i data-lucide="youtube" style="width: 16px; height: 16px;"></i></a>
            </div>
          </div>
        </div>

        <div style="border-top: 1px solid var(--slate-800); padding-top: 1.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; font-size: 0.85rem; color: var(--slate-500);">
          <div>&copy; 2026 Youth & Community Care (YCC) Charitable Trust. All Rights Reserved.</div>
          <div style="display: flex; gap: 1.5rem;">
            <a href="#" style="color: var(--slate-400);">Privacy Policy</a>
            <a href="#" style="color: var(--slate-400);">Terms & Tax Exemptions</a>
            <a href="#" style="color: var(--slate-400);">Refund Policy</a>
          </div>
        </div>
      </div>
    </div>
  `;

  const footerEl = document.getElementById('site-footer');
  footerEl.innerHTML = html;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  footerEl.querySelectorAll('[data-footer-nav]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      onNavigate(link.getAttribute('data-footer-nav'));
    });
  });

  const form = footerEl.querySelector('#footer-newsletter-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for subscribing to YCC Trust updates!');
      form.reset();
    });
  }
}
