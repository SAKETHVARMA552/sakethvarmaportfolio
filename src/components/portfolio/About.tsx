import { profile, education, languages, extracurricular } from "@/data/portfolio";
import { Reveal, Section, SectionHeading } from "./primitives";

export function About() {
  return (
    <Section id="about" glow={["var(--blue)", "var(--cyan)"]}>
      <SectionHeading
        eyebrow="About"
        title="Engineering focus & background"
        description={profile.objective}
      />

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left Column - Education */}
        <Reveal className="glass glass-panel p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="text-xl">🎓</span>
            <p className="eyebrow">Education</p>
          </div>
          
          <ul className="space-y-3">
            {education.map((e, index) => (
              <li key={e.degree} className="relative pl-4">
                {/* Timeline line */}
                {index < education.length - 1 && (
                  <div 
                    className="absolute left-0 top-6 h-[calc(100%-0.5rem)] w-px"
                    style={{ background: "var(--border)" }}
                  />
                )}
                <div className="absolute -left-1.5 top-2 size-3 rounded-full" style={{ background: "var(--cyan)", boxShadow: "0 0 12px var(--cyan)" }} />
                
                <div className="ml-3">
                  <h3 className="text-base font-semibold">{e.degree}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">{e.school}</p>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                    {e.period} • <span className="text-cyan-400">{e.score}</span>
                  </p>
                  {e.coursework.length ? (
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {e.coursework.map((c) => (
                        <span key={c} className="chip" style={{ ["--chip-accent" as string]: "var(--cyan)" }}>
                          {c}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Right Column - Info */}
        <div className="grid gap-4">
          {/* Location */}
          <Reveal delay={80} className="glass glass-panel p-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">📍</span>
              <p className="eyebrow">Location</p>
            </div>
            <p className="mt-1 text-sm font-medium">{profile.location}</p>
          </Reveal>

          {/* Focus Areas - No Icons, Just Hover Effects */}
          <Reveal delay={140} className="glass glass-panel p-4">
            <p className="eyebrow">Focus Areas</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {[
                { label: "Software Engineering", accent: "var(--violet)" },
                { label: "Full Stack Development", accent: "var(--blue)" },
                { label: "Machine Learning", accent: "var(--cyan)" },
                { label: "Generative AI", accent: "var(--magenta)" },
              ].map((f) => (
                <div
                  key={f.label}
                  className="group relative rounded-xl border px-3 py-2.5 text-sm text-center transition-all duration-300 cursor-pointer overflow-hidden"
                  style={{ 
                    background: "var(--glass)",
                    borderColor: "var(--border)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = f.accent;
                    e.currentTarget.style.boxShadow = `0 0 30px ${f.accent}33`;
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <span 
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at center, ${f.accent}22, transparent 70%)`,
                    }}
                  />
                  <span 
                    className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full transition-all duration-300 group-hover:w-3/4"
                    style={{ background: f.accent }}
                  />
                  <span className="relative z-10 font-medium">{f.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Languages - Compact */}
          <Reveal delay={200} className="glass glass-panel p-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">🗣️</span>
              <p className="eyebrow">Languages</p>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {languages.map((l) => (
                <div key={l.name} className="flex flex-col rounded-lg border px-3 py-2" style={{ borderColor: "var(--border)", background: "var(--glass)" }}>
                  <span className="text-sm font-medium">{l.name}</span>
                  <span className="text-[0.6rem] font-mono text-muted-foreground uppercase tracking-wider">{l.level}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Extracurricular - Compact */}
          <Reveal delay={260} className="glass glass-panel p-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">🌟</span>
              <p className="eyebrow">Extracurricular</p>
            </div>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              {extracurricular.map((x) => (
                <li key={x} className="flex gap-2 items-start">
                  <span style={{ color: "var(--violet)" }} className="mt-0.5 text-xs">▹</span>
                  <span className="text-[0.82rem] leading-relaxed">{x}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}