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
  
  // Icon based on title
  const getIcon = () => {
    if (title.includes("Winner")) return "🏆";
    if (title.includes("Led")) return "🚀";
    if (title.includes("Cisco")) return "🔒";
    if (title.includes("TCS")) return "💼";
    if (title.includes("Volleyball")) return "🏐";
    return "⭐";
  };

  return (
    <div
      {...tactile}
      className="card-interactive sheen glass glass-panel h-full p-5 transition-all duration-300 hover:-translate-y-1"
      style={{ ["--card-accent" as string]: accent }}
    >
      <div className="flex items-start gap-3">
        <span className="text-3xl">{getIcon()}</span>
        <div>
          <h3 className="text-sm font-semibold leading-snug">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{detail}</p>
        </div>
      </div>
      
      {/* Bottom accent line */}
      <div 
        className="mt-4 h-0.5 w-12 rounded-full transition-all duration-300 group-hover:w-full"
        style={{ background: accent }}
      />
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