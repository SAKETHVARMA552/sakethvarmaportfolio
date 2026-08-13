import { skillCategories, fundamentals } from "@/data/portfolio";
import { Reveal, Section, SectionHeading, useTactile } from "./primitives";

function CategoryCard({
  name,
  accent,
  skills,
}: {
  name: string;
  accent: string;
  skills: string[];
}) {
  const tactile = useTactile(accent);
  
  return (
    <div
      {...tactile}
      className="card-interactive glass glass-panel h-full p-5 sheen transition-all duration-300 hover:-translate-y-1"
      style={{ ["--card-accent" as string]: accent }}
    >
      {/* Header with accent dot */}
      <div className="flex items-center gap-2.5">
        <span
          className="size-2 rounded-full"
          style={{ background: accent, boxShadow: `0 0 10px ${accent}` }}
        />
        <h3 className="text-sm font-semibold tracking-wide">{name}</h3>
      </div>
      
      {/* Skills as chips only - no percentages */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {skills.map((s) => (
          <span key={s} className="chip" style={{ ["--chip-accent" as string]: accent }}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <Section id="skills" glow={["var(--violet)", "var(--magenta)"]}>
      <SectionHeading
        eyebrow="Technical skills"
        title="The stack I build with"
        description="Every technology below is taken directly from my resume — no invented tooling, no fake proficiency percentages."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((c, i) => (
          <Reveal key={c.id} delay={i * 60}>
            <CategoryCard name={c.name} accent={c.accent} skills={c.skills} />
          </Reveal>
        ))}
      </div>

      {/* Engineering Fundamentals */}
      <div className="mt-16">
        <Reveal className="mb-8">
          <p className="eyebrow">Engineering fundamentals</p>
          <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">
            <span className="gradient-text">Core computer science &amp; applied practice</span>
          </h3>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {fundamentals.map((f, i) => (
            <Reveal key={f.title} delay={i * 40}>
              <div
                className="card-interactive glass glass-panel h-full p-4 transition-all duration-300 hover:-translate-y-1"
                style={{ ["--card-accent" as string]: "var(--indigo)" }}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-sm" style={{ color: "var(--cyan)" }}>◆</span>
                  <div>
                    <p className="text-sm font-medium">{f.title}</p>
                    <p className="mt-1.5 font-mono text-[0.68rem] leading-relaxed text-muted-foreground">
                      {f.note}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}