/* ==========================================================================
   YCC CHARITABLE TRUST - CONTACT US & LOCATION MAP PAGE
   ========================================================================== */

export function renderContactPage() {
  const mainEl = document.getElementById('main-content');

  const html = `
    <div style="background: linear-gradient(135deg, var(--primary-900), var(--primary-800)); color: white; padding: 4.5rem 0 3.5rem; text-align: center;">
      <div class="container">
        <h1 style="font-size: 3rem; margin-bottom: 1rem; color: white;">Contact & Helplines</h1>
        <p style="font-size: 1.15rem; max-width: 720px; margin: 0 auto; color: var(--primary-100);">
          We are here to answer your queries regarding 80G tax receipts, corporate CSR partnerships, and volunteer initiatives.
        </p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3.5rem; margin-bottom: 4rem;">
          
          <!-- Contact Form -->
          <div style="background: var(--bg-card); padding: 2.5rem; border-radius: var(--radius-xl); border: 1px solid var(--border-color); box-shadow: var(--shadow-md);">
            <h2 style="font-size: 1.75rem; margin-bottom: 1.5rem;">Send Us a Message</h2>
            
            <form id="contact-form">
              <div class="form-group">
                <label class="form-label">Your Full Name *</label>
                <input type="text" id="cnt-name" class="form-control" placeholder="Ramesh Verma" required />
              </div>
              <div class="form-group">
                <label class="form-label">Email Address *</label>
                <input type="email" id="cnt-email" class="form-control" placeholder="name@example.com" required />
              </div>
              <div class="form-group">
                <label class="form-label">Subject</label>
                <select id="cnt-subject" class="form-control">
                  <option>80G Tax Exemption Receipt Query</option>
                  <option>CSR Corporate Sponsorship Partnership</option>
                  <option>Volunteer Program Inquiry</option>
                  <option>General Feedback</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Message *</label>
                <textarea id="cnt-message" class="form-control" rows="4" placeholder="How can we assist you?" required></textarea>
              </div>

              <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">
                <i data-lucide="send" style="width: 18px; height: 18px;"></i>
                <span>Send Message</span>
              </button>
            </form>
          </div>

          <!-- Trust Contact Information & Map -->
          <div>
            <div style="display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 2rem;">
              <div style="display: flex; gap: 1rem; background: var(--bg-card); padding: 1.25rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
                <div style="width: 48px; height: 48px; background: var(--primary-100); color: var(--primary-700); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <i data-lucide="map-pin" style="width: 24px; height: 24px;"></i>
                </div>
                <div>
                  <h4 style="font-size: 1.1rem; margin-bottom: 0.25rem;">Head Office Address</h4>
                  <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5;">
                    104, Harmony Heights, NGO Complex, Sector 4, Metro City, Pin 110001, India.
                  </p>
                </div>
              </div>

              <div style="display: flex; gap: 1rem; background: var(--bg-card); padding: 1.25rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
                <div style="width: 48px; height: 48px; background: var(--accent-100); color: var(--accent-700); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <i data-lucide="phone" style="width: 24px; height: 24px;"></i>
                </div>
                <div>
                  <h4 style="font-size: 1.1rem; margin-bottom: 0.25rem;">Helpline & WhatsApp</h4>
                  <p style="font-size: 0.9rem; color: var(--text-muted);">
                    +91 1800 200 9988 (Toll Free)<br/>
                    +91 98000 11223 (WhatsApp Support)
                  </p>
                </div>
              </div>

              <div style="display: flex; gap: 1rem; background: var(--bg-card); padding: 1.25rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
                <div style="width: 48px; height: 48px; background: var(--primary-100); color: var(--primary-700); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <i data-lucide="mail" style="width: 24px; height: 24px;"></i>
                </div>
                <div>
                  <h4 style="font-size: 1.1rem; margin-bottom: 0.25rem;">Email Support</h4>
                  <p style="font-size: 0.9rem; color: var(--text-muted);">
                    donations@ycctrust.org<br/>
                    support@ycctrust.org
                  </p>
                </div>
              </div>
            </div>

            <!-- Simulated Map Container -->
            <div style="height: 220px; background: var(--slate-200); border-radius: var(--radius-xl); border: 1px solid var(--border-color); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 1.5rem; position: relative; overflow: hidden;">
              <div style="width: 60px; height: 60px; border-radius: 50%; background: var(--primary-600); color: white; display: flex; align-items: center; justify-content: center; margin-bottom: 0.75rem; box-shadow: var(--shadow-lg);">
                <i data-lucide="map" style="width: 30px; height: 30px;"></i>
              </div>
              <h4 style="font-size: 1.1rem; color: var(--slate-900);">YCC Trust Central Hub Map</h4>
              <span style="font-size: 0.82rem; color: var(--slate-600);">Latitude: 28.6139° N, Longitude: 77.2090° E</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  `;

  mainEl.innerHTML = html;
  if (window.lucide) window.lucide.createIcons();

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for contacting YCC Trust! Our team will respond within 24 hours.');
      form.reset();
    });
  }
}
