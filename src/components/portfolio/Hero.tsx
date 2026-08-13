import { profile } from "@/data/portfolio";
import { Reveal } from "./primitives";

const layers = [
  { label: "Frontend", tech: "React.js", accent: "var(--cyan)" },
  { label: "API", tech: "REST • JWT", accent: "var(--blue)" },
  { label: "Backend", tech: "Node.js • Express", accent: "var(--indigo)" },
  { label: "Database", tech: "PostgreSQL • Prisma", accent: "var(--violet)" },
  { label: "AI / ML", tech: "Scikit-learn • Pandas", accent: "var(--magenta)" },
];

export function Hero() {
  return (
    <section id="home" className="relative scroll-mt-24">
      <div
        className="mx-auto flex w-full max-w-6xl flex-col justify-center px-5 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8"
        style={{ minHeight: "min(100svh, 900px)" }}
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal>
              <p className="eyebrow">Software Engineering • Full Stack • AI &amp; ML</p>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="mt-5 text-[2.35rem] font-semibold leading-[1.06] sm:text-6xl lg:text-[4.2rem]">
                Building software
                <br />
                <span className="gradient-text">that solves real problems.</span>
              </h1>
            </Reveal>

            <Reveal delay={170}>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                I&apos;m {profile.name} — a B.Tech CSE (AI &amp; ML) student building full-stack
                applications and machine learning systems. Java, Python, JavaScript, React.js,
                Node.js, PostgreSQL and REST APIs, applied through internships and academic
                projects.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#projects" className="btn-base btn-primary">
                  View Projects
                </a>
                <a
                  href={profile.resume}
                  download={profile.resumeFilename}
                  className="btn-base btn-ghost"
                >
                  Download Resume
                </a>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-base btn-ghost"
                >
                  View Resume
                </a>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <dl className="mt-10 grid max-w-lg grid-cols-3 gap-3">
                {[
                  { k: "CGPA", v: "7.98" },
                  { k: "Internships", v: "4" },
                  { k: "Credentials", v: "17" },
                ].map((s) => (
                  <div key={s.k} className="glass glass-panel px-4 py-3">
                    <dt className="eyebrow text-[0.6rem]">{s.k}</dt>
                    <dd className="mt-1 font-display text-xl font-semibold">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Architecture visualisation */}
          <Reveal delay={200}>
            <div className="glass glass-panel relative p-5 sm:p-6">
              <p className="eyebrow mb-4">System architecture</p>
              <ul className="space-y-0">
                {layers.map((l, i) => (
                  <li key={l.label}>
                    <div
                      className="flex items-center justify-between gap-3 rounded-xl border px-4 py-3"
                      style={{
                        borderColor: `color-mix(in oklch, ${l.accent} 28%, transparent)`,
                        background: `color-mix(in oklch, ${l.accent} 7%, transparent)`,
                      }}
                    >
                      <span className="text-sm font-medium">{l.label}</span>
                      <span className="font-mono text-[0.68rem] text-muted-foreground">
                        {l.tech}
                      </span>
                    </div>
                    {i < layers.length - 1 ? (
                      <div className="relative mx-auto h-8 w-px overflow-hidden bg-white/10">
                        <span
                          className="absolute inset-x-[-1px] top-0 h-3 rounded-full"
                          style={{
                            background: `linear-gradient(to bottom, transparent, ${l.accent})`,
                            animation: `pulse-line 3.2s ${i * 0.55}s ease-in-out infinite`,
                          }}
                        />
                      </div>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
