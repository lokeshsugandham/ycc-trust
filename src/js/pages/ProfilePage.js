/* ==========================================================================
   YCC CHARITABLE TRUST - DONOR PORTAL & PROFILE PAGE
   ========================================================================== */
import { auth } from '../auth.js';
import { store } from '../store.js';
import { renderReceiptModal } from '../components/ReceiptGenerator.js';

export function renderProfilePage(onNavigate) {
  const user = auth.getUser();
  const mainEl = document.getElementById('main-content');

  if (!user) {
    mainEl.innerHTML = `
      <div class="container" style="padding: 5rem 0; text-align: center;">
        <i data-lucide="lock" style="width: 56px; height: 56px; color: var(--slate-400); margin-bottom: 1rem;"></i>
        <h2>Please Sign In to Access Your Donor Portal</h2>
        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">View tax receipts, donation history, and volunteer badges.</p>
        <button class="btn btn-primary" id="profile-login-btn">Sign In / Register</button>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  const allDonations = store.getDonations();
  const userDonations = allDonations.filter(d => d.donorEmail.toLowerCase() === user.email.toLowerCase());
  const totalDonated = userDonations.reduce((sum, d) => sum + Number(d.amount), 0);

  const html = `
    <div style="background: linear-gradient(135deg, var(--primary-900), var(--primary-800)); color: white; padding: 4rem 0 3rem;">
      <div class="container">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem;">
          <div style="display: flex; align-items: center; gap: 1.25rem;">
            <div style="width: 72px; height: 72px; border-radius: 50%; background: var(--accent-500); color: white; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; font-weight: 800; border: 3px solid white;">
              ${user.name.charAt(0)}
            </div>
            <div>
              <h1 style="font-size: 2.2rem; color: white; margin-bottom: 0.2rem;">${user.name}</h1>
              <div style="font-size: 0.9rem; color: var(--primary-100);">
                ${user.email} • ${user.phone || 'No phone added'} • <strong>PAN:</strong> ${user.pan || 'Not provided'}
              </div>
            </div>
          </div>

          <div style="display: flex; gap: 1rem;">
            <button class="btn btn-outline" id="logout-user-btn" style="color: white; border-color: white;">
              <i data-lucide="log-out" style="width: 18px; height: 18px;"></i>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <section class="section">
      <div class="container">
        
        <!-- Summary Metric Cards -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
          <div style="background: var(--bg-card); padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); box-shadow: var(--shadow-sm);">
            <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700;">TOTAL CONTRIBUTIONS</div>
            <div style="font-size: 2rem; font-weight: 900; color: var(--primary-700); font-family: var(--font-display);">
              ₹${totalDonated.toLocaleString('en-IN')}
            </div>
          </div>

          <div style="background: var(--bg-card); padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); box-shadow: var(--shadow-sm);">
            <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700;">DONATIONS COUNT</div>
            <div style="font-size: 2rem; font-weight: 900; color: var(--slate-900); font-family: var(--font-display);">
              ${userDonations.length} Transactions
            </div>
          </div>

          <div style="background: var(--bg-card); padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); box-shadow: var(--shadow-sm);">
            <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700;">ESTIMATED 80G TAX SAVING</div>
            <div style="font-size: 2rem; font-weight: 900; color: var(--accent-600); font-family: var(--font-display);">
              ₹${Math.round(totalDonated * 0.5 * 0.3).toLocaleString('en-IN')}
            </div>
            <span style="font-size: 0.75rem; color: var(--text-muted);">(Calculated at 30% tax slab)</span>
          </div>
        </div>

        <!-- Donation History Table -->
        <div style="background: var(--bg-card); border-radius: var(--radius-xl); border: 1px solid var(--border-color); box-shadow: var(--shadow-md); padding: 2rem; margin-bottom: 3rem;">
          <h3 style="font-size: 1.4rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
            <i data-lucide="receipt" style="width: 22px; height: 22px; color: var(--primary-600);"></i>
            Your 80G Tax Exemption Receipts
          </h3>

          ${userDonations.length === 0 ? `
            <div style="text-align: center; padding: 3rem 0; color: var(--text-muted);">
              <i data-lucide="heart" style="width: 48px; height: 48px; margin-bottom: 1rem; color: var(--slate-300);"></i>
              <h4>No donations recorded under this account yet.</h4>
              <p style="margin-top: 0.5rem;">Your generous support can bring smiles to hundreds of children.</p>
            </div>
          ` : `
            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
                <thead>
                  <tr style="border-bottom: 2px solid var(--border-color); color: var(--text-muted); text-transform: uppercase; font-size: 0.78rem;">
                    <th style="padding: 0.75rem 1rem;">Receipt No</th>
                    <th style="padding: 0.75rem 1rem;">Date</th>
                    <th style="padding: 0.75rem 1rem;">Campaign</th>
                    <th style="padding: 0.75rem 1rem;">Amount</th>
                    <th style="padding: 0.75rem 1rem;">Payment Method</th>
                    <th style="padding: 0.75rem 1rem; text-align: right;">Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${userDonations.map(d => `
                    <tr style="border-bottom: 1px solid var(--border-color);">
                      <td style="padding: 1rem; font-family: monospace; font-weight: 700; color: var(--primary-700);">${d.receiptNo}</td>
                      <td style="padding: 1rem;">${d.date}</td>
                      <td style="padding: 1rem; font-weight: 600;">${d.projectTitle}</td>
                      <td style="padding: 1rem; font-weight: 800;">₹${Number(d.amount).toLocaleString('en-IN')}</td>
                      <td style="padding: 1rem; font-size: 0.82rem; color: var(--text-muted);">${d.paymentMethod}</td>
                      <td style="padding: 1rem; text-align: right;">
                        <button class="btn btn-outline btn-sm" data-view-receipt="${d.id}">
                          <i data-lucide="download" style="width: 14px; height: 14px;"></i>
                          <span>Get 80G Receipt</span>
                        </button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>

        <!-- Edit Profile & PAN Information -->
        <div style="background: var(--bg-card); border-radius: var(--radius-xl); border: 1px solid var(--border-color); box-shadow: var(--shadow-md); padding: 2rem; max-width: 600px;">
          <h3 style="font-size: 1.25rem; margin-bottom: 1.25rem;">Update Tax & Contact Details</h3>
          
          <form id="update-profile-form">
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" id="prof-name" class="form-control" value="${user.name}" required />
            </div>
            <div class="form-group">
              <label class="form-label">Mobile Number</label>
              <input type="tel" id="prof-phone" class="form-control" value="${user.phone || ''}" required />
            </div>
            <div class="form-group">
              <label class="form-label">PAN Card Number (Used for 80G Receipts)</label>
              <input type="text" id="prof-pan" class="form-control" value="${user.pan || ''}" style="text-transform: uppercase;" placeholder="ABCDE1234F" />
            </div>

            <button type="submit" class="btn btn-primary">Save Profile Changes</button>
          </form>
        </div>

      </div>
    </section>
  `;

  mainEl.innerHTML = html;
  if (window.lucide) window.lucide.createIcons();

  document.getElementById('logout-user-btn')?.addEventListener('click', () => {
    auth.logout();
    onNavigate('home');
  });

  mainEl.querySelectorAll('[data-view-receipt]').forEach(btn => {
    btn.addEventListener('click', () => {
      const txnId = btn.getAttribute('data-view-receipt');
      const txn = userDonations.find(d => d.id === txnId);
      if (txn) renderReceiptModal(txn);
    });
  });

  const updateForm = document.getElementById('update-profile-form');
  if (updateForm) {
    updateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('prof-name').value;
      const phone = document.getElementById('prof-phone').value;
      const pan = document.getElementById('prof-pan').value;

      auth.updateProfile({ name, phone, pan: pan.toUpperCase() });
      alert('Profile details updated successfully!');
      renderProfilePage(onNavigate);
    });
  }
}
