import { useMemo, useState } from "react";
import { certFilters, credentials, type Credential } from "@/data/portfolio";
import { DocActions, Reveal, Section, SectionHeading, useTactile } from "./primitives";

function accentFor(c: Credential) {
  switch (c.category) {
    case "Generative AI":
      return "var(--magenta)";
    case "Cybersecurity":
      return "var(--cyan)";
    case "Programming":
      return "var(--blue)";
    case "Professional":
      return "var(--amber)";
    case "Job Simulations":
      return "var(--pink)";
    default:
      return "var(--violet)";
  }
}

function CertCard({ cert, onDetails }: { cert: Credential; onDetails: () => void }) {
  const accent = accentFor(cert);
  const tactile = useTactile(accent);
  
  // Icon based on category
  const getIcon = () => {
    switch (cert.category) {
      case "Generative AI": return "🤖";
      case "Cybersecurity": return "🔒";
      case "Programming": return "💻";
      case "Professional": return "💼";
      case "Job Simulations": return "🎮";
      default: return "📜";
    }
  };

  return (
    <article
      {...tactile}
      className="card-interactive sheen glass glass-panel flex h-full flex-col p-5 transition-all duration-300 hover:-translate-y-1"
      style={{ ["--card-accent" as string]: accent }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{getIcon()}</span>
          <span className="chip" style={{ ["--chip-accent" as string]: accent, color: accent }}>
            {cert.kind}
          </span>
        </div>
        <span className="font-mono text-[0.65rem] text-muted-foreground">{cert.date}</span>
      </div>

      <h3 className="mt-4 text-base font-semibold leading-snug line-clamp-2">{cert.title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{cert.issuer}</p>

      {cert.featured && (
        <span className="mt-2 inline-flex items-center gap-1 text-xs text-amber-400">
          <span>⭐</span> Featured
        </span>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {cert.skills.slice(0, 3).map((s) => (
          <span key={s} className="chip" style={{ ["--chip-accent" as string]: accent }}>
            {s}
          </span>
        ))}
        {cert.skills.length > 3 && (
          <span className="chip text-xs" style={{ ["--chip-accent" as string]: accent }}>
            +{cert.skills.length - 3}
          </span>
        )}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
        <DocActions file={cert.file} download={cert.download} label={cert.title} compact />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDetails();
          }}
          className="btn-base btn-ghost px-4 py-2 text-xs transition-all duration-200 hover:scale-105"
        >
          Details
        </button>
      </div>
    </article>
  );
}

function CertModal({ cert, onClose }: { cert: Credential; onClose: () => void }) {
  const accent = accentFor(cert);
  
  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300" onClick={onClose} aria-hidden />
      <div
        className="glass relative max-h-[90dvh] w-full overflow-y-auto rounded-t-3xl p-6 sm:max-w-lg sm:rounded-3xl animate-in slide-in-from-bottom-4 duration-300"
        style={{
          borderColor: `color-mix(in oklch, ${accent} 40%, transparent)`,
          paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))",
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-2xl">
              {cert.category === "Generative AI" ? "🤖" : 
               cert.category === "Cybersecurity" ? "🔒" :
               cert.category === "Programming" ? "💻" :
               cert.category === "Professional" ? "💼" :
               cert.category === "Job Simulations" ? "🎮" : "📜"}
            </span>
            <h3 id="cert-modal-title" className="mt-2 text-lg font-semibold">
              {cert.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            aria-label="Close credential details"
            className="btn-base btn-ghost size-11 !p-0 transition-transform hover:rotate-90"
          >
            ✕
          </button>
        </div>
        
        <dl className="mt-5 space-y-3 text-sm">
          {[
            ["Issuer", cert.issuer],
            ["Date", cert.date],
            ["Type", cert.kind],
            ["Category", cert.category],
            ...(cert.credentialId ? [["Credential ID", cert.credentialId]] : []),
          ].map(([k, v]) => (
            <div key={k} className="flex flex-wrap justify-between gap-2 border-b pb-2 last:border-0" style={{ borderColor: "var(--border)" }}>
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="break-all text-right font-medium">{v}</dd>
            </div>
          ))}
        </dl>
        
        <div className="mt-5 flex flex-wrap gap-1.5">
          {cert.skills.map((s) => (
            <span key={s} className="chip" style={{ ["--chip-accent" as string]: accent }}>
              {s}
            </span>
          ))}
        </div>
        
        <div className="mt-6">
          <DocActions file={cert.file} download={cert.download} label={cert.title} />
        </div>
      </div>
    </div>
  );
}

export function Certificates() {
  const [filter, setFilter] = useState<string>("All");
  const [details, setDetails] = useState<Credential | null>(null);

  const list = useMemo(
    () => (filter === "All" ? credentials : credentials.filter((c) => c.category === filter)),
    [filter],
  );

  const featured = credentials.filter((c) => c.featured);

  return (
    <Section id="certificates" glow={["var(--violet)", "var(--blue)"]}>
      <SectionHeading
        eyebrow="Credentials"
        title="Certifications, courses & job simulations"
        description="Each card links to the real PDF hosted with this site. View opens the document; Download saves it. Job simulations are listed as virtual experience, not formal certifications."
      />

      {/* Featured Section */}
      {featured.length > 0 && (
        <Reveal className="mb-10">
          <p className="eyebrow mb-4 flex items-center gap-2">
            <span>⭐</span> Featured credentials
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((c) => (
              <CertCard key={c.id} cert={c} onDetails={() => setDetails(c)} />
            ))}
          </div>
        </Reveal>
      )}

      {/* Filter Section */}
      <Reveal className="mb-6">
        <div className="glass -mx-1 flex gap-2 overflow-x-auto rounded-full p-1.5 no-scrollbar">
          {certFilters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className="btn-base shrink-0 px-4 py-2 text-xs transition-all duration-200 hover:scale-105"
              style={
                filter === f
                  ? {
                      background: "linear-gradient(120deg, var(--violet), var(--blue))",
                      color: "var(--primary-foreground)",
                      boxShadow: "0 4px 16px rgba(99,102,241,0.3)",
                    }
                  : { color: "var(--muted-foreground)" }
              }
            >
              {f}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Certificate Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c, i) => (
          <Reveal key={c.id} delay={Math.min(i, 6) * 50}>
            <CertCard cert={c} onDetails={() => setDetails(c)} />
          </Reveal>
        ))}
      </div>

      {/* Empty state */}
      {list.length === 0 && (
        <div className="glass glass-panel p-12 text-center">
          <p className="text-muted-foreground">No credentials found in this category.</p>
        </div>
      )}

      {details ? <CertModal cert={details} onClose={() => setDetails(null)} /> : null}
    </Section>
  );
}