export function initReveal() {
  const reveals = Array.from(document.querySelectorAll(".reveal"));

  // If nothing uses reveal, nothing to do
  if (!reveals.length) return;

  // Always show hero reveal elements immediately
  document.querySelectorAll(".hero .reveal").forEach((el) => el.classList.add("visible"));

  // Fallback: if IntersectionObserver isn't supported or fails, show all
  if (!("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      }
    },
    {
      root: null,
      rootMargin: "0px 0px -10% 0px", // triggers a bit earlier
      threshold: 0.01,               // very permissive
    }
  );

  reveals.forEach((el) => observer.observe(el));

  // Extra safety: after 2 seconds, reveal anything still hidden
  setTimeout(() => {
    document.querySelectorAll(".reveal:not(.visible)").forEach((el) => el.classList.add("visible"));
  }, 2000);
}