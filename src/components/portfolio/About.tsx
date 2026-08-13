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
        <Reveal className="glass glass-panel p-6">
          <p className="eyebrow">Education</p>
          <ul className="mt-5 space-y-5">
            {education.map((e) => (
              <li key={e.degree} className="border-l pl-4" style={{ borderColor: "var(--border)" }}>
                <h3 className="text-base font-semibold">{e.degree}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{e.school}</p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {e.period} • {e.score}
                </p>
                {e.coursework.length ? (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {e.coursework.map((c) => (
                      <span key={c} className="chip" style={{ ["--chip-accent" as string]: "var(--cyan)" }}>
                        {c}
                      </span>
                    ))}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="grid gap-5">
          <Reveal delay={80} className="glass glass-panel p-6">
            <p className="eyebrow">Focus areas</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {["Software Engineering", "Full Stack Development", "Machine Learning", "Generative AI"].map(
                (f) => (
                  <div
                    key={f}
                    className="rounded-xl border px-3 py-3 text-sm"
                    style={{ background: "var(--glass)" }}
                  >
                    {f}
                  </div>
                ),
              )}
            </div>
            <p className="mt-5 font-mono text-xs text-muted-foreground">{profile.location}</p>
          </Reveal>

          <Reveal delay={140} className="glass glass-panel p-6">
            <p className="eyebrow">Languages</p>
            <ul className="mt-4 space-y-2 text-sm">
              {languages.map((l) => (
                <li key={l.name} className="flex items-center justify-between gap-3">
                  <span>{l.name}</span>
                  <span className="font-mono text-xs text-muted-foreground">{l.level}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200} className="glass glass-panel p-6">
            <p className="eyebrow">Extracurricular</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {extracurricular.map((x) => (
                <li key={x} className="flex gap-2">
                  <span style={{ color: "var(--violet)" }}>▹</span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
