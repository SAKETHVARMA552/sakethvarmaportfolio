import { achievements } from "@/data/portfolio";
import { Reveal, Section, SectionHeading, useTactile } from "./primitives";

function AchievementCard({
  title,
  detail,
  accent,
}: {
  title: string;
  detail: string;
  accent: string;
}) {
  const tactile = useTactile(accent);
  return (
    <div
      {...tactile}
      className="card-interactive sheen glass glass-panel h-full p-5"
      style={{ ["--card-accent" as string]: accent }}
    >
      <span
        className="mb-3 block size-2 rounded-full"
        style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
      />
      <h3 className="text-sm font-semibold leading-snug">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{detail}</p>
    </div>
  );
}

export function Achievements() {
  return (
    <Section id="achievements" glow={["var(--amber)", "var(--pink)"]}>
      <SectionHeading
        eyebrow="Achievements"
        title="Recognition & awards"
        description="Verified achievements from my resume."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={i * 60}>
            <AchievementCard {...a} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
