/* ==========================================================================
   YCC CHARITABLE TRUST - 80G TAX EXEMPTION RECEIPT GENERATOR
   ========================================================================== */

export function renderReceiptModal(donation, onClose) {
  const modalContainer = document.getElementById('modal-container');
  
  const numberToWords = (num) => {
    // Basic INR converter helper
    return `Rupees ${num.toLocaleString('en-IN')} Only`;
  };

  const html = `
    <div class="modal-overlay active" id="receipt-modal-overlay">
      <div class="modal-box" style="max-width: 750px; background: #ffffff; color: #1e293b;">
        <button class="modal-close-btn" id="close-receipt-btn">
          <i data-lucide="x" style="width: 20px; height: 20px;"></i>
        </button>

        <!-- Printable Receipt Content -->
        <div id="receipt-print-area" style="padding: 2rem; border: 2px solid #047857; border-radius: 12px; position: relative; background: #ffffff;">
          
          <!-- Watermark Logo Overlay -->
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.04; font-size: 14rem; font-weight: 900; pointer-events: none; color: #047857;">
            YCC
          </div>

          <!-- Header -->
          <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px dashed #047857; padding-bottom: 1.25rem; margin-bottom: 1.5rem;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <div style="width: 38px; height: 38px; background: #047857; color: white; border-radius: 8px; font-weight: 800; display: flex; align-items: center; justify-content: center;">YCC</div>
                <h2 style="font-size: 1.5rem; color: #064e3b; margin: 0;">Youth & Community Care Trust</h2>
              </div>
              <p style="font-size: 0.82rem; color: #475569; margin-top: 0.3rem; line-height: 1.4;">
                Regd. Office: 104, Harmony Heights, NGO Complex, Sector 4<br/>
                Reg. No: IV-1082/2018/YCC | DARPAN ID: IN/2018/019283
              </p>
            </div>
            <div style="text-align: right;">
              <span style="display: inline-block; background: #d1fae5; color: #065f46; font-weight: 800; font-size: 0.8rem; padding: 0.3rem 0.8rem; border-radius: 20px; border: 1px solid #34d399;">
                80G TAX DEDUCTIBLE
              </span>
              <div style="font-size: 0.82rem; color: #475569; margin-top: 0.5rem;">
                <strong>80G Reg:</strong> AABTY1290EF20218<br/>
                <strong>12A Reg:</strong> AABTY1290EE20214
              </div>
            </div>
          </div>

          <!-- Title -->
          <div style="text-align: center; margin-bottom: 1.5rem;">
            <h3 style="font-size: 1.25rem; letter-spacing: 0.05em; text-transform: uppercase; color: #047857; margin: 0;">DONATION RECEIPT & 80G CERTIFICATE</h3>
          </div>

          <!-- Meta Grid -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; background: #f8fafc; padding: 1rem 1.25rem; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 0.9rem; margin-bottom: 1.5rem;">
            <div><strong>Receipt No:</strong> <span style="font-family: monospace; font-size: 1rem; color: #047857;">${donation.receiptNo}</span></div>
            <div><strong>Date:</strong> ${donation.date}</div>
            <div><strong>Transaction ID:</strong> <span style="font-family: monospace;">${donation.id}</span></div>
            <div><strong>Payment Mode:</strong> ${donation.paymentMethod}</div>
          </div>

          <!-- Donor Information -->
          <div style="margin-bottom: 1.5rem; font-size: 0.95rem; line-height: 1.8;">
            <p>Received with thanks from <strong>${donation.donorName}</strong></p>
            <p><strong>PAN Number:</strong> ${donation.donorPan || 'N/A (Provide PAN for Sec 80G Tax Exemption Claim)'}</p>
            <p><strong>Email / Mobile:</strong> ${donation.donorEmail} | ${donation.donorPhone}</p>
            <p><strong>Contribution towards:</strong> ${donation.projectTitle || 'General Trust Welfare Campaign'}</p>
          </div>

          <!-- Amount Box -->
          <div style="background: #ecfdf5; border: 2px solid #10b981; padding: 1.25rem; border-radius: 10px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
            <div>
              <div style="font-size: 0.8rem; color: #065f46; font-weight: 700; text-transform: uppercase;">Amount Received in Words</div>
              <div style="font-size: 1.1rem; font-weight: 800; color: #064e3b;">${numberToWords(Number(donation.amount))}</div>
            </div>
            <div style="font-size: 1.8rem; font-weight: 900; color: #047857; font-family: var(--font-display);">
              ₹${Number(donation.amount).toLocaleString('en-IN')}
            </div>
          </div>

          <!-- Footer Signature & QR -->
          <div style="display: flex; justify-content: space-between; align-items: flex-end; pt-2">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <!-- QR Code Mock -->
              <div style="width: 70px; height: 70px; border: 2px solid #047857; border-radius: 8px; padding: 4px; background: white; display: flex; align-items: center; justify-content: center;">
                <i data-lucide="qr-code" style="width: 58px; height: 58px; color: #047857;"></i>
              </div>
              <div style="font-size: 0.75rem; color: #64748b;">
                Scan to verify 80G tax authenticity<br/>
                Valid under Section 80G(5)(vi)<br/>
                Income Tax Act 1961
              </div>
            </div>

            <div style="text-align: center;">
              <div style="font-family: 'Brush Script MT', cursive, sans-serif; font-size: 1.8rem; color: #064e3b; margin-bottom: -5px;">
                Ramesh Sharma
              </div>
              <div style="border-top: 1px solid #94a3b8; width: 160px; margin: 0 auto 4px;"></div>
              <div style="font-size: 0.8rem; font-weight: 700; color: #334155;">Managing Trustee</div>
              <div style="font-size: 0.72rem; color: #64748b;">YCC Charitable Trust</div>
            </div>
          </div>

        </div>

        <!-- Action Buttons -->
        <div style="display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1.5rem;">
          <button class="btn btn-outline" id="print-receipt-btn">
            <i data-lucide="printer" style="width: 18px; height: 18px;"></i>
            <span>Print Receipt</span>
          </button>
          <button class="btn btn-primary" id="download-receipt-btn">
            <i data-lucide="download" style="width: 18px; height: 18px;"></i>
            <span>Download Tax Receipt (PDF)</span>
          </button>
        </div>

      </div>
    </div>
  `;

  modalContainer.innerHTML = html;
  if (window.lucide) window.lucide.createIcons();

  const closeBtn = document.getElementById('close-receipt-btn');
  closeBtn.addEventListener('click', () => {
    modalContainer.innerHTML = '';
    if (onClose) onClose();
  });

  const printBtn = document.getElementById('print-receipt-btn');
  printBtn.addEventListener('click', () => {
    window.print();
  });

  const downloadBtn = document.getElementById('download-receipt-btn');
  downloadBtn.addEventListener('click', () => {
    alert(`Downloading Official 80G Receipt: ${donation.receiptNo}.pdf`);
    window.print();
  });
}
