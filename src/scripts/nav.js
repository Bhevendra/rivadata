export function initNav() {
  const nav = document.querySelector("nav");
  if (!nav) return;

  window.addEventListener("scroll", () => {
    nav.style.background =
      window.scrollY > 60 ? "rgba(5,13,31,0.97)" : "rgba(5,13,31,0.85)";
  });
}