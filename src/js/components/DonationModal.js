/* ==========================================================================
   YCC CHARITABLE TRUST - INTERACTIVE DONATION & UPI/CARD GATEWAY MODAL
   ========================================================================== */
import { store } from '../store.js';
import { auth } from '../auth.js';
import { renderReceiptModal } from './ReceiptGenerator.js';

export function openDonationModal(selectedProjectId = null) {
  const modalContainer = document.getElementById('modal-container');
  const user = auth.getUser();
  const projects = store.getProjects();

  let step = 1;
  let selectedAmount = 1000;
  let selectedMethod = 'upi';
  let targetProjId = selectedProjectId || (projects[0] ? projects[0].id : '');

  const renderModal = () => {
    const activeProject = projects.find(p => p.id === targetProjId) || { title: 'General Welfare & Emergency Relief' };

    const html = `
      <div class="modal-overlay active" id="donate-modal-overlay">
        <div class="modal-box">
          <button class="modal-close-btn" id="close-donate-modal">
            <i data-lucide="x" style="width: 20px; height: 20px;"></i>
          </button>

          <!-- Modal Header -->
          <div style="margin-bottom: 1.5rem; text-align: center;">
            <div style="display: inline-flex; align-items: center; justify-content: center; width: 52px; height: 52px; background: var(--primary-100); color: var(--primary-700); border-radius: var(--radius-full); margin-bottom: 0.75rem;">
              <i data-lucide="heart-handshake" style="width: 28px; height: 28px;"></i>
            </div>
            <h3 style="font-size: 1.6rem; margin-bottom: 0.25rem;">Make a Tax-Deductible Donation</h3>
            <p style="font-size: 0.9rem; color: var(--text-muted);">Every rupee brings hope and transforms lives. 80G tax benefit included.</p>
          </div>

          <!-- Progress Stepper -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.75rem; position: relative;">
            <div style="position: absolute; top: 50%; left: 0; right: 0; height: 3px; background: var(--slate-200); z-index: 1; transform: translateY(-50%);"></div>
            <div style="position: absolute; top: 50%; left: 0; width: ${step === 1 ? '0%' : step === 2 ? '50%' : '100%'}; height: 3px; background: var(--primary-600); z-index: 1; transform: translateY(-50%); transition: width 0.3s;"></div>

            <div style="position: relative; z-index: 2; background: ${step >= 1 ? 'var(--primary-600)' : 'var(--slate-200)'}; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: 700;">1</div>
            <div style="position: relative; z-index: 2; background: ${step >= 2 ? 'var(--primary-600)' : 'var(--slate-200)'}; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: 700;">2</div>
            <div style="position: relative; z-index: 2; background: ${step >= 3 ? 'var(--primary-600)' : 'var(--slate-200)'}; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: 700;">3</div>
          </div>

          <!-- STEP 1: AMOUNT & CAMPAIGN -->
          ${step === 1 ? `
            <div>
              <div class="form-group">
                <label class="form-label">Select Campaign / Initiative</label>
                <select id="donate-project-select" class="form-control">
                  <option value="">General Welfare & Emergency Relief Fund</option>
                  ${projects.map(p => `
                    <option value="${p.id}" ${targetProjId === p.id ? 'selected' : ''}>
                      ${p.title} (${p.category})
                    </option>
                  `).join('')}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Choose Donation Amount (INR)</label>
                <div class="amount-pills">
                  <div class="amount-pill ${selectedAmount === 500 ? 'active' : ''}" data-val="500">₹500</div>
                  <div class="amount-pill ${selectedAmount === 1000 ? 'active' : ''}" data-val="1000">₹1,000</div>
                  <div class="amount-pill ${selectedAmount === 2500 ? 'active' : ''}" data-val="2500">₹2,500</div>
                  <div class="amount-pill ${selectedAmount === 5000 ? 'active' : ''}" data-val="5000">₹5,000</div>
                </div>
                <input type="number" id="custom-amount-input" class="form-control" placeholder="Or enter custom amount (e.g. 15000)" value="${selectedAmount}" />
              </div>

              <div style="background: var(--primary-50); border: 1px solid var(--primary-100); padding: 0.9rem 1rem; border-radius: var(--radius-md); font-size: 0.88rem; color: var(--primary-800); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.6rem;">
                <i data-lucide="sparkles" style="width: 20px; height: 20px; flex-shrink: 0; color: var(--primary-600);"></i>
                <span>Your contribution of <strong>₹${Number(selectedAmount || 0).toLocaleString('en-IN')}</strong> provides educational kits for 2 children for a full term!</span>
              </div>

              <button class="btn btn-primary btn-lg" id="step1-next-btn" style="width: 100%;">
                <span>Continue to Donor Details</span>
                <i data-lucide="arrow-right" style="width: 20px; height: 20px;"></i>
              </button>
            </div>
          ` : ''}

          <!-- STEP 2: DONOR INFO -->
          ${step === 2 ? `
            <div>
              <div class="form-group">
                <label class="form-label">Full Name *</label>
                <input type="text" id="donor-name" class="form-control" placeholder="e.g. Ramesh Kumar" value="${user ? user.name : ''}" required />
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group">
                  <label class="form-label">Email Address *</label>
                  <input type="email" id="donor-email" class="form-control" placeholder="name@example.com" value="${user ? user.email : ''}" required />
                </div>
                <div class="form-group">
                  <label class="form-label">Mobile Number *</label>
                  <input type="tel" id="donor-phone" class="form-control" placeholder="+91 98765 43210" value="${user ? user.phone || '' : ''}" required />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">PAN Card Number (Required for 80G Tax Receipt)</label>
                <input type="text" id="donor-pan" class="form-control" placeholder="ABCDE1234F" style="text-transform: uppercase;" value="${user ? user.pan || '' : ''}" />
                <span style="font-size: 0.78rem; color: var(--text-muted);">Enter PAN to claim 50% income tax exemption certificate.</span>
              </div>

              <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
                <button class="btn btn-ghost" id="step2-back-btn">
                  <i data-lucide="arrow-left" style="width: 18px; height: 18px;"></i>
                  <span>Back</span>
                </button>
                <button class="btn btn-primary" id="step2-next-btn" style="flex: 1;">
                  <span>Proceed to Payment (₹${Number(selectedAmount).toLocaleString('en-IN')})</span>
                  <i data-lucide="arrow-right" style="width: 18px; height: 18px;"></i>
                </button>
              </div>
            </div>
          ` : ''}

          <!-- STEP 3: PAYMENT METHOD -->
          ${step === 3 ? `
            <div>
              <div class="tab-nav">
                <button class="tab-btn ${selectedMethod === 'upi' ? 'active' : ''}" data-pay-method="upi">
                  <i data-lucide="qr-code" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle;"></i> Instant UPI / QR
                </button>
                <button class="tab-btn ${selectedMethod === 'card' ? 'active' : ''}" data-pay-method="card">
                  <i data-lucide="credit-card" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle;"></i> Credit / Debit Card
                </button>
                <button class="tab-btn ${selectedMethod === 'netbanking' ? 'active' : ''}" data-pay-method="netbanking">
                  <i data-lucide="landmark" style="width: 16px; height: 16px; display: inline-block; vertical-align: middle;"></i> Net Banking
                </button>
              </div>

              <!-- UPI OPTION -->
              ${selectedMethod === 'upi' ? `
                <div style="text-align: center; padding: 0.5rem 0;">
                  <p style="font-size: 0.9rem; font-weight: 600; margin-bottom: 0.75rem;">Scan QR code with any UPI App (GPay, PhonePe, Paytm, BHIM)</p>
                  
                  <div style="width: 190px; height: 190px; margin: 0 auto 1rem; border: 3px solid var(--primary-600); border-radius: var(--radius-md); padding: 10px; background: white; box-shadow: var(--shadow-md); display: flex; align-items: center; justify-content: center; flex-direction: column;">
                    <i data-lucide="qr-code" style="width: 140px; height: 140px; color: var(--slate-900);"></i>
                    <span style="font-size: 0.7rem; font-weight: 800; color: var(--primary-700);">VERIFIED YCC TRUST UPI</span>
                  </div>

                  <div style="background: var(--slate-100); border-radius: var(--radius-md); padding: 0.6rem 1rem; display: inline-flex; align-items: center; gap: 0.75rem; font-family: monospace; font-size: 0.9rem; margin-bottom: 1rem;">
                    <span>ycctrust@upi</span>
                    <button class="btn btn-outline btn-sm" id="copy-upi-vpa">Copy VPA</button>
                  </div>

                  <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1.25rem;">
                    Session expires in: <strong id="upi-timer" style="color: var(--accent-600);">04:59</strong>
                  </p>

                  <button class="btn btn-accent btn-lg" id="confirm-upi-pay-btn" style="width: 100%;">
                    <i data-lucide="check-circle" style="width: 22px; height: 22px;"></i>
                    <span>Simulate UPI Payment Authorization</span>
                  </button>
                </div>
              ` : ''}

              <!-- CARD OPTION -->
              ${selectedMethod === 'card' ? `
                <div>
                  <div class="form-group">
                    <label class="form-label">Card Number</label>
                    <input type="text" id="card-num" class="form-control" placeholder="4532 •••• •••• 8901" maxlength="19" required />
                  </div>
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group">
                      <label class="form-label">Expiry (MM/YY)</label>
                      <input type="text" id="card-exp" class="form-control" placeholder="08/28" maxlength="5" required />
                    </div>
                    <div class="form-group">
                      <label class="form-label">CVV Security Code</label>
                      <input type="password" id="card-cvv" class="form-control" placeholder="•••" maxlength="4" required />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Cardholder Name</label>
                    <input type="text" id="card-name" class="form-control" placeholder="Name as printed on card" required />
                  </div>

                  <button class="btn btn-primary btn-lg" id="confirm-card-pay-btn" style="width: 100%; margin-top: 0.5rem;">
                    <i data-lucide="lock" style="width: 20px; height: 20px;"></i>
                    <span>Pay ₹${Number(selectedAmount).toLocaleString('en-IN')} Securely</span>
                  </button>
                </div>
              ` : ''}

              <!-- NETBANKING OPTION -->
              ${selectedMethod === 'netbanking' ? `
                <div style="padding: 0.5rem 0;">
                  <div class="form-group">
                    <label class="form-label">Select Your Bank</label>
                    <select id="bank-select" class="form-control">
                      <option value="SBI">State Bank of India</option>
                      <option value="HDFC">HDFC Bank</option>
                      <option value="ICICI">ICICI Bank</option>
                      <option value="AXIS">Axis Bank</option>
                      <option value="KOTAK">Kotak Mahindra Bank</option>
                    </select>
                  </div>
                  <button class="btn btn-primary btn-lg" id="confirm-nb-pay-btn" style="width: 100%; margin-top: 1rem;">
                    <span>Redirect to Netbanking Portal</span>
                  </button>
                </div>
              ` : ''}

              <div style="margin-top: 1rem;">
                <button class="btn btn-ghost" id="step3-back-btn">
                  <i data-lucide="arrow-left" style="width: 18px; height: 18px;"></i>
                  <span>Back to Donor Info</span>
                </button>
              </div>
            </div>
          ` : ''}

        </div>
      </div>
    `;

    modalContainer.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();

    // Attach Event Listeners
    const closeBtn = document.getElementById('close-donate-modal');
    if (closeBtn) closeBtn.addEventListener('click', () => { modalContainer.innerHTML = ''; });

    if (step === 1) {
      document.querySelectorAll('.amount-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          selectedAmount = Number(pill.getAttribute('data-val'));
          renderModal();
        });
      });

      const customInput = document.getElementById('custom-amount-input');
      if (customInput) {
        customInput.addEventListener('input', (e) => {
          selectedAmount = Number(e.target.value) || 0;
        });
      }

      const projSelect = document.getElementById('donate-project-select');
      if (projSelect) {
        projSelect.addEventListener('change', (e) => {
          targetProjId = e.target.value;
        });
      }

      document.getElementById('step1-next-btn').addEventListener('click', () => {
        if (!selectedAmount || selectedAmount < 10) {
          alert('Please enter a valid donation amount.');
          return;
        }
        step = 2;
        renderModal();
      });
    }

    if (step === 2) {
      document.getElementById('step2-back-btn').addEventListener('click', () => {
        step = 1;
        renderModal();
      });

      document.getElementById('step2-next-btn').addEventListener('click', () => {
        const name = document.getElementById('donor-name').value;
        const email = document.getElementById('donor-email').value;
        const phone = document.getElementById('donor-phone').value;
        if (!name || !email || !phone) {
          alert('Please fill out Name, Email, and Mobile number.');
          return;
        }
        step = 3;
        renderModal();
      });
    }

    if (step === 3) {
      document.getElementById('step3-back-btn').addEventListener('click', () => {
        step = 2;
        renderModal();
      });

      document.querySelectorAll('[data-pay-method]').forEach(btn => {
        btn.addEventListener('click', () => {
          selectedMethod = btn.getAttribute('data-pay-method');
          renderModal();
        });
      });

      const executePayment = (methodLabel) => {
        const name = document.getElementById('donor-name')?.value || user?.name || 'Kind Donor';
        const email = document.getElementById('donor-email')?.value || user?.email || 'donor@example.com';
        const phone = document.getElementById('donor-phone')?.value || user?.phone || '';
        const pan = document.getElementById('donor-pan')?.value || user?.pan || '';
        const project = projects.find(p => p.id === targetProjId);

        const newDonation = store.addDonation({
          donorName: name,
          donorEmail: email,
          donorPhone: phone,
          donorPan: pan,
          amount: selectedAmount,
          projectId: targetProjId,
          projectTitle: project ? project.title : 'General Trust Welfare Fund',
          paymentMethod: methodLabel
        });

        // Trigger Confetti
        if (window.confetti) {
          window.confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        }

        modalContainer.innerHTML = '';
        renderReceiptModal(newDonation);
      };

      const confirmUpi = document.getElementById('confirm-upi-pay-btn');
      if (confirmUpi) {
        confirmUpi.addEventListener('click', () => executePayment('UPI Instant (GPay/PhonePe)'));
      }

      const confirmCard = document.getElementById('confirm-card-pay-btn');
      if (confirmCard) {
        confirmCard.addEventListener('click', () => executePayment('Credit/Debit Card (Visa/Mastercard)'));
      }

      const confirmNb = document.getElementById('confirm-nb-pay-btn');
      if (confirmNb) {
        confirmNb.addEventListener('click', () => executePayment('Net Banking (SBI/HDFC)'));
      }
    }
  };

  renderModal();
}
