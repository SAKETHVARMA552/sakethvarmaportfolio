import { useEffect, useRef, useState, type ReactNode } from "react";

/** IntersectionObserver-driven reveal — one observer per element, unobserved after reveal. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = Tag as "div";
  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement>}
      className={`reveal ${className}`}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
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
      <p className="eyebrow">{eyebrow}</p>
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
        className="pointer-events-none absolute inset-0 -z-[1] overflow-hidden"
        style={{
          background: `radial-gradient(60% 45% at 15% 10%, color-mix(in oklch, ${glow[0]} 12%, transparent) 0%, transparent 70%), radial-gradient(55% 45% at 85% 85%, color-mix(in oklch, ${glow[1]} 10%, transparent) 0%, transparent 70%)`,
        }}
      />
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function Divider() {
  return (
    <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 sm:px-6 lg:px-8">
      <span className="divider-glow" />
      <span
        className="size-1.5 shrink-0 rounded-full"
        style={{ background: "var(--cyan)", boxShadow: "0 0 12px var(--cyan)" }}
      />
      <span className="divider-glow" />
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
        className={`btn-base btn-ghost ${compact ? "px-4 py-2 text-xs" : ""}`}
        aria-label={`View ${label} (opens PDF in a new tab)`}
      >
        View
      </a>
      <a
        href={file}
        download={download}
        onClick={(e) => e.stopPropagation()}
        className={`btn-base btn-ghost ${compact ? "px-4 py-2 text-xs" : ""}`}
        aria-label={`Download ${label} as PDF`}
      >
        Download
      </a>
    </div>
  );
}
