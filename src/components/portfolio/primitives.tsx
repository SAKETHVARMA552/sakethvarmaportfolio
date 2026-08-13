import { useEffect, useRef, useState, type ReactNode } from "react";

/** IntersectionObserver-driven reveal — one observer per element, unobserved after reveal. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  direction = "up",
  distance = 30,
  scale = 0.98,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  scale?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      setHasRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            setHasRevealed(true);
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const getTransform = () => {
    if (hasRevealed) return "none";
    const dirMap = {
      up: `translateY(${distance}px)`,
      down: `translateY(-${distance}px)`,
      left: `translateX(${distance}px)`,
      right: `translateX(-${distance}px)`,
      none: "none",
    };
    return `${dirMap[direction]} scale(${scale})`;
  };

  const Comp = Tag as "div";
  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement>}
      className={`reveal ${className}`}
      style={{
        ["--reveal-delay" as string]: `${delay}ms`,
        transform: getTransform(),
      }}
    >
      {children}
    </Comp>
  );
}

/** Adds a clipped ripple + press scale to any card/button. */
export function useTactile(color = "var(--violet)") {
  const [pressed, setPressed] = useState(false);

  const spawn = (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
    const host = e.currentTarget;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = host.getBoundingClientRect();
    const isMouse = "clientX" in e;
    const x = isMouse ? (e as React.MouseEvent).clientX - rect.left : rect.width / 2;
    const y = isMouse ? (e as React.MouseEvent).clientY - rect.top : rect.height / 2;
    const size = Math.max(rect.width, rect.height) * 0.55;
    const span = document.createElement("span");
    span.className = "ripple";
    span.style.width = `${size}px`;
    span.style.height = `${size}px`;
    span.style.left = `${x - size / 2}px`;
    span.style.top = `${y - size / 2}px`;
    span.style.setProperty("--ripple-color", color);
    host.appendChild(span);
    window.setTimeout(() => span.remove(), 650);
  };

  const handlers = {
    "data-pressed": pressed ? "true" : "false",
    onPointerDown: (e: React.MouseEvent<HTMLElement>) => {
      setPressed(true);
      spawn(e);
      window.setTimeout(() => setPressed(false), 140);
    },
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
  };

  return handlers;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="mb-10 max-w-2xl md:mb-14">
      <p className="eyebrow flex items-center gap-2">
        <span className="inline-block size-1.5 rounded-full bg-cyan-400 animate-pulse" />
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold sm:text-4xl md:text-[2.75rem]">
        <span className="gradient-text">{title}</span>
      </h2>
      {description ? (
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

/** Section wrapper with its own ambient colour, no full-height blocks. */
export function Section({
  id,
  glow,
  children,
}: {
  id: string;
  glow: [string, string];
  children: ReactNode;
}) {
  return (
    <section id={id} className="section-shell scroll-mt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[1] overflow-hidden transition-opacity duration-1000"
        style={{
          background: `radial-gradient(60% 45% at 15% 10%, color-mix(in oklch, ${glow[0]} 12%, transparent) 0%, transparent 70%), radial-gradient(55% 45% at 85% 85%, color-mix(in oklch, ${glow[1]} 10%, transparent) 0%, transparent 70%)`,
          opacity: 0.6,
          transition: "opacity 1s ease",
        }}
      />
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function Divider() {
  return (
    <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 sm:px-6 lg:px-8 group">
      <span className="divider-glow transition-all duration-700 group-hover:scale-x-110" />
      <span
        className="size-1.5 shrink-0 rounded-full animate-pulse transition-all duration-500 group-hover:scale-150 group-hover:shadow-[0_0_20px_var(--cyan)]"
        style={{ background: "var(--cyan)", boxShadow: "0 0 12px var(--cyan)" }}
      />
      <span className="divider-glow transition-all duration-700 group-hover:scale-x-110" />
    </div>
  );
}

/** Same-origin static file actions. No blob URLs, no fetch, no viewers. */
export function DocActions({
  file,
  download,
  label,
  compact = false,
}: {
  file: string;
  download: string;
  label: string;
  compact?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={file}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className={`btn-base btn-ghost ${compact ? "px-4 py-2 text-xs" : ""} transition-all duration-300 hover:scale-105 hover:shadow-lg`}
        aria-label={`View ${label} (opens PDF in a new tab)`}
      >
        👁️ View
      </a>
      <a
        href={file}
        download={download}
        onClick={(e) => e.stopPropagation()}
        className={`btn-base btn-ghost ${compact ? "px-4 py-2 text-xs" : ""} transition-all duration-300 hover:scale-105 hover:shadow-lg`}
        aria-label={`Download ${label} as PDF`}
      >
        ⬇️ Download
      </a>
    </div>
  );
}

/** Floating particles effect for background */
export function useParticles(count = 30) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
    }));

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(139, 92, 246, 0.15)";
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return canvasRef;
}