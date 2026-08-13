import { useEffect, useRef } from "react";

/**
 * Small premium cursor point. Desktop fine-pointer only, disabled for
 * touch and reduced motion. Pointer position is driven purely by rAF —
 * never React state.
 */
export function PremiumCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const halo = haloRef.current;
    if (!dot || !halo) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    dot.style.opacity = "1";
    halo.style.opacity = "1";
    document.body.style.cursor = "none";

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let hx = mx;
    let hy = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const t = e.target as HTMLElement | null;
      const interactive = t?.closest("a,button,[role='button'],[data-cursor]");
      const accent = interactive
        ? interactive.getAttribute("data-cursor") === "project"
          ? "var(--violet)"
          : "var(--cyan)"
        : "var(--blue)";
      dot.style.background = accent;
      halo.style.background = `radial-gradient(circle, color-mix(in oklch, ${accent} 40%, transparent) 0%, transparent 70%)`;
      halo.style.width = interactive ? "34px" : "22px";
      halo.style.height = interactive ? "34px" : "22px";
    };

    const loop = () => {
      hx += (mx - hx) * 0.18;
      hy += (my - hy) * 0.18;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      halo.style.transform = `translate3d(${hx}px, ${hy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <div
        ref={haloRef}
        className="absolute left-0 top-0 rounded-full opacity-0 transition-[width,height] duration-200"
        style={{ width: 22, height: 22, willChange: "transform" }}
      />
      <div
        ref={dotRef}
        className="absolute left-0 top-0 rounded-full opacity-0"
        style={{ width: 6, height: 6, background: "var(--blue)", willChange: "transform" }}
      />
    </div>
  );
}
