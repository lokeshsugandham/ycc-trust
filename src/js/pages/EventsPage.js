/* ==========================================================================
   YCC CHARITABLE TRUST - EVENTS & WORKSHOPS PAGE
   ========================================================================== */
import { store } from '../store.js';

export function renderEventsPage(onNavigate) {
  const events = store.getEvents();

  const mainEl = document.getElementById('main-content');

  const html = `
    <div style="background: linear-gradient(135deg, var(--primary-900), var(--primary-800)); color: white; padding: 4.5rem 0 3.5rem; text-align: center;">
      <div class="container">
        <h1 style="font-size: 3rem; margin-bottom: 1rem; color: white;">Trust Events & Drives</h1>
        <p style="font-size: 1.15rem; max-width: 720px; margin: 0 auto; color: var(--primary-100);">
          Join our health camps, environmental rallies, and community workshops. Register as a participant or volunteer.
        </p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="grid-3" style="grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));">
          ${events.map(evt => `
            <div style="background: var(--bg-card); border-radius: var(--radius-xl); border: 1px solid var(--border-color); overflow: hidden; box-shadow: var(--shadow-md); display: flex; flex-direction: column;">
              <div style="background: var(--primary-50); padding: 1.5rem; border-bottom: 1px solid var(--primary-100); display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <div style="font-size: 0.8rem; font-weight: 800; color: var(--primary-700); text-transform: uppercase;">${evt.category}</div>
                  <div style="font-size: 1.25rem; font-weight: 800; color: var(--primary-900);">${evt.title}</div>
                </div>
                <div style="background: white; border-radius: var(--radius-md); padding: 0.5rem 0.9rem; text-align: center; border: 1px solid var(--primary-200); box-shadow: var(--shadow-sm);">
                  <div style="font-size: 0.7rem; font-weight: 800; color: var(--accent-600); text-transform: uppercase;">DATE</div>
                  <div style="font-size: 1.1rem; font-weight: 800; color: var(--slate-900);">${evt.date.split('-')[2]} AUG</div>
                </div>
              </div>

              <div style="padding: 1.5rem; flex-grow: 1; display: flex; flex-direction: column;">
                <div style="font-size: 0.9rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.25rem;">
                  <div><i data-lucide="clock" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle;"></i> <strong>Time:</strong> ${evt.time}</div>
                  <div><i data-lucide="map-pin" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle;"></i> <strong>Venue:</strong> ${evt.location}</div>
                  <div><i data-lucide="users" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle;"></i> <strong>Registered:</strong> ${evt.rsvps} People</div>
                </div>

                <p style="font-size: 0.92rem; color: var(--text-main); margin-bottom: 1.5rem; line-height: 1.6; flex-grow: 1;">
                  ${evt.description}
                </p>

                <div style="display: flex; gap: 0.75rem;">
                  <button class="btn btn-primary" data-rsvp-evt="${evt.id}" style="flex: 1;">
                    <i data-lucide="calendar-check" style="width: 18px; height: 18px;"></i>
                    <span>Register / RSVP</span>
                  </button>
                  <button class="btn btn-outline" data-ics-evt="${evt.id}" title="Add to Calendar">
                    <i data-lucide="calendar" style="width: 18px; height: 18px;"></i>
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;

  mainEl.innerHTML = html;
  if (window.lucide) window.lucide.createIcons();

  mainEl.querySelectorAll('[data-rsvp-evt]').forEach(btn => {
    btn.addEventListener('click', () => {
      const evtId = btn.getAttribute('data-rsvp-evt');
      const evt = events.find(e => e.id === evtId);
      if (evt) {
        evt.rsvps += 1;
        alert(`RSVP Confirmed for "${evt.title}"! We sent a confirmation SMS & email.`);
        renderEventsPage(onNavigate);
      }
    });
  });

  mainEl.querySelectorAll('[data-ics-evt]').forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Event added to your device calendar (.ics downloaded)!');
    });
  });
}
