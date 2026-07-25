/* ==========================================================================
   YCC CHARITABLE TRUST - ABOUT US & MISSION PAGE
   ========================================================================== */

export function renderAboutPage(onNavigate, openDonateModal) {
  const html = `
    <!-- Header Hero -->
    <div style="background: linear-gradient(135deg, var(--primary-900), var(--primary-800)); color: white; padding: 4.5rem 0 3.5rem; text-align: center;">
      <div class="container">
        <h1 style="font-size: 3rem; margin-bottom: 1rem; color: white;">About YCC Charitable Trust</h1>
        <p style="font-size: 1.15rem; max-width: 720px; margin: 0 auto; color: var(--primary-100);">
          Established in 2018 with a vision to eliminate poverty through education, healthcare access, and sustainable environmental practices.
        </p>
      </div>
    </div>

    <!-- Core Vision & Mission -->
    <section class="section">
      <div class="container">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2.5rem; margin-bottom: 4rem;">
          <div style="background: var(--bg-card); padding: 2.5rem; border-radius: var(--radius-xl); border: 1px solid var(--border-color); box-shadow: var(--shadow-md);">
            <div style="width: 52px; height: 52px; background: var(--primary-100); color: var(--primary-700); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;">
              <i data-lucide="eye" style="width: 26px; height: 26px;"></i>
            </div>
            <h3 style="font-size: 1.5rem; margin-bottom: 0.75rem;">Our Vision</h3>
            <p style="color: var(--text-muted); line-height: 1.7;">
              To build a society where every child receives quality education, every senior receives compassionate healthcare, and every community thrives in harmony with nature.
            </p>
          </div>

          <div style="background: var(--bg-card); padding: 2.5rem; border-radius: var(--radius-xl); border: 1px solid var(--border-color); box-shadow: var(--shadow-md);">
            <div style="width: 52px; height: 52px; background: var(--accent-100); color: var(--accent-700); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;">
              <i data-lucide="target" style="width: 26px; height: 26px;"></i>
            </div>
            <h3 style="font-size: 1.5rem; margin-bottom: 0.75rem;">Our Mission</h3>
            <p style="color: var(--text-muted); line-height: 1.7;">
              To empower rural and peri-urban communities by running direct scholarship programs, mobile medical units, women skill centers, and large-scale eco-restoration drives.
            </p>
          </div>
        </div>

        <!-- Tax Registration & Legal Info Box -->
        <div style="background: linear-gradient(135deg, var(--slate-900), var(--slate-800)); color: white; padding: 3rem; border-radius: var(--radius-xl); margin-bottom: 4rem;">
          <h2 style="color: white; font-size: 1.8rem; margin-bottom: 1rem;">Trust Governance & 80G Tax Exemption</h2>
          <p style="color: var(--slate-300); margin-bottom: 2rem; max-width: 800px; line-height: 1.7;">
            YCC Trust is fully compliant with Income Tax Act 1961 guidelines. Donations made to YCC Trust are tax exempt up to 50% under Section 80G. Official tax receipts with registration numbers are issued instantly.
          </p>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
            <div style="background: rgba(255,255,255,0.08); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid rgba(255,255,255,0.15);">
              <div style="font-size: 0.8rem; color: var(--accent-400); font-weight: 700;">80G CERTIFICATE NO</div>
              <div style="font-size: 1.1rem; font-weight: 800; font-family: monospace; color: white;">AABTY1290EF20218</div>
            </div>
            <div style="background: rgba(255,255,255,0.08); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid rgba(255,255,255,0.15);">
              <div style="font-size: 0.8rem; color: var(--accent-400); font-weight: 700;">12A CERTIFICATE NO</div>
              <div style="font-size: 1.1rem; font-weight: 800; font-family: monospace; color: white;">AABTY1290EE20214</div>
            </div>
            <div style="background: rgba(255,255,255,0.08); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid rgba(255,255,255,0.15);">
              <div style="font-size: 0.8rem; color: var(--accent-400); font-weight: 700;">DARPAN REGISTRATION</div>
              <div style="font-size: 1.1rem; font-weight: 800; font-family: monospace; color: white;">IN/2018/019283</div>
            </div>
            <div style="background: rgba(255,255,255,0.08); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid rgba(255,255,255,0.15);">
              <div style="font-size: 0.8rem; color: var(--accent-400); font-weight: 700;">PAN NUMBER</div>
              <div style="font-size: 1.1rem; font-weight: 800; font-family: monospace; color: white;">AAATY1082C</div>
            </div>
          </div>
        </div>

        <!-- Board of Trustees -->
        <div>
          <div class="section-header">
            <div class="section-subtitle">Leadership</div>
            <h2 class="section-title">Board of Trustees</h2>
          </div>

          <div class="grid-3">
            <div style="background: var(--bg-card); padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); text-align: center;">
              <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--primary-100); color: var(--primary-700); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; font-weight: 800; margin: 0 auto 1rem;">RS</div>
              <h3 style="font-size: 1.2rem;">Dr. Ramesh Sharma</h3>
              <p style="font-size: 0.85rem; color: var(--primary-600); font-weight: 700; margin-bottom: 0.75rem;">Managing Trustee</p>
              <p style="font-size: 0.88rem; color: var(--text-muted);">20+ years of public health experience and social reform leadership across India.</p>
            </div>

            <div style="background: var(--bg-card); padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); text-align: center;">
              <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--accent-100); color: var(--accent-700); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; font-weight: 800; margin: 0 auto 1rem;">PV</div>
              <h3 style="font-size: 1.2rem;">Priya Verma</h3>
              <p style="font-size: 0.85rem; color: var(--primary-600); font-weight: 700; margin-bottom: 0.75rem;">Executive Director</p>
              <p style="font-size: 0.88rem; color: var(--text-muted);">Educationist and champion for girl child empowerment and skill development.</p>
            </div>

            <div style="background: var(--bg-card); padding: 2rem; border-radius: var(--radius-lg); border: 1px solid var(--border-color); text-align: center;">
              <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--primary-100); color: var(--primary-700); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; font-weight: 800; margin: 0 auto 1rem;">VK</div>
              <h3 style="font-size: 1.2rem;">Vikram Kapoor</h3>
              <p style="font-size: 0.85rem; color: var(--primary-600); font-weight: 700; margin-bottom: 0.75rem;">Treasurer & Audit Head</p>
              <p style="font-size: 0.88rem; color: var(--text-muted);">Chartered Accountant ensuring 100% financial compliance and audit rigor.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  `;

  const mainEl = document.getElementById('main-content');
  mainEl.innerHTML = html;
  if (window.lucide) window.lucide.createIcons();
}
