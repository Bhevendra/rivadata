import { initNav } from "./nav.js";
import { initReveal } from "./reveal.js";
import details from "../data/programDetails.json";

function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function render(programId) {
  const p = details[programId];
  const root = document.getElementById("program-page");
  if (!root) return;

  if (!p) {
    root.innerHTML = `<section><h1 class="section-title">Program not found</h1><p class="section-sub">Please go back to the home page.</p><a class="btn-primary" href="/">Back to home</a></section>`;
    return;
  }

  const modulesHtml = (p.modules || [])
    .map(
      (m) => `
      <details class="curriculum-item">
        <summary>${escapeHtml(m.title)}</summary>
        <ul>
          ${(m.items || []).map((it) => `<li>${escapeHtml(it)}</li>`).join("")}
        </ul>
      </details>
    `
    )
    .join("");

  const outcomesHtml = (p.outcomes || []).map((x) => `<li>${escapeHtml(x)}</li>`).join("");

  const faqsHtml = (p.faqs || [])
    .map(
      (f) => `
      <details class="faq-item">
        <summary>${escapeHtml(f.q)}</summary>
        <p>${escapeHtml(f.a)}</p>
      </details>
    `
    )
    .join("");

  const highlightsHtml = (p.highlights || []).map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("");

  root.innerHTML = `
    <section class="program-hero">
      <div class="program-hero-inner">
        <div class="program-hero-left">
          <span class="section-label">${escapeHtml(p.badge)}</span>
          <h1 class="section-title">${escapeHtml(p.headline)}</h1>
          <p class="section-sub">${escapeHtml(p.subheadline)}</p>

          <div class="program-meta">
            <div class="program-meta-box">
              <div class="meta-k">Spots left</div>
              <div class="meta-v">${escapeHtml(String(p.spotsLeft))}</div>
            </div>
            <div class="program-meta-box">
              <div class="meta-k">Next cohort</div>
              <div class="meta-v">${escapeHtml(p.nextCohort)}</div>
            </div>
            <div class="program-meta-box">
              <div class="meta-k">Price</div>
              <div class="meta-v">${escapeHtml(p.price)}</div>
            </div>
          </div>

          <div class="program-tags">${highlightsHtml}</div>

          <div class="program-cta-row">
            <a class="btn-primary" href="${escapeHtml(p.checkoutUrl)}" target="_blank" rel="noopener noreferrer">Pay Now</a>
            <a class="btn-outline-dark" href="#talk" id="talk-btn">Talk to us first</a>
          </div>

          <p class="trust-note">Secure checkout • Seat reserved after payment • Limited cohort size</p>
        </div>

        <div class="program-hero-right">
          <div class="pricing-card reveal">
            <div class="pricing-card-top">
              <div class="pricing-title">Reserve your seat</div>
              <div class="pricing-price">${escapeHtml(p.price)}</div>
              <div class="pricing-small">Seats are limited to keep mentoring quality high.</div>
            </div>
            <a class="btn-primary pricing-pay" href="${escapeHtml(p.checkoutUrl)}" target="_blank" rel="noopener noreferrer">Pay Now</a>
            <div class="pricing-badges">
              <div class="badge-pill">✅ Career support included</div>
              <div class="badge-pill">✅ Portfolio projects</div>
              <div class="badge-pill">✅ Interview prep</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="program-section">
      <div class="program-two-col">
        <div class="reveal">
          <span class="section-label">Program Outcome</span>
          <h2 class="section-title">What you’ll be able to do</h2>
          <ul class="bullets">${outcomesHtml}</ul>
        </div>
        <div class="reveal reveal-delay-1">
          <span class="section-label">Curriculum</span>
          <h2 class="section-title">Modules & projects</h2>
          <div class="accordion">${modulesHtml}</div>
        </div>
      </div>
    </section>

    <section class="program-section program-section-alt">
      <div class="program-two-col">
        <div class="reveal">
          <span class="section-label">Career Support</span>
          <h2 class="section-title">We support you until job placement</h2>
          <ul class="bullets">
            <li>Resume optimisation</li>
            <li>LinkedIn branding</li>
            <li>Portfolio website creation</li>
            <li>GitHub project portfolio</li>
            <li>Technical interview preparation</li>
            <li>Competency-based interview coaching</li>
            <li>Mock interviews</li>
          </ul>
        </div>
        <div class="reveal reveal-delay-1">
          <span class="section-label">FAQs</span>
          <h2 class="section-title">Quick answers</h2>
          <div class="accordion">${faqsHtml}</div>
        </div>
      </div>
    </section>

    <div class="modal" id="talk-modal" aria-hidden="true">
      <div class="modal-backdrop" id="talk-close"></div>
      <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="talk-title">
        <h3 id="talk-title">Talk to us first</h3>
        <p class="modal-sub">Tell us a bit about your goal — we’ll reply within 24 hours.</p>

        <form action="https://formspree.io/f/xjgenqzk" method="POST">
          <label>
            Name
            <input name="name" required />
          </label>

          <label>
            Email
            <input name="email" type="email" required />
          </label>

          <label>
            Phone (optional)
            <input name="phone" />
          </label>

          <label>
            Which program?
            <input name="program" readonly value="${escapeHtml(p.badge)}" />
          </label>

          <label>
            Message
            <textarea name="message" rows="4" placeholder="What are you trying to achieve?" required></textarea>
          </label>

          <button class="btn-primary" type="submit">Send</button>
        </form>

        <button class="modal-x" id="talk-x" aria-label="Close">×</button>
      </div>
    </div>

    <div class="sticky-pay">
      <div class="sticky-pay-inner">
        <div class="sticky-left">
          <div class="sticky-title">${escapeHtml(p.badge)}</div>
          <div class="sticky-sub">Spots left: ${escapeHtml(String(p.spotsLeft))} • ${escapeHtml(p.price)}</div>
        </div>
        <a class="btn-primary" href="${escapeHtml(p.checkoutUrl)}" target="_blank" rel="noopener noreferrer">Pay Now</a>
      </div>
    </div>
  `;
}

function addProgramPageStyles() {
  const css = `
  .program-hero{padding:120px 5vw 70px;background:var(--grey-50)}
  .program-hero-inner{display:grid;grid-template-columns:1.4fr 0.8fr;gap:34px;align-items:start;max-width:1200px;margin:0 auto}
  .program-meta{display:flex;gap:12px;flex-wrap:wrap;margin:22px 0 16px}
  .program-meta-box{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:12px 14px;min-width:160px}
  .meta-k{font-size:.72rem;letter-spacing:1px;text-transform:uppercase;color:var(--text-muted);margin-bottom:4px}
  .meta-v{font-family:'DM Sans',sans-serif;font-weight:700;color:var(--text-primary);font-size:1.05rem}
  .pricing-price{font-family:'DM Sans',sans-serif;font-size:2.2rem;font-weight:800;margin:8px 0 6px;letter-spacing:-0.5px}
  .program-tags{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0 22px}
  .program-cta-row{display:flex;gap:14px;flex-wrap:wrap;margin-top:10px}
  .trust-note{margin-top:14px;color:var(--text-muted);font-size:.9rem}
  .pricing-card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:22px;position:sticky;top:92px}
  .pricing-title{font-size:.85rem;letter-spacing:1px;text-transform:uppercase;color:var(--text-muted)}
  .pricing-small{color:var(--text-muted);font-size:.9rem;line-height:1.5}
  .pricing-pay{width:100%;justify-content:center;margin:14px 0}
  .pricing-badges{display:flex;flex-direction:column;gap:8px;margin-top:6px}
  .badge-pill{font-size:.85rem;color:var(--text-primary);background:var(--grey-50);border:1px solid #e2e8f0;border-radius:999px;padding:8px 10px}
  .program-section{padding:80px 5vw;background:#fff}
  .program-section-alt{background:var(--grey-50)}
  .program-two-col{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:34px}
  .bullets{margin-top:14px;display:flex;flex-direction:column;gap:10px}
  .bullets li{color:var(--text-muted);line-height:1.6}
  .accordion{display:flex;flex-direction:column;gap:12px;margin-top:14px}
  .curriculum-item,.faq-item{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:12px 14px}
  .curriculum-item summary,.faq-item summary{cursor:pointer;font-family:'Syne',sans-serif;font-weight:700}
  .curriculum-item ul{margin-top:10px;padding-left:18px;color:var(--text-muted);display:flex;flex-direction:column;gap:6px}
  .faq-item p{margin-top:10px;color:var(--text-muted);line-height:1.6}

  .modal{position:fixed;inset:0;display:none;z-index:2000}
  .modal[aria-hidden="false"]{display:block}
  .modal-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.45)}
  .modal-card{position:relative;max-width:520px;margin:90px auto 0;background:#fff;border-radius:16px;padding:22px 20px;border:1px solid #e2e8f0;box-shadow:0 20px 60px rgba(0,0,0,.25)}
  .modal-sub{color:var(--text-muted);margin:8px 0 14px;line-height:1.5}
  .modal-card label{display:block;font-size:.85rem;color:var(--text-primary);margin:10px 0}
  .modal-card input,.modal-card textarea{width:100%;margin-top:6px;padding:10px 12px;border:1px solid #d1d5db;border-radius:10px;font-family:'DM Sans',sans-serif}
  .modal-card textarea{resize:vertical}
  .modal-x{position:absolute;top:10px;right:12px;border:0;background:transparent;font-size:28px;line-height:1;cursor:pointer;color:var(--text-muted)}
  .modal-x:hover{color:var(--text-primary)}

  .sticky-pay{position:fixed;left:0;right:0;bottom:0;background:rgba(255,255,255,.9);backdrop-filter:blur(10px);border-top:1px solid #e2e8f0;z-index:999}
  .sticky-pay-inner{max-width:1200px;margin:0 auto;padding:12px 5vw;display:flex;justify-content:space-between;align-items:center;gap:14px}
  .sticky-title{font-family:'DM Sans',sans-serif;font-weight:700;font-size:1rem;letter-spacing:0;color:var(--text-primary)}
  .sticky-sub{font-family:'DM Sans',sans-serif;font-weight:400;font-size:.9rem;color:var(--text-muted)}

  @media(max-width:900px){
    .program-hero-inner,.program-two-col{grid-template-columns:1fr}
    .pricing-card{position:relative;top:auto}
  }`;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
}

window.addEventListener("DOMContentLoaded", () => {
  addProgramPageStyles();
  const id = document.body.getAttribute("data-program-id");

  // Render FIRST so the button/modal exist in DOM
  render(id);

  // Now attach modal listeners
  const talkBtn = document.getElementById("talk-btn");
  const modal = document.getElementById("talk-modal");
  const close1 = document.getElementById("talk-close");
  const close2 = document.getElementById("talk-x");

  function openModal() {
    if (!modal) return;
    modal.setAttribute("aria-hidden", "false");
  }
  function closeModal() {
    if (!modal) return;
    modal.setAttribute("aria-hidden", "true");
  }

  talkBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();
  });

  close1?.addEventListener("click", closeModal);
  close2?.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  initReveal();
  initNav();
});