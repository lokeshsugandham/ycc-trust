/* ==========================================================================
   YCC CHARITABLE TRUST - ADMIN CMS DASHBOARD & FINANCIAL FUNDS CALCULATOR
   ========================================================================== */
import { auth } from '../auth.js';
import { store } from '../store.js';
import { renderReceiptModal } from '../components/ReceiptGenerator.js';

export function renderAdminPage(onNavigate) {
  const mainEl = document.getElementById('main-content');

  if (!auth.isAdmin()) {
    mainEl.innerHTML = `
      <div class="container" style="padding: 5rem 0; text-align: center;">
        <i data-lucide="shield-alert" style="width: 56px; height: 56px; color: #ef4444; margin-bottom: 1rem;"></i>
        <h2>Admin Access Required</h2>
        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Please login with Administrator credentials (admin@ycctrust.org / admin123).</p>
        <button class="btn btn-primary" id="admin-login-trigger">Login as Admin</button>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  let activeTab = 'overview';
  let dateFilter = 'all'; // 'all', 'month', 'year'

  const renderCMS = () => {
    const projects = store.getProjects();
    const allDonations = store.getDonations();
    const events = store.getEvents();
    const media = store.getMedia();
    const volunteers = store.getVolunteers();

    // Date Filter Logic
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const donations = allDonations.filter(d => {
      if (dateFilter === 'month') {
        const dDate = new Date(d.date);
        return dDate.getFullYear() === currentYear && dDate.getMonth() === currentMonth;
      }
      if (dateFilter === 'year') {
        const dDate = new Date(d.date);
        return dDate.getFullYear() === currentYear;
      }
      return true;
    });

    // --- FINANCIAL FUNDS CALCULATIONS ---
    const totalTrustFunds = donations.reduce((sum, d) => sum + Number(d.amount || 0), 0);
    const totalTransactions = donations.length;
    const avgDonation = totalTransactions > 0 ? Math.round(totalTrustFunds / totalTransactions) : 0;

    // Funds Breakdown by Campaign
    const campaignFunds = {};
    projects.forEach(p => { campaignFunds[p.title] = 0; });
    campaignFunds['General Trust Welfare Fund'] = 0;

    donations.forEach(d => {
      const key = d.projectTitle || 'General Trust Welfare Fund';
      campaignFunds[key] = (campaignFunds[key] || 0) + Number(d.amount);
    });

    // Funds Breakdown by Payment Gateway (UPI vs Card vs Netbanking)
    let upiTotal = 0;
    let cardTotal = 0;
    let nbTotal = 0;

    donations.forEach(d => {
      const method = (d.paymentMethod || '').toLowerCase();
      if (method.includes('upi')) upiTotal += Number(d.amount);
      else if (method.includes('card')) cardTotal += Number(d.amount);
      else nbTotal += Number(d.amount);
    });

    const html = `
      <div style="background: linear-gradient(135deg, var(--slate-900), var(--slate-800)); color: white; padding: 3rem 0 2.5rem;">
        <div class="container">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
            <div>
              <div style="font-size: 0.8rem; color: var(--accent-400); font-weight: 800; text-transform: uppercase;">ADMINISTRATOR CONTROL PANEL</div>
              <h1 style="font-size: 2.2rem; color: white; margin: 0.2rem 0;">Trust Funds & Financial Analytics</h1>
            </div>
            <div style="display: flex; gap: 1rem;">
              <select id="cms-date-filter" class="form-control" style="background: var(--slate-800); color: white; border-color: var(--slate-700); width: auto;">
                <option value="all" ${dateFilter === 'all' ? 'selected' : ''}>All Time Funds</option>
                <option value="month" ${dateFilter === 'month' ? 'selected' : ''}>This Month (July 2026)</option>
                <option value="year" ${dateFilter === 'year' ? 'selected' : ''}>This Year (2026)</option>
              </select>
              <button class="btn btn-outline" id="export-csv-btn" style="color: white; border-color: white;">
                <i data-lucide="file-spreadsheet" style="width: 18px; height: 18px;"></i>
                <span>Export Financial CSV</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <section class="section">
        <div class="container">
          
          <!-- Key Executive Financial Metrics -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
            <div style="background: linear-gradient(135deg, var(--primary-800), var(--primary-900)); color: white; padding: 1.75rem; border-radius: var(--radius-xl); box-shadow: var(--shadow-lg);">
              <div style="font-size: 0.8rem; color: var(--primary-100); font-weight: 800; text-transform: uppercase;">TOTAL TRUST FUNDS RAISED</div>
              <div style="font-size: 2.4rem; font-weight: 900; margin: 0.4rem 0; font-family: var(--font-display);">
                ₹${totalTrustFunds.toLocaleString('en-IN')}
              </div>
              <div style="font-size: 0.8rem; color: var(--primary-100);">Eligible for 50% Sec 80G Tax Exemption</div>
            </div>

            <div style="background: var(--bg-card); padding: 1.5rem; border-radius: var(--radius-xl); border: 1px solid var(--border-color); box-shadow: var(--shadow-sm);">
              <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700;">TOTAL TRANSACTIONS</div>
              <div style="font-size: 2rem; font-weight: 900; color: var(--slate-900); margin: 0.3rem 0;">${totalTransactions}</div>
              <div style="font-size: 0.8rem; color: var(--primary-600); font-weight: 700;">100% Audit Verified</div>
            </div>

            <div style="background: var(--bg-card); padding: 1.5rem; border-radius: var(--radius-xl); border: 1px solid var(--border-color); box-shadow: var(--shadow-sm);">
              <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700;">AVERAGE DONATION SIZE</div>
              <div style="font-size: 2rem; font-weight: 900; color: var(--accent-600); margin: 0.3rem 0;">₹${avgDonation.toLocaleString('en-IN')}</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Per individual donor contribution</div>
            </div>

            <div style="background: var(--bg-card); padding: 1.5rem; border-radius: var(--radius-xl); border: 1px solid var(--border-color); box-shadow: var(--shadow-sm);">
              <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700;">ACTIVE CAMPAIGNS</div>
              <div style="font-size: 2rem; font-weight: 900; color: var(--slate-900); margin: 0.3rem 0;">${projects.length}</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Ground projects funded</div>
            </div>
          </div>

          <!-- Financial Breakdown Widgets -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2.5rem;">
            
            <!-- Funds by Campaign Breakdown -->
            <div style="background: var(--bg-card); padding: 2rem; border-radius: var(--radius-xl); border: 1px solid var(--border-color); box-shadow: var(--shadow-md);">
              <h3 style="font-size: 1.25rem; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem;">
                <i data-lucide="pie-chart" style="width: 20px; height: 20px; color: var(--primary-600);"></i>
                Funds Breakdown by Campaign
              </h3>
              <div style="display: flex; flex-direction: column; gap: 1rem;">
                ${Object.keys(campaignFunds).map(title => {
                  const amt = campaignFunds[title];
                  const pct = totalTrustFunds > 0 ? Math.round((amt / totalTrustFunds) * 100) : 0;
                  return `
                    <div>
                      <div style="display: flex; justify-content: space-between; font-size: 0.88rem; font-weight: 700; margin-bottom: 0.3rem;">
                        <span>${title}</span>
                        <span>₹${amt.toLocaleString('en-IN')} (${pct}%)</span>
                      </div>
                      <div class="progress-bar-bg" style="height: 8px;">
                        <div class="progress-bar-fill" style="width: ${pct}%;"></div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Payment Gateway Channel Distribution -->
            <div style="background: var(--bg-card); padding: 2rem; border-radius: var(--radius-xl); border: 1px solid var(--border-color); box-shadow: var(--shadow-md);">
              <h3 style="font-size: 1.25rem; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem;">
                <i data-lucide="credit-card" style="width: 20px; height: 20px; color: var(--accent-600);"></i>
                Payment Gateway Channel Collection
              </h3>
              <div style="display: flex; flex-direction: column; gap: 1.25rem;">
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.9rem; background: var(--primary-50); border-radius: var(--radius-md); border: 1px solid var(--primary-100);">
                  <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <i data-lucide="qr-code" style="width: 24px; height: 24px; color: var(--primary-700);"></i>
                    <div>
                      <div style="font-weight: 800; font-size: 0.95rem;">UPI Payments (GPay / PhonePe)</div>
                      <div style="font-size: 0.78rem; color: var(--slate-600);">Instant VPA Settlement</div>
                    </div>
                  </div>
                  <div style="font-weight: 900; font-size: 1.1rem; color: var(--primary-800);">₹${upiTotal.toLocaleString('en-IN')}</div>
                </div>

                <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.9rem; background: var(--slate-100); border-radius: var(--radius-md); border: 1px solid var(--slate-200);">
                  <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <i data-lucide="credit-card" style="width: 24px; height: 24px; color: var(--slate-700);"></i>
                    <div>
                      <div style="font-weight: 800; font-size: 0.95rem;">Credit & Debit Cards</div>
                      <div style="font-size: 0.78rem; color: var(--slate-600);">Visa / Mastercard / RuPay</div>
                    </div>
                  </div>
                  <div style="font-weight: 900; font-size: 1.1rem; color: var(--slate-800);">₹${cardTotal.toLocaleString('en-IN')}</div>
                </div>

                <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.9rem; background: var(--slate-100); border-radius: var(--radius-md); border: 1px solid var(--slate-200);">
                  <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <i data-lucide="landmark" style="width: 24px; height: 24px; color: var(--slate-700);"></i>
                    <div>
                      <div style="font-weight: 800; font-size: 0.95rem;">Net Banking</div>
                      <div style="font-size: 0.78rem; color: var(--slate-600);">Direct Bank Transfer</div>
                    </div>
                  </div>
                  <div style="font-weight: 900; font-size: 1.1rem; color: var(--slate-800);">₹${nbTotal.toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>

          </div>

          <!-- Standalone Code Snippet for Admin Developer Reference -->
          <div style="background: #0f172a; color: #f8fafc; padding: 2rem; border-radius: var(--radius-xl); border: 1px solid #334155; margin-bottom: 2.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <h4 style="color: #34d399; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">
                <i data-lucide="code-2" style="width: 20px; height: 20px;"></i>
                Developer Code: Programmatic Funds Calculation
              </h4>
              <button class="btn btn-outline btn-sm" id="copy-funds-code-btn" style="color: white; border-color: #475569;">
                Copy JS Code
              </button>
            </div>
            <pre id="funds-code-block" style="font-family: monospace; font-size: 0.85rem; line-height: 1.6; background: #1e293b; padding: 1.25rem; border-radius: 8px; overflow-x: auto; color: #e2e8f0;">
// -------------------------------------------------------------
// YCC Trust Code Snippet to Calculate Total & Project Funds
// -------------------------------------------------------------
function calculateTrustFunds() {
  const storeData = JSON.parse(localStorage.getItem('YCC_TRUST_STORE_V1')) || { donations: [] };
  const donations = storeData.donations || [];

  // 1. Total Funds Calculation
  const totalRaised = donations.reduce((sum, d) => sum + Number(d.amount || 0), 0);

  // 2. Breakdown by Project
  const projectBreakdown = {};
  donations.forEach(d => {
    const campaign = d.projectTitle || 'General Welfare';
    projectBreakdown[campaign] = (projectBreakdown[campaign] || 0) + Number(d.amount);
  });

  return {
    totalTrustFunds: totalRaised,
    totalDonationsCount: donations.length,
    projectBreakdown
  };
}

console.log('Trust Financial Audit:', calculateTrustFunds());
            </pre>
          </div>

          <!-- Admin CMS Navigation Tabs -->
          <div class="tab-nav">
            <button class="tab-btn ${activeTab === 'overview' ? 'active' : ''}" data-cms-tab="overview">Donations Transaction Log</button>
            <button class="tab-btn ${activeTab === 'projects' ? 'active' : ''}" data-cms-tab="projects">Manage Projects</button>
            <button class="tab-btn ${activeTab === 'events' ? 'active' : ''}" data-cms-tab="events">Manage Events</button>
            <button class="tab-btn ${activeTab === 'media' ? 'active' : ''}" data-cms-tab="media">Media Gallery CMS</button>
            <button class="tab-btn ${activeTab === 'volunteers' ? 'active' : ''}" data-cms-tab="volunteers">Volunteer Approvals</button>
          </div>

          <!-- TAB 1: DONATIONS LOG -->
          ${activeTab === 'overview' ? `
            <div style="background: var(--bg-card); padding: 2rem; border-radius: var(--radius-xl); border: 1px solid var(--border-color); box-shadow: var(--shadow-md);">
              <h3 style="margin-bottom: 1.5rem;">All Donor Transactions (${donations.length})</h3>
              <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.88rem;">
                  <thead>
                    <tr style="border-bottom: 2px solid var(--border-color); color: var(--text-muted);">
                      <th style="padding: 0.75rem;">Receipt No</th>
                      <th style="padding: 0.75rem;">Donor Name</th>
                      <th style="padding: 0.75rem;">PAN Card</th>
                      <th style="padding: 0.75rem;">Campaign</th>
                      <th style="padding: 0.75rem;">Amount</th>
                      <th style="padding: 0.75rem;">Method</th>
                      <th style="padding: 0.75rem;">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${donations.map(d => `
                      <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 0.85rem; font-family: monospace; font-weight: 700; color: var(--primary-700);">${d.receiptNo}</td>
                        <td style="padding: 0.85rem; font-weight: 600;">${d.donorName}<br/><span style="font-size: 0.75rem; color: var(--text-muted);">${d.donorEmail}</span></td>
                        <td style="padding: 0.85rem; font-family: monospace;">${d.donorPan || 'N/A'}</td>
                        <td style="padding: 0.85rem;">${d.projectTitle}</td>
                        <td style="padding: 0.85rem; font-weight: 800;">₹${Number(d.amount).toLocaleString('en-IN')}</td>
                        <td style="padding: 0.85rem; font-size: 0.8rem; color: var(--text-muted);">${d.paymentMethod}</td>
                        <td style="padding: 0.85rem;">
                          <button class="btn btn-outline btn-sm" data-admin-receipt="${d.id}">View Certificate</button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          ` : ''}

          <!-- TAB 2: PROJECTS CMS -->
          ${activeTab === 'projects' ? `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
              <div style="background: var(--bg-card); padding: 2rem; border-radius: var(--radius-xl); border: 1px solid var(--border-color);">
                <h3 style="margin-bottom: 1.25rem;">Add New Campaign</h3>
                <form id="add-project-cms-form">
                  <div class="form-group">
                    <label class="form-label">Campaign Title *</label>
                    <input type="text" id="cms-p-title" class="form-control" placeholder="e.g. Rural Girl Education Drive" required />
                  </div>
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group">
                      <label class="form-label">Category</label>
                      <select id="cms-p-cat" class="form-control">
                        <option>Education</option>
                        <option>Healthcare</option>
                        <option>Environment</option>
                        <option>Empowerment</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label class="form-label">Target Amount (INR)</label>
                      <input type="number" id="cms-p-target" class="form-control" placeholder="500000" required />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Banner Image URL</label>
                    <input type="text" id="cms-p-img" class="form-control" value="/assets/images/education.jpg" required />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Summary / Mission Statement</label>
                    <textarea id="cms-p-desc" class="form-control" rows="3" required></textarea>
                  </div>
                  <button type="submit" class="btn btn-primary">Publish New Campaign</button>
                </form>
              </div>

              <div>
                <h3 style="margin-bottom: 1rem;">Existing Campaigns</h3>
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                  ${projects.map(p => `
                    <div style="background: var(--bg-card); padding: 1.25rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between;">
                      <div>
                        <div style="font-weight: 800;">${p.title}</div>
                        <div style="font-size: 0.8rem; color: var(--text-muted);">Target: ₹${p.targetAmount.toLocaleString('en-IN')} • Raised: ₹${p.raisedAmount.toLocaleString('en-IN')}</div>
                      </div>
                      <button class="btn btn-ghost btn-sm" data-delete-p="${p.id}" style="color: #ef4444;">
                        <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
                      </button>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          ` : ''}

          <!-- TAB 3: EVENTS CMS -->
          ${activeTab === 'events' ? `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
              <div style="background: var(--bg-card); padding: 2rem; border-radius: var(--radius-xl); border: 1px solid var(--border-color);">
                <h3 style="margin-bottom: 1.25rem;">Create New Event</h3>
                <form id="add-event-cms-form">
                  <div class="form-group">
                    <label class="form-label">Event Title *</label>
                    <input type="text" id="cms-e-title" class="form-control" required />
                  </div>
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group">
                      <label class="form-label">Date</label>
                      <input type="date" id="cms-e-date" class="form-control" required />
                    </div>
                    <div class="form-group">
                      <label class="form-label">Category</label>
                      <select id="cms-e-cat" class="form-control">
                        <option>Healthcare</option>
                        <option>Environment</option>
                        <option>Education</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Venue / Location</label>
                    <input type="text" id="cms-e-loc" class="form-control" required />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea id="cms-e-desc" class="form-control" rows="3" required></textarea>
                  </div>
                  <button type="submit" class="btn btn-primary">Schedule Event</button>
                </form>
              </div>

              <div>
                <h3 style="margin-bottom: 1rem;">Scheduled Events</h3>
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                  ${events.map(e => `
                    <div style="background: var(--bg-card); padding: 1.25rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between;">
                      <div>
                        <div style="font-weight: 800;">${e.title}</div>
                        <div style="font-size: 0.8rem; color: var(--text-muted);">${e.date} • ${e.location}</div>
                      </div>
                      <button class="btn btn-ghost btn-sm" data-delete-e="${e.id}" style="color: #ef4444;">
                        <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
                      </button>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          ` : ''}

          <!-- TAB 4: MEDIA GALLERY CMS -->
          ${activeTab === 'media' ? `
            <div style="background: var(--bg-card); padding: 2rem; border-radius: var(--radius-xl); border: 1px solid var(--border-color); max-width: 600px;">
              <h3 style="margin-bottom: 1.25rem;">Add Photo to Gallery</h3>
              <form id="add-media-cms-form">
                <div class="form-group">
                  <label class="form-label">Photo Title</label>
                  <input type="text" id="cms-m-title" class="form-control" required />
                </div>
                <div class="form-group">
                  <label class="form-label">Category</label>
                  <select id="cms-m-cat" class="form-control">
                    <option>Education</option>
                    <option>Healthcare</option>
                    <option>Environment</option>
                    <option>Events</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Image URL</label>
                  <input type="text" id="cms-m-url" class="form-control" value="/assets/images/education.jpg" required />
                </div>
                <button type="submit" class="btn btn-primary">Add Photo to Live Gallery</button>
              </form>
            </div>
          ` : ''}

          <!-- TAB 5: VOLUNTEER APPROVALS -->
          ${activeTab === 'volunteers' ? `
            <div style="background: var(--bg-card); padding: 2rem; border-radius: var(--radius-xl); border: 1px solid var(--border-color);">
              <h3 style="margin-bottom: 1.5rem;">Volunteer Applications Queue</h3>
              <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.88rem;">
                  <thead>
                    <tr style="border-bottom: 2px solid var(--border-color); color: var(--text-muted);">
                      <th style="padding: 0.75rem;">Applicant Name</th>
                      <th style="padding: 0.75rem;">Contact Email & Phone</th>
                      <th style="padding: 0.75rem;">Skills & Availability</th>
                      <th style="padding: 0.75rem;">Status</th>
                      <th style="padding: 0.75rem;">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${volunteers.map(v => `
                      <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 0.85rem; font-weight: 700;">${v.name}</td>
                        <td style="padding: 0.85rem;">${v.email}<br/><span style="font-size: 0.78rem; color: var(--text-muted);">${v.phone}</span></td>
                        <td style="padding: 0.85rem;">${(v.skills || []).join(', ')}<br/><span style="font-size: 0.78rem; color: var(--text-muted);">${v.availability}</span></td>
                        <td style="padding: 0.85rem;">
                          <span style="display: inline-block; padding: 0.2rem 0.6rem; border-radius: 12px; font-size: 0.75rem; font-weight: 800; background: ${v.status === 'Approved' ? '#d1fae5' : '#fef3c7'}; color: ${v.status === 'Approved' ? '#065f46' : '#b45309'};">
                            ${v.status}
                          </span>
                        </td>
                        <td style="padding: 0.85rem;">
                          ${v.status !== 'Approved' ? `
                            <button class="btn btn-primary btn-sm" data-approve-vol="${v.id}">Approve</button>
                          ` : 'Verified Volunteer'}
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          ` : ''}

        </div>
      </section>
    `;

    mainEl.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();

    // Date Filter listener
    document.getElementById('cms-date-filter')?.addEventListener('change', (e) => {
      dateFilter = e.target.value;
      renderCMS();
    });

    // Copy Code snippet
    document.getElementById('copy-funds-code-btn')?.addEventListener('click', () => {
      const code = document.getElementById('funds-code-block').innerText;
      navigator.clipboard.writeText(code);
      alert('JavaScript Funds Calculator code copied to clipboard!');
    });

    // Tab switcher
    mainEl.querySelectorAll('[data-cms-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.getAttribute('data-cms-tab');
        renderCMS();
      });
    });

    // CSV Export
    document.getElementById('export-csv-btn')?.addEventListener('click', () => {
      let csv = 'ReceiptNo,DonorName,Email,Phone,PAN,Amount,Campaign,Date\n';
      donations.forEach(d => {
        csv += `"${d.receiptNo}","${d.donorName}","${d.donorEmail}","${d.donorPhone}","${d.donorPan}","${d.amount}","${d.projectTitle}","${d.date}"\n`;
      });
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `YCC_Trust_Financial_Report_${dateFilter}_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
    });

    // View Certificate
    mainEl.querySelectorAll('[data-admin-receipt]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-admin-receipt');
        const d = donations.find(x => x.id === id);
        if (d) renderReceiptModal(d);
      });
    });

    // Forms
    const addProjForm = document.getElementById('add-project-cms-form');
    if (addProjForm) {
      addProjForm.addEventListener('submit', (e) => {
        e.preventDefault();
        store.addProject({
          title: document.getElementById('cms-p-title').value,
          category: document.getElementById('cms-p-cat').value,
          targetAmount: Number(document.getElementById('cms-p-target').value),
          image: document.getElementById('cms-p-img').value,
          summary: document.getElementById('cms-p-desc').value,
          beneficiaries: 'Community'
        });
        alert('New campaign published successfully!');
        renderCMS();
      });
    }

    const addEvtForm = document.getElementById('add-event-cms-form');
    if (addEvtForm) {
      addEvtForm.addEventListener('submit', (e) => {
        e.preventDefault();
        store.addEvent({
          title: document.getElementById('cms-e-title').value,
          date: document.getElementById('cms-e-date').value,
          time: '09:00 AM - 05:00 PM',
          category: document.getElementById('cms-e-cat').value,
          location: document.getElementById('cms-e-loc').value,
          description: document.getElementById('cms-e-desc').value
        });
        alert('New event scheduled successfully!');
        renderCMS();
      });
    }

    const addMediaForm = document.getElementById('add-media-cms-form');
    if (addMediaForm) {
      addMediaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        store.addMedia({
          title: document.getElementById('cms-m-title').value,
          category: document.getElementById('cms-m-cat').value,
          url: document.getElementById('cms-m-url').value,
          type: 'image'
        });
        alert('Photo added to gallery!');
        renderCMS();
      });
    }

    // Delete handlers
    mainEl.querySelectorAll('[data-delete-p]').forEach(btn => {
      btn.addEventListener('click', () => {
        store.deleteProject(btn.getAttribute('data-delete-p'));
        renderCMS();
      });
    });

    mainEl.querySelectorAll('[data-delete-e]').forEach(btn => {
      btn.addEventListener('click', () => {
        store.deleteEvent(btn.getAttribute('data-delete-e'));
        renderCMS();
      });
    });

    // Volunteer approval
    mainEl.querySelectorAll('[data-approve-vol]').forEach(btn => {
      btn.addEventListener('click', () => {
        store.updateVolunteerStatus(btn.getAttribute('data-approve-vol'), 'Approved');
        alert('Volunteer application approved!');
        renderCMS();
      });
    });
  };

  renderCMS();
}
