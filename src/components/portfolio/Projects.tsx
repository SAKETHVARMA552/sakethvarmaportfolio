import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/data/portfolio";
import { Reveal, Section, SectionHeading, useTactile } from "./primitives";

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const tactile = useTactile(project.accent);
  
  return (
    <article
      {...tactile}
      role="button"
      tabIndex={0}
      data-cursor="project"
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      aria-label={`Open details for ${project.name}`}
      className="card-interactive sheen glass glass-panel group h-full cursor-pointer p-6 transition-all duration-500 hover:-translate-y-1"
      style={{ ["--card-accent" as string]: project.accent }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow" style={{ color: project.accent }}>
            {project.category}
          </p>
          <h3 className="mt-2 text-xl font-semibold sm:text-2xl">{project.name}</h3>
        </div>
        <span
          aria-hidden
          className="mt-1 text-2xl transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-110"
          style={{ color: project.accent }}
        >
          ↗
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
        {project.summary}
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.tech.slice(0, 4).map((t) => (
          <span key={t} className="chip" style={{ ["--chip-accent" as string]: project.accent }}>
            {t}
          </span>
        ))}
        {project.tech.length > 4 && (
          <span className="chip text-xs" style={{ ["--chip-accent" as string]: project.accent }}>
            +{project.tech.length - 4}
          </span>
        )}
      </div>

      <div 
        className="mt-5 h-0.5 w-full rounded-full opacity-0 transition-all duration-500 group-hover:opacity-100"
        style={{ 
          background: `linear-gradient(90deg, ${project.accent}, transparent)`,
        }}
      />
    </article>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Open animation on mount
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => setIsOpen(true), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
      if (e.key === "Tab" && ref.current) {
        const items = ref.current.querySelectorAll<HTMLElement>(
          "a[href], button, [tabindex]:not([tabindex='-1'])",
        );
        if (!items.length) return;
        const first = items[0]!;
        const last = items[items.length - 1]!;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.querySelector<HTMLElement>("button")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setIsOpen(false);
    setTimeout(() => onClose(), 300);
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      {/* Backdrop with smooth fade */}
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-all duration-500 ease-out ${
          isOpen ? "opacity-100" : "opacity-0"
        } ${isClosing ? "opacity-0" : ""}`}
        onClick={handleClose}
        aria-hidden
      />
      
      {/* Modal Content with smooth slide-up and scale */}
      <div
        ref={ref}
        className={`glass relative max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl p-6 sm:max-w-2xl sm:rounded-3xl sm:p-8 transition-all duration-500 ease-out ${
          isOpen 
            ? "opacity-100 translate-y-0 scale-100" 
            : "opacity-0 translate-y-12 scale-95"
        } ${isClosing ? "opacity-0 translate-y-12 scale-95" : ""}`}
        style={{
          borderColor: `color-mix(in oklch, ${project.accent} 40%, transparent)`,
          boxShadow: `0 40px 120px -40px color-mix(in oklch, ${project.accent} 80%, transparent)`,
          paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow" style={{ color: project.accent }}>
              {project.category}
            </p>
            <h3 id="project-modal-title" className="mt-2 text-2xl font-semibold">
              {project.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close project details"
            className="btn-base btn-ghost size-11 !p-0 text-lg transition-all duration-300 hover:rotate-90 hover:scale-110"
          >
            ✕
          </button>
        </div>

        {/* Problem statement */}
        <div 
          className="mt-6 rounded-xl border p-4 transition-all duration-500 delay-100"
          style={{ 
            borderColor: "var(--border)", 
            background: "var(--glass)",
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "translateY(0)" : "translateY(10px)",
          }}
        >
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">The Problem</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{project.problem}</p>
        </div>

        {/* Technologies */}
        <div 
          className="mt-6 transition-all duration-500 delay-200"
          style={{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "translateY(0)" : "translateY(10px)",
          }}
        >
          <p className="eyebrow">Technologies</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span key={t} className="chip" style={{ ["--chip-accent" as string]: project.accent }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div 
          className="mt-6 transition-all duration-500 delay-300"
          style={{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "translateY(0)" : "translateY(10px)",
          }}
        >
          <p className="eyebrow">What I built</p>
          <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
            {project.features.map((f, index) => (
              <li 
                key={f} 
                className="flex gap-2.5 transition-all duration-500"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateX(0)" : "translateX(-10px)",
                  transitionDelay: `${350 + index * 50}ms`,
                }}
              >
                <span style={{ color: project.accent }}>▹</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer actions */}
        <div 
          className="mt-8 flex flex-wrap gap-3 border-t pt-6 transition-all duration-500 delay-400"
          style={{ 
            borderColor: "var(--border)",
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "translateY(0)" : "translateY(10px)",
          }}
        >
          <button
            onClick={handleClose}
            className="btn-base btn-ghost flex-1 sm:flex-none transition-all duration-300 hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <Section id="projects" glow={["var(--indigo)", "var(--cyan)"]}>
      <SectionHeading
        eyebrow="Projects"
        title="Things I've engineered"
        description="Two production-shaped builds from my resume: a full-stack web platform and a machine learning system."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 90}>
            <ProjectCard project={p} onOpen={() => setOpen(p)} />
          </Reveal>
        ))}
      </div>

      {open ? <ProjectModal project={open} onClose={() => setOpen(null)} /> : null}
    </Section>
  );
}