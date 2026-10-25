import { useEffect, useRef } from "react";

/** Progressive enhancement: content stays readable without JavaScript or motion. */
export function useScrollReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !window.IntersectionObserver) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting);
      visible.forEach((entry, index) => {
        const element = entry.target as HTMLElement;
        element.style.setProperty("--reveal-delay", `${Math.min(index, 4) * 90}ms`);
        element.classList.add("scroll-revealed");
        observer.unobserve(element);
      });
    }, { threshold: 0.06, rootMargin: "0px 0px -24px 0px" });

    const seen = new WeakSet<Element>();
    const register = () => {
      root.querySelectorAll(":scope > section:not(:first-child)").forEach((section) => {
        section.querySelectorAll(".tile, .mb-6").forEach((element) => {
          // Animate outer tiles only, so nested content never moves twice.
          const parentTile = element.parentElement?.closest(".tile");
          if (seen.has(element) || (parentTile && section.contains(parentTile))) return;
          seen.add(element);
          observer.observe(element);
        });
        if (section.classList.contains("tile") && !seen.has(section)) {
          seen.add(section);
          observer.observe(section);
        }
      });
    };
    register();
    const changes = new MutationObserver(register);
    changes.observe(root, { childList: true, subtree: true });
    return () => { observer.disconnect(); changes.disconnect(); };
  }, []);

  return ref;
}