import { useEffect, useRef } from "react";

/**
 * Live atmospheric background:
 *  - 3 large aurora/orb elements (CSS transform+opacity animations only)
 *  - technical grid
 *  - small canvas particle field (rAF, no React state)
 *  - mouse-responsive ambient light (desktop only, rAF-smoothed)
 */
export function LiveBackground() {
  const lightRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mouse-responsive ambient light (desktop pointers only)
  useEffect(() => {
    const el = lightRef.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 60;
      targetY = (e.clientY / window.innerHeight - 0.5) * 40;
    };
    const loop = () => {
      x += (targetX - x) * 0.045;
      y += (targetY - y) * 0.045;
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Particle field
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const count = isMobile ? 14 : 34;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const colors = ["168,132,255", "96,165,250", "103,232,249"];

    let w = 0;
    let h = 0;
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.6,
      vx: (Math.random() - 0.5) * 0.12,
      vy: -(Math.random() * 0.14 + 0.03),
      a: Math.random() * 0.35 + 0.12,
      phase: Math.random() * Math.PI * 2,
      c: colors[Math.floor(Math.random() * colors.length)]!,
    }));

    let raf = 0;
    let running = true;
    let t = 0;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!running) return;
      t += 0.01;
      ctx.clearRect(0, 0, w, h);

      // faint connection lines between close particles (desktop only)
      if (!isMobile) {
        for (let i = 0; i < particles.length; i++) {
          const a = particles[i]!;
          for (let j = i + 1; j < particles.length; j++) {
            const b = particles[j]!;
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 16000) {
              ctx.strokeStyle = `rgba(140,160,255,${(1 - d2 / 16000) * 0.05})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) p.y = h + 10;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        const alpha = p.a * (0.65 + 0.35 * Math.sin(t + p.phase));
        ctx.fillStyle = `rgba(${p.c},${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    raf = requestAnimationFrame(draw);

    const onVisibility = () => {
      running = !document.hidden;
    };
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, var(--background-2) 0%, var(--background) 55%, var(--background) 100%)",
        }}
      />

      {/* technical grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(100% 70% at 50% 20%, black 0%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(100% 70% at 50% 20%, black 0%, transparent 85%)",
          opacity: 0.7,
        }}
      />

      {/* aurora orbs — transform/opacity only */}
      <div
        className="absolute left-[-10%] top-[-15%] h-[55vmax] w-[55vmax] rounded-full opacity-[0.42]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--violet) 55%, transparent) 0%, transparent 65%)",
          filter: "blur(80px)",
          animation: "aurora-drift 26s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      <div
        className="absolute right-[-15%] top-[25%] h-[50vmax] w-[50vmax] rounded-full opacity-[0.32]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--blue) 55%, transparent) 0%, transparent 65%)",
          filter: "blur(90px)",
          animation: "aurora-drift-2 34s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      <div
        className="absolute bottom-[-20%] left-[25%] h-[45vmax] w-[45vmax] rounded-full opacity-[0.26]"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--cyan) 45%, transparent) 0%, transparent 65%)",
          filter: "blur(95px)",
          animation: "aurora-drift 42s ease-in-out infinite reverse",
          willChange: "transform",
        }}
      />

      {/* mouse-responsive ambient light */}
      <div ref={lightRef} className="absolute inset-0" style={{ willChange: "transform" }}>
        <div
          className="absolute left-1/2 top-[10%] h-[60vmax] w-[60vmax] -translate-x-1/2 rounded-full opacity-[0.18]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklch, var(--indigo) 60%, transparent) 0%, transparent 60%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      {/* particles */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* subtle noise */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
