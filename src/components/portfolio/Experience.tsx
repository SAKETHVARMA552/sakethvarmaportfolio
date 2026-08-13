import { experience } from "@/data/portfolio";
import { DocActions, Reveal, Section, SectionHeading } from "./primitives";

export function Experience() {
  return (
    <Section id="experience" glow={["var(--violet)", "var(--pink)"]}>
      <SectionHeading
        eyebrow="Experience"
        title="Internships & training"
        description="Every role below is backed by an uploaded document. Certificates, offer letters and letters of recommendation are kept as separate document types."
      />

      <div className="relative space-y-6">
        {/* Timeline line */}
        <div 
          className="absolute left-5 top-8 h-[calc(100%-4rem)] w-px"
          style={{ background: "var(--border)" }}
        />

        {experience.map((e, i) => (
          <Reveal key={e.id} delay={i * 70}>
            <article
              className="card-interactive glass glass-panel p-6 sm:p-7 ml-10 transition-all duration-300 hover:-translate-y-1"
              style={{
                ["--card-accent" as string]: e.featured ? "var(--violet)" : "var(--indigo)",
              }}
            >
              {/* Timeline dot */}
              <div 
                className="absolute -left-10 top-7 size-4 rounded-full border-2"
                style={{ 
                  background: "var(--background)",
                  borderColor: e.featured ? "var(--violet)" : "var(--indigo)",
                  boxShadow: `0 0 16px ${e.featured ? "var(--violet)" : "var(--indigo)"}`,
                }}
              />

              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  {e.featured ? (
                    <span
                      className="chip mb-3"
                      style={{
                        ["--chip-accent" as string]: "var(--violet)",
                        color: "var(--foreground)",
                        borderColor: "color-mix(in oklch, var(--violet) 45%, transparent)",
                      }}
                    >
                      ⭐ Featured internship
                    </span>
                  ) : null}
                  <h3 className="text-lg font-semibold sm:text-xl">{e.role}</h3>
                  <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
                    {e.org}
                    {e.location ? ` — ${e.location}` : ""}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="font-mono text-xs text-muted-foreground">{e.period}</p>
                  <p className="mt-1 font-mono text-[0.68rem] text-muted-foreground">{e.type}</p>
                </div>
              </div>

              <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                {e.points.map((p) => (
                  <li key={p} className="flex gap-2.5">
                    <span style={{ color: "var(--cyan)" }}>▹</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t pt-5" style={{ borderColor: "var(--border)" }}>
                <p className="eyebrow flex items-center gap-2">
                  <span>📄</span> Documents
                </p>
                <ul className="mt-3 grid gap-3">
                  {e.documents.map((d) => (
                    <li
                      key={d.file}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border px-4 py-3 transition-all duration-200 hover:border-cyan-400/30"
                      style={{ background: "var(--glass)", borderColor: "var(--border)" }}
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{d.label}</p>
                        <p className="mt-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                          {d.kind}
                        </p>
                      </div>
                      <DocActions file={d.file} download={d.download} label={d.label} compact />
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}