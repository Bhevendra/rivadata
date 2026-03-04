import { initReveal } from "./reveal.js";
import { initNav } from "./nav.js";

import programs from "../data/programs.json";
import consulting from "../data/consulting.json";
import footerLinks from "../data/footerLinks.json";

function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderPrograms() {
  const el = document.getElementById("program-cards");
  if (!el) return;

  el.innerHTML = programs
    .map((p) => {
      const href = escapeHtml(p.ctaHref || "#");
      const ctaText = escapeHtml(p.ctaText || "Learn more");

      return `
      <div class="program-card reveal" role="link" tabindex="0" data-href="${href}">
        <div class="program-icon">${escapeHtml(p.icon)}</div>
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.body)}</p>

        <div class="program-tags">
          ${(p.tags || []).map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
        </div>

        <a class="btn-card" href="${href}">
          ${ctaText}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>`;
    })
    .join("");

  // Make whole card clickable (mouse + keyboard)
  el.querySelectorAll(".program-card[data-href]").forEach((card) => {
    const href = card.getAttribute("data-href");
    if (!href || href === "#") return;

    card.addEventListener("click", (e) => {
      // If user clicked the actual link inside, let the browser handle it
      if (e.target && e.target.closest("a")) return;
      window.location.href = href;
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        window.location.href = href;
      }
    });
  });
}

function renderConsulting() {
  const el = document.getElementById("consulting-cards");
  if (!el) return;

  el.innerHTML = consulting
    .map(
      (c, idx) => `
      <div class="consult-card reveal ${idx ? `reveal-delay-${idx}` : ""}">
        <span class="consult-card-icon">${escapeHtml(c.icon)}</span>
        <h3>${escapeHtml(c.title)}</h3>
        <p>${escapeHtml(c.body)}</p>
      </div>
    `
    )
    .join("");
}

function renderFooterLinks() {
  const el = document.getElementById("footer-links");
  if (!el) return;

  const cols = footerLinks?.columns || [];
  el.innerHTML = cols
    .map(
      (col) => `
      <div class="footer-col">
        <h5>${escapeHtml(col.title)}</h5>
        ${(col.links || [])
          .map((l) => `<a href="${escapeHtml(l.href)}">${escapeHtml(l.label)}</a>`)
          .join("")}
      </div>
    `
    )
    .join("");
}

window.addEventListener("DOMContentLoaded", () => {
  renderPrograms();
  renderConsulting();
  renderFooterLinks();

  // run after render so new .reveal items animate
  initReveal();
  initNav();
});