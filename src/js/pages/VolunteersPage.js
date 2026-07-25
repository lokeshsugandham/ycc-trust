/* ==========================================================================
   YCC CHARITABLE TRUST - VOLUNTEERS PORTAL
   ========================================================================== */
import { store } from '../store.js';

export function renderVolunteersPage() {
  const mainEl = document.getElementById('main-content');

  const html = `
    <div style="background: linear-gradient(135deg, var(--primary-900), var(--primary-800)); color: white; padding: 4.5rem 0 3.5rem; text-align: center;">
      <div class="container">
        <h1 style="font-size: 3rem; margin-bottom: 1rem; color: white;">Join As A Volunteer</h1>
        <p style="font-size: 1.15rem; max-width: 720px; margin: 0 auto; color: var(--primary-100);">
          Be the change on the ground. Teach, organize health drives, manage media, or offer professional skills to uplift lives.
        </p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 3.5rem; align-items: flex-start;">
          
          <!-- Application Form -->
          <div style="background: var(--bg-card); padding: 2.5rem; border-radius: var(--radius-xl); border: 1px solid var(--border-color); box-shadow: var(--shadow-lg);">
            <h2 style="font-size: 1.75rem; margin-bottom: 1.5rem;">Volunteer Application</h2>
            
            <form id="volunteer-app-form">
              <div class="form-group">
                <label class="form-label">Full Name *</label>
                <input type="text" id="vol-name" class="form-control" placeholder="e.g. Ananya Sharma" required />
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group">
                  <label class="form-label">Email Address *</label>
                  <input type="email" id="vol-email" class="form-control" placeholder="ananya@example.com" required />
                </div>
                <div class="form-group">
                  <label class="form-label">Mobile Number *</label>
                  <input type="tel" id="vol-phone" class="form-control" placeholder="+91 98765 43210" required />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Skills & Interest Areas</label>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-top: 0.5rem;">
                  <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem;">
                    <input type="checkbox" name="vol-skills" value="Teaching & Mentoring" /> Teaching & Education
                  </label>
                  <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem;">
                    <input type="checkbox" name="vol-skills" value="Health Camp Assistance" /> Health Camp Medical Aid
                  </label>
                  <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem;">
                    <input type="checkbox" name="vol-skills" value="Tree Plantation & Eco Drive" /> Environmental Planting
                  </label>
                  <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem;">
                    <input type="checkbox" name="vol-skills" value="Social Media & Photography" /> Media & Photography
                  </label>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Availability</label>
                <select id="vol-availability" class="form-control">
                  <option value="Weekends Only">Weekends Only (Sat - Sun)</option>
                  <option value="Weekdays">Weekdays</option>
                  <option value="Flexible Remote">Flexible Remote Support</option>
                </select>
              </div>

              <button type="submit" class="btn btn-primary btn-lg" style="width: 100%; margin-top: 1rem;">
                <i data-lucide="send" style="width: 20px; height: 20px;"></i>
                <span>Submit Volunteer Application</span>
              </button>
            </form>
          </div>

          <!-- Benefits & Testimonial Side -->
          <div>
            <div style="background: var(--primary-50); border: 1px solid var(--primary-200); padding: 2rem; border-radius: var(--radius-xl); margin-bottom: 2rem;">
              <h3 style="color: var(--primary-900); margin-bottom: 1rem; font-size: 1.3rem;">Why Join YCC Volunteer Army?</h3>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 1rem; font-size: 0.95rem; color: var(--slate-700);">
                <li style="display: flex; gap: 0.75rem; align-items: flex-start;">
                  <i data-lucide="check-circle-2" style="width: 20px; height: 20px; color: var(--primary-600); flex-shrink: 0; margin-top: 2px;"></i>
                  <span>Official Certificate of Volunteer Service for students & young professionals.</span>
                </li>
                <li style="display: flex; gap: 0.75rem; align-items: flex-start;">
                  <i data-lucide="check-circle-2" style="width: 20px; height: 20px; color: var(--primary-600); flex-shrink: 0; margin-top: 2px;"></i>
                  <span>Hands-on leadership opportunities managing district level health & education camps.</span>
                </li>
                <li style="display: flex; gap: 0.75rem; align-items: flex-start;">
                  <i data-lucide="check-circle-2" style="width: 20px; height: 20px; color: var(--primary-600); flex-shrink: 0; margin-top: 2px;"></i>
                  <span>Join a compassionate community of 1,200+ active change-makers.</span>
                </li>
              </ul>
            </div>

            <div style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 2rem; border-radius: var(--radius-xl); box-shadow: var(--shadow-md);">
              <div style="font-style: italic; color: var(--slate-600); margin-bottom: 1rem; line-height: 1.6;">
                "Volunteering with YCC Trust during the weekend health camps gave me perspective and purpose. The joy on elders' faces when receiving free eye care is indescribable."
              </div>
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div style="width: 44px; height: 44px; border-radius: 50%; background: var(--accent-500); color: white; display: flex; align-items: center; justify-content: center; font-weight: 800;">RG</div>
                <div>
                  <div style="font-weight: 800; font-size: 0.95rem;">Rohan Gupta</div>
                  <div style="font-size: 0.8rem; color: var(--text-muted);">Volunteer since 2024</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  `;

  mainEl.innerHTML = html;
  if (window.lucide) window.lucide.createIcons();

  const form = document.getElementById('volunteer-app-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('vol-name').value;
      const email = document.getElementById('vol-email').value;
      const phone = document.getElementById('vol-phone').value;
      const availability = document.getElementById('vol-availability').value;
      
      const skills = Array.from(document.querySelectorAll('input[name="vol-skills"]:checked')).map(cb => cb.value);

      store.addVolunteer({
        name,
        email,
        phone,
        availability,
        skills: skills.length ? skills : ['General Support']
      });

      alert(`Thank you ${name}! Your volunteer application has been submitted to the YCC Admin board.`);
      form.reset();
    });
  }
}
